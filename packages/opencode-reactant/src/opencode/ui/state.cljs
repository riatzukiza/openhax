(ns opencode.ui.state
  (:require [reagent.core :as r]))

(goog-define REPO_SLUG "riatzukiza/opencode")

(defonce !state
  (r/atom {:issues []
           :prs []
           :worktrees []
           :worktree-config {:baseDir "worktrees"}
           :events []
           :connected? false
           :repo (or REPO_SLUG "riatzukiza/opencode")}))

(defn push-event! [e]
  (swap! !state update :events #(->> (conj % e) (take-last 500))))