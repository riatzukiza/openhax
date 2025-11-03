(ns opencode.ui.core
  (:require [reagent.core :as r]
            [opencode.ui.state :as S]
            [opencode.ui.github :as gh]))

(defn connect-ws! []
  (let [ws (js/WebSocket. (str (if (= "https:" js/location.protocol) "wss://" "ws://")
                               js/location.host "/events"))]
    (set! (.-onopen ws) #(swap! S/!state assoc :connected? true))
    (set! (.-onclose ws) #(swap! S/!state assoc :connected? false))
    (set! (.-onmessage ws)
          (fn [m]
            (let [e (js/JSON.parse (.-data m))
                  e (js->clj e :keywordize-keys true)]
              (S/push-event! e)
              (when (= (:type e) ":refresh/gh")
                (gh/fetch-issues!)
                (gh/fetch-prs!))))))
  nil)

(defn issue-item [{:keys [number title state]}]
  [:div.border.p-2.rounded.mb-2
   [:div.text-sm (str "#" number " • " state)]
   [:div.font-bold title]
   [:div.mt-2.flex.gap-2
    [:button {:on-click #(gh/create-worktree! number)} "Create worktree"]
    [:button {:on-click #(gh/open-pr! number)} "Open PR"]]])

(defn pr-item [{:keys [number title state]}]
  [:div.border.p-2.rounded.mb-2
   [:div.text-sm (str "PR #" number " • " state)]
   [:div.font-bold title]])

(defn events-log []
  (let [evts (reverse (:events @S/!state))]
    [:div.mt-4
     [:h3 "Events"]
     [:div {:style {:max-height "300px" :overflow "auto"}}
      (for [[i e] (map-indexed vector evts)]
        ^{:key i}
        [:pre.text-xs (pr-str e)])]]))

(defn app []
  (let [{:keys [issues prs connected? repo]} @S/!state]
    [:div.p-4
     [:h2 "Opencode Reactant"]
     [:div.text-sm (str "Repo: " repo " • WS " (if connected? "connected" "disconnected"))]
     [:div.grid.grid-cols-2.gap-4.mt-4
      [:div
       [:h3 "Issues"]
       (if (seq issues)
         (for [i issues] ^{:key (:id i)} [issue-item i])
         [:div.text-sm.opacity-70 "No issues loaded."])]
      [:div
       [:h3 "Pull Requests"]
       (if (seq prs)
         (for [p prs] ^{:key (:id p)} [pr-item p])
         [:div.text-sm.opacity-70 "No PRs loaded."])]]
     [events-log]]))

(defn init []
  (connect-ws!)
  (gh/fetch-issues!)
  (gh/fetch-prs!)
  (r/render [app] (.getElementById js/document "app")))