goog.provide('opencode.ui.github');
opencode.ui.github.base = "/api";
opencode.ui.github.fetch_issues_BANG_ = (function opencode$ui$github$fetch_issues_BANG_(){
var repo = new cljs.core.Keyword(null,"repo","repo",-1999060679).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(opencode.ui.state._BANG_state));
return ajax.core.GET.cljs$core$IFn$_invoke$arity$variadic([opencode.ui.github.base,"/issues?repo=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(repo)].join(''),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"handler","handler",-195596612),(function (p1__9502_SHARP_){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(opencode.ui.state._BANG_state,cljs.core.assoc,new cljs.core.Keyword(null,"issues","issues",1989874693),p1__9502_SHARP_);
}),new cljs.core.Keyword(null,"error-handler","error-handler",-484945776),(function (p1__9503_SHARP_){
return console.error("issues",p1__9503_SHARP_);
})], null)], 0));
});
opencode.ui.github.fetch_prs_BANG_ = (function opencode$ui$github$fetch_prs_BANG_(){
var repo = new cljs.core.Keyword(null,"repo","repo",-1999060679).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(opencode.ui.state._BANG_state));
return ajax.core.GET.cljs$core$IFn$_invoke$arity$variadic([opencode.ui.github.base,"/prs?repo=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(repo)].join(''),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"handler","handler",-195596612),(function (p1__9511_SHARP_){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(opencode.ui.state._BANG_state,cljs.core.assoc,new cljs.core.Keyword(null,"prs","prs",1421189057),p1__9511_SHARP_);
}),new cljs.core.Keyword(null,"error-handler","error-handler",-484945776),(function (p1__9512_SHARP_){
return console.error("prs",p1__9512_SHARP_);
})], null)], 0));
});
opencode.ui.github.create_worktree_BANG_ = (function opencode$ui$github$create_worktree_BANG_(issue_number){
var repo = new cljs.core.Keyword(null,"repo","repo",-1999060679).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(opencode.ui.state._BANG_state));
return ajax.core.POST.cljs$core$IFn$_invoke$arity$variadic([opencode.ui.github.base,"/worktrees"].join(''),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"repo","repo",-1999060679),repo,new cljs.core.Keyword(null,"issue","issue",1725456421),issue_number], null),new cljs.core.Keyword(null,"format","format",-1306924766),new cljs.core.Keyword(null,"json","json",1279968570),new cljs.core.Keyword(null,"handler","handler",-195596612),(function (p1__9520_SHARP_){
return opencode.ui.state.push_event_BANG_(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ui","command-ok","ui/command-ok",1582654050),new cljs.core.Keyword(null,"cmd","cmd",-302931143),new cljs.core.Keyword(null,"worktree","worktree",-187110437),new cljs.core.Keyword(null,"data","data",-232669377),p1__9520_SHARP_], null));
}),new cljs.core.Keyword(null,"error-handler","error-handler",-484945776),(function (p1__9521_SHARP_){
return opencode.ui.state.push_event_BANG_(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ui","command-error","ui/command-error",-875658592),new cljs.core.Keyword(null,"cmd","cmd",-302931143),new cljs.core.Keyword(null,"worktree","worktree",-187110437),new cljs.core.Keyword(null,"err","err",-2089457205),p1__9521_SHARP_], null));
})], null)], 0));
});
opencode.ui.github.open_pr_BANG_ = (function opencode$ui$github$open_pr_BANG_(issue_number){
var repo = new cljs.core.Keyword(null,"repo","repo",-1999060679).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(opencode.ui.state._BANG_state));
return ajax.core.POST.cljs$core$IFn$_invoke$arity$variadic([opencode.ui.github.base,"/pulls"].join(''),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"repo","repo",-1999060679),repo,new cljs.core.Keyword(null,"issue","issue",1725456421),issue_number], null),new cljs.core.Keyword(null,"format","format",-1306924766),new cljs.core.Keyword(null,"json","json",1279968570),new cljs.core.Keyword(null,"handler","handler",-195596612),(function (p1__9523_SHARP_){
return opencode.ui.state.push_event_BANG_(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ui","command-ok","ui/command-ok",1582654050),new cljs.core.Keyword(null,"cmd","cmd",-302931143),new cljs.core.Keyword(null,"pr-open","pr-open",580773068),new cljs.core.Keyword(null,"data","data",-232669377),p1__9523_SHARP_], null));
}),new cljs.core.Keyword(null,"error-handler","error-handler",-484945776),(function (p1__9524_SHARP_){
return opencode.ui.state.push_event_BANG_(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ui","command-error","ui/command-error",-875658592),new cljs.core.Keyword(null,"cmd","cmd",-302931143),new cljs.core.Keyword(null,"pr-open","pr-open",580773068),new cljs.core.Keyword(null,"err","err",-2089457205),p1__9524_SHARP_], null));
})], null)], 0));
});
opencode.ui.github.reply_comment_BANG_ = (function opencode$ui$github$reply_comment_BANG_(p__9527){
var map__9529 = p__9527;
var map__9529__$1 = cljs.core.__destructure_map(map__9529);
var repo = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9529__$1,new cljs.core.Keyword(null,"repo","repo",-1999060679));
var pr_number = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9529__$1,new cljs.core.Keyword(null,"pr-number","pr-number",386555410));
var body = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__9529__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
return ajax.core.POST.cljs$core$IFn$_invoke$arity$variadic([opencode.ui.github.base,"/pr-comment"].join(''),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"repo","repo",-1999060679),repo,new cljs.core.Keyword(null,"pr","pr",-583594500),pr_number,new cljs.core.Keyword(null,"body","body",-2049205669),body], null),new cljs.core.Keyword(null,"format","format",-1306924766),new cljs.core.Keyword(null,"json","json",1279968570),new cljs.core.Keyword(null,"handler","handler",-195596612),(function (p1__9525_SHARP_){
return opencode.ui.state.push_event_BANG_(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ui","command-ok","ui/command-ok",1582654050),new cljs.core.Keyword(null,"cmd","cmd",-302931143),new cljs.core.Keyword(null,"pr-comment","pr-comment",-1518800787),new cljs.core.Keyword(null,"data","data",-232669377),p1__9525_SHARP_], null));
}),new cljs.core.Keyword(null,"error-handler","error-handler",-484945776),(function (p1__9526_SHARP_){
return opencode.ui.state.push_event_BANG_(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ui","command-error","ui/command-error",-875658592),new cljs.core.Keyword(null,"cmd","cmd",-302931143),new cljs.core.Keyword(null,"pr-comment","pr-comment",-1518800787),new cljs.core.Keyword(null,"err","err",-2089457205),p1__9526_SHARP_], null));
})], null)], 0));
});

//# sourceMappingURL=opencode.ui.github.js.map
