// Compiled by ClojureScript 1.9.908 {}
goog.provide('guildsman.cytoscape');
goog.require('cljs.core');
goog.require('re_frame.core');
goog.require('reagent.core');
goog.require('re_com.core');
guildsman.cytoscape.c1 = cljs.core.volatile_BANG_.call(null,null);
guildsman.cytoscape.a1 = cljs.core.atom.call(null,null);
guildsman.cytoscape.last_node_click = cljs.core.volatile_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,(0)], null));
guildsman.cytoscape.now_ts = (function guildsman$cytoscape$now_ts(){
return (new Date()).getTime();
});
guildsman.cytoscape.on_click_node = (function guildsman$cytoscape$on_click_node(xc_api,evt_js){
guildsman.cytoscape.evt_js1 = evt_js;

var map__22080 = cljs.core.js__GT_clj.call(null,evt_js);
var map__22080__$1 = ((((!((map__22080 == null)))?((((map__22080.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__22080.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__22080):map__22080);
var target = cljs.core.get.call(null,map__22080__$1,"target");
var vec__22081 = cljs.core.deref.call(null,guildsman.cytoscape.last_node_click);
var last_node = cljs.core.nth.call(null,vec__22081,(0),null);
var last_ts = cljs.core.nth.call(null,vec__22081,(1),null);
if(cljs.core._EQ_.call(null,last_node,target)){
var now_22085 = guildsman.cytoscape.now_ts.call(null);
cljs.core.println.call(null,(now_22085 - last_ts));

if(((now_22085 - last_ts) < (750))){
if(cljs.core.truth_(xc_api.isExpandable(target))){
xc_api.expand(target);
} else {
if(cljs.core.truth_(xc_api.isCollapsible(target))){
xc_api.collapse(target);
} else {
}
}
} else {
cljs.core.println.call(null,"single same");
}
} else {
cljs.core.println.call(null,"different");
}

cljs.core.vreset_BANG_.call(null,guildsman.cytoscape.last_node_click,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [target,guildsman.cytoscape.now_ts.call(null)], null));

return re_frame.core.dispatch.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"node-select","node-select",-1853167377),target.id()], null));
});
guildsman.cytoscape.setup_cyto = (function guildsman$cytoscape$setup_cyto(cy){
cljs.core.println.call(null,"START setup-cyto");

var xc_api = cy.expandCollapse(cljs.core.clj__GT_js.call(null,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"layoutBy","layoutBy",-227310270),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"name","name",1843675177),"dagre",new cljs.core.Keyword(null,"nodeSep","nodeSep",351136319),(600),new cljs.core.Keyword(null,"rankSep","rankSep",-1291571280),(100)], null),new cljs.core.Keyword(null,"fisheye","fisheye",-967078836),false,new cljs.core.Keyword(null,"animate","animate",1850194573),true,new cljs.core.Keyword(null,"undoable","undoable",303475882),false,new cljs.core.Keyword(null,"cueEnabled","cueEnabled",-709720798),false], null)));
xc_api.collapseAll();

cy.on("tap","node",cljs.core.partial.call(null,guildsman.cytoscape.on_click_node,xc_api));

