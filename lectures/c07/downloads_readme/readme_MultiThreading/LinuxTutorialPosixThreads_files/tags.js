
if (expo9_pageId == undefined) {
   var expo9_pageId = (new Date()).getTime() % 20000001 + parseInt(Math.random() * 10000);
   var expo9_adNum  = 0;
} 
var e9;
expo9_ad = (function() {

var version = "1.14";

function expo9_ad() {
  var t = this;
  t.url = "";
  t.host = "a.tribalfusion.com";
  t.params = "";
  t.site = "yolinuxcom";
  t.adSpace = "ros";
  t.tagKey = "831694210";
  t.pageId = expo9_pageId;
  t.adNum = ++expo9_adNum;
  t.center = 1;
  t.flashVer = 0;
}
  

expo9_ad.prototype.showAd = function () {
  var t = this;
  setTagType(t);
  t.flashVer = detectFlash();

  t.p('site',t.site);
  t.p('adSpace',t.adSpace);
  t.p('tagKey',t.tagKey);
  t.p('size',t.getSizeMask());
  t.p('p',t.pageId);
  t.p('a',t.adNum);
  t.p('flashVer',t.flashVer);
  t.p('ver',version);
  t.p('center',t.center);
  t.cp('pop',t.pop);
  t.cp('noAd',t.noAd);
  t.cp('ct',t.contentType);
  t.cp('at',t.adtype);
  t.cp('pf',t.pf);

  copyFixedBehaviors(t);
  setPubParams(t);
  setCustomPubParams(t);
  setURLs(t);

  var rnd = (new Date()).getTime() % 20000001 + parseInt(Math.random() * 10000);

  t.url += "http://"+t.host+"/" + t.cmd + t.uparams + t.params + "&rnd=" + rnd;

  drawTags(t);

  if (t.debug == 1)
     inspect(t);
 
  document.writeln(t.tagSrc);
}

expo9_ad.prototype.showPopOnlyAd = function () {
  var t = this;
  t.tagType='iframe';
  t.cmd='f.ad';
  t.flashVer = detectFlash();

  t.p('site',t.site);
  t.p('adSpace',t.adSpace);
  t.p('tagKey',t.tagKey);
  t.p('size','1x1');
  t.p('p',t.pageId);
  t.p('a',t.adNum);
  t.p('flashVer',t.flashVer);
  t.p('center',t.center);
  t.cp('pop','only');
  t.cp('noAd',1);
  t.cp('ct',t.contentType);
  t.cp('at',t.adtype);
  t.cp('pf',t.pf);

  copyFixedBehaviors(t);
  setPubParams(t);
  setCustomPubParams(t);
  setURLs(t);

  var rnd = (new Date()).getTime() % 20000001 + parseInt(Math.random() * 10000);

  t.url += "http://"+t.host+"/" + t.cmd + t.uparams + t.params + "&rnd=" + rnd;

  document.cookie='tf0=y0; path=/;';
  if (document.cookie.indexOf('f0=y0') >= 0 && document.cookie.indexOf('f1=y1') < 0) {
         drawPopOnlyTags(t);
         if (t.debug == 1)
            inspect(t);
         document.writeln(t.tagSrc);
  }			 
 
}

function drawTags(t) {
  if (t.tagType == "iframe") {
     t.tagSrc = '<iframe src="' + t.url + '" marginwidth=0 marginheight=0 hspace=0 vspace=0 frameborder=0 scrolling=no allowTransparency=true width='
          + t.fw + ' height=' + t.fh + ' ><\/iframe>';
  } else if (t.tagType == "jscript") {
     t.tagSrc = '<scr' + 'ipt type="text/javascript" SRC="' + t.url + '"><\/sc' + 'ript>';
     if (t.center == 1)
        t.tagSrc = '<center>'+t.tagSrc+'</center>';
  } else if (t.tagType == "img") {
     var hrefURL = "http://"+t.host+"/i.click" + t.uparams + t.params;
     t.tagSrc =  '<a href="' + hrefURL + '"><img width='  
          + t.fw + ' height=' + t.fh + ' src="' + t.url + '" alt="Click Here" border=0></img></a>';
  }

}

function drawPopOnlyTags(t) {
     var tfdate = new Date();
     t.tagSrc = '<iframe src="' + t.url + 
		     '" frameborder=0 marginwidth=0 marginheight=0 hspace=0 vspace=0 frameborder=0 scrolling=no allowTransparency=true width=1'
          + ' height=1><\/iframe>';
     tfdate.setTime(tfdate.getTime()+3600000);
     document.cookie='tf1=y1; path=/; expires='+ tfdate.toGMTString();
}

function inspect (t) {
  for (var k in t) {
   if (typeof t[k] != 'function') {
      if (k == 'tagSrc') {
         document.writeln("<form><textarea wrap=on readonly name=start rows=13 cols=40>");
         document.writeln(t.tagSrc);
         document.writeln("</textarea></form>");
      } else {
        pr(t,k);
      }
    }
  }
}

function pr(t,name) {
  document.writeln("this." + name + "=" + t[name] + "<br>");
}

function setURLs(t) {

  t.pageURL = (window.top.location == document.location) 
		? document.location
 	        : document.referrer;

  t.refURL = (t.pageURL != document.referrer) ? document.referrer : undefined;

  if (t.pageURL) {
    t.pageURL = E(t.pageURL);
    t.p("url",t.pageURL.substring(0,128));
  }
  if (t.refURL) {
    t.refURL = E(t.refURL);
    t.p("rurl",t.refURL.substring(0,128));
  }

  if (t.clickTrackURL) {
    t.p("clickTrackURL",E(t.clickTrackURL));
  }
  if (window.top.location != document.location)
    t.p("f",1);

}

function copyFixedBehaviors(t) {
  t.cpa('blockingCategories', t.blockingCategories);
  t.cpa('addBlockingCategories', t.addBlockingCategories);
  t.cpa('blockingDomains', t.blockingDomains);
  t.cpa('addBlockingDomains', t.addBlockingDomains);
  t.cp('z', t.z);
  t.cp('y', t.y);
  t.cp('g', t.g);
  t.cp('c', t.c);
}

function m(a,b,c) {
  if (a == undefined || a == "")
       return b;
 
    a += c + b;
    return a;
}

function trim(s) { 
   if(s != null) 
     return s.replace(/^\s+/,'').replace(/\s+$/,'') ; 
} 

function E(s){
   if(typeof encodeURIComponent=="function"){
       return encodeURIComponent(s)
   }else{
       return escape(s)
   }
}

function detectFlash() {
  var flashinstalled = 0;
  var flashversion = 0;
  if (navigator.plugins && navigator.plugins.length) {
     x = navigator.plugins["Shockwave Flash"];
     if (x) {
        flashinstalled = 2;
        if (x.description) {
	   y = x.description;
	   flashversion = y.charAt(y.indexOf('.')-1);
	}
     } else {
	flashinstalled = 1;
     }
     if (navigator.plugins["Shockwave Flash 2.0"]) {
	flashinstalled = 2;
	flashversion = 2;
     }
  } else if (navigator.mimeTypes && navigator.mimeTypes.length) {
    x = navigator.mimeTypes['application/x-shockwave-flash'];
    if (x && x.enabledPlugin)
       flashinstalled = 2;
    else
       flashinstalled = 1;
  } else {
    for(var i=9; i>0; i--) {
       flashversion = 0;
       try {
	  var flash = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + i);
	  flashversion = i;
	  return i;
       } catch(e) {
       }
    }
  }
  return flashversion;
}

expo9_ad.prototype.cp = function(k,v) {
   if(v != undefined)
     this.p(k,v);
}

expo9_ad.prototype.cpa = function(k,v) {
   if(v != undefined)
     this.p(k,combineArgs(v));
}

expo9_ad.prototype.p = function(k,v) {
  var t = this;
  var s = (t.uparams == undefined) ? "?" : t.uparams+"&";
  t.uparams = s+k+"="+v;
}

expo9_ad.prototype.cpe = function(k,v) {
   if(v != undefined)
     this.param(k,v);
}


expo9_ad.prototype.param = function(key,value) {
  this.params += "&"+key+"="+E(value);
}

function setPubParams(t) {
  t.cpe('p9_param0',t.param0);
  t.cpe('p9_param1',t.param1);
  t.cpe('p9_param2',t.param2);
  t.cpe('p9_param3',t.param3);
  t.cpe('p9_param4',t.param4);
  t.cpe('p9_param5',t.param5);
  t.cpe('p9_param6',t.param6);
  t.cpe('p9_param7',t.param7);
  t.cpe('p9_param8',t.param8);
  t.cpe('p9_param9',t.param9);
}

function setCustomPubParams(t) {
}

function setTagType(t) {
  if (    (t.tagType != "jscript")
       && (t.tagType != "iframe")
       && (t.tagType != "img"))
     t.tagType = "jscript";  

  switch (t.tagType) {
    case "jscript":
        t.cmd = "j.ad";
        break;
    case "iframe":
        t.cmd =  "f.ad";
        break;
    case "img":
        t.cmd = "i.ad";
        break;
  }    
}

var validSizes = new Array("468x60", "234x60", "120x240", "120x90", "120x60", "88x31", "392x72", "125x125", "230x33", "120x600", "160x600", "160x160", "728x90", "336x280", "1x1", "300x250", "300x600", "425x600", "180x150", "0x0");

function isMember(item,array) {
  for (var i=0; i<array.length; i++) {
    if (array[i] == item)
       return true;
  }
  return false;
}

function combineArgs(value) {
    var t = this;
    var retVal;
    var paramArray = value.split(",");
    for(var i=0; i<paramArray.length; i++)
     {
       var param = trim(paramArray[i]);
       retVal = m(retVal,param,"|");
     }
    return retVal;
}

expo9_ad.prototype.getSizeMask = function() {
    var t = this;
    t.fw = t.fh = 0;
    var size = this.size;
    if (size == undefined)
       size = "468x60";
 
    var sizeArray = size.split(",");

    if (t.tagType == "img")
    {
       var sz = sizeArray[0];
       var warray = sz.split("x");
       t.fw = warray[0] - 0;
       t.fh = warray[1] - 0;
       return sizeArray[0];
    }

    var retVal;
    for(var i=0; i<sizeArray.length; i++)
     {
       var sz = trim(sizeArray[i]);

       if (isMember(sz,validSizes)) {
          retVal = m(retVal,sz,"|");
          if (t.tagType == "iframe") {
            var warray = sz.split("x");
            var w = warray[0] - 0;
            var h = warray[1] - 0;
 	    if (w > t.fw)
               t.fw = w;
	    if (h > t.fh) {
               t.fh = h;
            }
          }
       }
     }
     return retVal;
}

if (e9 != undefined) {
   var ad = new expo9_ad();
   for (keyval in e9) {
     ad[keyval] = e9[keyval];
   }
   if (ad.popOnly != undefined) 
      ad.showPopOnlyAd();
   else
      ad.showAd();
}
return expo9_ad;
})();

