/* ########################################
GLOBAL ASSETS RELEASE v4.4.3
BUILD DATE: 20090120
COPYRIGHT SUN MICROSYSTEMS INC. 2008 & 2009
CONTACT US AT http://www.sun.com/secure/contact/cer.jsp?id=1073e17d-8d6c-43f6-b7e8-cf210cc89ba9 WITH ANY QUESTIONS
######################################## */

window.reg=(function(){
var reg={};
reg.importAll=function(){
var _7f=[];
try{
reg.importSelectorAPI();
}
catch(err){
_7f.push(err.message);
}
try{
reg.importHelperFunctions();
}
catch(err){
_7f.push(err.message);
}
try{
reg.importEventFunctions();
}
catch(err){
_7f.push(err.message);
}
if(_7f.length>0){
throw new Error(_7f.join("\n"));
}
};
function globalError(_80){
return "reglib tried to add \""+_80+"\" to global namespace but \""+_80+"\" already existed.";
}
if(window.Node&&Node.prototype&&!Node.prototype.contains){
Node.prototype.contains=function(arg){
return !!(this.compareDocumentPosition(arg)&16);
};
}
var _82={leadSpace:new RegExp("^\\s+"),tagName:new RegExp("^([a-z_][a-z0-9_-]*)","i"),wildCard:new RegExp("^\\*([^=]|$)"),className:new RegExp("^(\\.([a-z0-9_-]+))","i"),id:new RegExp("^(#([a-z0-9_-]+))","i"),att:new RegExp("^(@([a-z0-9_-]+))","i"),matchType:new RegExp("(^\\^=)|(^\\$=)|(^\\*=)|(^~=)|(^\\|=)|(^=)"),spaceQuote:new RegExp("^\\s+['\"]")};
reg.Selector=function(_83){
var exp=_82;
this.items=[];
var _85=[];
var _86=0;
var _87=_83;
while(_83.length>0){
if(_86>100){
throw new Error("failed parsing '"+_87+"' stuck at '"+_83+"'");
}
var _88=false;
if(exp.leadSpace.test(_83)){
_83=_83.replace(exp.leadSpace,"");
_88=true;
}
var _89=exp.tagName.exec(_83);
if(_89){
if(_85.length>0&&_85[_85.length-1].name=="tag"){
_85.push({name:"descendant"});
}
_85.push({name:"tag",tagName:_89[1].toLowerCase()});
_83=_83.substring(_89[1].length);
_89=null;
continue;
}
if(exp.wildCard.test(_83)){
if(_85.length>0&&_85[_85.length-1].name=="tag"){
_85.push({name:"descendant"});
}
_85.push({name:"tag",tagName:"*"});
_83=_83.substring(1);
continue;
}
var _8a=exp.className.exec(_83);
var _8b=exp.id.exec(_83);
var _8c=exp.att.exec(_83);
if(_8a||_8b||_8c){
if(_88&&_85.length>0&&_85[_85.length-1].name=="tag"){
_85.push({name:"descendant"});
}
if(_85.length==0||_85[_85.length-1].name!="tag"){
_85.push({name:"tag",tagName:"*"});
}
var _8d=_85[_85.length-1];
if(_8a){
if(!_8d.classNames){
_8d.classNames=[_8a[2]];
}else{
_8d.classNames.push(_8a[2]);
}
_83=_83.substring(_8a[1].length);
_8a=null;
continue;
}
if(_8b){
_8d.id=_8b[2];
_83=_83.substring(_8b[1].length);
_8b=null;
continue;
}
if(_8c){
if(!_8d.attributes){
_8d.attributes=[{name:_8c[2]}];
}else{
_8d.attributes.push({name:_8c[2]});
}
_83=_83.substring(_8c[1].length);
_8c=null;
continue;
}
}
var _8e=exp.matchType.exec(_83);
if(_8e){
if(_8d&&_8d.attributes&&!_8d.attributes[_8d.attributes.length-1].value){
var _8f=_8d.attributes[_8d.attributes.length-1];
_8f.matchType=_8e[0];
_83=_83.substring(_8f.matchType.length);
if(_83.charAt(0)!="\""&&_83.charAt(0)!="'"){
if(exp.spaceQuote.test(_83)){
_83=_83.replace(exp.leadSpace,"");
}else{
throw new Error(_87+" is invalid, single or double quotes required around attribute values");
}
}
var q=_83.charAt(0);
var _91=_83.indexOf(q,1);
if(_91==-1){
throw new Error(_87+" is invalid, missing closing quote");
}
while(_83.charAt(_91-1)=="\\"){
_91=_83.indexOf(q,_91+1);
if(_91==-1){
throw new Error(_87+" is invalid, missing closing quote");
}
}
_8f.value=_83.substring(1,_91);
if("~="==_8f.matchType){
_8f.valuePatt=new RegExp("(^|\\s)"+_8f.value+"($|\\s)");
}else{
if("|="==_8f.matchType){
_8f.valuePatt=new RegExp("^"+_8f.value+"($|\\-)");
}
}
_83=_83.substring(_8f.value.length+2);
continue;
}else{
throw new Error(_87+" is invalid, "+_8e[0]+" appeared without preceding attribute identifier");
}
_8e=null;
}
if(_83.charAt(0)==">"){
_85.push({name:"child"});
_83=_83.substring(1);
continue;
}
if(_83.charAt(0)=="+"){
_85.push({name:"nextSib"});
_83=_83.substring(1);
continue;
}
if(_83.charAt(0)=="~"){
_85.push({name:"followingSib"});
_83=_83.substring(1);
continue;
}
if(_83.charAt(0)==","){
this.items.push(_85);
_85=[];
_83=_83.substring(1);
continue;
}
_86++;
}
this.items.push(_85);
this.selectorString=_87;
for(var a=0;a<this.items.length;a++){
var _85=this.items[a];
if(_85.length==0){
throw new Error("illegal structure: '"+_87+"' contains an empty set");
}
if(_85[0].name!="tag"){
throw new Error("illegal structure: '"+_87+"' contains a dangling relation");
}
if(_85[_85.length-1].name!="tag"){
throw new Error("illegal structure: '"+_87+"' contains a dangling relation");
}
for(var b=1;b<_85.length;b++){
if(_85[b].name!="tag"&&_85[b-1].name!="tag"){
throw new Error("illegal structure: '"+_87+"' contains doubled up relations");
}
}
}
};
function toQuerySelectorString(sel){
if(!sel.qss){
var _95=[];
for(var i=0;i<sel.items.length;i++){
var _97="";
var _98=sel.items[i];
for(var j=0;j<_98.length;j++){
var des=_98[j];
if(des.name=="tag"){
_97+=des.tagName;
if(des.classNames){
_97+="."+des.classNames.join(".");
}
if(des.id){
_97+="#"+des.id;
}
if(des.targeted){
_97+=":target";
}
if(des.attributes){
for(var k=0;k<des.attributes.length;k++){
_97+="["+des.attributes[k].name;
if(des.attributes[k].matchType){
_97+=des.attributes[k].matchType;
_97+="\""+des.attributes[k].value.replace(/"/,"\\\"")+"\"";
}
_97+="]";
}
}
}else{
if(des.name=="descendant"){
_97+=" ";
continue;
}else{
if(des.name=="child"){
_97+=" > ";
continue;
}else{
if(des.name=="followingSib"){
_97+=" ~ ";
continue;
}else{
if(des.name=="nextSib"){
_97+=" + ";
continue;
}
}
}
}
}
}
_95.push(_97);
}
sel.qss=_95.join(", ");
}
return sel.qss;
}
reg.Selector.prototype.matches=function(el){
if(!el){
throw new Error("no element provided");
}
if(el.nodeType!=1){
throw new Error(this.selectorString+" cannot be evaluated against element of type "+el.nodeType);
}
commas:
for(var a=0;a<this.items.length;a++){
var _9e=el;
var _9f=this.items[a];
for(var b=_9f.length-1;b>=0;b--){
var itm=_9f[b];
if(itm.name=="tag"){
if(!matchIt(_9e,itm)){
if(_9e&&b<_9f.length-1&&_9f[b+1].name=="descendant"){
_9e=_9e.parentNode;
b++;
continue;
}else{
if(_9e&&b<_9f.length-1&&_9f[b+1].name=="followingSib"){
_9e=_9e.previousSibling;
b++;
continue;
}else{
continue commas;
}
}
}
}else{
if(itm.name=="nextSib"){
_9e=previousElement(_9e);
}else{
if(itm.name=="followingSib"){
_9e=previousElement(_9e);
}else{
if(itm.name=="child"){
_9e=_9e.parentNode;
}else{
if(itm.name=="descendant"){
_9e=_9e.parentNode;
}
}
}
}
}
}
return true;
}
return false;
};
function matchIt(el,itm){
if(!el){
return false;
}
if(el.nodeName.toLowerCase()!=itm.tagName&&itm.tagName!="*"){
return false;
}
if(itm.classNames){
for(var i=0;i<itm.classNames.length;i++){
if(!hasClassName(el,itm.classNames[i])){
return false;
}
}
}
if(itm.id&&el.id!=itm.id){
return false;
}
if(itm.attributes){
for(var i=0;i<itm.attributes.length;i++){
var _a5=itm.attributes[i];
if(typeof el.hasAttribute!="undefined"){
if(!el.hasAttribute(_a5.name)){
return false;
}
var att=el.getAttribute(_a5.name);
}else{
if(el.nodeType!=1){
return false;
}
var att=el.getAttribute(_a5.name,2);
if(_a5.name=="class"){
att=el.className;
}else{
if(_a5.name=="for"){
att=el.htmlFor;
}
}
if(!att){
return false;
}
}
if(_a5.value){
if(_a5.matchType=="^="){
if(att.indexOf(_a5.value)!=0){
return false;
}
}else{
if(_a5.matchType=="*="){
if(att.indexOf(_a5.value)==-1){
return false;
}
}else{
if(_a5.matchType=="$="){
if(att.indexOf(_a5.value)!=att.length-_a5.value.length){
return false;
}
}else{
if(_a5.matchType=="="){
if(att!=_a5.value){
return false;
}
}else{
if("|="==_a5.matchType||"~="==_a5.matchType){
if(!_a5.valuePatt.test(att)){
return false;
}
}else{
if(!_a5.matchType){
throw new Error("illegal structure, parsed selector cannot have null or empty attribute match type");
}else{
throw new Error("illegal structure, parsed selector cannot have '"+itm.matchType+"' as an attribute match type");
}
}
}
}
}
}
}
}
}
return true;
}
function getTagNames(sel){
var _a8={};
for(var a=0;a<sel.items.length;a++){
_a8[sel.items[a][sel.items[a].length-1].tagName]=null;
}
var _aa=[];
for(var tag in _a8){
if(_a8.hasOwnProperty(tag)){
_aa.push(tag);
}
}
return _aa;
}
reg.importSelectorAPI=function(){
if(window.Selector){
throw new Error(globalError("Selector"));
}
window.Selector=reg.Selector;
};
var _ac={};
var _ad={};
function hasClassName(_ae,_af){
if(!_ac[_af]){
_ac[_af]=new RegExp("(^|\\s)"+_af+"($|\\s)");
}
return _ae.className&&_ac[_af].test(_ae.className);
}
function addClassName(_b0,_b1){
if(!hasClassName(_b0,_b1)){
_b0.className+=" "+_b1;
}
}
function removeClassName(_b2,_b3){
if(!_ac[_b3]){
_ac[_b3]=new RegExp("(^|\\s+)"+_b3+"($|\\s+)");
}
_b2.className=_b2.className.replace(_ac[_b3]," ");
}
function toggleClassName(_b4,_b5){
if(hasClassName(_b4,_b5)){
removeClassName(_b4,_b5);
}else{
addClassName(_b4,_b5);
}
}
function switchClassName(_b6,_b7,_b8){
if(_b7==_b8){
throw new Error("cName1 and cName2 both equal "+_b7);
}
var _b9=hasClassName(_b6,_b7);
var _ba=hasClassName(_b6,_b8);
if(_b9&&_ba){
removeClassName(_b6,_b8);
}else{
if(!_b9&&!_ba){
addClassName(_b6,_b7);
}else{
if(_b9){
removeClassName(_b6,_b7);
addClassName(_b6,_b8);
}else{
removeClassName(_b6,_b8);
addClassName(_b6,_b7);
}
}
}
}
function matchClassName(_bb,_bc){
var _bd=_bb.className.split(" ");
for(var a=0;a<_bd.length;a++){
var _bf=_bd[a].match(_bc);
if(_bf){
return _bf;
}
}
return null;
}
function elementMatchesSelector(_c0,_c1){
if(!_ad[_c1]){
_ad[_c1]=new reg.Selector(_c1);
}
return _ad[_c1].matches(_c0);
}
function previousElement(el){
var _c3=el.previousSibling;
while(_c3&&_c3.nodeType!=1){
_c3=_c3.previousSibling;
}
return _c3;
}
function nextElement(el){
var _c5=el.nextSibling;
while(_c5&&_c5.nodeType!=1){
_c5=_c5.nextSibling;
}
return _c5;
}
function innerWrap(el,_c7){
var _c8=el.childNodes;
while(_c8.length>0){
var _c9=_c8[0];
el.removeChild(_c9);
_c7.appendChild(_c9);
}
el.appendChild(_c7);
}
function outerWrap(el,_cb){
el.parentNode.insertBefore(_cb,el);
el.parentNode.removeChild(el);
_cb.appendChild(el);
}
function getParent(el,_cd){
var _ce=new reg.Selector(_cd);
while(el.parentNode){
el=el.parentNode;
if(el.nodeType==1&&_ce.matches(el)){
return el;
}
}
return null;
}
function insertAfter(_cf,_d0){
var _d1=_d0.nextSibling;
var _d2=_d0.parentNode;
if(_d1){
_d2.insertBefore(_cf,_d1);
}else{
_d2.appendChild(_cf);
}
}
function newElement(_d3,_d4,_d5){
if(_d3.indexOf(".")+_d3.indexOf("#")>-2){
var _d6=(_d3.indexOf(".")>-1)?_d3.replace(/^.*\.([^\.#]*).*$/,"$1"):"";
var id=(_d3.indexOf("#")>-1)?_d3.replace(/^.*#([^\.#]*).*$/,"$1"):"";
_d3=_d3.replace(/^([^\.#]*).*$/,"$1");
}
var e=document.createElement(_d3);
if(_d6){
e.className=_d6;
}
if(id){
e.id=id;
}
if(_d4){
for(var key in _d4){
if(!_d4.hasOwnProperty(key)){
continue;
}
if(key=="class"){
e.className=e.className?e.className+=" "+_d4[key]:_d4[key];
}else{
if(key=="for"){
e.htmlFor=_d4[key];
}else{
if(key.indexOf("on")==0){
e[key]=_d4[key];
}else{
e.setAttribute(key,_d4[key]);
}
}
}
}
}
if(_d5){
if(!(_d5 instanceof Array)){
_d5=[_d5];
}
for(var a=0;a<_d5.length;a++){
if(typeof _d5[a]=="string"){
e.appendChild(document.createTextNode(_d5[a]));
}else{
e.appendChild(_d5[a]);
}
}
}
if(_d3.toLowerCase()=="img"&&!e.alt){
e.alt="";
}
return e;
}
function elementText(el){
if(!el){
return "";
}
var _dc=el.childNodes;
var _dd="";
if(reg.matches(el,"img@alt,area@alt")){
_dd+=el.alt;
}else{
if(reg.matches(el,"input")){
_dd+=el.value;
}else{
for(var a=0;a<_dc.length;a++){
if(3==_dc[a].nodeType){
_dd+=_dc[a].data;
}else{
if(1==_dc[a].nodeType){
_dd+=elemText(_dc[a]);
}
}
}
}
}
return _dd;
}
function getElementById(id){
return document.getElementById(id);
}
function getElementsByTagName(tag,_e1){
if(!_e1){
_e1=document;
}
return _e1.getElementsByTagName(tag);
}
var _e2=/^\s*([a-z0-9_-]+)?\.([a-z0-9_-]+)\s*$/i;
var _e3=/^\s*([a-z0-9_-]+)?\#([a-z0-9_-]+)\s*$/i;
function getElementsBySelector(_e4,_e5){
_e5=_e5||window.document.documentElement;
var _e6=[];
var _e7,iMat;
if(_e7=_e4.match(_e2)){
var cl=_e7[2];
var tg=_e7[1];
_e6=reg.gebcn(cl,_e5,tg);
}else{
if(iMat=_e4.match(_e3)){
var id=iMat[2];
var tg=iMat[1];
var el=reg.gebi(id);
if(el&&_e5.contains(el)&&reg.matches(el,_e4)){
_e6[0]=el;
}
}else{
if(!_ad[_e4]){
_ad[_e4]=new reg.Selector(_e4);
}
var sel=_ad[_e4];
if(_e5.querySelectorAll){
var _ed=_e5.querySelectorAll(toQuerySelectorString(sel));
for(var i=0;i<_ed.length;i++){
_e6[_e6.length]=_ed[i];
}
}else{
var _ef=getTagNames(sel);
for(var a=0;a<_ef.length;a++){
var els=getElementsByTagName(_ef[a],_e5);
for(var b=0,el;el=els[b++];){
if(el.nodeType!=1){
continue;
}
if(sel.matches(el)){
_e6.push(el);
}
}
}
}
}
}
return _e6;
}
function getElementsByClassName(_f3,_f4,tag){
_f4=(_f4)?_f4:document;
tag=(tag)?tag.toLowerCase():"*";
var _f6=[];
if(document.getElementsByClassName){
var _f7=_f4.getElementsByClassName(_f3);
if(tag!="*"){
for(var i=0;i<_f7.length;i++){
var el=_f7[i];
if(tag==el.nodeName.toLowerCase()){
_f6.push(el);
}
}
}else{
for(var i=0;i<_f7.length;i++){
_f6.push(_f7[i]);
}
}
}else{
_f3=_f3.split(/\s+/);
if(document.evaluate){
var _fa=".//"+tag;
var len=_f3.length;
for(var i=0;i<len;i++){
_fa+="[contains(concat(' ', @class, ' '), ' "+_f3[i]+" ')]";
}
var _fc=document.evaluate(_fa,_f4,null,XPathResult.ORDERED_NODE_ITERATOR_TYPE,_fc);
var el;
while(el=_fc.iterateNext()){
_f6.push(el);
}
}else{
var els=(tag=="*"&&_f4.all)?_f4.all:getElementsByTagName(tag,_f4);
elements:
for(var i=0,el;el=els[i++];){
for(var j=0;j<_f3.length;j++){
if(!hasClassName(el,_f3[j])){
continue elements;
}
}
_f6.push(el);
}
}
}
return _f6;
}
var _ff={hasClassName:hasClassName,addClassName:addClassName,removeClassName:removeClassName,toggleClassName:toggleClassName,switchClassName:switchClassName,matchClassName:matchClassName,elementMatchesSelector:elementMatchesSelector,previousElement:previousElement,nextElement:nextElement,innerWrap:innerWrap,outerWrap:outerWrap,getParent:getParent,insertAfter:insertAfter,newElement:newElement,elementText:elementText,getElementById:getElementById,getElementsByTagName:getElementsByTagName,getElementsBySelector:getElementsBySelector,getElementsByClassName:getElementsByClassName};
_ff.hcn=_ff.hasClassName;
_ff.acn=_ff.addClassName;
_ff.rcn=_ff.removeClassName;
_ff.tcn=_ff.toggleClassName;
_ff.scn=_ff.switchClassName;
_ff.mcn=_ff.matchClassName;
_ff.matches=_ff.elementMatchesSelector;
_ff.prevElem=_ff.previousElement;
_ff.nextElem=_ff.nextElement;
_ff.elem=_ff.newElement;
_ff.elemText=_ff.elementText;
_ff.gebi=_ff.getElementById;
_ff.gebtn=_ff.getElementsByTagName;
_ff.gebs=_ff.getElementsBySelector;
_ff.gebcn=_ff.getElementsByClassName;
reg.importHelperFunctions=function(){
var _100=[];
for(var func in _ff){
if(!_ff.hasOwnProperty(func)){
continue;
}
if(window[func]){
_100.push(globalError(func));
}else{
window[func]=_ff[func];
}
}
if(_100.length>0){
throw new Error(_100.join("\n"));
}
};
for(var func in _ff){
if(!_ff.hasOwnProperty(func)){
continue;
}
if(reg[func]){
throw new Error("Already exists under reg: "+func);
}else{
reg[func]=_ff[func];
}
}
var _103={};
var _104=0;
function rememberEvent(elmt,evt,_107,cptr,_109){
var _10a=_104++;
var key="mem"+_10a;
_103[key]={element:elmt,event:evt,handler:_107,capture:cptr,cleanable:_109};
return _10a;
}
function cleanup(all){
for(var key in _103){
var _10e=key.match(/^mem(\d+)$/);
if(!_10e){
continue;
}
if(all||(_103[key].cleanable&&!document.documentElement.contains(_103[key].element))){
removeEvent(parseInt(_10e[1]));
}
}
}
window.setInterval(function(){
cleanup(false);
},10000);
function getTarget(e){
if(!e){
e=window.event;
}
if(e.target){
var targ=e.target;
}else{
if(e.srcElement){
var targ=e.srcElement;
}
}
if(targ.nodeType==3){
targ=targ.parentNode;
}
return targ;
}
function getRelatedTarget(e){
if(!e){
e=window.event;
}
var _112=e.relatedTarget;
if(!_112){
if("mouseover"==e.type){
_112=e.fromElement;
}
if("mouseout"==e.type){
_112=e.toElement;
}
}
return _112;
}
function cancelDefault(e){
if(typeof e.preventDefault!="undefined"){
e.preventDefault();
return;
}
e.returnValue=false;
}
function cancelBubble(e){
if(typeof e.stopPropagation!="undefined"){
e.stopPropagation();
return;
}
e.cancelBubble=true;
}
function addEvent(elmt,evt,_117,cptr,_119){
cptr=(cptr)?true:false;
_119=(_119)?true:false;
if(elmt.addEventListener){
elmt.addEventListener(evt,_117,cptr);
return rememberEvent(elmt,evt,_117,cptr,_119);
}else{
if(elmt.attachEvent){
var _11a=function(){
_117.call(elmt,window.event);
};
elmt.attachEvent("on"+evt,_11a);
return rememberEvent(elmt,evt,_11a,cptr,_119);
}
}
}
function removeEvent(_11b){
var _11c="mem"+_11b;
var eo=_103[_11c];
if(eo){
var el=eo.element;
if(el.removeEventListener){
el.removeEventListener(eo.event,eo.handler,eo.capture);
delete _103[_11c];
return true;
}else{
if(el.detachEvent){
el.detachEvent("on"+eo.event,eo.handler);
delete _103[_11c];
return true;
}
}
}
return false;
}
addEvent(window,"unload",function(){
cleanup(true);
});
var _11f={getTarget:getTarget,getRelatedTarget:getRelatedTarget,cancelDefault:cancelDefault,addEvent:addEvent,removeEvent:removeEvent,cancelBubble:cancelBubble};
reg.importEventFunctions=function(){
var _120=[];
for(var func in _11f){
if(!_11f.hasOwnProperty(func)){
continue;
}
if(window[func]){
_120.push(globalError(func));
}else{
window[func]=_11f[func];
}
}
if(_120.length>0){
throw new Error(_120.join("\n"));
}
};
for(var func in _11f){
if(!_11f.hasOwnProperty(func)){
continue;
}
if(reg[func]){
throw new Error("Already exists under reg: "+func);
}else{
reg[func]=_11f[func];
}
}
var _122=[];
var _123={};
var _124=[];
var _125=[];
reg.setup=function(_126,_127,_128){
_128=(_128)?true:false;
var sq=_123;
var _12a=new reg.Selector(_126);
var _12b=getTagNames(_12a);
var _12c={selector:_12a,setup:_127,ran:false,firstTimeOnly:_128};
for(var a=0;a<_12b.length;a++){
var _12e=_12b[a];
if(!sq[_12e]){
sq[_12e]=[_12c];
}else{
sq[_12e].push(_12c);
}
}
_124.push(_12c);
};
reg.preSetup=function(fn){
_122.push(fn);
};
reg.postSetup=function(fn){
_125.push(fn);
};
var _131=reg.rerun=function(el,_133){
function runIt(el,_135){
_135.setup.call(el);
_135.ran=true;
}
var _136=new Date().getTime();
if(typeof el.clobberable!="undefined"&&el.clobberable&&_133){
return;
}
var doc=(el)?el:document;
var sq=_123;
var _139=true;
for(var _13a in sq){
if(!sq.hasOwnProperty(_13a)){
continue;
}
_139=false;
break;
}
if(el.querySelector){
var _13b=[];
var _13c=_124;
for(var i=0;i<_13c.length;i++){
var _13e=_13c[i];
if(_13e.firstTimeOnly){
if(_13e.ran){
continue;
}
try{
var elmt=el.querySelector(toQuerySelectorString(_13e.selector));
if(elmt){
_13b.push({el:elmt,regObj:_13e});
}
}
catch(ex){
console.log("querySelector('"+toQuerySelectorString(_13e.selector)+"') threw "+ex);
continue;
}
}else{
try{
var _140=el.querySelectorAll(toQuerySelectorString(_13e.selector));
for(var j=0;j<_140.length;j++){
_13b.push({el:_140[j],regObj:_13e});
}
}
catch(ex){
console.log("querySelectorAll('"+toQuerySelectorString(_13e.selector)+"') threw "+ex);
continue;
}
}
}
for(var i=0;i<_13b.length;i++){
runIt(_13b[i].el,_13b[i].regObj);
}
}else{
if(!_139){
var _142=getElementsByTagName("*",doc);
for(var i=_142.length-1,els=[];i>=0;i--){
els[i]=_142[i];
}
for(var a=0,elmt;elmt=els[a++];){
if(elmt.nodeType!=1){
continue;
}
var _144=elmt.nodeName.toLowerCase();
var _145=sq["*"];
var _146=sq[_144];
if(_145){
for(var b=0;b<_145.length;b++){
var _13e=_145[b];
if(_13e.firstTimeOnly&&_13e.ran){
continue;
}
var _148=_13e.selector.matches(elmt);
if(_148){
runIt(elmt,_13e);
}
}
}
if(_146){
for(var b=0;b<_146.length;b++){
var _13e=_146[b];
if(_13e.firstTimeOnly&&_13e.ran){
continue;
}
var _148=_13e.selector.matches(elmt);
if(_148){
runIt(elmt,_13e);
}
}
}
}
}
}
el.clobberable=true;
var _149=new Date().getTime()-_136;
if(!reg.setupTime){
reg.setupTime=_149;
}
reg.lastSetupTime=_149;
};
var ie6=navigator.appVersion.indexOf("MSIE 6.0")!=-1;
if(!ie6){
addClassName(document.documentElement,"regloading");
}
var _14b=false;
function loadFunc(e){
if(!_14b){
for(var a=0;a<_122.length;a++){
_122[a]();
}
_131(document,true);
for(var a=0;a<_125.length;a++){
_125[a]();
}
_14b=true;
if(!ie6){
removeClassName(document.documentElement,"regloading");
addClassName(document.documentElement,"regloaded");
}
}
}
addEvent(window,"load",loadFunc);
addEvent(window,"DOMContentLoaded",loadFunc);
var _14e={};
var _14f={};
var _150={};
var _151={};
var _152={};
var _153={};
var _154={};
var _155={};
var _156={};
var _157={};
var _158={};
var _159={};
var _15a={};
var _15b={};
var _15c={};
function getDepth(_15d){
var _15e=null;
for(var i=2;i<_15d.length;i++){
if(!isNaN(parseInt(_15d[i]))){
_15e=_15d[i];
break;
}
}
if(_15e===null){
_15e=-1;
}
if(_15e<-1){
throw new Error("bad arg for depth, must be -1 or higher");
}
return _15e;
}
function pushFunc(_160,_161,_162,_163,_164){
if(!_161||typeof _161!="function"){
return;
}
var _165=new reg.Selector(_160);
if(!_163[_160]){
_163[_160]=[];
}
var _166={selector:_165,handle:_161,depth:_162,hoverFlag:_164};
_163[_160].push(_166);
}
reg.click=function(_167,_168,_169,_16a,_16b){
var _16c=getDepth(arguments);
pushFunc(_167,_168,_16c,_14e,false);
pushFunc(_167,_169,_16c,_14f,false);
pushFunc(_167,_16a,_16c,_150,false);
pushFunc(_167,_16b,_16c,_151,false);
};
reg.hover=function(_16d,_16e,_16f){
var _170=getDepth(arguments);
pushFunc(_16d,_16e,_170,_152,true);
pushFunc(_16d,_16f,_170,_153,true);
};
reg.focus=function(_171,_172,_173){
var _174=getDepth(arguments);
pushFunc(_171,_172,_174,_154,false);
pushFunc(_171,_173,_174,_155,false);
};
reg.key=function(_175,_176,_177,_178){
var _179=getDepth(arguments);
pushFunc(_175,_176,_179,_156,false);
pushFunc(_175,_177,_179,_157,false);
pushFunc(_175,_178,_179,_158,false);
};
if(document.all&&!window.opera){
function ieSubmitDelegate(e){
delegate(_159,e);
cancelBubble(e);
}
function ieResetDelegate(e){
delegate(_15a,e);
cancelBubble(e);
}
function ieChangeDelegate(e){
delegate(_15b,e);
cancelBubble(e);
}
function ieSelectDelegate(e){
delegate(_15c,e);
cancelBubble(e);
}
reg.focus("form",function(){
removeEvent(this._submit_prep);
this._submit_prep=addEvent(this,"submit",ieSubmitDelegate,false,true);
removeEvent(this._reset_prep);
this._reset_prep=addEvent(this,"reset",ieResetDelegate,false,true);
},function(){
removeEvent(this._submit_prep);
removeEvent(this._reset_prep);
});
reg.focus("select,input,textarea",function(){
removeEvent(this._change_prep);
this._change_prep=addEvent(this,"change",ieChangeDelegate,false,true);
},function(){
removeEvent(this._change_prep);
});
reg.focus("input,textarea",function(){
removeEvent(this._select_prep);
this._select_prep=addEvent(this,"select",ieSelectDelegate,false,true);
},function(){
removeEvent(this._select_prep);
});
}
reg.submit=function(_17e,func){
var _180=getDepth(arguments);
pushFunc(_17e,func,_180,_159,false);
};
reg.reset=function(_181,func){
var _183=getDepth(arguments);
pushFunc(_181,func,_183,_15a,false);
};
reg.change=function(_184,func){
var _186=getDepth(arguments);
pushFunc(_184,func,_186,_15b,false);
};
reg.select=function(_187,func){
var _189=getDepth(arguments);
pushFunc(_187,func,_189,_15c,false);
};
function delegate(_18a,_18b){
if(_18a){
var targ=getTarget(_18b);
for(var sel in _18a){
if(!_18a.hasOwnProperty(sel)){
continue;
}
for(var a=0;a<_18a[sel].length;a++){
var _18f=_18a[sel][a];
var _190=(_18f.depth==-1)?100:_18f.depth;
var el=targ;
for(var b=-1;b<_190&&el&&el.nodeType==1;b++,el=el.parentNode){
if(_18f.selector.matches(el)){
if(_18f.hoverFlag){
var _193=getRelatedTarget(_18b);
if(_193&&(el.contains(_193)||el==_193)){
break;
}
}
var _194=_18f.handle.call(el,_18b);
if(_194!==undefined&&!_194){
cancelDefault(_18b);
}
break;
}
}
}
}
}
}
if(typeof document.onactivate=="object"){
var _195="activate";
var _196="deactivate";
}else{
var _195="focus";
var _196="blur";
}
addEvent(document.documentElement,"click",function(e){
delegate(_14e,e);
});
addEvent(document.documentElement,"mousedown",function(e){
delegate(_14f,e);
});
addEvent(document.documentElement,"mouseup",function(e){
delegate(_150,e);
});
addEvent(document.documentElement,"dblclick",function(e){
delegate(_151,e);
});
addEvent(document.documentElement,"keydown",function(e){
delegate(_156,e);
});
addEvent(document.documentElement,"keypress",function(e){
delegate(_157,e);
});
addEvent(document.documentElement,"keyup",function(e){
delegate(_158,e);
});
addEvent(document.documentElement,_195,function(e){
delegate(_154,e);
},true);
addEvent(document.documentElement,_196,function(e){
delegate(_155,e);
},true);
addEvent(document.documentElement,"mouseover",function(e){
delegate(_152,e);
});
addEvent(document.documentElement,"mouseout",function(e){
delegate(_153,e);
});
addEvent(document.documentElement,"submit",function(e){
delegate(_159,e);
});
addEvent(document.documentElement,"reset",function(e){
delegate(_15a,e);
});
addEvent(document.documentElement,"change",function(e){
delegate(_15b,e);
});
addEvent(document.documentElement,"select",function(e){
delegate(_15c,e);
});
addClassName(document.documentElement,"regenabled");
var _1a6=[];
var log=function(str){
_1a6.push(str);
};
var _1a9=function(){
return _1a6.join("\n")+"\n";
};
if(!window.console){
window.console={log:log,contents:_1a9};
}else{
if(!window.console.log){
window.console.log=log;
if(!window.console.contents){
window.console.contents=_1a9;
}
}
}
return reg;
})();
reg.importAll();
var is=new ottosniff();
function ottosniff(){
var ua=navigator.userAgent.toLowerCase();
var b=navigator.appName;
if(b=="Netscape"){
this.b="ns";
}else{
this.b=b;
}
this.version=navigator.appVersion;
this.v=parseInt(this.version);
this.gecko=/\bgecko\/(20\d\d)(\d\d)(\d\d)/.test(ua);
this.ns=(this.b=="ns"&&this.v>=5);
this.op=(ua.indexOf("opera")>-1);
this.safari=(ua.indexOf("safari")>-1&&this.v<5);
this.safariAll=(ua.indexOf("safari")>-1);
this.op7=(this.op&&this.v>=7&&this.v<8);
this.op78=(this.op&&this.v>=7||this.op&&this.v>=8);
this.ie5=(this.version.indexOf("MSIE 5")>-1);
this.ie6=(this.version.indexOf("MSIE 6")>-1);
this.ie7=(this.version.indexOf("MSIE 7")>-1);
this.ie56=(this.ie5||this.ie6);
this.ie567=(this.ie5||this.ie6||this.ie7);
this.iewin=(this.ie56&&ua.indexOf("windows")>-1||this.ie7&&ua.indexOf("windows")>-1);
this.iemac=(this.ie56&&ua.indexOf("mac")>-1);
this.moz=(ua.indexOf("mozilla")>-1);
this.ff=(ua.indexOf("firefox")>-1);
this.moz13=(ua.indexOf("mozilla")>-1&&ua.indexOf("1.3")>-1);
this.oldmoz=(ua.indexOf("sunos")>-1||this.moz13&&!this.ff||this.moz&&ua.indexOf("1.4")>-1&&!this.ff||this.moz&&ua.indexOf("1.5")>-1&&!this.ff||this.moz&&ua.indexOf("1.6")>-1&&!this.ff);
this.anymoz=this.gecko;
this.ns6=(ua.indexOf("netscape6")>-1);
this.geckoAtOrAbove=function(_1ac){
var gVer=(this.gecko)?ua.substring(ua.indexOf("; rv:")+5,ua.indexOf(") gecko")):"";
var t=gVer.split(".");
var v=_1ac.split(".");
while(t.length<v.length){
t.push("0");
}
while(v.length<t.length){
v.push("0");
}
for(var i=0;i<v.length;i++){
var ti=parseInt(t[i]),vi=parseInt(v[i]);
if(ti==vi){
continue;
}else{
return (ti>vi);
}
}
return true;
};
}
var rtl=(document.documentElement.lang.indexOf("he")>-1&&document.documentElement.lang.indexOf("IL"))?true:false;
if(rtl){
addClassName(document.documentElement,"rtl");
}
if(is.op){
var bclass="browserOpera";
}else{
if(is.safariAll){
var bclass="browserSafari";
}else{
if(is.ie56){
var bclass="browserExplorer56 browserExplorer";
}else{
if(is.ie7){
var bclass="browserExplorer7 browserExplorer";
}else{
if(is.iemac){
var bclass="browserExplorerMac";
}else{
if(is.oldmoz){
var bclass="browserOldMoz";
}else{
var bclass="";
}
}
}
}
}
}
if(is.gecko){
bclass+=" gecko";
}
if(is.safari||is.geckoAtOrAbove("1.9")){
bclass+=" radius";
}
bclass+=" jsenabled";
addClassName(document.documentElement,bclass);
if(typeof shutoff=="undefined"){
var shutoff={global:false,share:false,pop:false,misc:false};
}
if(!shutoff.global){
reg.setup("div.a1r2 span.toolbarlinks > a,div.a1r2 span.siteid > a",sniffA1);
reg.setup("div#a5 a",sniffA5);
reg.focus("input#searchfield,input.searchfield",function(){
addClassName(this,"sfieldfocused");
},function(){
removeClassName(this,"sfieldfocused");
});
reg.focus("div#a5 > ul li.hasmenu",function(){
addClassName(this,"a5show");
gebtn("div",this)[0].style.top=((gebtn("div",this)[0].offsetHeight*-1))+4+"px";
},function(){
removeClassName(this,"a5show");
});
reg.hover("div#a5 > ul li.hasmenu",function(){
addClassName(this,"a5show");
gebtn("div",this)[0].style.top=((gebtn("div",this)[0].offsetHeight*-1))+4+"px";
},function(){
removeClassName(this,"a5show");
});
reg.hover("div.a5menu",function(){
addClassName(this.parentNode,"a5show");
},function(){
removeClassName(this,"a5show");
});
reg.setup("td.navlinks > div",sniffA2);
reg.hover("ul#mtopics",function(){
if(!a2["ent"]){
reg.setup("ul#mtopics > li",sniffA2);
reg.rerun(this);
}
});
reg.focus("ul#mtopics",function(){
if(!a2["ent"]){
reg.setup("ul#mtopics > li",sniffA2);
reg.rerun(this);
}
});
if(is.ie56){
reg.hover("ul#mtopics > li",function(){
addClassName(this,"a2mshow");
},function(){
removeClassName(this,"a2mshow");
});
reg.hover("td.navlinks",function(){
addClassName(this,"a2mshow");
},function(){
removeClassName(this,"a2mshow");
},5);
}
if(shutoff.misc){
reg.preSetup(function(){
var a2v8=gebi("a2v8");
if(!a2v8){
return;
}
reg.setup("select.goto, select.showDiv",sniffGoto);
reg.setup("ul.goto, ul.showDiv",sniffGotoUL);
});
}
}
if(!shutoff.pop){
reg.click(".k5, .media-popin",k5Click);
reg.click(".k5close",k5Close);
reg.key("html",function(e){
if(27==e.keyCode){
k5Close();
}
});
reg.setup("@class*='k2ajax-'",sniffK2ajax);
reg.setup("@class*='k2over', @class*='k2focus', @class*='k2cl', @class*='k2show', @class*='k2hide'",sniffK2);
reg.setup(".modal-launch",sniffModal);
}
reg.preSetup(function(){
var cpy=gebi("copyDate");
if(!cpy){
return;
}
cpy.innerHTML="1994-"+new Date().getFullYear()+" ";
});
reg.focus("body",blurOut);
var blurIt=[];
function blurOut(ev){
var obj=this;
t=getTarget(ev);
var b=blurIt;
blurIt=[];
for(var i=0;i<b.length;i++){
if(!hasParent(t,b[i][0])){
if(b[i][1]=="hidden"){
b[i][0].style.visibility="hidden";
}else{
if(b[i][1]){
removeClassName(b[i][0],b[i][1]);
}else{
b[i][0].style.display="none";
}
}
}else{
blurIt.push(b[i]);
}
}
}
reg.click("a.popup, area.popup, a.media-launch",bubblePop);
function bubblePop(e){
var link=this;
if(hasClassName(link,"media-launch")&&!matchClassName(link,"[0-9]+x[0-9]+")){
addClassName(link,"662x652");
}
var popW="820";
var popH="600";
var _1bd=["no",0,0,0,0,0,0,"",""];
var _1be=link.href;
if(link.target){
var _1bf=link.target;
}else{
var _1bf="newpopup";
}
var cls=link.className.split(" ");
for(var v=0;v<cls.length;v++){
if(cls[v].search("[0-9]+x[0-9]+")>-1){
var f=cls[v].split("x");
popW=f[0];
popH=f[1];
}else{
if(cls[v].indexOf("name-")==0){
var f=cls[v].split("name-");
_1bf=f[1];
}else{
if(cls[v]=="scrolling"){
var _1bd=["yes",1,0,0,0,0,0];
}else{
if(cls[v]=="full"){
var _1bd=["yes",1,1,1,1,1,1];
}else{
if(cls[v].indexOf("yes_")==0||cls[v].indexOf("no_")==0){
var f=cls[v].split("_");
f[1]="f"+f[1];
var _1bd=f[1].split("");
_1bd[0]=f[0];
}
}
}
}
}
if(link.className.indexOf("centerpop")>1){
_1bd[7]=screen.availHeight/2-popH/2;
_1bd[8]=screen.availWidth/2-popW/2;
}
}
openPopup(_1be,_1bf,popW,popH,_1bd[0],_1bd[1],_1bd[2],_1bd[3],_1bd[4],_1bd[5],_1bd[6],_1bd[7],_1bd[8]);
cancelDefault(e);
}
function openPopup(url,name,_1c5,_1c6,_1c7,_1c8,_1c9,_1ca,_1cb,_1cc,_1cd,top,left){
var tl=(top&&left)?",top="+top+",left="+left:"";
var _1d1=window.open(url,name,"width="+_1c5+",height="+_1c6+",resizable="+_1c7+",scrollbars="+_1c8+",menubar="+_1c9+",toolbar="+_1ca+",location="+_1cb+",directories="+_1cc+",status="+_1cd+tl);
_1d1.focus();
}
reg.focus("input.autoclear,input#searchfield,input.searchfield",autoclearFocus,autoclearBlur);
function autoclearFocus(){
if(this.value==this.defaultValue){
this.value="";
addClassName(this,"autocleared");
}
}
function autoclearBlur(){
if(this.value==""){
this.value=this.defaultValue;
removeClassName(this,"autocleared");
}
}
var a1=[];
a1["x"]=1;
function sniffA1(){
var link=this;
oldA1Content();
var a1w=["<div class=\"a1menux1\"></div>\n<div class=\"a1menuw2\"><div class=\"a1menuw1\">\n","</div><div class=\"a1menux2\"></div></div>"];
if(!a1["ent"]){
for(key in a1){
var d=elem("div");
d.innerHTML=key;
a1[d.innerHTML]=a1[key];
}
a1["ent"]=true;
}
var _1d5=link.innerHTML.normalize();
var a1id="a1menu"+a1["x"];
a1["x"]++;
if(hasClassName(link,"language-select")){
var d=elem("div.a1menu");
addClassName(link,"k2over-languageselector y3 x-10");
d.id="languageselector";
d.style.width="170px";
d.innerHTML=a1w[0]+"<h5></h5><div></div>"+a1w[1];
link.parentNode.insertBefore(d,link.nextSibling);
sniffK2.call(link);
sniffSiteSelector(link.parentNode);
}else{
if(a1[_1d5]){
var d=elem("div.a1menu");
addClassName(link,"karrow");
addClassName(link,"k2over-"+a1id+" y3 x-6");
if(hasClassName(link,"a1cart")){
link.innerHTML="<span class=\"carticon small\">"+link.innerHTML+"</span>";
link.style.paddingLeft="0px";
}
if(a1[_1d5].indexOf("a1-2col")>-1){
var wc="a1Large";
}else{
if(a1[_1d5].indexOf("<p>")>-1){
var wc="a1Medium";
}else{
var wc="a1Small";
}
}
d.id=a1id;
addClassName(d,wc);
d.innerHTML=a1w[0]+a1[_1d5]+a1w[1];
link.parentNode.insertBefore(d,link.nextSibling);
sniffK2.call(link);
}
}
}
var a1hrefs=[];
var a1menus=[];
function oldA1Content(){
var k;
for(k in a1hrefs){
a1[a1hrefs[k][0]]=a1menus[k][1];
}
a1hrefs=a1menus=[];
}
reg.click("div.a2topiclinks > ul > li > a",function(){
clickA2(this,this.innerHTML.normalize(),this.innerHTML.normalize());
});
reg.click("div.a2m a",function(){
var p=gebtn("a",this.parentNode.parentNode.parentNode.parentNode)[0].innerHTML.normalize();
clickA2(this,p,this.innerHTML.normalize());
});
var a2=[];
function sniffA2(){
var fobj=this;
var sall=(typeof ltxt=="undefined")?seeall:ltxt.seeall;
if(navmenu["1.0"]){
oldA2Content();
}
if(gebi("ip1")){
oldA2TableFix();
}
if(!a2["ent"]){
for(key in a2){
var d=elem("div");
d.innerHTML=key;
a2[d.innerHTML.strip()]=a2[key];
}
a2["ent"]=true;
}
var _1dd=gebtn("a",fobj)[0];
var n=_1dd.innerHTML.normalize();
if(a2[n]){
var h=_1dd.href;
addEvent(_1dd,"focus",function(){
if(this.parentNode.nodeName.toLowerCase()=="li"){
addClassName(this.parentNode,"a2mshow");
blurIt.push([this.parentNode,"a2mshow"]);
}else{
addClassName(this.parentNode.parentNode,"a2mshow");
blurIt.push([this.parentNode.parentNode,"a2mshow"]);
}
});
var d=elem("div.a2m",{});
d.style.marginLeft=(rtl)?"-"+(204-fobj.offsetWidth)+"px":"-20px";
var u=elem("ul",{});
var a=elem("a",{"href":h});
a.innerHTML=sall+" &#187;";
var l=elem("li",{});
if(h.indexOf("#")<0&&h.split("#")[1]!=""&&a2[n].indexOf("<!-- no see all -->")<0){
l.appendChild(a);
}
u.innerHTML=a2[n];
u.appendChild(l);
d.appendChild(u);
fobj.appendChild(d);
addClassName(gebtn("li",fobj)[0],"firstchild");
}else{
if(fobj.nodeName.toLowerCase()=="li"){
addClassName(fobj,"a2nomenu");
}else{
addClassName(fobj.parentNode,"a2nomenu");
}
}
}
function clickA2(a,menu,link){
if(!gebi("a0v2")&&window.s_account){
s_linkType="o";
s_linkName="Masthead Menu: "+menu;
s_linkTrackVars="prop15,prop16";
s_prop15=s_pageName;
s_prop16=link;
s_lnk=s_co(a);
s_gs(s_account);
}
}
var navmenu=[];
var oldmenu=[];
function popfly(){
}
function closefly(){
}
function prepmenus(){
}
function printmenus(){
}
function oldA2Content(){
var x=1;
while(x<10){
if(navmenu[x+".0"]&&!a2[navmenu[x+".0"].split("|")[0]]){
var xx=1;
var li="";
while(navmenu[x+"."+xx]){
li+="<li><a href=\""+navmenu[x+"."+xx].split("|")[1]+"\">"+navmenu[x+"."+xx].split("|")[0]+"</a></li>\n";
xx++;
}
a2[navmenu[x+".0"].split("|")[0]]=li;
}
if(oldmenu[x+".0"]&&!a2[oldmenu[x+".0"].split("|")[0]]){
var xx=1;
var li="";
while(oldmenu[x+"."+xx]){
li+="<li><a href=\""+oldmenu[x+"."+xx].split("|")[1]+"\">"+oldmenu[x+"."+xx].split("|")[0]+"</a></li>\n";
xx++;
}
a2[oldmenu[x+".0"].split("|")[0]]=li;
}
x++;
}
navmenu=oldmenu=[];
}
function oldA2TableFix(){
var x=1;
while(gebi("ip"+x)){
var td=gebi("ip"+x).parentNode;
td.parentNode.removeChild(td);
x++;
}
}
var a5=[];
function sniffA5(){
var a5w=["<div class=\"a5menuw2\"><div class=\"a5menuw1\">\n","</div></div><div class=\"a5menux2\"></div>"];
if(!a5["ent"]){
for(key in a5){
var d=elem("div");
d.innerHTML=key;
a5[d.innerHTML]=a5[key];
}
a5["ent"]=true;
}
var _1ed=this.innerHTML.normalize();
if(a5[_1ed]){
var d=elem("div.a5menu");
d.innerHTML=a5w[0]+a5[_1ed]+a5w[1];
addClassName(this.parentNode,"hasmenu");
this.parentNode.insertBefore(d,this.nextSibling);
}
}
ked=[];
function sniffK2(_1ee){
var fobj=this;
var pdoc=document;
fobj.prp=[0,0,0,"","",""];
fobj.className=fobj.className.replace(/(k2over) +/,"$1-");
fobj.className=fobj.className.replace(/(k2click) +/,"$1-");
fobj.className=fobj.className.replace(/(k2focus) +/,"$1-");
fobj.className=fobj.className.replace(/(k2close) +/,"$1-");
var cls=fobj.className.split(" ");
if(fobj.className.indexOf("k2ajaxload")>-1&&fobj.href&&gebtn("div",document.body)[0]){
for(var v=0;v<cls.length;v++){
if(cls[v].indexOf("k2over")>-1||cls[v].indexOf("k2click")>-1||cls[v].indexOf("k2focus")>-1){
var k2id=cls[v].split("-");
if(!k2id[2]){
k2id[2]=k2id[1];
}
}
}
var link=document.createElement("a");
link.className="loadUrl";
link.href=fobj.href+"#"+k2id[2];
if(!gebi(k2id[2])){
var div=document.createElement("div");
div.className="g32auto";
div.id=k2id[2];
div.appendChild(link);
gebtn("div",document.body)[0].appendChild(div);
}
}
for(var v=0;v<cls.length;v++){
if(cls[v].indexOf("k2over")>-1||cls[v].indexOf("k2click")>-1||cls[v].indexOf("k2focus")>-1){
var _1f6=fobj.aob=cls[v].split("-");
if(!_1f6[2]){
fobj.aob[2]=_1f6[2]=_1f6[1];
fobj.aob[1]=fobj;
}
kpop=gebi(_1f6[2]);
kpop.kp_objs=_1f6[2];
kpop.kp_trig=_1f6[1];
}else{
if(cls[v].indexOf("k2close")>-1){
fobj.aob=cls[v].split("-");
}else{
if(cls[v].indexOf("x")==0){
fobj.prp[0]=(cls[v].substring(1)*1)+fobj.prp[0];
}else{
if(cls[v].indexOf("y")==0){
fobj.prp[1]=(cls[v].substring(1)*1)+fobj.prp[1];
}else{
if(cls[v].indexOf("z")==0){
fobj.prp[2]=(cls[v].substring(1)*1);
}else{
if(cls[v].indexOf("pAbsolute")==0){
fobj.prp[3]=(cls[v].substring(1));
}else{
if(cls[v].indexOf("vBottom")==0||cls[v].indexOf("vTop")==0||cls[v].indexOf("vMiddle")==0||cls[v].indexOf("vAlignTopBottom")==0){
fobj.prp[4]=cls[v];
}else{
if(cls[v].indexOf("hRight")==0||cls[v].indexOf("hMiddleRight")==0||cls[v].indexOf("hLeft")==0||cls[v].indexOf("hMiddleLeft")==0||cls[v].indexOf("hMiddle")==0||cls[v].indexOf("hAlignRight")==0){
fobj.prp[5]=cls[v];
}
}
}
}
}
}
}
}
}
if(fobj.aob[0].indexOf("k2over")>-1){
addEvent(fobj,"mouseover",function(){
showK2(this.aob[2],this.aob[1],this.prp[0],this.prp[1],this.prp[2],this.prp[3],this.prp[4],this.prp[5]);
});
if(!hasClassName(fobj,"mOverOff")){
addEvent(kpop,"mouseover",function(){
showK2(this.kp_objs);
});
}
addEvent(kpop,"mouseout",function(){
hideK2(this.kp_objs);
});
addEvent(fobj,"mouseout",function(){
hideK2(this.aob[2]);
});
addEvent(fobj,"focus",function(){
showK2(this.aob[2],this.aob[1],this.prp[0],this.prp[1],this.prp[2],this.prp[3],this.prp[4],this.prp[5]);
blurIt.push([gebi(this.aob[2]),"hidden"]);
});
if(_1ee){
showK2(fobj.aob[2],fobj.aob[1],fobj.prp[0],fobj.prp[1],fobj.prp[2],fobj.prp[3],fobj.prp[4],fobj.prp[5]);
return false;
}
}else{
if(fobj.aob[0]=="k2click"){
addEvent(fobj,"click",function(e){
showK2(this.aob[2],this.aob[1],this.prp[0],this.prp[1],this.prp[2],this.prp[3],this.prp[4],this.prp[5]);
addK2(this.aob[2],this.aob[1],this.prp[0],this.prp[1],this.prp[2],this.prp[3],this.prp[4],this.prp[5]);
cancelDefault(e);
return false;
});
if(_1ee){
showK2(fobj.aob[2],fobj.aob[1],fobj.prp[0],fobj.prp[1],fobj.prp[2],fobj.prp[3],fobj.prp[4],fobj.prp[5]);
addK2(fobj.aob[2],fobj.aob[1],fobj.prp[0],fobj.prp[1],fobj.prp[2],fobj.prp[3],fobj.prp[4],fobj.prp[5]);
return false;
}
}else{
if(fobj.aob[0]=="k2focus"){
addEvent(fobj,"focus",function(){
showK2(this.aob[2],this.aob[1],this.prp[0],this.prp[1],this.prp[2],this.prp[3],this.prp[4],this.prp[5]);
addK2(this.aob[2],this.aob[1],this.prp[0],this.prp[1],this.prp[2],this.prp[3],this.prp[4],this.prp[5]);
});
addEvent(fobj,"blur",function(){
hideK2(this.aob[2],1);
});
}else{
if(fobj.aob[0]=="k2close"){
addEvent(fobj,"click",function(e){
hideK2(this.aob[1],1);
cancelDefault(e);
});
}
}
}
}
fobj.className=fobj.className.replace(/(k2over)-|(k2focus)-|(k2cl...)-/,"$1 ");
}
function showK2(_1f9,_1fa,_1fb,_1fc,_1fd,posy,_1ff,ort,_201){
var _202=gebi(_1f9);
if(!_202){
var _202=_1f9;
}
if(_1fa){
var ptop=plft=0;
var _204=gebi(_1fa);
if(!_204){
var _204=_1fa;
}
if(ort=="hLeft"){
plft=plft-_202.offsetWidth;
}else{
if(ort=="hMiddleLeft"){
plft=plft-_202.offsetWidth;
plft=plft+parseInt(_204.offsetWidth/2);
}else{
if(ort=="hMiddle"){
plft=parseInt(_204.offsetWidth/2);
plft=plft-parseInt(_202.offsetWidth/2);
}else{
if(ort=="hMiddleRight"){
plft=parseInt(_204.offsetWidth/2);
}else{
if(ort=="hRight"){
plft=_204.offsetWidth;
}else{
if(ort=="hAlignRight"){
plft=plft+_204.offsetWidth-_202.offsetWidth;
}
}
}
}
}
}
if(_1ff=="vTop"){
ptop=ptop-_202.offsetHeight;
}else{
if(_1ff=="vMiddle"){
ptop=ptop+parseInt(_204.offsetHeight/2);
ptop=ptop-parseInt(_202.offsetHeight/2);
}else{
if(_1ff=="vBottom"){
ptop=ptop+_204.offsetHeight;
}else{
if(_1ff=="vAlignBottom"){
ptop=ptop+_204.offsetHeight-_202.offsetHeight;
}else{
if(_1ff=="vAlignTopBottom"){
var _205=0;
if(document.body&&(document.body.scrollLeft||document.body.scrollTop)){
_205=document.body.scrollTop;
}else{
if(document.documentElement&&(document.documentElement.scrollLeft||document.documentElement.scrollTop)){
_205=document.documentElement.scrollTop;
}
}
var _206=0;
if(typeof (window.innerWidth)=="number"){
_206=window.innerHeight;
}else{
if(document.documentElement&&(document.documentElement.clientWidth||document.documentElement.clientHeight)){
_206=document.documentElement.clientHeight;
}
}
var _207=_204.offsetHeight-_202.offsetHeight;
}
}
}
}
}
if(is.safari&&posy=="Absolute"){
if(posy!="Absolute"){
_204.style.position="relative";
}
getXY(_204.offsetParent);
}else{
getXY(_204);
}
ptop=ptop+_204.Y;
plft=plft+_204.X;
if(_1ff=="vAlignTopBottom"&&ptop>_205+(_206/2)){
ptop=ptop+_207;
_1fc=_1fc*-1;
}
plft=plft+_1fb;
ptop=ptop+_1fc;
_202.style.top=ptop+"px";
_202.style.left=plft+"px";
}
if(_1fd){
_202.style.zIndex=_1fd;
}
_202.style.visibility="visible";
}
function hideK2(_208,_209,_20a){
var _20b=gebi(_208);
if(!_20b){
var _20b=_208;
}
_20b.style.visibility="hidden";
if(_209){
ked[_208]="";
}
}
function addK2(p0,p1,p2,p3,p4,p5,p6,p7){
ked[p0]=[p0,p1,p2,p3,p4,p5,p6,p7];
}
addEvent(window,"resize",function(){
var kdp;
for(kdp in ked){
if(ked[kdp][0]){
showK2(ked[kdp][0],ked[kdp][1],ked[kdp][2],ked[kdp][3],ked[kdp][4],ked[kdp][5],ked[kdp][6],ked[kdp][7]);
}
}
});
function sniffK2ajax(){
var fobj=this;
var _216=fobj.className.split("k2ajax-")[1].split(" ")[0];
var _217=gebtn("a",gebi(_216))[0].href;
var mvnt=(fobj.className.indexOf("k2over-")>-1)?"mouseover":"click";
addEvent(fobj,mvnt,function(){
if(gebi(_216).innerHTML.indexOf("getUrl")>-1){
var _219=[_216,fobj];
getfile(_217,function(_21a,fvar){
if(_21a.indexOf("contentchunk")>-1){
_21a=getRequestObject("contentchunk",_21a).innerHTML;
}
gebi(fvar[0]).innerHTML=_21a;
reg.rerun(gebi(fvar[0]));
sniffK2.call(fvar[1],true);
},_219);
}
});
}
function sniffModal(){
var fobj=this;
if(hasClassName(fobj,"modal-launch")){
var _21d=fobj.className.match(/launch\-id\-([a-z0-9_-]+)/);
if(!_21d){
return;
}else{
fobj.modalId=_21d[1];
}
fobj.onclick=function(e){
showK4(this.modalId);
return false;
};
}
}
function showK4(id){
var div=gebi(id);
if(!div){
return;
}
removeClassName(div,"k4hidden");
var _221=gebtn("input",div);
for(var a=0;a<_221.length;a++){
if(_221[a].type=="text"){
_221[a].focus();
break;
}
}
if(is.ie6){
var _223=gebtn("select");
for(var a=0;a<_223.length;a++){
addClassName(_223[a],"k4in-effect");
}
}
}
function hideK4(id){
var div=gebi(id);
addClassName(div,"k4hidden");
if(is.ie6){
var _226=gebtn("select");
for(var a=0;a<_226.length;a++){
removeClassName(_226[a],"k4in-effect");
}
}
}
function modalClose(e){
var k4=this.parentNode;
while(!hasClassName(k4,"k4")&&k4.parentNode){
k4=k4.parentNode;
}
if(hasClassName(k4,"k4")&&k4.id){
hideK4(k4.id);
}
return false;
}
function sniffSiteSelector(span){
var lnks=gebtn("a",span);
for(var a=0;a<lnks.length;a++){
var lnk=lnks[a];
if(hasClassName(lnk,"country-select")){
addClassName(lnk,"modal-launch launch-id-country-selector");
sniffModal.call(lnk);
var k4=elem("div",{"class":"k4 k4v1 k4hidden","id":"country-selector"});
k4.innerHTML="<div class=\"k4w1\"><div class=\"k4w2\"><div class=\"k4w3\"><div class=\"k4w4\"><div class=\"k4title\"><h2>"+"</h2><p class=\"modal-extra\"><a href=\"\" class=\"modal-close\">[X]</a></p></div><div class=\"k4body\">"+"</div></div></div></div></div>";
k4.setTitle=function(txt){
gebtn("h2",this)[0].innerHTML=txt;
};
k4.setBody=function(txt){
gebtn("div",this)[5].innerHTML=txt;
};
document.body.appendChild(k4);
addEvent(lnk,"click",function(){
var _231=this.href;
try{
getfile(this.href,function(_232,fvar){
try{
var _234=elemText(getRequestObject("country-data-title",_232,"h2"));
var _235=getRequestObject("country-data",_232).innerHTML;
}
catch(ex){
window.location=_231;
}
k4.setTitle(_234);
k4.setBody(_235);
});
}
catch(e){
window.location=_231;
}
});
}else{
if(hasClassName(lnk,"language-select")){
var k2=gebi("languageselector");
k2.setTitle=function(txt){
gebtn("h5",this)[0].innerHTML=txt;
};
k2.setBody=function(txt){
gebtn("div",this)[3].innerHTML=txt;
};
addEvent(lnk,"mouseover",function(){
var _239=this.href;
try{
getfile(this.href,function(_23a,fvar){
try{
var _23c=elemText(getRequestObject("language-data-title",_23a,"h2"));
var _23d=getRequestObject("language-data",_23a).innerHTML;
}
catch(ex){
k2.setTitle("no data");
return;
}
k2.setTitle(_23c);
k2.setBody(_23d);
});
}
catch(e){
window.location=_239;
}
});
}
}
}
}
reg.postSetup(function(){
var _23e=gebi("k5onload");
if(!_23e){
return;
}
k5Click.call(_23e);
});
function pauseAll(){
window.paused=true;
addClassName(document.body,"paused");
}
function resumeAll(){
window.paused=false;
removeClassName(document.body,"paused");
}
function k5Click(){
if(reg.matches(this,"div.k5")){
return;
}
k5Close();
var _23f=matchClassName(this,/^id-(\S+)$/);
if(_23f){
var id=_23f[1];
}else{
if(this.href&&this.href.indexOf("#")!=-1){
var id=this.href.substring(this.href.indexOf("#")+1);
}else{
throw new Error("no id value was specified for k5 object. className \"id-someId\" or URL anchor reference \"...page.html#someId\"");
}
}
var _241="k5 k5empty";
var _242,isInf,isLog,isMed,isInterrupt;
if(hcn(this,"k5interrupt")){
_241+=" k5interrupt";
isInterrupt=true;
}
if(hcn(this,"k5vid")){
_241+=" k5vid";
_242=true;
}else{
if(hcn(this,"k5login")){
_241+=" k5login";
isLog=true;
}else{
if(hcn(this,"k5media")){
_241+=" k5media hijax-"+id;
isMed=true;
}else{
if(hcn(this,"k5info")){
_241+=" k5info";
isInf=true;
}
}
}
}
var _243=(this.title)?this.title:elemText(this);
if(!_243){
_243=" ";
}
if(isLog){
var _244={"title":"close","alt":"close","src":imdir+"/k5login_x.gif","border":"0","width":"21","height":"21"};
}else{
if(isInf){
var _244={"title":"close","alt":"close","src":imdir+"/k5info_x.gif","border":"0","width":"21","height":"21"};
}else{
var _244={"title":"close","alt":"close","src":imdir+"/ic_close_win_big_x.gif","border":"0","width":"30","height":"19"};
}
}
var _245=elem("h2.k5title",null,_243);
var _246=elem("span."+(isInterrupt?"k5skip":"k5close"),null,elem("img",_244));
var _247=elem("p.k5closer",null,_246);
var k5w2=elem("div.k5w2");
var k5w1=elem("div.k5w1",null,[_245,_247,k5w2]);
var _24a=elem("div.k5shadow");
_24a.innerHTML="<table><tr><td class=\"tl\"></td><td class=\"tc\"></td><td class=\"tr\"></td></tr><tr><td class=\"ml\"></td><td class=\"mc\"></td><td class=\"mr\"></td></tr><tr><td class=\"bl\"></td><td class=\"bc\"></td><td class=\"br\"></td></tr></table>";
var _24b=elem("div#k5",{"class":_241},[k5w1,_24a]);
if(this.continueTo){
_24b.continueTo=this.continueTo;
}
if(this.submitTo){
_24b.submitTo=this.submitTo;
}
if(this.thankYouHref){
_24b.thankYouHref=this.thankYouHref;
}
_24a.position=function(_24c,_24d){
_24c-=33;
_24d-=29;
var _24e=gebcn("mc",_24a)[0].style;
_24e.width=_24c+"px";
_24e.height=_24d+"px";
this.style.top=(-31-_24d)+"px";
this.style.left="8px";
};
k5w1.centerOnScreen=function(){
if(!this.viewportHeight){
this.viewportHeight=(window.innerHeight)?window.innerHeight:document.documentElement.clientHeight;
}
if(!this.viewportWidth){
this.viewportWidth=(window.innerWidth)?window.innerWidth:document.documentElement.clientWidth;
}
var _24f=this.offsetHeight;
var _250=this.offsetWidth;
var _251=((this.viewportHeight/2)-(_24f/2))*0.666;
if(_251<0){
_251=0;
this.style.height=(this.viewportHeight-20)+"px";
this.style.overflow="auto";
}
if(_250>this.viewportWidth){
this.style.width=(this.viewportWidth-40)+"px";
this.style.overflow="auto";
}
this.style.marginTop=_251+"px";
};
k5w1.setContent=function(_252){
_252.style.visibility="hidden";
_24a.style.visibility="hidden";
removeClassName(_24b,"k5empty");
removeClassName(_252,"hidethis");
var _253=gebcn("k5customtitle",_252);
if(_253&&_253.length>0){
var _254=_253[0];
var _255=elemText(_254);
_254.parentNode.removeChild(_254);
_245.firstChild.data=_255;
}
var _256=matchClassName(_252,/^(\d+)(x(\d+))?$/);
if(_256){
if(!k5w1.style.width){
k5w1.style.width=_256[1]+"px";
}
if(_256.length>3&&_256[3]&&!k5w2.style.height){
k5w2.style.height=_256[3]+"px";
}
}
k5w2.innerHTML="";
k5w2.appendChild(_252);
var _257=k5w2.offsetHeight;
this.centerOnScreen();
_252.style.visibility="";
window.setTimeout(function(){
_24a.position(k5w1.offsetWidth,k5w1.offsetHeight);
_24a.style.visibility="";
},40);
};
_24b.setError=function(_258,url,_25a){
_25a=_25a||"Whoops! Unable to Load Content";
removeClassName(this,"k5empty");
addClassName(this,"k5error");
k5w1.style.height="auto";
k5w1.style.width="";
k5w2.style.height="";
k5w1.setContent(elem("div",{"class":"g29 g29v2"},elem("div.g29w1",{},elem("div.g29w2",{},[elem("h5",{},_25a),elem("p",{},_258+":"),elem("p",{},""+url)]))));
};
_24b.style.visibility="hidden";
if(is.ie6){
var _25b=elem("div#k5ie6bg");
document.body.appendChild(_25b);
}
document.body.appendChild(_24b);
var _25c=matchClassName(this,/^(\d+)(x(\d+))?$/);
if(_25c){
k5w1.style.width=_25c[1]+"px";
if(_25c.length>3&&_25c[3]){
k5w2.style.height=_25c[3]+"px";
}
}
k5w1.centerOnScreen();
_24b.style.visibility="";
var _25d=this.href||location.href;
if(_25d.indexOf("http")!==0){
_25d=location.href;
}
if(_25d.indexOf("#")!=-1){
_25d=_25d.substring(0,_25d.indexOf("#"));
}
var _25e=location.href;
if(_25e.indexOf("#")!=-1){
_25e=_25e.substring(0,_25e.indexOf("#"));
}
if(_25e==_25d){
var _25f=gebi(id);
if(!_25f){
_24b.setError("id=\""+id+"\" not found on this page",_25d);
}else{
k5w1.setContent(_25f.cloneNode(true));
}
}else{
try{
xhr(_25d,function(_260){
var _261=getElementByIdFromString(_260,id);
if(!_261){
_24b.setError("id=\""+id+"\" not found on remote page",_25d);
}else{
k5w1.setContent(_261);
}
},function(_262,_263,url){
_24b.setError(_262+" "+_263,url);
});
}
catch(ex){
_24b.setError("XHR FAIL: "+(ex.message||ex),_25d);
}
}
this.blur();
var _265=gebs("input,button,select,textarea",_24b);
if(_265&&_265.length>0){
_265[0].focus();
}
pauseAll();
return false;
}
function k5Close(e){
var _267=gebi("k5");
if(_267){
document.body.removeChild(_267);
}
var _268=gebi("k5ie6bg");
if(_268){
document.body.removeChild(_268);
}
resumeAll();
return false;
}
(function(){
var done=false;
window.k5Onload=function(href,id,_26c,lf,_26e,_26f){
if(done){
throw new Error("k5Onload called multiple times");
}else{
done=true;
}
sniffK5Once();
if(!href){
href=location.href;
}
if(href.indexOf("#")!=-1){
if(!id){
id=href.substring(href.indexOf("#")+1);
}
href=href.substring(0,href.indexOf("#"));
}
href=href+"#"+id;
var _270="k5";
if(_26e){
_270+=" "+_26e;
}
if(_26f){
_270+="x"+_26f;
}
if(lf){
_270+=" "+lf;
}
var a=elem("a",{"class":_270,"href":href},_26c);
reg.postSetup(function(){
window.setTimeout(function(){
k5Click.call(a);
},200);
});
};
})();
(function(){
var _272,done=false;
function handleIt(el,_274,_275,_276){
if(!done&&(done=true)){
_272=gebs("link@rel=\"k5interrupt\"",gebtn("head")[0]);
}
for(var i=0;i<_272.length;i++){
var link=_272[i];
var _279=link.getAttribute("match");
var _27a=link.getAttribute("select");
if(!_279&&!_27a){
continue;
}
var _279=_279||".?";
var _27a=_27a||"*";
var _27b=new RegExp(_279);
if(!_279&&!_27a){
continue;
}
if(!_27b.test(_276)||!matches(el,_27a)){
continue;
}
var href=link.href;
var _27d=link.getAttribute("title");
var _27e=link.getAttribute("thanks");
var _27f=elem("a",{"class":link.className+" k5interrupt","href":href},_27d);
_27f.continueTo=_274;
_27f.submitTo=_275;
_27f.thankYouHref=_27e;
try{
return k5Click.call(_27f);
}
catch(ex){
console.log("error while calling k5Click(): "+ex.message);
return true;
}
}
}
var _280=/^https?:/;
var _281=/^\/\//;
var _282=/^\//;
var _283=/^\?/;
var _284=/^#/;
var l=location;
var _286=l.protocol+"//"+l.host+l.pathname;
_286=_286.substring(0,_286.lastIndexOf("/")+1);
function resolveUrl(frag,_288){
frag=frag.strip();
var _289=null;
if(_280.test(frag)){
_289=frag;
}else{
if(_281.test(frag)){
_289=l.protocol+frag;
}else{
if(_282.test(frag)){
_289=l.protocol+"//"+l.host+frag;
}else{
if(_283.test(frag)){
_289=l.protocol+"//"+l.host+l.pathname+frag;
}else{
if(_284.test(frag)){
_289=l.protocol+"//"+l.host+l.pathname+l.search+frag;
}else{
if(!frag){
_289=l.href;
}else{
_289=_286+frag;
}
}
}
}
}
}
if(_288){
var qind=_289.indexOf("?");
var hind=_289.indexOf("#");
if(qind!=-1){
_289=_289.substring(0,qind);
}
if(hind!=-1){
_289=_289.substring(0,hind);
}
_289+="?"+_288;
}
return _289;
}
reg.click("@href",function(e){
return handleIt(this,resolveUrl(this.href),null,resolveUrl(this.href));
});
reg.submit("form",function(e){
return handleIt(this,null,this,resolveUrl(this.action));
});
reg.submit(".k5interrupt",function(e){
cancelDefault(e);
if(!this.continueTo&&!this.submitTo){
console.log("no continueTo url or submitTo form");
return false;
}
var _28f=this.continueTo;
var _290=this.submitTo;
var _291=this.thankYouHref;
var _292=this.className;
var _293=getTarget(e);
var _294=getFormData(_293);
var url=resolveUrl(_293.action,_294);
var _296=this;
if(_293.whichSubmit){
_293.whichSubmit.value="sending...";
}
try{
xhr(url,function(){
if(_291){
k5Click.call(elem("a",{"href":_291,"class":_292},"Thank You"));
window.setTimeout(function(){
k5Close();
_28f&&(location.href=_28f);
_290&&_290.submit();
},2700);
}else{
k5Close();
_28f&&(location.href=_28f);
_290&&_290.submit();
}
},function(_297,_298){
console.log(url+" returned "+_297+": "+_298);
k5Close();
_28f&&(location.href=_28f);
_290&&_290.submit();
});
}
catch(ex){
if(_28f){
_293.appendChild(elem("input",{"type":"hidden","name":"redirect_to","value":_28f}));
}else{
if(_290){
_293.appendChild(elem("input",{"type":"hidden","name":"redirect_to","value":resolveUrl(_290.action,getFormData(_290))}));
}
}
_293.submit();
window.setTimeout(function(){
k5Close();
},100);
}
});
reg.click(".k5skip",function(e){
var _29a=gebi("k5");
if(!_29a||(!_29a.continueTo&&!_29a.submitTo)){
return;
}
var _29b=_29a.continueTo;
var _29c=_29a.submitTo;
k5Close();
_29b&&(location.href=_29b);
_29c&&_29c.submit();
return false;
});
reg.click(".k5interrupt form @type=\"submit\"",function(e){
if(hcn(this,"k5skip")){
return;
}
var form=getParent(this,"form");
form.whichSubmit=this;
});
})();
function surveyPop(url,_2a0,_2a1,_2a2,_2a3,_2a4){
if(_2a0&&_2a0<Math.random()){
return false;
}
var ck=document.cookie;
var _2a6="surveyHash";
var _2a7=ck.split("; ");
var _2a8=url.toLowerCase().replace(/[^a-z0-9_\/]/g,"_");
var _2a9=new RegExp("^"+_2a6+"_"+_2a8+"=seen$");
for(var i=0;i<_2a7.length;i++){
if(_2a9.test(_2a7[i])){
return false;
}
}
if(_2a1){
if(_2a1<0){
_2a1=9999;
}
var _2ab=new Date();
_2ab.setTime(_2ab.getTime()+_2a1*1000*60*60*24);
document.cookie=_2a6+"_"+_2a8+"=seen; expires="+_2ab.toGMTString();
}
if(!_2a3){
_2a3=548;
}
if(!_2a2){
_2a2=600;
}
var args="resizable,status,width="+_2a3+",height="+_2a2;
if(!_2a4){
args+=",scrollbars";
}
var _2ad=window.open(url,"_surveyWin",args);
return _2ad;
}
var imgpostload=[];
reg.postSetup(function(){
if(typeof imgpostload=="undefined"){
return;
}
for(var imp=0;imp<imgpostload.length;imp++){
if(imgpostload[imp].title){
imgpostload[imp].src=imgpostload[imp].title;
imgpostload[imp].title="";
}
}
});
if(!shutoff.global){
if(is.ie56){
reg.setup("div.g15v5 > table",function(){
addClassName(this,"tickle");
});
}
}
if(!shutoff.share){
reg.setup("div.pagetitle, div.smallpagetitle",sniffSharePage,true);
}
if(!shutoff.misc){
reg.setup("@class*='cTool-'",sniffClassTool);
reg.setup("img@src*='_off.'",sniffRollover);
reg.setup("div.g23",sniffG23);
reg.setup("div.g27w2",sniffG27);
reg.click("div.g27w2 > h3 > span.g27targ",toggleG27);
reg.setup("div.imgbox",sniffImgbox);
reg.setup("select.goto, select.showDiv",sniffGoto);
reg.setup("ul.goto, ul.showDiv",sniffGotoUL);
reg.setup(".xfadefirst",sniffXfade);
reg.setup("ul.listfade",sniffListfade);
reg.setup("a.loadUrl@href",sniffLoadUrl);
reg.setup("a.imgswap, area.imgswap, img.imgswap, span.imgswap",sniffImgswap);
reg.setup("img@class*=\"mswap\"",sniffMultiswap);
reg.setup("img.postload",function(){
imgpostload.push(this);
});
reg.setup("a.toggleObj, area.toggleObj",sniffToggler);
reg.setup("a.toggle-all-table-checkboxes",sniffToggleAllCheckboxesInTable);
reg.setup("div.pc1collapsible",sniffExpandCollapsePc1);
reg.setup("form@class*=\"wgform-\"",sniffFormHijax);
reg.setup("div.g15v5 > table.details tr.main-row > th",function(){
this.appendChild(elem("div.after",{},[elem("div.show",{},ltxt.showDetails),elem("div.hide",{},ltxt.hideDetails)]));
});
if(location.hash){
reg.setup("div.g15v5 table tbody"+location.hash,function(){
removeClassName(this,"collapsed");
addClassName(this,"uncollapsed");
});
}
if(is.ie56){
reg.setup("div.g15v5 > table",function(){
addClassName(this,"tickle");
});
}
if(typeof widgets!="undefined"){
reg.setup(".wg1",sniffWg1);
}
}
reg.preSetup(function(){
var pc10=gebi("pc10");
if(!pc10){
return;
}
var imgs=gebs("p.pc10img img.pc10img");
if(!imgs||imgs.length==0){
return;
}
for(var a=0;a<imgs.length;a++){
var img=imgs[a];
var src=img.src;
var _2b4=src.replace(/(\.[a-z]+$)/,"_hvr$1");
var _2b5=img.cloneNode(true);
_2b5.src=_2b4;
_2b5.className="pc10img_over";
img.parentNode.appendChild(_2b5);
}
if(!window.pc10active){
window.pc10active=true;
reg.hover("div.pc10item",function(e){
addClassName(this,"pc10itemover");
},function(e){
removeClassName(this,"pc10itemover");
});
}
});
reg.preSetup(function(){
var fn1=gebi("productFinder");
if(!fn1){
return;
}
reg.setup("td.fnCmp input@type=\"checkbox\"",function(){
if(this.checked==true){
addClassName(this.parentNode.parentNode,"checked");
}
});
reg.setup("ul#fn1Filters",function(){
var ems=gebtn("em",this);
for(var i=0;i<ems.length;i++){
if(ems[i].parentNode.nodeName.toLowerCase()=="li"){
var a=elem("a",{"href":"#toggleView"});
a.onclick=function(){
toggleClassName(this.parentNode.parentNode,"collapsed");
return false;
};
innerWrap(ems[i],a);
}
}
var li=gebtn("li",this);
var n=0;
for(var i=0;i<li.length;i++){
var _2be=gebtn("li",li[i])[0];
if(li[i].parentNode==this&&n>3&&_2be&&_2be.className.indexOf("selection")>-1){
addClassName(li[i],"collapsed");
}else{
if(li[i].parentNode==this&&gebtn("em",li[i])[0]){
n++;
}
}
}
});
reg.setup("fieldset.fieldset-collapsed,fieldset.fieldset-uncollapsed",function(){
if(gebtn("h6",this)[0]){
var a=elem("a.fieldsettoggle",{"href":"#toggleView"});
innerWrap(gebtn("h6",this)[0],a);
addClassName(gebtn("h6",this)[0],"fieldsettoggle");
}
});
reg.click("td.fnCmp input@type=\"checkbox\"",function(){
var _2c0=this;
while(_2c0=_2c0.parentNode){
if(_2c0.nodeName.toLowerCase()=="form"){
var form=_2c0;
break;
}
}
var _2c2=form.className.split("maxchecked-")[1].split(" ")[0];
if(_2c2){
var n=0;
var ck=gebtn("input",form);
for(var i=0;i<ck.length;i++){
if(ck[i].type=="checkbox"&&ck[i].checked==true){
n++;
}
}
if(n>_2c2){
this.checked=false;
alert(ltxt["maxCheckedPart1"]+" "+_2c2+" "+ltxt["maxCheckedPart2"]);
}
}
if(this.checked==true){
addClassName(this.parentNode.parentNode,"checked");
}else{
if(this.checked==false){
removeClassName(this.parentNode.parentNode,"checked");
}
}
});
});
reg.preSetup(function(){
var frw=gebi("findresellerwidget");
if(!frw){
return;
}
frw.onsubmit=function(e){
var k=this.keywords;
var l=this.location;
if(hasClassName(k,"autoclear")&&k.value==k.defaultValue){
k.value="";
}
if(hasClassName(l,"autoclear")&&l.value==l.defaultValue){
l.value="";
}
return true;
};
});
reg.click("a@class*=\"hijax-\",@class*=\"hijax-\" a,.fn1 .g8pages a",hijaxLink);
reg.click("div.g15v5 tr.main-row > th@scope=\"row\"",function(ev){
switchClassName(this.parentNode.parentNode,"collapsed","uncollapsed");
});
reg.hover("img.spriteswap",spriteOver,spriteOut,0);
reg.hover("div.d4 span.linkUrl",d4makelink);
reg.hover("div.d4 a.linkUrl",function(){
},d4killLink);
reg.click(".modal-close",modalClose);
reg.click("a@class*=\"mswap\", area@class*=\"mswap\", span@class*=\"mswap\"",clickMultiswap);
reg.click("a.fieldsettoggle",function(ev){
switchClassName(this.parentNode.parentNode,"fieldset-collapsed","fieldset-uncollapsed");
return false;
});
reg.click("a#sr2Adv,a.sr2Adv",function(){
addClassName(document.getElementById("sr2"),"sr2showOptions");
document.getElementById("searchtermsAll").focus();
return false;
});
reg.click("a#sr2Simple,a.sr2Simple",function(){
removeClassName(document.getElementById("sr2"),"sr2showOptions");
document.getElementById("simpleSearch").focus();
return false;
});
function sniffG27(){
var h3=gebtn("h3",this);
if(!h3||h3.length<1){
return;
}
h3=h3[0];
var _2cd=elemText(h3).strip();
var _2ce=elem("span.g27targ");
acn(h3,"g27head");
innerWrap(h3,_2ce);
if(!_2cd){
var im=elem("img.g27targimg",{"src":imdir+"/a.gif","alt":""});
_2ce.appendChild(im);
}
var _2d0=gebcn("g27block",this);
if(!_2d0||_2d0.length<1){
return;
}
_2d0=_2d0[0];
if(hcn(_2d0,"hidethis")){
acn(this,"g27collapsed");
rcn(this,"g27expanded");
}else{
rcn(this,"g27collapsed");
acn(this,"g27expanded");
}
}
function toggleG27(e){
var h3=this.parentNode;
var _2d3=h3.parentNode;
var _2d4=gebcn("g27block",_2d3);
if(!_2d4||_2d4.length<1){
return;
}
_2d4=_2d4[0];
if(hcn(_2d4,"hidethis")){
rcn(_2d4,"hidethis");
rcn(_2d3,"g27collapsed");
acn(_2d3,"g27expanded");
}else{
acn(_2d4,"hidethis");
acn(_2d3,"g27collapsed");
rcn(_2d3,"g27expanded");
}
}
function sniffG23(){
var fobj=this;
if(hasClassName(this,"static")){
var uls=gebcn("g23tree",fobj,"ul");
for(var a=0;a<uls.length;a++){
var tree=uls[a];
var lis=gebtn("li",tree);
for(var b=0,li;li=lis[b++];){
var _2db=!nextElem(li);
if(_2db){
addClassName(li,"last");
}
if(is.ie6&&_2db){
addClassName(li,"ie-"+(hasClassName(li,"collapsed")?"collapsed":"expanded")+"-last");
}
var _2dc=li.firstChild;
if(_2dc.nodeType!=1){
_2dc=nextElem(_2dc);
}
if(hasClassName(li,"branch")&&_2dc&&_2dc.href){
var link=elem("a.g23toggler",{"href":_2dc.href},elem("img",{"src":"/im/a.gif","height":"10","width":"20","alt":"expand / collapse "}));
li.insertBefore(link,li.firstChild);
}
}
}
return;
}
var uls=gebcn("g23tree",fobj,"ul");
for(var a=0;a<uls.length;a++){
var tree=uls[a];
var lis=gebtn("li",tree);
for(var b=0,li;li=lis[b++];){
var _2de=hasClassName(li,"default-expanded");
var _2df=false;
if(gebtn("ul",li).length>0){
if(_2de){
addClassName(li,"branch");
}else{
addClassName(li,"collapsed branch");
}
_2df=true;
var _2e0=gebtn("ul",li)[0];
_2e0.parentNode.removeChild(_2e0);
li.innerWrap=elem("div.g23x");
innerWrap(li,li.innerWrap);
li.appendChild(_2e0);
}
var _2db=!nextElem(li);
if(_2db){
addClassName(li,"last");
}
if(is.ie6){
li.isLast=_2db;
li.isBranch=_2df;
}
if(is.ie6&&li.isLast&&li.isBranch&&_2de){
addClassName(li,"ie-expanded-last");
}else{
if(is.ie6&&li.isLast&&li.isBranch&&!_2de){
addClassName(li,"ie-collapsed-last");
}
}
if(_2df){
var link=elem("a.g23toggler",{},elem("img",{"src":"/im/a.gif","height":"10","width":"20","alt":"expand / collapse "}));
link.onclick=function(){
var _2e1=getParent(this,"li");
if(!hasClassName(_2e1,"collapsed")){
addClassName(_2e1,"collapsed");
if(is.ie6&&_2e1.isLast&&_2e1.isBranch){
addClassName(_2e1,"ie-collapsed-last");
removeClassName(_2e1,"ie-expanded-last");
}
}else{
removeClassName(_2e1,"collapsed");
if(is.ie6&&_2e1.isLast&&_2e1.isBranch){
removeClassName(_2e1,"ie-collapsed-last");
addClassName(_2e1,"ie-expanded-last");
}
}
};
gebtn("div",li)[0].insertBefore(link,gebtn("div",li)[0].firstChild);
if(hasClassName(tree,"g23check-tree")){
var _2e2=document.createElement("span");
_2e2.className="g23checked-count";
for(var c=0;c<li.childNodes.length;c++){
if(li.childNodes[c].nodeName.toLowerCase()=="ul"){
li.sublist=li.childNodes[c];
}
if(hasClassName(li.childNodes[c],"g23item-extra-info")){
li.extraInfo=li.childNodes[c];
}
}
li.innerWrap.appendChild(_2e2);
li.countSpan=_2e2;
_2e2.appendChild(document.createTextNode(" "));
if(window.opera){
_2e2.innerHTML="&nbsp;";
}
li.updateCount=function(){
var _2e4=0;
var _2e5=gebs("input@type=\"checkbox\"",this.sublist);
for(var b=0;b<_2e5.length;b++){
if(_2e5[b].checked){
_2e4++;
}
}
_2e5=null;
if(this.countSpan){
if(_2e4<1){
this.countSpan.firstChild.data=" ";
if(window.opera){
this.countSpan.innerHTML="&nbsp;";
}
}
if(_2e4==1){
this.countSpan.firstChild.data="(1 checked item not shown)";
}
if(_2e4>1){
this.countSpan.firstChild.data="("+_2e4+" checked items not shown)";
}
}
};
}
}
li=null;
}
if(location.hash){
var _2e7=gebi(location.hash.substring(1));
if(_2e7&&matches(_2e7,"ul.g23tree li")){
do{
removeClassName(_2e7,"collapsed");
_2e7=getParent(_2e7,"ul.g23tree li");
}while(_2e7);
}
}
if(hasClassName(tree,"g23check-tree")){
var _2e8=gebs("input@type=\"checkbox\"",tree);
for(var b=0;b<_2e8.length;b++){
var _2e9=getParent(_2e8[b],"li");
_2e9.checkBox=_2e8[b];
_2e8[b].onclick=function(){
var _2ea=getParent(this,"li");
var _2eb=gebtn("input",_2ea);
for(var c=0;c<_2eb.length;c++){
_2eb[c].checked=this.checked;
}
var _2ed=gebtn("li",_2ea);
for(var c=0;c<_2ed.length;c++){
if(typeof _2ed[c].updateCount=="function"){
_2ed[c].updateCount();
}
}
var _2ee=getParent(_2ea,"li");
if(!this.checked){
_2ea=this;
while(_2ea.parentNode){
_2ea=_2ea.parentNode;
if(_2ea.checkBox){
_2ea.checkBox.checked=false;
}
}
}else{
if(_2ee&&_2ee.checkBox){
_2eb=gebtn("input",_2ee);
var _2ef=true;
for(var c=0;c<_2eb.length;c++){
if(_2eb[c].type!="checkbox"){
continue;
}
if(_2eb[c]!=_2ea.parentNode.parentNode.checkBox&&!_2eb[c].checked){
_2ef=false;
}
}
_2ea.parentNode.parentNode.checkBox.checked=_2ef;
}
}
_2ea=this;
while(_2ea.parentNode){
_2ea=_2ea.parentNode;
if(typeof _2ea.updateCount=="function"){
_2ea.updateCount();
}
}
_2ea=null;
};
}
if(location.hash){
var _2e7=location.hash.substring(1);
for(var b=0;b<lis.length;b++){
var li=lis[b];
if(li.id==_2e7){
var _2e8=gebtn("input",li);
for(var c=0;c<_2e8.length;c++){
if(_2e8[c].type!="checkbox"){
continue;
}
_2e8[c].checked=true;
}
var el=li;
while(el.parentNode&&!hasClassName(el,"g23tree")){
if(el.nodeName.toLowerCase()=="li"&&hasClassName(el,"branch")){
removeClassName(el,"collapsed");
if(is.ie6&&el.isLast&&el.isBranch){
removeClassName(el,"ie-collapsed-last");
addClassName(el,"ie-expanded-last");
}
}
el=el.parentNode;
}
var _2f2=gebtn("li",li);
for(var c=0,subitem;subitem=_2f2[c++];){
if(hasClassName(subitem,"branch")){
removeClassName(subitem,"collapsed");
if(is.ie6&&subitem.isLast&&subitem.isBranch){
removeClassName(subitem,"ie-collapsed-last");
addClassName(subitem,"ie-expanded-last");
}
}
}
_2e8=null;
el=null;
}
}
}
for(var b=0;b<lis.length;b++){
var li=lis[b];
if(typeof li.updateCount=="function"){
li.updateCount();
}
li=null;
}
}
tree=null;
}
}
var preloaderOn=[];
var preloaderOff=[];
var preloaderActive=[];
var activeImg=[];
function sniffRollover(){
var fobj=this;
fobj.rsrc=fobj.src;
preloaderOff[fobj.rsrc]=new Image();
preloaderOff[fobj.rsrc].src=fobj.rsrc;
if(hasClassName(fobj,"rollover")){
preloaderOn[fobj.rsrc]=new Image();
preloaderOn[fobj.rsrc].src=fobj.src.replace(/_off\./,"_on.");
fobj.onmouseout=function(){
if(activeImg[this.imgGroup]!=this){
this.src=preloaderOff[this.rsrc].src;
}
};
fobj.onmouseover=function(){
if(activeImg[this.imgGroup]!=this){
this.src=preloaderOn[this.rsrc].src;
}
};
}
if(fobj.className.indexOf("active-")>-1){
fobj.imgGroup=fobj.className;
fobj.imgGroup=fobj.imgGroup.replace(/.*active-(.*).*/,"$1");
preloaderActive[fobj.rsrc]=new Image();
preloaderActive[fobj.rsrc].src=fobj.src.replace(/_off\./,"_active.");
if(fobj.className.indexOf("setactive-")>-1){
activeImg[fobj.imgGroup]=fobj;
fobj.src=preloaderActive[fobj.rsrc].src;
}
fobj.onclick=function(){
if(this.src!=preloaderActive[this.rsrc].src){
this.src=preloaderActive[this.rsrc].src;
if(activeImg[this.imgGroup]){
activeImg[this.imgGroup].src=preloaderOff[activeImg[this.imgGroup].rsrc].src;
}
activeImg[this.imgGroup]=this;
}
};
}
}
function sniffGoto(){
var fobj=this;
if(hasClassName(fobj,"showDiv")){
addEvent(fobj,"change",function(){
var _2f5=this.options[this.selectedIndex].value.split("#")[1];
if(this.currentItem){
addClassName(this.currentItem,"hidethis");
}
if(gebi(_2f5)){
this.currentItem=gebi(_2f5);
removeClassName(this.currentItem,"hidethis");
}else{
this.currentItem=null;
}
});
}else{
if(this.className.indexOf("hijax-")>-1){
addEvent(fobj,"change",function(){
var link=this.options[this.selectedIndex];
try{
var id=matchClassName(this,/^hijax-(\S*)/)[1];
var _2f8=gebi(id);
var h=_2f8.offsetHeight;
_2f8.innerHTML="";
_2f8.style.height=h+"px";
addClassName(_2f8,"hijaxLoading");
}
catch(ex){
return;
}
if(_2f8.className.indexOf("hijaxTrue")>-1){
var _2fa=(link.value.indexOf("?")>-1)?"&":"?";
var _2fb=link.value+_2fa+"hijax=true";
}else{
var _2fb=link.value;
}
if(link.value!=""&&link.getAttribute("value")){
xhr(_2fb,function(_2fc,obj){
var el=getElementByIdFromString(_2fc,id);
if(!el){
window.location=link.href;
}
_2fc=el.innerHTML;
hijaxCache[_2fb+" "]=_2fc;
removeClassName(_2f8,"hijaxLoading");
_2f8.style.height="auto";
_2f8.innerHTML=_2fc;
reg.rerun(_2f8);
if(gebi("linkToPage")){
gebi("linkToPage").href=link.value;
}
},function(){
window.location=link.value;
});
}
});
}else{
addEvent(fobj,"change",function(){
if(this.options[this.selectedIndex].value!=""&&this.options[this.selectedIndex].getAttribute("value")){
document.location=this.options[this.selectedIndex].value;
}
});
}
}
}
function sniffGotoUL(){
var fobj=this;
var li=getChildNodesByTagName(fobj,"li");
var _301="";
var _302=prevElem(fobj);
if(_302&&hasClassName(_302,"listTitle")&&gebtn("a",_302)[0]){
_301=_301+"<option value=\""+gebtn("a",_302)[0].href+"\" class=\"gotoHeading\">"+_302.innerHTML+"</option>\n";
}else{
if(_302&&hasClassName(_302,"listTitle")){
_301=_301+"<option value=\"\" class=\"gotoHeading\">"+_302.innerHTML+"</option>\n";
}
}
var _303="goto";
var hi=(this.className.indexOf("hijax-")>-1)?" "+matchClassName(this,/^(hijax-\S*)/)[1]:"";
var form=elem("form",{"action":""});
fobj.parentNode.insertBefore(form,fobj);
if(hasClassName(fobj,"showDiv")){
_303="showDiv";
var _306=document.createElement("div");
fobj.parentNode.insertBefore(_306,fobj);
}
for(var n=0;n<li.length;n++){
var sel=(li[n].className.indexOf("selected")>-1)?" selected=\"selected\"":"";
if(gebtn("a",li[n])[0]){
_301=_301+"<option"+sel+" value=\""+gebtn("a",li[n])[0].href+"\">"+gebtn("a",li[n])[0].innerHTML+"</option>";
}else{
if(li[n].innerHTML){
_301=_301+"<option"+sel+" value=\"\">"+li[n].innerHTML+"</option>";
}
}
if(hasClassName(fobj,"showDiv")&&gebtn("div",li[n])[0]){
_306.appendChild(gebtn("div",li[n])[0]);
}
}
form.innerHTML="<select class=\""+_303+hi+"\">"+_301+"</select>";
fobj.parentNode.removeChild(fobj);
reg.rerun(form);
}
var zimg=1;
function sniffImgbox(){
var _309=this;
var img=gebtn("img",_309)[0];
_309.style.background="url("+img.src+") no-repeat";
_309.style.width=img.width+"px";
_309.style.height=img.height+"px";
img.style.visibility="hidden";
if(is.ie56&&hasParent(_309,"div","g20w1")){
var _30b=hasParent(_309,"div","g20w1");
_30b.style.width=((img.width*1)+12)+"px";
addClassName(_30b,"showcorners");
}
if(hasClassName(_309,"imgcorners")){
_309.innerHTML="<div class=\"imgw1\"><div class=\"imgw2\"><div class=\"imgw3\"><div class=\"imgw4\" style=\"width:"+img.width+"px;height:"+img.height+"px\">"+_309.innerHTML+"</div></div></div></div>";
}
if(hasClassName(_309,"imgzoom")){
var _30c=gebtn("a",_309)[0].href;
var _30d=document.createElement("div");
_30d.className="zoomimg k2";
_30d.id="zoomimg"+zimg;
var _30e=document.createElement("a");
_30e.style.backgroundImage="none";
_30e.onclick=function(){
return false;
};
var _30f=document.createElement("img");
_30f.src=_30c;
_30e.appendChild(_30f);
_30d.appendChild(_30e);
_309.appendChild(_30d);
if(hasClassName(_309,"imgright")){
_309.className=_309.className+" hAlignRight x10";
}else{
_309.className=_309.className+" x-10";
}
_309.className=_309.className+" vAlignTopBottom y-10 k2over-zoomimg"+zimg;
sniffK2.call(_309);
var _310=gebtn("a",_309)[0];
_310.onclick=function(){
return false;
};
_310.style.width=img.width+"px";
_310.style.height=img.height+"px";
zimg++;
}
}
function sniffSharePage(){
var _311=this;
if(typeof sharetxt!="undefined"){
var _312=getSafelyEncodedString(location.href);
var _313=getSafelyEncodedString(document.title);
var _314="\t\t<div class=\"sharepagew1 share-mailto\">\t\t<table summary=\"layout\" cellpadding=\"0\" cellspacing=\"0\"><tr>\t\t<td id=\"share-mailto\"><a href=\"mailto:?subject="+sharetxt[0]+"{pagetitle}&body="+sharetxt[1]+"%0A%0A"+_312+"\" class=\"sharelink mailto\" title=\""+sharetxt[2]+"\"></a></td>\t\t<td id=\"share-technorati\"><a href=\"http://technorati.com/search/"+_312+"\" class=\"sharelink technorati\" title=\""+sharetxt[3]+"\"></a></td>\t\t<td id=\"share-delicious\"><a href=\"http://del.icio.us/post?v=4;url="+_312+";title="+_313+"\" class=\"sharelink delicious\" title=\""+sharetxt[4]+"\"></a></td>\t\t<td id=\"share-digg\"><a href=\"http://digg.com/submit?phase=2&amp;url="+_312+"&amp;title="+_313+"\" class=\"sharelink digg\" title=\""+sharetxt[5]+"\"></a></td>\t\t<td id=\"share-slashdot\"><a href=\"http://slashdot.org/bookmark.pl?title="+_313+"&amp;url="+_312+"\" class=\"sharelink slashdot\" title=\""+sharetxt[6]+"\"></a></td>\t\t";
var _315=gebtn("link");
var _316=null;
var _317=null;
var _318=0;
for(var a=0;a<_315.length;a++){
if(""+_315[a].rel.toLowerCase()=="alternate"){
_318++;
if(!_316){
_316=_315[a].href;
_317=_315[a].title;
}
}
}
if(_318>1){
_314+="<td id=\"share-multiple-feeds\"><a href=\"#\" title=\""+sharetxt[7]+"\"></a></td>";
}else{
if(_318==1){
_314+="<td id=\"share-feed\"><a href=\""+_316+"\" class=\"sharelink feed\" title=\""+_317+"\"></a></td>";
}else{
_314+="<td id=\"share-blank\"> </td>";
}
}
_314+="</tr></table></div>";
if(hasClassName(document.body,"a0v3")){
return;
}
_311.id="sharepage";
if(is.ie5){
return;
}
if(typeof _314=="undefined"){
return;
}
_313=(gebtn("h1",_311)[0])?elemText(gebtn("h1",_311)[0]):_313;
_313=_313.normalize();
_314=_314.replace(/{pagetitle}/,_313);
var _31a=gebtn("meta");
for(var a=0;a<_31a.length;a++){
if(""+_31a[a].name.toLowerCase()=="share-this-page"&&""+_31a[a].content.toLowerCase()=="no"){
return;
}
}
var _31b=document.createElement("div");
_31b.className="sharepage";
_311.appendChild(_31b);
_31b.innerHTML=_314;
var mult=gebi("share-multiple-feeds");
if(mult){
var lnk=gebtn("a",mult)[0];
lnk.titleDiv=_311;
lnk.mult=mult;
addEvent(lnk,"click",function(e){
if(!this.feedListDiv){
var _31f=gebtn("link");
var _320=[];
var _321="<ul>";
for(var a=0;a<_31f.length;a++){
if(""+_31f[a].rel.toLowerCase()=="alternate"){
_320[_320.length]=_31f[a];
}
}
for(var a=0;a<_320.length;a++){
_321+="<li";
if(a==0){
_321+=" class=\"first-child\"";
}else{
if(a==_320.length-1){
_321+=" class=\"last-child\"";
}
}
_321+="><div><a class=\"sharelink feed\" href=\""+_320[a].href+"\">"+_320[a].title+"</a></div></li>";
}
_321+="</ul><span class=\"x1\"></span><span class=\"x2\"></span>";
var _323=elem("div",{"id":"share-feed-list"});
_323.innerHTML=_321;
this.titleDiv.appendChild(_323);
this.feedListDiv=_323;
addClassName(this.mult,"showing");
tagOmnitureCustomLinksForSharePage(this.feedListDiv);
}else{
if(hasClassName(this.feedListDiv,"hidethis")){
removeClassName(this.feedListDiv,"hidethis");
addClassName(this.mult,"showing");
}else{
addClassName(this.feedListDiv,"hidethis");
removeClassName(this.mult,"showing");
}
}
cancelDefault(e);
});
}
tagOmnitureCustomLinksForSharePage(_31b);
}
}
function tagOmnitureCustomLinksForSharePage(el){
if(typeof window.s_co!="undefined"){
var _325=function(e){
var _327=this.className.replace(/sharelink /,"")+": ";
s_linkType="o";
s_linkName=_327+this.href;
s_lnk=s_co(this);
s_gs(s_account);
};
var _328=gebtn("a",el);
for(var a=0;a<_328.length;a++){
if(!hasClassName(_328[a],"sharelink")){
continue;
}
addEvent(_328[a],"click",_325);
}
}
}
var imgpreload=[];
function sniffImgswap(){
var link=this;
if(link.src){
imgpreload[link.id]=new Image();
imgpreload[link.id].src=link.src;
}else{
link.imgref=link.className.replace(/[^ ]* ?([^ ]+_\d).*/,"$1").split("_");
link.src=gebi(link.imgref[0]).src.replace(/_\d+\./,"_"+link.imgref[1]+".");
imgpreload[link.src]=new Image();
imgpreload[link.src].src=link.src;
if(!hasClassName(link,"swapOnclick")){
link.onmouseover=function(){
gebi(this.imgref[0]).src=imgpreload[this.src].src;
};
link.onmouseout=function(){
gebi(this.imgref[0]).src=imgpreload[this.imgref[0]].src;
};
if(!hasClassName(link,"followLink")){
link.onclick=function(){
return false;
};
}
}else{
link.onclick=function(){
imgpreload[this.imgref[0]].src=gebi(this.imgref[0]).src=imgpreload[this.src].src;
return false;
};
}
}
}
function sniffMultiswap(){
var fobj=this;
if(fobj.src){
imgpreload[fobj.id]=new Image();
imgpreload[fobj.id].src=fobj.src;
if(fobj.className.indexOf("mswap-")>-1){
var aimg=fobj.className.split("mswap-")[1].split("-")[0].split(" ")[0];
fobj.src=fobj.src.replace(/[^\/]+(\.....?)$/,aimg+"$1");
}
}
}
function clickMultiswap(){
this.targetid=this.className.split("mswap-")[1].split("-")[0].split(" ")[0];
var _32d=this.targetid.replace(/(.*)\d+?/,"$1");
this.pre=_32d;
if(this.className.indexOf("mswap-"+this.targetid+"-")>-1){
var _32e=this.className.split("mswap-"+this.targetid+"-")[1].split(" ")[0];
}else{
var _32e=this.href.replace(/.*\/([^\/]+)?/,"$1").split(".")[0];
}
this.src=gebi(this.targetid).src.replace(/[^\/]+(\.....?)$/,_32e+"$1");
imgpreload[this]=new Image();
imgpreload[this].src=this.src;
var n=1;
while(gebi(this.pre+n)){
gebi(this.pre+n).src=imgpreload[this.pre+n].src;
n++;
}
gebi(this.targetid).src=this.src;
if(hasClassName(this,"followLink")||this.target!=""){
}else{
cancelDefault(e);
}
}
function sniffToggleAllCheckboxesInTable(){
var lnk=this;
var pTab=lnk.parentNode;
while(pTab.nodeName.toLowerCase()!="table"){
pTab=pTab.parentNode;
}
lnk.checkStatus=true;
lnk.titleSelect="Select All";
lnk.titleUnselect="Unselect All";
lnk.title=lnk.titleSelect;
lnk.img=gebtn("img",lnk)[0];
lnk.img.alt=lnk.titleSelect;
var _332=gebtn("input",pTab);
lnk.checkboxes=[];
for(var b=0;b<_332.length;b++){
if("checkbox"==_332[b].type){
lnk.checkboxes.push(_332[b]);
}
}
lnk.onclick=function(){
for(var c=0;c<this.checkboxes.length;c++){
this.checkboxes[c].checked=this.checkStatus;
}
this.title=(this.checkStatus)?this.titleUnselect:this.titleSelect;
this.img.alt=(this.checkStatus)?this.titleUnselect:this.titleSelect;
this.checkStatus=!this.checkStatus;
return false;
};
}
function sniffExpandCollapsePc1(){
var div=this;
addClassName(div,"pc1collapsed");
removeClassName(div,"pc1collapsible");
var h=gebtn("h2",div)[0];
var lnk=elem("a",{"href":"#"}," "+elemText(h));
var im=elem("img",{"src":"/im/pc1-expand.gif","alt":"","class":"pc1expand-collapse-icon","border":"0"});
im.srcCollapse="/im/pc1-collapse.gif";
im.srcExpand=im.src;
lnk.titleCollapse="Collapse this section";
lnk.titleExpand="Expand this section";
lnk.title=lnk.titleExpand;
lnk.insertBefore(im,lnk.firstChild);
lnk.im=im;
lnk.div=div;
h.innerHTML="";
h.appendChild(lnk);
lnk.onclick=function(){
if(hasClassName(this.div,"pc1expanded")){
addClassName(this.div,"pc1collapsed");
removeClassName(this.div,"pc1expanded");
this.title=this.titleExpand;
this.im.src=this.im.srcExpand;
}else{
addClassName(this.div,"pc1expanded");
removeClassName(this.div,"pc1collapsed");
this.title=this.titleCollapse;
this.im.src=this.im.srcCollapse;
}
return false;
};
var _339=gebcn("cornerBR",div)[0];
var p=elem("p",{"class":"pc1expand-note"}," Click the plus icon to expand this section.");
_339.appendChild(p);
}
function sniffClassTool(){
var fobj=this;
var cls=fobj.className.split(" ");
for(var v=0;v<cls.length;v++){
if(cls[v].indexOf("cTool-")==0){
var objs=cls[v].split("cTool-")[1].split("-");
if(objs[objs.length-1].indexOf("RMV")>-1||objs[objs.length-1].indexOf("TGL")>-1||objs[objs.length-1].indexOf("ADD")>-1){
var _33f="click";
}else{
var _33f=objs[objs.length-1];
objs.pop();
}
fobj.objs=objs;
fobj.tid=objs.shift();
var _340=fobj.tid;
if(fobj.tid=="this"){
fobj.tid=fobj;
}
if(_33f=="hover"&&!is.ie56&&_340=="this"){
}else{
if(_33f=="hover"){
addEvent(fobj,"mouseout",function(e){
classomatic(this.tid,this.objs);
});
var _33f="mouseover";
addEvent(fobj,_33f,function(e){
classomatic(this.tid,this.objs);
if(_33f=="click"){
cancelDefault(e);
}
});
}else{
addEvent(fobj,_33f,function(e){
classomatic(this.tid,this.objs);
if(_33f=="click"){
cancelDefault(e);
}
});
}
}
}
}
}
function classomatic(id,todo){
if(!gebi(id)){
var tobj=id;
}else{
var tobj=gebi(id);
}
for(var v=0;v<todo.length;v++){
if(todo[v].indexOf("RMV")==0){
removeClassName(tobj,todo[v].substring(3,todo[v].length));
}else{
if(todo[v].indexOf("ADD")==0){
addClassName(tobj,todo[v].substring(3,todo[v].length));
}else{
if(todo[v].indexOf("TGL")==0){
if(hasClassName(tobj,todo[v].substring(3,todo[v].length))){
removeClassName(tobj,todo[v].substring(3,todo[v].length));
}else{
if(!hasClassName(tobj,todo[v].substring(3,todo[v].length))){
addClassName(tobj,todo[v].substring(3,todo[v].length));
}
}
}
}
}
}
}
function sniffToggler(){
var fobj=this;
if(fobj.toggler){
return;
}
if(hasClassName(fobj,"showThis")){
fobj.toggler=fobj.href.split("#")[1];
addEvent(fobj,"click",function(e){
var _34a=this.toggler.replace(/\d+?/,"");
var n=1;
while(gebi(_34a+n)){
if(this.toggler==_34a+n){
removeClassName(gebi(this.toggler),"hidethis");
}else{
addClassName(gebi(_34a+n),"hidethis");
}
n++;
}
cancelDefault(e);
});
}else{
var cls=fobj.className.split(" ");
for(var v=0;v<cls.length;v++){
if(cls[v].indexOf("objects-")==0){
fobj.toggler=cls[v].replace(/objects-/,"");
}
}
addEvent(fobj,"click",function(e){
var tid=this.toggler.split("-");
for(var i in tid){
if(tid[i].indexOf("ALL")>-1){
var tAll=[];
var x=1;
while(gebi(tid[i].split("ALL")[0]+x)){
tAll.push(tid[i].split("ALL")[0]+x);
x++;
}
var ii;
for(ii in tAll){
toggler(this,tAll[ii]);
}
}else{
toggler(this,tid[i]);
}
}
cancelDefault(e);
});
}
}
function toggler(fobj,id){
if(hasClassName(gebi(id),"hidethis")&&!hasClassName(fobj,"hideall")||hasClassName(fobj,"showall")){
removeClassName(gebi(id),"hidethis");
}else{
if(!hasClassName(gebi(id),"hidethis")||hasClassName(fobj,"hideall")){
addClassName(gebi(id),"hidethis");
}
}
}
var ulid=0;
function sniffListfade(){
var fobj=this;
ulid++;
var li=gebtn("li",fobj);
var x=0;
while(li[x]){
li[x].id=ulid+"ulfade"+(x+1);
if(x==0){
addClassName(li[x],"xfadefirst");
var p="pause5";
if(fobj.className.indexOf("pause")>-1){
p=getClassContains(fobj,"pause");
}
addClassName(li[x],p);
}else{
addClassName(li[x],"xfade");
}
x++;
}
}
function sniffLoadUrl(){
var fobj=this;
if(fobj.href.indexOf("#")>-1){
var _35b=fobj.href.split("#")[0];
var id=fobj.href.split("#")[1];
getfile(_35b,function(_35d,objs){
if(objs[0]){
_35d=getRequestObject(objs[0],_35d);
var _35f=_35d.className;
_35d=_35d.innerHTML;
}
if(objs[1].parentNode.className.indexOf("g32auto")>-1&&objs[0]){
objs[1].parentNode.className=_35f;
objs[1].parentNode.innerHTML=_35d;
}else{
var _360=elem("div");
objs[1].parentNode.insertBefore(_360,objs[1]);
_360.innerHTML=_35d;
reg.rerun(_360);
objs[1].parentNode.removeChild(objs[1]);
}
},[id,fobj]);
}
}
function sniffFormHijax(){
var fobj=this;
addEvent(fobj,"submit",function(e){
var _363=getClassContains(this,"wgform-").split("wgform-")[1];
if(hasParent(this,_363)){
var _364=gebtn("input",this);
var _365=[];
for(i=0;i<_364.length;i++){
if(_364[i].type=="submit"){
_365.push(_364[i]);
}
}
for(i=0;i<_365.length;i++){
addClassName(_365[i],"disabled");
}
}
getfile(this.action+"?"+getFormData(this),function(_366,fvar){
if(_366.indexOf(_363)>-1){
_366=getRequestObject(_363,_366).innerHTML;
}
gebi(_363).innerHTML=_366;
reg.rerun(gebi(_363));
});
cancelDefault(e);
});
}
var xfade=[];
var xfadeObj=[];
var xfadeLoop=[];
var xfadeStop=[];
function sniffXfade(){
var fobj=this;
if((fobj.id.substring((fobj.id.length-1),fobj.id.length)*1)==1){
var _369=false;
var _36a;
var _36b=10000;
var id=fobj.id.substring(0,(fobj.id.length-1));
var cls=fobj.className.split(" ");
for(var v=0;v<cls.length;v++){
if(cls[v].indexOf("pause")==0){
_36b=cls[v].replace(/pause(.*)$/,"$1");
_36b=_36b*1000;
}else{
if(cls[v].indexOf("transparent")==0){
_369=true;
}else{
if(cls[v].indexOf(".jpg")==0||cls[v].indexOf(".gif")==0){
_36a=cls[v];
}
}
}
}
var xf=1;
while(gebi(id+xf)){
xfadeObj[id+xf]=[gebi(id+xf),0];
xfadeObj[id+xf][0].onmouseover=function(){
if(xfadeStop[id][0]!=-1){
xfadeStop[id][0]=0;
}
};
xfadeObj[id+xf][0].onmouseout=function(){
if(xfadeStop[id][0]!=-1){
xfadeStop[id][0]=1;
}
};
if(_369){
if(is.oldmoz){
setopacity(xfadeObj[id+xf][0],1);
xfadeObj[id+xf][0].style.visibility="hidden";
}
if(_36a&&is.iewin){
xfadeObj[id+xf][0].style.backgroundImage="url("+_36a+")";
}
if(is.oldmoz&&xf==1){
xfadeObj[id+xf][0].style.visibility="visible";
}
}
xf++;
}
xf--;
xfade[id]=[xf,1,_36b];
if(gebi(id+"Total")){
gebi(id+"Total").innerHTML=xf;
}
if(gebi(id+"Back")){
gebi(id+"Back").onclick=function(){
xfadeStop[id]=[-1,-1];
clearTimeout(xfadeLoop[id]);
xfader(id);
return false;
};
}
if(gebi(id+"Next")){
gebi(id+"Next").onclick=function(){
xfadeStop[id]=[-1,1];
clearTimeout(xfadeLoop[id]);
xfader(id);
return false;
};
}
xfadeStop[id]=[1,1];
xfadeLoop[id]=setTimeout("xfader('"+id+"')",_36b);
}
}
function xfader(id){
var nx=xfade[id][1]+xfadeStop[id][1];
if(nx>xfade[id][0]){
nx=1;
}
if(nx<1){
nx=xfade[id][0];
}
var _372=false;
if(xfadeStop[id][0]==0&&xfadeObj[id+nx][1]!=0){
var _372=true;
}
var ox=xfade[id][1];
if(xfadeObj[id+ox][1]==0){
xfadeObj[id+ox][1]=1;
}
if(xfadeStop[id][0]!=0||_372){
if(xfadeObj[id+nx][1]==0){
if(!is.oldmoz){
setopacity(xfadeObj[id+nx][0],0.1);
}
xfadeObj[id+nx][0].style.visibility="visible";
xfadeObj[id+ox][0].style.zIndex=2;
xfadeObj[id+nx][0].style.zIndex=10;
}
if(xfadeStop[id][0]==-1){
xfadeObj[id+nx][1]=1;
}else{
if(is.safari||is.oldmoz||is.ns6||is.iemac){
xfadeObj[id+nx][1]=1;
}else{
xfadeObj[id+nx][1]=xfadeObj[id+nx][1]+0.2;
}
}
if(is.anymoz&&xfadeObj[id+nx][1]==1){
if(!is.oldmoz){
setopacity(xfadeObj[id+nx][0],0.99);
}
}else{
setopacity(xfadeObj[id+nx][0],xfadeObj[id+nx][1]);
}
if(xfadeObj[id+nx][1]<1){
setTimeout("xfader('"+id+"')",120);
}else{
xfade[id][1]=nx;
xfadeObj[id+ox][0].style.visibility="hidden";
xfadeObj[id+ox][1]=0;
if(gebi(id+"This")){
gebi(id+"This").innerHTML=nx;
}
if(xfadeStop[id][0]!=0){
xfadeStop[id]=[1,1];
xfadeLoop[id]=setTimeout("xfader('"+id+"')",xfade[id][2]);
}
}
}
if(xfadeStop[id][0]==0){
clearTimeout(xfadeLoop[id]);
xfadeLoop[id]=setTimeout("xfader('"+id+"')",200);
}
}
var hijaxCache={};
function hijaxLink(ev){
var link=this;
if(hasClassName(link,"noHijax")){
return true;
}
if(this.target){
return true;
}
try{
if(link.className.indexOf("hijax-")>-1){
var _376=this;
}else{
var _376=getParent(link,"@class*='hijax-'");
}
var id=matchClassName(_376,/^hijax-(\S*)/)[1];
var _378=gebi(id);
if(_378.className.indexOf("hijaxTrue")>-1){
var _379=(link.href.indexOf("?")>-1)?"&":"?";
var _37a=link.href+_379+"hijax=true";
}else{
var _37a=link.href;
}
var h=_378.offsetHeight;
_378.innerHTML="";
_378.style.height=h+"px";
addClassName(_378,"hijaxLoading");
}
catch(ex){
return true;
}
var _37c=_37a+" ";
if(!hijaxCache[_37c]){
xhr(_37a,function(_37d,obj){
var el=getElementByIdFromString(_37d,id);
if(!el){
window.location=link.href;
}
_37d=el.innerHTML;
hijaxCache[_37c]=_37d;
removeClassName(_378,"hijaxLoading");
_378.style.height="auto";
_378.innerHTML=_37d;
reg.rerun(_378);
if(gebi("linkToPage")){
gebi("linkToPage").href=link.href;
}
},function(){
window.location=link.href;
});
return false;
}else{
_378.innerHTML=hijaxCache[_37c];
removeClassName(_378,"hijaxLoading");
reg.rerun(_378);
if(gebi("linkToPage")){
gebi("linkToPage").href=link.href;
}
return false;
}
}
function spriteOver(){
this.style.left=(this.width)/2*-1+"px";
}
function spriteOut(){
this.style.left=0+"px";
}
function d4makelink(){
var url=this.innerHTML;
var a=elem("a.linkUrl");
a.innerHTML=url;
a.href=url;
this.parentNode.insertBefore(a,this);
this.parentNode.removeChild(this);
}
function d4killLink(){
var url=this.href;
var s=elem("span.linkUrl");
s.innerHTML=url;
this.parentNode.insertBefore(s,this);
this.parentNode.removeChild(this);
}
function domCrawl(_384,_385){
reg.rerun(_384);
}
function catchBodyClicks(){
if(document.body){
addEvent(document.body,"click",function(e){
if(!e){
var e=window.event;
}
if(e.target){
var targ=e.target;
}else{
if(e.srcElement){
var targ=e.srcElement;
}
}
if(targ.nodeType==3){
targ=targ.parentNode;
}
var sel;
if(typeof bodyClickHandlers!="undefined"){
selectors:
for(sel in bodyClickHandlers){
var el=targ;
var _38a=0;
while(el.nodeType==1){
try{
if(matches(el,sel)){
bodyClickHandlers[sel](el,e);
break;
}
}
catch(e){
continue selectors;
}
if(!el.parentNode||_38a>20){
break;
}
el=el.parentNode;
_38a++;
}
}
}
});
}else{
window.setTimeout("catchBodyClicks()",100);
}
}
catchBodyClicks();
window.bodyClickHandlers={};
function sniffLinkHijax(fobj){
if(fobj.nodeName.toLowerCase()=="a"){
var _38c=new Array(fobj);
}else{
if(gebtn("a",fobj)[0]){
var _38c=gebtn("a",fobj);
}
}
for(i=0;i<_38c.length;i++){
_38c[i].targetDiv=fobj.className.split("hijax-")[1];
addEvent(_38c[i],"click",function(e){
var _38e=this.targetDiv;
var _38f=this.href+" ";
if(!hijaxCache[_38f]){
getfile(this.href,function(_390,fvar){
if(_390.indexOf("id=\""+_38e+"\"")>-1){
_390=getRequestObject(_38e,_390).innerHTML;
hijaxCache[_38f]=_390;
gebi(_38e).innerHTML=_390;
reg.rerun(gebi(_38e));
}
});
cancelDefault(e);
}else{
gebi(_38e).innerHTML=hijaxCache[_38f];
reg.rerun(gebi(_38e));
cancelDefault(e);
}
});
}
}
function addOnresizeEvent(func){
addEvent(window,"resize",func);
}
(function(){
var _393=[];
function launchCal(e){
var id=this.id;
if(!id){
throw "date field missing id attribute";
}
if(_393[id]&&_393[id].parentNode){
return;
}
for(var oid in _393){
if(id==oid){
continue;
}
if(_393[oid]&&_393[oid].parentNode){
_393[oid].parentNode.removeChild(_393[oid]);
_393[oid]=null;
}
}
var _397=getParent(this,"div.labeled-input");
if(_397){
addClassName(_397,"has-jscal");
}
if(this.value){
var time=Date.parse(this.value);
var _399=(!isNaN(time))?new Date(time):new Date();
}else{
var _399=new Date();
}
var _39a=matchClassName(this,/^range-(.+)/);
if(_39a){
var _39b=gebi(_39a[1]);
if(!_39b){
throw "no element found with id=\""+_39a[1]+"\"";
}
var _39c,endDate;
var _39d=gebcn("jscal-start",_39b);
var _39e=gebcn("jscal-end",_39b);
if(_39d.length){
var time=Date.parse(elemText(_39d[0]));
if(isNaN(time)){
throw "Date.parse(\""+elemText(_39d[0])+"\") returns NaN";
}
_39c=new Date(time);
}
if(_39e.length){
var time=Date.parse(elemText(_39e[0]));
if(isNaN(time)){
throw "Date.parse(\""+elemText(_39e[0])+"\") returns NaN";
}
endDate=new Date(time);
}
if(_39c&&_39c.getTime()>_399.getTime()){
_399=_39c.diffDay(0);
}
if(endDate&&endDate.getTime()<_399.getTime()){
_399=endDate.diffDay(0);
}
if(_39c&&endDate&&_39c.getTime()>endDate.getTime()){
throw "whoops! start date is less than end date";
}
}
var _39f=defaultDateFormat;
var _3a0=matchClassName(this,/^format-(.+)/);
if(_3a0){
var _3a1=gebi(_3a0[1]);
if(!_3a1){
throw "no element found with id=\""+_3a0[1]+"\"";
}
_39f=elemText(_3a1);
}
_393[id]=(new Calendar(_399,_39c,endDate)).getCalendarTable();
_393[id].inp=this;
this.parentNode.appendChild(_393[id]);
addEvent(_393[id],"click",function(e){
var targ=getTarget(e);
if(targ.date&&getParent(targ,".jscal-inrange")){
this.inp.value=targ.date.format(_39f);
_393[id].parentNode.removeChild(_393[id]);
}
});
}
function closeCal(e){
var targ=getTarget(e);
var _3a6=getParent(targ,"div.jscal-x1");
if(_3a6||matches(targ,"input.jscal@type=\"text\", table.jscal, div.jscal-x1")){
return;
}
for(var id in _393){
if(_393[id]&&_393[id].parentNode){
_393[id].parentNode.removeChild(_393[id]);
_393[id]=null;
}
}
}
reg.focus("input.jscal@type=\"text\"",launchCal);
reg.focus("body",closeCal);
reg.click("body",closeCal);
})();
(function(){
function animate(_3a8,_3a9){
removeClassName(_3a8,"g39exp");
removeClassName(_3a9,"g39coll");
addClassName(_3a8,"g39t1");
addClassName(_3a9,"g39t6");
var inc=20;
window.setTimeout(function(){
_3a8.className=_3a8.className.replace(/g39t1/,"g39t2");
_3a9.className=_3a9.className.replace(/g39t6/,"g39t5");
},inc*1);
window.setTimeout(function(){
_3a8.className=_3a8.className.replace(/g39t2/,"g39t3");
_3a9.className=_3a9.className.replace(/g39t5/,"g39t4");
},inc*2);
window.setTimeout(function(){
_3a8.className=_3a8.className.replace(/g39t3/,"g39t4");
_3a9.className=_3a9.className.replace(/g39t4/,"g39t3");
},inc*3);
window.setTimeout(function(){
_3a8.className=_3a8.className.replace(/g39t4/,"g39t5");
_3a9.className=_3a9.className.replace(/g39t3/,"g39t2");
},inc*4);
window.setTimeout(function(){
_3a8.className=_3a8.className.replace(/g39t5/,"g39t6");
_3a9.className=_3a9.className.replace(/g39t2/,"g39t1");
},inc*5);
window.setTimeout(function(){
_3a8.className=_3a8.className.replace(/g39t6/,"g39coll");
_3a9.className=_3a9.className.replace(/g39t1/,"g39exp");
},inc*6);
}
reg.click("div.g39sect",function(e){
var _3ac=gebs("div.g39sect",this.parentNode);
for(var i=0;i<_3ac.length;i++){
var _3ae=_3ac[i];
if(hasClassName(_3ae,"g39exp")&&_3ae!=this){
animate(_3ae,this);
break;
}
}
});
})();
if(!String.prototype.strip){
String.prototype.strip=function(){
return this.replace(/^\s+|\s+$/g,"");
};
}
if(!String.prototype.normalize){
String.prototype.normalize=function(sp){
sp=(!sp&&sp!=="")?" ":sp;
return this.strip().replace(/\s+/g,sp);
};
}
function getfile(_3b0,_3b1,fvar,ferr){
var _3b4=false;
if(window.XMLHttpRequest){
_3b4=new XMLHttpRequest();
if(_3b4.overrideMimeType&&_3b0.indexOf(".xml")>-1){
_3b4.overrideMimeType("text/xml");
}
}else{
if(window.ActiveXObject){
try{
_3b4=new ActiveXObject("Msxml2.XMLHTTP");
}
catch(ex1){
try{
_3b4=new ActiveXObject("Microsoft.XMLHTTP");
}
catch(ex2){
}
}
}
}
if(!_3b4){
return false;
}
_3b4.onreadystatechange=function(){
if(_3b4.readyState==4){
if(_3b4.status==200){
if(_3b0.indexOf(".xml")>-1){
var _3b5=_3b4.responseXML.documentElement;
}else{
var _3b5=_3b4.responseText;
}
_3b1(_3b5,fvar);
}else{
if(ferr){
ferr(fvar,_3b0,_3b4.status,_3b4.statusText);
}
}
}
};
_3b4.open("GET",_3b0,true);
_3b4.send(null);
}
function getRequestObject(_3b6,_3b7,_3b8){
if(!_3b8){
_3b8="div";
}
var _3b9=document.createElement(_3b8);
_3b9.innerHTML=_3b7;
var x=gebtn(_3b8,_3b9);
var _3bb;
for(var i=0;i<x.length;i++){
if(x[i].id==_3b6){
_3bb=x[i];
break;
}
}
return _3bb;
}
function getElementByIdFromString(_3bd,id){
var _3bf=document.createElement("div");
_3bf.innerHTML=_3bd;
var tags=gebtn("*",_3bf);
for(var a=0,tag;tag=tags[a++];){
if(tag.id==id){
return tag;
}
}
return null;
}
function xhr(url,_3c3,_3c4,obj,_3c6){
var _3c7=false;
if(window.XMLHttpRequest){
_3c7=new XMLHttpRequest();
}else{
if(window.ActiveXObject){
try{
_3c7=new ActiveXObject("Msxml2.XMLHTTP");
}
catch(e){
try{
_3c7=new ActiveXObject("Msxml3.XMLHTTP");
}
catch(ex1){
try{
_3c7=new ActiveXObject("Microsoft.XMLHTTP");
}
catch(ex2){
}
}
}
}
}
if(!_3c7){
return false;
}
if(!_3c6){
_3c6=null;
}
var _3c8=(_3c6)?"POST":"GET";
_3c7.open(_3c8,url,true);
_3c7.setRequestHeader("User-Agent","XMLHTTP/1.0");
if(_3c6){
_3c7.setRequestHeader("Content-type","application/x-www-form-urlencoded");
}
_3c7.onreadystatechange=function(){
if(_3c7.readyState==4){
if(_3c7.status==200){
_3c3(_3c7.responseText,obj);
}else{
try{
_3c4(_3c7.status,_3c7.statusText,url,obj);
}
catch(ex){
_3c4("",ex,url,obj);
}
}
}
};
_3c7.send(_3c6);
}
function getFormData(_3c9){
var _3ca=[];
var inps=reg.getElementsBySelector("input, select, textarea",_3c9);
for(var a=0;a<inps.length;a++){
var inp=inps[a];
if(matches(inp,"@type=\"text\",@type=\"hidden\",@type=\"password\"")){
_3ca.push(encodeURIComponent(inp.name)+"="+encodeURIComponent(inp.value));
}
if(inp.type=="checkbox"||inp.type=="radio"&&inp.checked){
_3ca.push(encodeURIComponent(inp.name)+"="+encodeURIComponent(inp.value));
}
if(inp.nodeName.toLowerCase()=="select"){
var _3ce=inp.options[inp.selectedIndex].value;
_3ca.push(encodeURIComponent(inp.name)+"="+encodeURIComponent(_3ce));
}
if(inp.nodeName.toLowerCase()=="textarea"){
_3ca.push(encodeURIComponent(inp.name)+"="+encodeURIComponent(inp.value));
}
}
return _3ca.join("&");
}
function hasParent(obj,tag,_3d1){
var _3d2=obj;
if(_3d1){
while(_3d2=_3d2.parentNode){
if(_3d2.nodeName.toLowerCase()==tag&&hasClassName(_3d2,_3d1)||tag=="*"&&hasClassName(_3d2,_3d1)){
return _3d2;
}
}
}else{
if(typeof tag=="string"){
while(_3d2=_3d2.parentNode){
if(_3d2.id==tag){
return _3d2;
}
}
}else{
while(_3d2=_3d2.parentNode){
if(_3d2==tag){
return _3d2;
}
}
}
}
}
function getXY(obj){
var o=obj;
obj.X=obj.Y=0;
while(o){
obj.X=obj.X+o.offsetLeft;
obj.Y=obj.Y+o.offsetTop;
o=o.offsetParent;
}
}
function getClassContains(obj,_3d6){
var rcl=false;
var cls=obj.className.split(" ");
for(var v=0;v<cls.length;v++){
if(cls[v].indexOf(_3d6)>-1){
rcl=cls[v];
}
}
return rcl;
}
function getChildNodesByTagName(el,_3db){
var cn=el.childNodes;
var nd=[];
for(var n=0;n<cn.length;n++){
if(_3db==cn[n].nodeName.toLowerCase()){
nd.push(cn[n]);
}
}
return nd;
}
function setopacity(_3df,opac){
if(gebi(_3df)){
var oobj=gebi(_3df);
}else{
if(_3df){
var oobj=_3df;
}
}
if(oobj){
if(oobj.filters&&oobj.filters.alpha){
oobj.filters.alpha.opacity=opac*100;
}else{
oobj.style.MozOpacity=opac;
oobj.style.opacity=opac;
}
}
}
function sfadein(obj,n){
if(!obj.sfade){
obj.sfade=0;
}
if(obj.sfade<1){
if(is.safariAll){
obj.sfade=obj.sfade+(n*5);
}else{
obj.sfade=obj.sfade+n;
}
setopacity(obj,obj.sfade);
setTimeout(function(){
sfadein(obj,obj.sfade);
},75);
}else{
setopacity(obj,1);
obj.sfade=null;
}
}
Date.prototype.diffDay=function(days){
var r=new Date(this.getTime());
r.setDate(r.getDate()+days);
return r;
};
Date.prototype.diffMonth=function(_3e6){
var r=new Date(this.getTime());
var num=r.getMonth()+_3e6;
var _3e9=0;
if(num<0){
while(num<0){
num+=12;
_3e9--;
}
}else{
if(num>11){
while(num>11){
num-=12;
_3e9++;
}
}
}
r.setMonth(num);
r.setFullYear(r.getFullYear()+_3e9);
return r;
};
String.prototype.padLeft=function(ch,_3eb){
var r=this;
while(r.length<_3eb){
r=ch+r;
}
return r;
};
Date.prototype.format=(function(){
var _3ed=/(WEEKDAY)|(Weekday)|(weekday)|(WEE)|(Wee)|(wee)|(WE)|(We)|(we)|(W)|(w)|(MONTH)|(Month)|(month)|(MON)|(Mon)|(mon)|(MM)|(M)|(DD)|(Dth)|(D)|(YYYY)|(YY)|(HH)|(hh)|(H)|(h)|(mm)|(ss)|(A)|(a)|(X)/g;
var dobj;
function parser(str,_3f0,_3f1,_3f2,WEE,Wee,wee,WE,We,we,W,w,_3fb,_3fc,_3fd,MON,Mon,mon,MM,M,DD,Dth,D,YYYY,YY,HH,hh,H,h,mm,ss,A,a,X){
var _411;
if(ss){
return (""+dobj.getSeconds()).padLeft("0",2);
}
if(mm){
return (""+dobj.getMinutes()).padLeft("0",2);
}
if(H){
return dobj.getHours()+"";
}
if(HH){
return (dobj.getHours()+"").padLeft("0",2);
}
if(h){
_411=(dobj.getHours()%12)+"";
if(_411=="0"){
_411="12";
}
return _411;
}
if(hh){
_411=(dobj.getHours()%12)+"";
if(_411=="0"){
_411="12";
}
_411=_411.padLeft("0",2);
return _411;
}
if(_3f1){
return dayNamesFull[dobj.getDay()];
}
if(W){
return dayNames1[dobj.getDay()];
}
if(We){
return dayNames2[dobj.getDay()];
}
if(Wee){
return dayNames3[dobj.getDay()];
}
if(_3f0){
return dayNamesFull[dobj.getDay()].toUpperCase();
}
if(WE){
return dayNames2[dobj.getDay()].toUpperCase();
}
if(WEE){
return dayNames3[dobj.getDay()].toUpperCase();
}
if(_3f2){
return dayNamesFull[dobj.getDay()].toLowerCase();
}
if(w){
return dayNames1[dobj.getDay()].toLowerCase();
}
if(we){
return dayNames2[dobj.getDay()].toLowerCase();
}
if(wee){
return dayNames3[dobj.getDay()].toLowerCase();
}
if(D){
return dobj.getDate()+"";
}
if(DD){
return (dobj.getDate()+"").padLeft("0",2);
}
if(Dth){
_411=dobj.getDate()+"";
if(_411.match(/^1\d$/)){
_411+="th";
}else{
if(_411.match(/1$/)){
_411+="st";
}else{
if(_411.match(/2$/)){
_411+="nd";
}else{
if(_411.match(/3$/)){
_411+="rd";
}else{
_411+="th";
}
}
}
}
return _411;
}
if(YYYY){
return dobj.getFullYear()+"";
}
if(YY){
return (dobj.getFullYear()+"").substring(2,4);
}
if(M){
return (dobj.getMonth()+1)+"";
}
if(MM){
return ((dobj.getMonth()+1)+"").padLeft("0",2);
}
if(_3fc){
return monthNamesFull[dobj.getMonth()];
}
if(Mon){
return monthNames3[dobj.getMonth()];
}
if(_3fb){
return monthNamesFull[dobj.getMonth()].toUpperCase();
}
if(MON){
return monthNames3[dobj.getMonth()].toUpperCase();
}
if(_3fd){
return monthNamesFull[dobj.getMonth()].toLowerCase();
}
if(mon){
return monthNames3[dobj.getMonth()].toLowerCase();
}
if(X){
return (dobj.getTimezoneOffset()/60)+"";
}
if(A){
return (dobj.getHours()<12)?"AM":"PM";
}
if(a){
return (dobj.getHours()<12)?"am":"pm";
}
}
return function(fmt){
dobj=this;
var _413=fmt.split("'");
if(_413.length%2==0){
throw "missing closing single quote in date format \""+fmt+"\"";
}
for(var i=0;i<_413.length;i+=2){
_413[i]=_413[i].replace(_3ed,parser);
}
return _413.join("");
};
})();
function Calendar(date,_416,_417,_418){
this.origDate=(_418)?_418:date.diffDay(0);
this.startDate=_416;
this.endDate=_417;
date.setDate(1);
this.canonicalMonth=date.diffDay(0);
this.g=[];
this.g[0]=[];
var _419=date.getDay();
var row=this.g[0];
for(var a=0;a<_419;a++){
row[a]=date.diffDay(a-_419);
row[a].dayClass="jscal-before";
if(_416&&row[a].getTime()<_416){
row[a].dayClass+=" jscal-outofrange";
}else{
if(_417&&row[a].getTime()>_417){
row[a].dayClass+=" jscal-outofrange";
}else{
row[a].dayClass+=" jscal-inrange";
}
}
}
var _41c=new Date().format("DD/MM/YYYY");
var _41d=this.origDate.format("DD/MM/YYYY");
while(date.getMonth()==this.canonicalMonth.getMonth()){
var _41e=this.g[this.g.length-1][date.getDay()];
this.g[this.g.length-1][date.getDay()]=date;
this.g[this.g.length-1][date.getDay()].dayClass="jscal-during";
var _41f=date.format("DD/MM/YYYY");
if(_41f==_41c){
date.dayClass+=" jscal-today";
}
if(_41f==_41d){
date.dayClass+=" jscal-current";
}
if(_416&&date.getTime()<_416){
date.dayClass+=" jscal-outofrange";
}else{
if(_417&&date.getTime()>_417){
date.dayClass+=" jscal-outofrange";
}else{
date.dayClass+=" jscal-inrange";
}
}
date=date.diffDay(1);
if(date.getDay()==0&&date.getMonth()==this.canonicalMonth.getMonth()){
this.g[this.g.length]=[];
}
}
var row=this.g[this.g.length-1];
var _420=row.length;
for(var a=row.length;a<7;a++){
row[a]=date.diffDay(a-_420);
row[a].dayClass="jscal-after";
if(_416&&row[a].getTime()<_416){
row[a].dayClass+=" jscal-outofrange";
}else{
if(_417&&row[a].getTime()>_417){
row[a].dayClass+=" jscal-outofrange";
}else{
row[a].dayClass+=" jscal-inrange";
}
}
}
}
Calendar.prototype.weeks=function(){
return this.g.length;
};
Calendar.prototype.getDayAt=function(_421,_422){
return this.g[_421][_422];
};
Calendar.prototype.diffMonth=function(_423){
return new Calendar(this.canonicalMonth.diffMonth(_423),this.startDate,this.endDate,this.origDate);
};
Calendar.prototype.getCalendarTable=function(){
var t=elem("table.jscal",{"cellSpacing":"0"});
var div=elem("div.jscal-x1",{},elem("div.jscal-x2",{},t));
t.createTHead().insertRow(0);
t.tHead.rows[0].className="jscal-mname";
t.tHead.rows[0].appendChild(elem("th")).colSpan="7";
t.tHead.insertRow(1).className="jscal-dname";
t.tHead.rows[1].appendChild(elem("th")).appendChild(document.createTextNode(dayNames1[0]));
t.tHead.rows[1].appendChild(elem("th")).appendChild(document.createTextNode(dayNames1[1]));
t.tHead.rows[1].appendChild(elem("th")).appendChild(document.createTextNode(dayNames1[2]));
t.tHead.rows[1].appendChild(elem("th")).appendChild(document.createTextNode(dayNames1[3]));
t.tHead.rows[1].appendChild(elem("th")).appendChild(document.createTextNode(dayNames1[4]));
t.tHead.rows[1].appendChild(elem("th")).appendChild(document.createTextNode(dayNames1[5]));
t.tHead.rows[1].appendChild(elem("th")).appendChild(document.createTextNode(dayNames1[6]));
t.appendChild(elem("tbody"));
var m=t.tHead.rows[0].cells[0];
var _427=elem("span.jscal-closer",{"href":"#","border":"0"},elem("img",{"alt":"[x]","src":imdir+"/ic_close_win_light.gif","title":"close"}));
var _428=elem("a.jscal-mselect",{"title":"previous month"},"\xab ");
var _429=elem("span.jscal-monthyear",{},this.canonicalMonth.format("Mon")+" "+this.canonicalMonth.format("YYYY"));
var _42a=elem("a.jscal-mselect",{"title":"next month"}," \xbb");
_428.calendar=_42a.calendar=div.calendar=this;
_427.div=_428.div=_42a.div=div;
m.appendChild(_427);
m.appendChild(_428);
m.appendChild(_429);
m.appendChild(_42a);
addEvent(_428,"click",function(e){
getParent(this,"div.jscal-x1").setCalendar(this.calendar.diffMonth(-1));
cancelDefault(e);
});
addEvent(_42a,"click",function(e){
getParent(this,"div.jscal-x1").setCalendar(this.calendar.diffMonth(1));
cancelDefault(e);
});
addEvent(_427,"click",function(e){
var _42e=getParent(this,"div.jscal-x1");
_42e.parentNode.removeChild(_42e);
cancelDefault(e);
});
for(var a=0;a<this.weeks();a++){
t.tBodies[0].insertRow(a);
for(var b=0;b<7;b++){
t.tBodies[0].rows[a].insertCell(b);
var dt=this.getDayAt(a,b);
if(!dt){
throw "empty month date at "+a+","+b;
}
t.tBodies[0].rows[a].cells[b].className=dt.dayClass;
var lnk=elem("span",{},""+dt.getDate());
lnk.date=dt;
t.tBodies[0].rows[a].cells[b].appendChild(lnk);
}
}
div.setCalendar=function(cal){
var _434=cal.getCalendarTable();
this.appendChild(_434.firstChild);
this.removeChild(this.firstChild);
};
return div;
};
function getSafelyEncodedString(s){
s=encodeURIComponent(s);
s=s.replace(/&/,"&amp;").replace(/"/,"&quot;").replace(/</,"&lt;").replace(/>/,"&gt;");
return s;
}