return cljs.core.println.call(null,"DONE setup-cyto");
});
guildsman.cytoscape.cyto_state__GT_cyto_gen_map = (function guildsman$cytoscape$cyto_state__GT_cyto_gen_map(p__22086){
var map__22087 = p__22086;
var map__22087__$1 = ((((!((map__22087 == null)))?((((map__22087.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__22087.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__22087):map__22087);
var id = cljs.core.get.call(null,map__22087__$1,new cljs.core.Keyword(null,"id","id",-1388402092));
var value = cljs.core.get.call(null,map__22087__$1,new cljs.core.Keyword(null,"value","value",305978217));
cljs.core.println.call(null,"cyto-state->cyto-gen-map");

cljs.core.println.call(null,id);

return cljs.core.clj__GT_js.call(null,cljs.core.merge.call(null,value,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"container","container",-1736937707),document.getElementById(id)], null)));
});
guildsman.cytoscape.gen_cyto = (function guildsman$cytoscape$gen_cyto(state_SINGLEQUOTE_){
cljs.core.println.call(null,"gen-cyto");

var c = cytoscape(guildsman.cytoscape.cyto_state__GT_cyto_gen_map.call(null,state_SINGLEQUOTE_));
cljs.core.vreset_BANG_.call(null,guildsman.cytoscape.c1,c);

cljs.core.println.call(null,"gen-cyto POST vreset");

return c;
});
guildsman.cytoscape.dist = (function guildsman$cytoscape$dist(x1,y1,x2,y2){
var dx = (x2 - x1);
var dy = (y2 - y1);
return Math.sqrt(((dy * dy) + (dx * dx)));
});
guildsman.cytoscape.steeper_QMARK_ = (function guildsman$cytoscape$steeper_QMARK_(x1,y1,x2,y2,x3,y3){
return (((x1 - x3) * (y1 - y2)) < ((x1 - x2) * (y1 - y3)));
});
guildsman.cytoscape.inside_box_QMARK_ = (function guildsman$cytoscape$inside_box_QMARK_(x1,y1,x2,y2,xp,yp){
return ((((x1 < xp)) && ((xp < x2))) || (((x1 > xp)) && ((xp > x2)))) && ((((y1 < yp)) && ((yp < y2))) || (((y1 > yp)) && ((yp > y2))));
});
guildsman.cytoscape.find_intersection = (function guildsman$cytoscape$find_intersection(x1,y1,x2,y2,x3,y3){
var dx = (x2 - x1);
var dy = (y2 - y1);
var k = (((dy * (x3 - x1)) - (dx * (y3 - y1))) / ((dy * dy) + (dx * dx)));
var x4 = (x3 - (k * dy));
var y4 = (y3 + (k * dx));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x4,y4], null);
});
guildsman.cytoscape.rel_coords = (function guildsman$cytoscape$rel_coords(x1,y1,x2,y2,x3,y3){
var vec__22089 = guildsman.cytoscape.find_intersection.call(null,x1,y1,x2,y2,x3,y3);
var x4 = cljs.core.nth.call(null,vec__22089,(0),null);
var y4 = cljs.core.nth.call(null,vec__22089,(1),null);
var d12 = guildsman.cytoscape.dist.call(null,x1,y1,x2,y2);
var d14 = guildsman.cytoscape.dist.call(null,x1,y1,x4,y4);
var d34 = guildsman.cytoscape.dist.call(null,x3,y3,x4,y4);
var st = (cljs.core.truth_(guildsman.cytoscape.steeper_QMARK_.call(null,x1,y1,x2,y2,x3,y3))?(1):(-1));
if(cljs.core.truth_(guildsman.cytoscape.inside_box_QMARK_.call(null,x1,y1,x2,y2,x4,y4))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(d34 * st),(d14 / d12)], null);
} else {
return null;
}
});
guildsman.cytoscape.js__GT_xy = (function guildsman$cytoscape$js__GT_xy(xy){
return cljs.core.juxt.call(null,(function (p1__22092_SHARP_){
return cljs.core.get.call(null,p1__22092_SHARP_,"x");
}),(function (p1__22093_SHARP_){
return cljs.core.get.call(null,p1__22093_SHARP_,"y");
})).call(null,cljs.core.js__GT_clj.call(null,xy));
});
guildsman.cytoscape.node__GT_xy = (function guildsman$cytoscape$node__GT_xy(n){
return guildsman.cytoscape.js__GT_xy.call(null,n.position());
});
guildsman.cytoscape.manhattan = (function guildsman$cytoscape$manhattan(x1,y1,x2,y2){
return (Math.abs((x1 - x2)) + Math.abs((y1 - y2)));
});
guildsman.cytoscape.p = (function guildsman$cytoscape$p(x){
return null;

});
guildsman.cytoscape.find_nearbys = (function guildsman$cytoscape$find_nearbys(x1,y1,x2,y2){
return cljs.core.keep.call(null,(function (n){
var vec__22094 = guildsman.cytoscape.node__GT_xy.call(null,n);
var xp = cljs.core.nth.call(null,vec__22094,(0),null);
var yp = cljs.core.nth.call(null,vec__22094,(1),null);
guildsman.cytoscape.p.call(null,"------");

var temp__6738__auto__ = guildsman.cytoscape.rel_coords.call(null,x1,y1,x2,y2,xp,yp);
if(cljs.core.truth_(temp__6738__auto__)){
var pc = temp__6738__auto__;
guildsman.cytoscape.p.call(null,pc);

guildsman.cytoscape.p.call(null,"------");

return pc;
} else {
return null;
}
}),cljs.core.deref.call(null,guildsman.cytoscape.c1).$("node").toArray());
});
guildsman.cytoscape.near_edge_QMARK_ = (function guildsman$cytoscape$near_edge_QMARK_(p__22097){
var vec__22098 = p__22097;
var xp = cljs.core.nth.call(null,vec__22098,(0),null);
var yp = cljs.core.nth.call(null,vec__22098,(1),null);
return ((-50.0 < xp)) && ((xp < 50.0));
});
guildsman.cytoscape.mk_ctrl_point = (function guildsman$cytoscape$mk_ctrl_point(p__22101){
var vec__22102 = p__22101;
var x = cljs.core.nth.call(null,vec__22102,(0),null);
var y = cljs.core.nth.call(null,vec__22102,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(((x <= (0)))?((50) + x):(x - (50))),y], null);
});
guildsman.cytoscape.mk_ctrl_styles = (function guildsman$cytoscape$mk_ctrl_styles(ps){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [clojure.string.join.call(null," ",cljs.core.map.call(null,cljs.core.str,cljs.core.map.call(null,cljs.core.first,ps))),clojure.string.join.call(null," ",cljs.core.map.call(null,cljs.core.str,cljs.core.map.call(null,cljs.core.second,ps)))], null);
});
guildsman.cytoscape.route_edge = (function guildsman$cytoscape$route_edge(edge){
var vec__22105 = guildsman.cytoscape.js__GT_xy.call(null,edge.sourceEndpoint());
var sx = cljs.core.nth.call(null,vec__22105,(0),null);
var sy = cljs.core.nth.call(null,vec__22105,(1),null);
var vec__22108 = guildsman.cytoscape.js__GT_xy.call(null,edge.targetEndpoint());
var dx = cljs.core.nth.call(null,vec__22108,(0),null);
var dy = cljs.core.nth.call(null,vec__22108,(1),null);
var vec__22111 = guildsman.cytoscape.mk_ctrl_styles.call(null,cljs.core.sort_by.call(null,cljs.core.second,cljs.core.map.call(null,guildsman.cytoscape.mk_ctrl_point,cljs.core.filter.call(null,guildsman.cytoscape.near_edge_QMARK_,guildsman.cytoscape.find_nearbys.call(null,sx,sy,dx,dy)))));
var cpd = cljs.core.nth.call(null,vec__22111,(0),null);
var cpw = cljs.core.nth.call(null,vec__22111,(1),null);
guildsman.cytoscape.p.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cpd,cpw], null));

