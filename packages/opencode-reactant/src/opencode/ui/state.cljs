(ns opencode.ui.state
  (:require [reagent.core :as r]))

(defonce !state
  (r/atom {:issues []
           :prs []
           :events []
           :connected? false
           :repo "riatzukiza/promethean"}))

(defn push-event! [e]
  (swap! !state update :events #(->> (conj % e) (take-last 500))))