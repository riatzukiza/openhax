(ns opencode.ui.core
  (:require [reagent.core :as r]
            [reagent.dom :as dom]
            [opencode.ui.state :as S]
            [opencode.ui.github :as gh]
            [opencode.ui.components :as comp]))

(defn connect-ws! []
  (let [ws (js/WebSocket. "ws://localhost:8787/events")]
    (set! (.-onopen ws) #(swap! S/!state assoc :connected? true))
    (set! (.-onclose ws) #(swap! S/!state assoc :connected? false))
    (set! (.-onmessage ws)
          (fn [m]
            (let [e (js/JSON.parse (.-data m))
                  e (js->clj e :keywordize-keys true)]
              (S/push-event! e)
              (when (= (:type e) :refresh/gh)
                (gh/fetch-issues!)
                (gh/fetch-prs!))))))
  nil)



(defn app []
  (let [{:keys [issues prs worktrees worktree-config connected? repo]} @S/!state]
    ;; Debug logging
    (js/console.log "APP RENDER - issues:" issues)
    (js/console.log "APP RENDER - prs:" prs)
    (js/console.log "APP RENDER - worktrees:" worktrees)
    (js/console.log "APP RENDER - seq issues:" (seq issues))
    (js/console.log "APP RENDER - seq prs:" (seq prs))
    (js/console.log "APP RENDER - seq worktrees:" (seq worktrees))
    (js/console.log "APP RENDER - issues first item:" (first issues))
    (js/console.log "APP RENDER - prs first item:" (first prs))
    [comp/main-layout issues prs worktrees worktree-config connected? repo]))

(defn init []
  (js/console.log "Initializing app v3...")
  (connect-ws!)
  
   ;; Fetch data after a short delay to ensure page is ready
   (js/setTimeout 
     (fn []
       (js/console.log "Fetching data...")
       (gh/fetch-issues!)
       (gh/fetch-prs!)
       (gh/fetch-worktrees!)
       (gh/fetch-worktree-config!))
     500)
  
  (dom/render [app] (.getElementById js/document "app")))