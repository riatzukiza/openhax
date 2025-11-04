(ns opencode.ui.components
  (:require [reagent.core :as r]
            [opencode.ui.state :as S]
            [opencode.ui.github :as gh]))

(defn issue-item [issue]
  ;; Handle both JS objects and Clojure maps
  (let [number (if (map? issue)
                 (or (:number issue) (get issue "number"))
                 (.-number issue))
        title (if (map? issue)
                (or (:title issue) (get issue "title"))
                (.-title issue))
        state (if (map? issue)
                (or (:state issue) (get issue "state"))
                (.-state issue))
        id (if (map? issue)
             (or (:id issue) (get issue "id"))
             (.-id issue))]
    [:div.bg-white.border.border-gray-200.p-4.rounded-lg.mb-3.shadow-sm.hover:shadow-md.hover:bg-gray-50.transition-all
     {:key (str "issue-" id)}
      [:div.flex.items-center.justify-between.mb-2
       [:span.text-sm.font-medium.text-gray-500 (str "#" number)]
       [:span.px-2.py-1.text-xs.font-semibold.rounded-full
        {:class (if (= state "open") "bg-green-100.text-green-800" "bg-gray-100.text-gray-800")}
        state]]
      [:div.text-lg.font-semibold.text-gray-900.mb-3 title]
      [:div.flex.gap-2
       [:button.bg-blue-500.hover:bg-blue-600.text-white.px-3.py-1.5.rounded-md.text-sm.font-medium.transition-colors.focus:outline-none.focus:ring-2.focus:ring-blue-500.focus:ring-offset-2
        {:on-click #(gh/create-worktree! number)} "Create worktree"]
       [:button.bg-gray-500.hover:bg-gray-600.text-white.px-3.py-1.5.rounded-md.text-sm.font-medium.transition-colors.focus:outline-none.focus:ring-2.focus:ring-gray-500.focus:ring-offset-2
        {:on-click #(gh/open-pr! number)} "Open PR"]]]))

(defn pr-item [pr]
  ;; Handle both JS objects and Clojure maps
  (let [number (if (map? pr)
                 (or (:number pr) (get pr "number"))
                 (.-number pr))
        title (if (map? pr)
                (or (:title pr) (get pr "title"))
                (.-title pr))
        state (if (map? pr)
                (or (:state pr) (get pr "state"))
                (.-state pr))
        id (if (map? pr)
             (or (:id pr) (get pr "id"))
             (.-id pr))]
    [:div.bg-white.border.border-gray-200.p-4.rounded-lg.mb-3.shadow-sm.hover:shadow-md.hover:bg-gray-50.transition-all
     {:key (str "pr-" id)}
      [:div.flex.items-center.justify-between.mb-2
       [:span.text-sm.font-medium.text-gray-500 (str "PR #" number)]
       [:span.px-2.py-1.text-xs.font-semibold.rounded-full
        {:class (cond
                  (= state "open") "bg-green-100.text-green-800"
                  (= state "merged") "bg-purple-100.text-purple-800"
                  :else "bg-gray-100.text-gray-800")}
        state]]
      [:div.text-lg.font-semibold.text-gray-900 title]]))

(defn worktree-item [worktree]
  (let [issue (or (:issue worktree) (get worktree "issue"))
        branch (or (:branch worktree) (get worktree "branch"))
        path (or (:path worktree) (get worktree "path"))
        id (str "worktree-" issue)]
    [:div.bg-white.border.border-gray-200.p-4.rounded-lg.mb-3.shadow-sm.hover:shadow-md.hover:bg-gray-50.transition-all
     {:key id}
      [:div.flex.items-center.justify-between.mb-2
       [:span.text-sm.font-medium.text-gray-500 (str "Issue #" issue)]
       [:span.px-2.py-1.text-xs.font-semibold.rounded-full.bg-blue-100.text-blue-800
        "Worktree"]]
      [:div.text-lg.font-semibold.text-gray-900.mb-1 branch]
      [:div.text-sm.text-gray-600.mb-3 path]
      [:div.flex.gap-2
       [:button.bg-green-500.hover:bg-green-600.text-white.px-3.py-1.5.rounded-md.text-sm.font-medium.transition-colors.focus:outline-none.focus:ring-2.focus:ring-green-500.focus:ring-offset-2
        {:on-click #(js/alert (str "Open worktree: " path))} "Open"]
       [:button.bg-red-500.hover:bg-red-600.text-white.px-3.py-1.5.rounded-md.text-sm.font-medium.transition-colors.focus:outline-none.focus:ring-2.focus:ring-red-500.focus:ring-offset-2
        {:on-click #(js/alert (str "Remove worktree for issue #" issue))} "Remove"]]]))

(defn events-log []
  (let [evts (reverse (:events @S/!state))]
    [:div.mt-8
     [:h2.text-xl.font-bold.text-gray-900.mb-4 "Events"]
     [:div.bg-white.border.border-gray-200.rounded-lg.shadow-sm
      {:class ["overflow-hidden"]}
      [:div.bg-gray-50.px-4.py-3.border-b.border-gray-200
       [:div.flex.items-center.justify-between
        [:span.text-sm.font-medium.text-gray-700 "Event Log"]
        [:span.text-xs.text-gray-500 (str (count evts) " events")]]]
      [:div {:style {:max-height "300px" :overflow "auto"}}
       (if (seq evts)
         (for [[i e] (map-indexed vector evts)]
           ^{:key i}
           [:div.px-4.py-2.border-b.border-gray-100.last:border-b-0.hover:bg-gray-50
            [:pre.text-xs.font-mono.text-gray-700 (pr-str e)]])
         [:div.p-8.text-center
          [:div.text-3xl.mb-3 "📝"]
          [:p.text-gray-600.font-medium "No events yet."]
          [:p.text-sm.text-gray-400.mt-2 "Events will appear here as you interact with the application."]])]]]))

(defn issues-section [issues]
  [:div.flex.flex-col
   [:h2.text-xl.font-bold.text-gray-900.mb-4.flex-shrink-0 "Issues"]
   [:div.flex-1.overflow-y-auto.px-1
    (if (seq issues)
      (for [i issues] ^{:key (:id i)} [issue-item i])
      [:div.bg-white.border.border-gray-200.rounded-lg.p-8.text-center.shadow-sm
       [:div.text-4xl.mb-3 "📋"]
       [:p.text-gray-600.font-medium "No issues loaded."]
       [:p.text-sm.text-gray-400.mt-2 "Issues will appear here once connected to GitHub."]])]])

(defn prs-section [prs]
  [:div.flex.flex-col
   [:h2.text-xl.font-bold.text-gray-900.mb-4.flex-shrink-0 "Pull Requests"]
   [:div.flex-1.overflow-y-auto.px-1
    (if (and prs (pos? (count prs)))
      (for [p prs] ^{:key (:id p)} [pr-item p])
      [:div.bg-white.border.border-gray-200.rounded-lg.p-8.text-center.shadow-sm
       [:div.text-4xl.mb-3 "🔄"]
       [:p.text-gray-600.font-medium "No PRs loaded."]
       [:p.text-sm.text-gray-400.mt-2 "Pull requests will appear here once connected to GitHub."]])]])

(defn worktrees-section [worktrees worktree-config]
  [:div.mt-8.flex.flex-col.flex-shrink-0
   [:div.flex.items-center.justify-between.mb-4
    [:h2.text-xl.font-bold.text-gray-900 "Worktrees"]
    [:div.flex.items-center.gap-2
     [:span.text-sm.text-gray-600 "Base folder:"]
     [:span.px-2.py-1.bg-blue-100.text-blue-800.text-xs.font-medium.rounded-full
      (:baseDir worktree-config)]]]
   [:div.max-h-48.overflow-y-auto.px-1
    (if (and worktrees (pos? (count worktrees)))
      (for [w worktrees] ^{:key (:issue w)} [worktree-item w])
      [:div.bg-white.border.border-gray-200.rounded-lg.p-8.text-center.shadow-sm
       [:div.text-4xl.mb-3 "🌳"]
       [:p.text-gray-600.font-medium "No worktrees created."]
       [:p.text-sm.text-gray-400.mt-2 "Worktrees will appear here when you create them for issues."]])]])

(defn main-layout [issues prs worktrees worktree-config connected? repo]
  [:div.h-screen.bg-gray-50.flex.flex-col
   [:header.bg-white.shadow-sm.border-b.border-gray-200.flex-shrink-0
    [:div.max-w-7xl.mx-auto.px-4.py-6
     [:div.flex.items-center.justify-between
      [:div
       [:h1.text-3xl.font-bold.text-gray-900 "Opencode Reactant"]
       [:div.mt-1.flex.items-center.gap-4
        [:span.text-sm.text-gray-600 (str "Repo: " repo)]
        [:div.flex.items-center.gap-2
         [:div.w-2.h-2.rounded-full {:class (if connected? "bg-green-500" "bg-red-500")}]
         [:span.text-sm.font-medium (if connected? "text-green-600" "text-red-600")
          (if connected? "Connected" "Disconnected")]]]]]]
   [:main.max-w-7xl.mx-auto.px-4.py-8.flex-1.overflow-hidden
    [:div.h-full.grid.grid-cols-1.lg:grid-cols-2.gap-8
     [issues-section issues]
     [prs-section prs]]
    [worktrees-section worktrees worktree-config]
    [events-log]]])