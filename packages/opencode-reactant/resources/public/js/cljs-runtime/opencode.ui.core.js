goog.provide('opencode.ui.core');
opencode.ui.core.connect_ws_BANG_ = (function opencode$ui$core$connect_ws_BANG_(){
var ws_6242 = (new WebSocket([((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("https:",location.protocol))?"wss://":"ws://"),cljs.core.str.cljs$core$IFn$_invoke$arity$1(location.host),"/events"].join('')));
(ws_6242.onopen = (function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(opencode.ui.state._BANG_state,cljs.core.assoc,new cljs.core.Keyword(null,"connected?","connected?",-1197551387),true);
}));

(ws_6242.onclose = (function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(opencode.ui.state._BANG_state,cljs.core.assoc,new cljs.core.Keyword(null,"connected?","connected?",-1197551387),false);
}));

(ws_6242.onmessage = (function (m){
var e = JSON.parse(m.data);
var e__$1 = cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$variadic(e,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true], 0));
opencode.ui.state.push_event_BANG_(e__$1);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(e__$1),":refresh/gh")){
opencode.ui.github.fetch_issues_BANG_();

return opencode.ui.github.fetch_prs_BANG_();
} else {
return null;
}
}));

return null;
});
opencode.ui.core.issue_item = (function opencode$ui$core$issue_item(p__6219){
var map__6220 = p__6219;
var map__6220__$1 = cljs.core.__destructure_map(map__6220);
var number = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6220__$1,new cljs.core.Keyword(null,"number","number",1570378438));
var title = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6220__$1,new cljs.core.Keyword(null,"title","title",636505583));
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6220__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.border.p-2.rounded.mb-2","div.border.p-2.rounded.mb-2",-1653489104),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.text-sm","div.text-sm",1753784969),["#",cljs.core.str.cljs$core$IFn$_invoke$arity$1(number)," \u2022 ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(state)].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.font-bold","div.font-bold",2116623818),title], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.mt-2.flex.gap-2","div.mt-2.flex.gap-2",2006331968),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return opencode.ui.github.create_worktree_BANG_(number);
})], null),"Create worktree"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return opencode.ui.github.open_pr_BANG_(number);
})], null),"Open PR"], null)], null)], null);
});
opencode.ui.core.pr_item = (function opencode$ui$core$pr_item(p__6221){
var map__6222 = p__6221;
var map__6222__$1 = cljs.core.__destructure_map(map__6222);
var number = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6222__$1,new cljs.core.Keyword(null,"number","number",1570378438));
var title = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6222__$1,new cljs.core.Keyword(null,"title","title",636505583));
var state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6222__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.border.p-2.rounded.mb-2","div.border.p-2.rounded.mb-2",-1653489104),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.text-sm","div.text-sm",1753784969),["PR #",cljs.core.str.cljs$core$IFn$_invoke$arity$1(number)," \u2022 ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(state)].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.font-bold","div.font-bold",2116623818),title], null)], null);
});
opencode.ui.core.events_log = (function opencode$ui$core$events_log(){
var evts = cljs.core.reverse(new cljs.core.Keyword(null,"events","events",1792552201).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(opencode.ui.state._BANG_state)));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.mt-4","div.mt-4",-1531088843),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"Events"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"max-height","max-height",-612563804),"300px",new cljs.core.Keyword(null,"overflow","overflow",2058931880),"auto"], null)], null),(function (){var iter__5480__auto__ = (function opencode$ui$core$events_log_$_iter__6223(s__6224){
return (new cljs.core.LazySeq(null,(function (){
var s__6224__$1 = s__6224;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__6224__$1);
if(temp__5804__auto__){
var s__6224__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__6224__$2)){
var c__5478__auto__ = cljs.core.chunk_first(s__6224__$2);
var size__5479__auto__ = cljs.core.count(c__5478__auto__);
var b__6226 = cljs.core.chunk_buffer(size__5479__auto__);
if((function (){var i__6225 = (0);
while(true){
if((i__6225 < size__5479__auto__)){
var vec__6227 = cljs.core._nth(c__5478__auto__,i__6225);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6227,(0),null);
var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6227,(1),null);
cljs.core.chunk_append(b__6226,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pre.text-xs","pre.text-xs",1598431338),cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([e], 0))], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),i], null)));

var G__6243 = (i__6225 + (1));
i__6225 = G__6243;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__6226),opencode$ui$core$events_log_$_iter__6223(cljs.core.chunk_rest(s__6224__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__6226),null);
}
} else {
var vec__6230 = cljs.core.first(s__6224__$2);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6230,(0),null);
var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6230,(1),null);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pre.text-xs","pre.text-xs",1598431338),cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([e], 0))], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),i], null)),opencode$ui$core$events_log_$_iter__6223(cljs.core.rest(s__6224__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5480__auto__(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,evts));
})()], null)], null);
});
opencode.ui.core.app = (function opencode$ui$core$app(){
var map__6233 = cljs.core.deref(opencode.ui.state._BANG_state);
var map__6233__$1 = cljs.core.__destructure_map(map__6233);
var issues = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6233__$1,new cljs.core.Keyword(null,"issues","issues",1989874693));
var prs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6233__$1,new cljs.core.Keyword(null,"prs","prs",1421189057));
var connected_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6233__$1,new cljs.core.Keyword(null,"connected?","connected?",-1197551387));
var repo = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__6233__$1,new cljs.core.Keyword(null,"repo","repo",-1999060679));
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.p-4","div.p-4",-165933168),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),"Opencode Reactant"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.text-sm","div.text-sm",1753784969),["Repo: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(repo)," \u2022 WS ",(cljs.core.truth_(connected_QMARK_)?"connected":"disconnected")].join('')], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.grid.grid-cols-2.gap-4.mt-4","div.grid.grid-cols-2.gap-4.mt-4",292896246),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"Issues"], null),((cljs.core.seq(issues))?(function (){var iter__5480__auto__ = (function opencode$ui$core$app_$_iter__6234(s__6235){
return (new cljs.core.LazySeq(null,(function (){
var s__6235__$1 = s__6235;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__6235__$1);
if(temp__5804__auto__){
var s__6235__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__6235__$2)){
var c__5478__auto__ = cljs.core.chunk_first(s__6235__$2);
var size__5479__auto__ = cljs.core.count(c__5478__auto__);
var b__6237 = cljs.core.chunk_buffer(size__5479__auto__);
if((function (){var i__6236 = (0);
while(true){
if((i__6236 < size__5479__auto__)){
var i = cljs.core._nth(c__5478__auto__,i__6236);
cljs.core.chunk_append(b__6237,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [opencode.ui.core.issue_item,i], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(i)], null)));

var G__6244 = (i__6236 + (1));
i__6236 = G__6244;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__6237),opencode$ui$core$app_$_iter__6234(cljs.core.chunk_rest(s__6235__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__6237),null);
}
} else {
var i = cljs.core.first(s__6235__$2);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [opencode.ui.core.issue_item,i], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(i)], null)),opencode$ui$core$app_$_iter__6234(cljs.core.rest(s__6235__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5480__auto__(issues);
})():new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.text-sm.opacity-70","div.text-sm.opacity-70",630172022),"No issues loaded."], null))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"Pull Requests"], null),((cljs.core.seq(prs))?(function (){var iter__5480__auto__ = (function opencode$ui$core$app_$_iter__6238(s__6239){
return (new cljs.core.LazySeq(null,(function (){
var s__6239__$1 = s__6239;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__6239__$1);
if(temp__5804__auto__){
var s__6239__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__6239__$2)){
var c__5478__auto__ = cljs.core.chunk_first(s__6239__$2);
var size__5479__auto__ = cljs.core.count(c__5478__auto__);
var b__6241 = cljs.core.chunk_buffer(size__5479__auto__);
if((function (){var i__6240 = (0);
while(true){
if((i__6240 < size__5479__auto__)){
var p = cljs.core._nth(c__5478__auto__,i__6240);
cljs.core.chunk_append(b__6241,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [opencode.ui.core.pr_item,p], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(p)], null)));

var G__6245 = (i__6240 + (1));
i__6240 = G__6245;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__6241),opencode$ui$core$app_$_iter__6238(cljs.core.chunk_rest(s__6239__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__6241),null);
}
} else {
var p = cljs.core.first(s__6239__$2);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [opencode.ui.core.pr_item,p], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(p)], null)),opencode$ui$core$app_$_iter__6238(cljs.core.rest(s__6239__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5480__auto__(prs);
})():new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.text-sm.opacity-70","div.text-sm.opacity-70",630172022),"No PRs loaded."], null))], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [opencode.ui.core.events_log], null)], null);
});
opencode.ui.core.init = (function opencode$ui$core$init(){
opencode.ui.core.connect_ws_BANG_();

opencode.ui.github.fetch_issues_BANG_();

opencode.ui.github.fetch_prs_BANG_();

return reagent.core.render.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [opencode.ui.core.app], null),document.getElementById("app")], 0));
});

//# sourceMappingURL=opencode.ui.core.js.map
