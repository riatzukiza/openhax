(ns opencode.ui.github
  (:require [ajax.core :refer [GET POST]]
            [opencode.ui.state :as S]))

(def base "/api")

(defn fetch-issues! []
  (let [repo (:repo @S/!state)]
    (GET (str base "/issues?repo=" repo)
         {:handler #(swap! S/!state assoc :issues %)
          :error-handler #(js/console.error "issues" %)})))

(defn fetch-prs! []
  (let [repo (:repo @S/!state)]
    (GET (str base "/prs?repo=" repo)
         {:handler #(swap! S/!state assoc :prs %)
          :error-handler #(js/console.error "prs" %)})))

(defn create-worktree! [issue-number]
  (let [repo (:repo @S/!state)]
    (POST (str base "/worktrees")
          {:params {:repo repo :issue issue-number}
           :format :json
           :handler #(S/push-event! {:type :ui/command-ok :cmd :worktree :data %})
           :error-handler #(S/push-event! {:type :ui/command-error :cmd :worktree :err %})})))

(defn open-pr! [issue-number]
  (let [repo (:repo @S/!state)]
    (POST (str base "/pulls")
          {:params {:repo repo :issue issue-number}
           :format :json
           :handler #(S/push-event! {:type :ui/command-ok :cmd :pr-open :data %})
           :error-handler #(S/push-event! {:type :ui/command-error :cmd :pr-open :err %})})))

(defn reply-comment! [{:keys [repo pr-number body]}]
  (POST (str base "/pr-comment")
        {:params {:repo repo :pr pr-number :body body}
         :format :json
         :handler #(S/push-event! {:type :ui/command-ok :cmd :pr-comment :data %})
         :error-handler #(S/push-event! {:type :ui/command-error :cmd :pr-comment :err %})}))