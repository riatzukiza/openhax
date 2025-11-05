(ns opencode.ui.github
  (:require [reagent.core :as r]
            [ajax.core :refer [GET POST]]
            [opencode.ui.state :as S]))

;; Cache atoms for issue and PR details
(defonce issue-detail-cache (r/atom {}))
(defonce pr-detail-cache (r/atom {}))

(def base "http://localhost:8787/api")

(defn fetch-issues! []
  (let [repo (:repo @S/!state)]
    (js/console.log "Fetching issues for repo:" repo) ;; Updated version
    (js/setTimeout
      (fn []
        (let [xhr (js/XMLHttpRequest.)]
          (.open xhr "GET" (str base "/issues?repo=" repo) true)
          (.setRequestHeader xhr "Accept" "application/json")
          (set! (.-onload xhr)
                (fn []
                  (if (= (.-status xhr) 200)
                    (let [response-text (.-responseText xhr)
                          data (js/JSON.parse response-text)
                          clj-data (js->clj data :keywordize-keys true)]
                      (js/console.log "XHR response:" clj-data)
                      (js/console.log "About to update issues in state...")
                      (swap! S/!state assoc :issues clj-data)
                      (js/console.log "Issues in state after update:" (get @S/!state :issues))
                      (js/console.log "PRs in state (should be separate):" (get @S/!state :prs))
                      (js/console.log "Issues loaded:" (count clj-data)))
                    (js/console.error "XHR error:" (.-status xhr) (.-statusText xhr)))))
          (set! (.-onerror xhr)
                (fn []
                  (js/console.error "XHR network error")))
          (.send xhr)))
      1000)))

(defn fetch-prs! []
  (let [repo (:repo @S/!state)]
    (js/console.log "Fetching PRs for repo:" repo)
    (GET (str base "/prs")
         {:params {:repo repo}
          :handler (fn [response]
                     (js/console.log "PR AJAX response:" response)
                     (let [clj-data (js->clj response :keywordize-keys true)]
                       (js/console.log "PR converted to Clojure:" clj-data)
                       (js/console.log "PR seq test:" (seq clj-data))
                       (js/console.log "About to update PRs in state...")
                       (swap! S/!state assoc :prs clj-data)
                       (js/console.log "PRs in state after update:" (get @S/!state :prs))
                       (js/console.log "Issues in state (should be separate):" (get @S/!state :issues))
                       (js/console.log "PRs count:" (count (get @S/!state :prs)))))
          :error-handler (fn [{:keys [status status-text]}]
                           (js/console.error "PR AJAX error:" status status-text))})))

(defn fetch-worktrees! []
  (let [repo (:repo @S/!state)]
    (js/console.log "Fetching worktrees for repo:" repo)
    (GET (str base "/worktrees")
         {:params {:repo repo}
          :handler (fn [response]
                     (js/console.log "Worktrees AJAX response:" response)
                     (let [clj-data (js->clj response :keywordize-keys true)]
                       (js/console.log "Worktrees converted to Clojure:" clj-data)
                       (js/console.log "Worktrees seq test:" (seq clj-data))
                       (swap! S/!state assoc :worktrees clj-data)
                       (js/console.log "Worktrees in state:" (get @S/!state :worktrees))
                       (js/console.log "Worktrees count:" (count (get @S/!state :worktrees)))))
          :error-handler (fn [{:keys [status status-text]}]
                           (js/console.error "Worktrees AJAX error:" status status-text))})))

(defn create-worktree! [issue-number]
  (let [repo (:repo @S/!state)]
    (POST (str base "/worktrees")
          {:params {:repo repo :issue issue-number}
           :format :json
           :handler (fn [response]
                      (S/push-event! {:type :ui/command-ok :cmd :worktree :data response})
                      (fetch-worktrees!))
           :error-handler #(S/push-event! {:type :ui/command-error :cmd :worktree :err %})})))

(defn open-pr! [issue-number]
  (let [repo (:repo @S/!state)]
    (POST (str base "/pulls")
           {:params {:repo repo :issue issue-number}
            :format :json
            :handler #(S/push-event! {:type :ui/command-ok :cmd :pr-open :data %})
            :error-handler #(S/push-event! {:type :ui/command-error :cmd :pr-open :err %})})))

(defn fetch-worktree-config! []
  (GET (str base "/worktrees/config")
       {:handler (fn [response]
                  (js/console.log "Worktree config AJAX response:" response)
                  (let [clj-data (js->clj response :keywordize-keys true)]
                    (js/console.log "Worktree config converted to Clojure:" clj-data)
                    (swap! S/!state assoc :worktree-config clj-data)
                    (js/console.log "Worktree config in state:" (get @S/!state :worktree-config))))
        :error-handler (fn [{:keys [status status-text]}]
                         (js/console.error "Worktree config AJAX error:" status status-text))}))

(defn reply-comment! [{:keys [repo pr-number body]}]
  (POST (str base "/pr-comment")
        {:params {:repo repo :pr pr-number :body body}
         :format :json
         :handler #(S/push-event! {:type :ui/command-ok :cmd :pr-comment :data %})
         :error-handler #(S/push-event! {:type :ui/command-error :cmd :pr-comment :err %})}))

(defn fetch-issue-detail! [issue-id]
  (let [repo (:repo @S/!state)
        cache-key (str repo "/" issue-id)]
    ;; Check cache first
    (if-let [cached-result (get @issue-detail-cache cache-key)]
      (do
        (js/console.log "Using cached issue detail for:" cache-key)
        cached-result)
      ;; Fetch from API if not cached
      (do
        (js/console.log "Fetching issue detail for:" repo "issue:" issue-id "NEW CODE")
        (GET (str base "/issues/" issue-id)
             {:params {:repo repo}
              :handler (fn [response]
                          (let [clj-data (js->clj response :keywordize-keys true)
                                ;; Convert array-based structure to proper map
                                mapped-data (when (:arr clj-data)
                                             (apply hash-map (:arr clj-data)))]
                            (js/console.log "Issue detail response:" clj-data)
                            (js/console.log "Mapped issue data:" mapped-data)
                            ;; Cache the mapped data
                            (swap! issue-detail-cache assoc cache-key mapped-data)
                            mapped-data))
              :error-handler (fn [{:keys [status status-text]}]
                               (js/console.error "Issue detail fetch error:" status status-text)
                               nil)})))))

(defn fetch-pr-detail! [pr-id]
  (let [repo (:repo @S/!state)
        cache-key (str repo "/" pr-id)]
    ;; Check cache first
    (if-let [cached-result (get @pr-detail-cache cache-key)]
      (do
        (js/console.log "Using cached PR detail for:" cache-key)
        cached-result)
      ;; Fetch from API if not cached
      (do
        (js/console.log "Fetching PR detail for:" repo "PR:" pr-id)
        (GET (str base "/prs/" pr-id)
             {:params {:repo repo}
              :handler (fn [response]
                         (let [clj-data (js->clj response :keywordize-keys true)
                               ;; Convert array-based structure to proper map
                               mapped-data (when (:arr clj-data)
                                            (apply hash-map (:arr clj-data)))]
                           (js/console.log "PR detail response:" clj-data)
                           (js/console.log "Mapped PR data:" mapped-data)
                           ;; Cache the result
                           (swap! pr-detail-cache assoc cache-key mapped-data)
                           mapped-data))
              :error-handler (fn [{:keys [status status-text]}]
                               (js/console.error "PR detail fetch error:" status status-text)
                               nil)})))))