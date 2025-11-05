(ns opencode.ui.router
  (:require [reagent.core :as r]))

(defonce current-page (r/atom {:name ::home :params {}}))

(defn parse-path [path]
  (let [parts (subs path 1) ; Remove leading /
        parts (when (seq parts) (.split parts "/"))]
    (cond
      (or (nil? parts) (empty? parts) (= parts [""]))
      {:name ::home :params {}}
      
      (= (first parts) "issues")
      {:name ::issue :params {:id (second parts)}}
      
      (= (first parts) "prs")
      {:name ::pr :params {:id (second parts)}}
      
      :else
      {:name ::not-found :params {}})))

(defn navigate! [page-name & params]
  (let [path (case page-name
               ::home "/"
               ::issue (str "/issues/" (first params))
               ::pr (str "/prs/" (first params))
               "/")]
    (.pushState js/history #{} "" path)
    (reset! current-page (parse-path path))))

(defn init-router! []
  ;; Set initial page based on current URL
  (reset! current-page (parse-path (.. js/window -location -pathname)))
  
  ;; Listen for browser navigation
  (.addEventListener js/window "popstate"
    (fn [e]
      (reset! current-page (parse-path (.. js/window -location -pathname))))))