guildsman.cytoscape.p.call(null,"===========");

return edge.style("controlPointDistances",cpd).style("controlPointWeights",cpw);
});
guildsman.cytoscape.route_all_edges = (function guildsman$cytoscape$route_all_edges(){
return cljs.core.deref.call(null,guildsman.cytoscape.c1).$("edge").map(guildsman.cytoscape.route_edge);
});
guildsman.cytoscape.cyto_comp_did_mount = (function guildsman$cytoscape$cyto_comp_did_mount(state,this$){
cljs.core._vreset_BANG_.call(null,state,cljs.core.assoc.call(null,cljs.core._deref.call(null,state),new cljs.core.Keyword(null,"instance","instance",-2121349050),guildsman.cytoscape.gen_cyto.call(null,cljs.core.deref.call(null,state))));

return guildsman.cytoscape.setup_cyto.call(null,new cljs.core.Keyword(null,"instance","instance",-2121349050).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,state)));
});
guildsman.cytoscape.cyto_reagent_render = (function guildsman$cytoscape$cyto_reagent_render(state,value){
var map__22114 = cljs.core.deref.call(null,state);
var map__22114__$1 = ((((!((map__22114 == null)))?((((map__22114.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__22114.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__22114):map__22114);
var id = cljs.core.get.call(null,map__22114__$1,new cljs.core.Keyword(null,"id","id",-1388402092));
cljs.core.println.call(null,"cyto-reagent-render");

cljs.core.println.call(null,id);

return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"id","id",-1388402092),id,new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"width","width",-384071477),"100%",new cljs.core.Keyword(null,"height","height",1025178622),"100%"], null)], null)], null);
});
guildsman.cytoscape.cyto_comp_will_update = (function guildsman$cytoscape$cyto_comp_will_update(state,this$,p__22116){
var vec__22117 = p__22116;
var _ = cljs.core.nth.call(null,vec__22117,(0),null);
var new_value = cljs.core.nth.call(null,vec__22117,(1),null);
return cljs.core._vreset_BANG_.call(null,state,cljs.core.assoc.call(null,cljs.core._deref.call(null,state),new cljs.core.Keyword(null,"value","value",305978217),new_value));
});
guildsman.cytoscape.cyto_comp_did_update = (function guildsman$cytoscape$cyto_comp_did_update(state,this$,p__22120){
var vec__22121 = p__22120;
var _ = cljs.core.nth.call(null,vec__22121,(0),null);
var map__22124 = cljs.core.nth.call(null,vec__22121,(1),null);
var map__22124__$1 = ((((!((map__22124 == null)))?((((map__22124.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__22124.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__22124):map__22124);
var old_val = map__22124__$1;
var config = cljs.core.get.call(null,map__22124__$1,new cljs.core.Keyword(null,"config","config",994861415));
var data = cljs.core.get.call(null,map__22124__$1,new cljs.core.Keyword(null,"data","data",-232669377));
var highlighted = cljs.core.get.call(null,map__22124__$1,new cljs.core.Keyword(null,"highlighted","highlighted",1723498733));
var selected = cljs.core.get.call(null,map__22124__$1,new cljs.core.Keyword(null,"selected","selected",574897764));
var map__22126 = cljs.core.deref.call(null,state);
var map__22126__$1 = ((((!((map__22126 == null)))?((((map__22126.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__22126.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__22126):map__22126);
var state_SINGLEQUOTE_ = map__22126__$1;
var value = cljs.core.get.call(null,map__22126__$1,new cljs.core.Keyword(null,"value","value",305978217));
if(cljs.core.not_EQ_.call(null,value,old_val)){
cljs.core.println.call(null,"generate");

cljs.core._vreset_BANG_.call(null,state,cljs.core.assoc.call(null,cljs.core._deref.call(null,state),new cljs.core.Keyword(null,"instance","instance",-2121349050),guildsman.cytoscape.gen_cyto.call(null,state_SINGLEQUOTE_)));

return guildsman.cytoscape.setup_cyto.call(null,new cljs.core.Keyword(null,"instance","instance",-2121349050).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,state)));
} else {
return null;
}
});
guildsman.cytoscape.cytoscape = (function guildsman$cytoscape$cytoscape(value){
cljs.core.println.call(null,"cyto/cyto");

var state = cljs.core.volatile_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"id","id",-1388402092),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.gensym.call(null,"cyto"))].join(''),new cljs.core.Keyword(null,"value","value",305978217),value], null));
return reagent.core.create_class.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"component-did-mount","component-did-mount",-1126910518),cljs.core.partial.call(null,guildsman.cytoscape.cyto_comp_did_mount,state),new cljs.core.Keyword(null,"component-did-update","component-did-update",-1468549173),cljs.core.partial.call(null,guildsman.cytoscape.cyto_comp_did_update,state),new cljs.core.Keyword(null,"component-will-update","component-will-update",335247566),cljs.core.partial.call(null,guildsman.cytoscape.cyto_comp_will_update,state),new cljs.core.Keyword(null,"reagent-render","reagent-render",-985383853),cljs.core.partial.call(null,guildsman.cytoscape.cyto_reagent_render,state)], null));
});

//# sourceMappingURL=cytoscape.js.map?rel=1506917874065
