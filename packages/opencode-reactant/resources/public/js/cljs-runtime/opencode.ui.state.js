goog.provide('opencode.ui.state');
if((typeof opencode !== 'undefined') && (typeof opencode.ui !== 'undefined') && (typeof opencode.ui.state !== 'undefined') && (typeof opencode.ui.state._BANG_state !== 'undefined')){
} else {
opencode.ui.state._BANG_state = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"issues","issues",1989874693),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"prs","prs",1421189057),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"events","events",1792552201),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"connected?","connected?",-1197551387),false,new cljs.core.Keyword(null,"repo","repo",-1999060679),"riatzukiza/promethean"], null));
}
opencode.ui.state.push_event_BANG_ = (function opencode$ui$state$push_event_BANG_(e){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(opencode.ui.state._BANG_state,cljs.core.update,new cljs.core.Keyword(null,"events","events",1792552201),(function (p1__9476_SHARP_){
return cljs.core.take_last((500),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(p1__9476_SHARP_,e));
}));
});

//# sourceMappingURL=opencode.ui.state.js.map
