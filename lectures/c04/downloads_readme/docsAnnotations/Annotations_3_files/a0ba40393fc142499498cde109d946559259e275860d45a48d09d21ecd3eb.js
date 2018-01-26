
<!--
var ARMPreLib = function()
{
function pr() {}
pr.BuildChildMoviePath = function(pp_url, path, fileExt, destObj)
{
var protoIdx = path.indexOf('://');
if ((protoIdx < 0) || (protoIdx > 10))
{
if (fileExt == "flv")
{
path = path.substring(0, path.lastIndexOf("."))
}
return pp_url + path;
}
else
{
if (fileExt == "flv")
{
var lastIndexOfString = path.lastIndexOf("/") + 1;
var tempStr = path.substring(0, lastIndexOfString);
destObj.externalFlashStreamURL = tempStr;
path = path.substr(lastIndexOfString);
return path.substring(0, path.lastIndexOf("."));
}
}
return path;
}
pr.Extension = function(path)
{
return path.substring(path.lastIndexOf('.') + 1).toLowerCase();
}
pr.GetStreamingUrl = function(atlasObject)
{
if (typeof(atlasObject.stream_path_connect) != "undefined" && atlasObject.stream_path_connect != "%stream_path_connect%")
return atlasObject.stream_path_connect;
else
return atlasObject.streaming_url;
} 
pr.GetChildMoviesPlayPath = function(atlasObject)
{
if (typeof(atlasObject.stream_path_play) != "undefined" && atlasObject.stream_path_play != "%stream_path_play%")
return atlasObject.stream_path_play + atlasObject.advertiserID + "/";
else
return "";
}
function cm() {}
cm.MakeString = function(destObj, atlasObject)
{
var oChildMovies = destObj.childmovies[0];
if (!oChildMovies) return '';
var rv = '';
for (var p in oChildMovies)
{
var tempVar = new String(oChildMovies[p]);
if (tempVar.indexOf(" ") == -1)
{
rv += '&';
var path = tempVar;
var ext = pr.Extension(path);
var url;
switch(ext)
{
case 'flv': url = pr.GetChildMoviesPlayPath(atlasObject); break;
case 'swf': url = tempFilesDir + atlasObject.advertiserID + '/'; break;
default: url = httpConst + atlasObject.ds_path + '/'; break;
}
path = pr.BuildChildMoviePath(url, path, ext, destObj);
rv += p.replace('movie', 'atlasm') + '=' + path;
}
}
return rv.substring(1);
}
function movies() {}
movies.getAdMovieUrl = function(destObj, atlasObject, sMoviePath, AddMovieIndex)
{
var url = sMoviePath + "?" +
"spd=" + destObj.CreativeVersion +
"&destdom=" + location.hostname +
"&ds_path=" + atlasObject.ds_path +
"&xsu=" + destObj.externalFlashStreamURL +
"&su=" + pr.GetStreamingUrl(atlasObject) + destObj.qsChildMovies +
"&AtlasCTR=" + atlasObject.click_url_t + "1";
if (AddMovieIndex)
url += "&MovieIndex=" + destObj.adArrayIndex;
return url;
}
function linkAdToFsCommand(adIndex)
{
ARMRedirLib.Dom.InsertScript(document, 'head',
'auto_orange_DoFSCommand(command, args, ' + adIndex + ')', 'text',
'orange' + adIndex, 'FSCommand(command,args)');
}
return {
ChildMovies : cm,
Movies : movies,
LinkAdToFsCommand : linkAdToFsCommand
}
}();
//-->
<!--
function c9259e275860d45a48d09d21ecd3ebdaf_acbebcb3e2df469390e82a44060167b8()
{
var tempFilesDir = "";
this.IframeTag = false;
this.onViewOccurred = false;
this.bFlashFileInitialized = false;
this.idCampaign = "9259e275860d45a48d09d21ecd3ebdaf";
this.idTag = "a0ba40393fc142499498cde109d946559259e275860d45a48d09d21ecd3ebdaf";
this.idWebCat = "acbebcb3e2df469390e82a44060167b8";
this.idWeb = "001aa24f0412475590ad0e904ee3ede2";
this.idCat2Camp = "f2ef793f25c7448aae55e0bc85356562";
this.idMpgMovie = '';
this.Version = 'ff.V2e'; 
this.CreativeVersion = 0;
this.movieName=-1;
this.moviedir="";
this.idAdvertisement = -1;
this.paramonload = false;
this.minBrowserVersion5 = false;
this.paramonscroll = true;
var htmlElementsTags = new Array("iframe", "select", "applet");
this.hiddenElementsList = new Object();
for (var i = 0; i < htmlElementsTags.length; i++ )
{
this.hiddenElementsList[htmlElementsTags[i]] = new Array();
}
this.paramhideselect = new Object();
this.paramhideselect["teaser"] = false;
this.paramhideselect["reminder"] = false;
this.paramhideselect["main"] = true;
this.paramnoframes = new Object();
this.paramnoframes["teaser"] = false;
this.paramnoframes["reminder"] = false;
this.paramnoframes["main"] = true;
this.paramdynamic = false;
this.paramreminder = false;
this.parammain = false;
this.paramadserver = false;
this.useAkamai = false;
this.surveyVendorTag = new Object();
this.surveyVendorTag["teaser"] = '';
this.surveyVendorTag["reminder"] = '<SCRIPT type=\"text/javascript\" SRC=\"http://amch.questionmarket.com/adscgen/sta.php?survey_num=263041&site=%site_alias%&code=%ad_id%\"><\/SCRIPT>';
this.surveyVendorTag["main"] = '';
this.surveyVendorTagCalled = new Object();
this.surveyVendorTagCalled["teaser"] = false;
this.surveyVendorTagCalled["reminder"] = false;
this.surveyVendorTagCalled["main"] = false;
this.politeDownload = true;
this.res_640x480 = false;
this.res_800x600 = false;
this.res_1024x768 = false;
this.res_1152x864 = false;
this.res_1280x1024 = false;
this.res_1600x1200 = false;
this.showAnyResolution = true;
this.blContent = new Array();
this.blContent[0]= new Array('NMMRTUMISITP/mrs06256_news_20sec_336x280_arm.swf',true,'21f9972e40-8d01-4b66-9e0e-0754a6137721',0,0,0,0,0,7,1,-1,-1,-1,'NMMRTUMISITP/mrs06256_news_336x280.jpg',false,'21d667fdef-dc4e-456e-9780-fa0ea02f06f6',-1,false,'',1,0);

this.a4euserclicks = new Array();
this.a4euserclicks[0]= new Array();

this.locationdata = new Array();
this.locationdata[0] = new Array(0,0,280,336,1,2,1,'Alternate',0,0,280,336,1,2,1,'Alternate',0,0,280,336,1,2,0,'Alternate');

this.phasesNames = new Array("teaser", "reminder", "main");
this.locationParams = new Array("top", "left", "height", "width", "size_method", "location_method", "altoverlay", "anchor");
this.locationInfo = new Object();
this.childmovies = new Array();
this.childmovies[0] = new Object();
 this.childmovies[0]['movie1'] = 'mrs06256_news_20sec_336x280_arm_lo.flv';
 this.childmovies[0]['movie2'] = 'mrs06256_news_20sec_336x280_arm_med.flv';
 this.childmovies[0]['movie3'] = 'mrs06256_news_20sec_336x280_arm_hi.flv';

this.qsChildMovies = '';
this.endDate = -1;
this.startDate = 4916871381623795712;
this.endTime = -1;
this.startTime = -1;
this.cap = 100000;
this.freq = -1;
this.cookieCap = 0;
this.impressionTrackingURL2 = '';
this.impressionTrackingURL3 = '';
this.impressionTrackingURL4 = '';
this.clickTrackingURL1 = '';
this.clickTrackingURL2 = '';
this.clickTrackingURL3 = '';
this.clickTrackingURL4 = '';
this.impressionTrackingVar1 = '';
this.impressionTrackingVar2 = '';
this.impressionTrackingVar3 = '';
this.impressionTrackingVar4 = '';
this.clickTrackingVar1 = '';
this.clickTrackingVar2 = '';
this.clickTrackingVar3 = '';
this.clickTrackingVar4 = '';
this.cookieName = 'Ad4EverCookie';
this.cookieExists = false;
this.EXPLORER_MIN_VERSION=5;
this.screenResolution=1;
this.blTreeLocation = 0;
this.blTreeLocationToCookie = 0;
this.flashMovieVersionRequired = 5;
this.tViewTime = 0;
this.adEnd = false;
this.a4e_ver = 4;
this.status = 0;
this.playStarted = 0;
this.Left=NOT_DEFINED;
this.Top=NOT_DEFINED;
this.Width=NOT_DEFINED;
this.Height=NOT_DEFINED;
this.Size=NOT_DEFINED;
this.Place=NOT_DEFINED;
this.m_Anchor=NOT_DEFINED;
this.bOverlayAlternate=false;
this.computedLeft=NOT_DEFINED;
this.computedTop=NOT_DEFINED;
this.computedWidth=NOT_DEFINED;
this.computedHeight=NOT_DEFINED;
this.a4eexit=false;
this.teasertoclick=0;
this.showtime=0;
this.numofmain=0;
this.addline="";
this.teaserViewTime = 0;
this.reminderViewTime = 0;
this.mainViewTime = 0;
this.parentZIndex = 0;
this.adArrayIndex = -1;
this.sendInfoOnStop = true;
this.emptyCacheMovie = "emptyA4E.ver";
this.alternateOffsetX = 0;
this.alternateOffsetY = 0;
this.lastInteractivityLevel;
this.atlasObject;
this.clicksCount = 0;
this.eventsCount = 0;
this.BXDReported = false;
this.eventCounter = new Object();
this.adCurrentPhase = "teaser";
this.lastEventTimeStamp = 0;
this.bFlashFullyLoaded = false;
this.bustedIframe = IframeAdManager.getAlternateImageIframe(c9259e275860d45a48d09d21ecd3ebdaf_acbebcb3e2df469390e82a44060167b8_alt_obj);
this.isFirefox = (ClientCompatibilityManager.getClientBrowser(navigator.userAgent).browser == "firefox");
this.mouseIn = false;
this.init = function()
{
with (this)
{
if (locationdata.length == 0)
{
return;
}
for (var i = 0; i < phasesNames.length; i++)
{
locationInfo[phasesNames[i]] = new Object();
for (var j = 0; j < locationParams.length; j++)
{
locationInfo[phasesNames[i]][locationParams[j]] = locationdata[0][(i*locationParams.length)+j];
}
}
}
}
this.init();
}
if (typeof(ARM_TestMode) == 'undefined')
{
if (typeof(FLASH_EXTENSION) == 'undefined')
{
var TopLayerVURL = "";
var MOVIE_NAME_PLACE = 0, IS_FROM_DEFAULT_DIR = 1, ID_ADVERTISEMENT_PLACE = 2, IMPRESSION = 3, CLICK = 4, INTERACT = 5, OPEN_FORM = 6, ACTION = 7, MOVIE_FLASH_VERSION = 8, IS_AUTO_CONVERTED = 9, ALTERNATE_MOVIE_NAME = 13,IS_ALT_FROM_DEFAULT_DIR = 14, ALTERNATE_CONTENTS_FLASH_VERSION = 16, IS_ALTERNATE_CONTENTS_EXTERNAL = 17, ALTERNATE_MOVIE_URL = 18, STOP_COMMAND_EXISTS = 19, INDEX_LOCATIONARRAY_ARRAY = 20;
var RELATIVE = 0, ABSOLUTE = 1, ABSOLUTE_RELATIVE = 2, NOT_DEFINED = -100000;
var A4Ebrowser='Explorer';
var EXPIREDAYS=999;
var DEFAULT_STRING='A4E';
var DELIMITER='_';
var COOKIE_DELIMITER='a4e_delim';
var A4Eakamai = "";
var httpConst = "http://";
var HTTP_CONST = httpConst;
var httpsConst = "https://";
var FLASH_EXTENSION = "swf";
var a4eAdsArray = new Array();
var sentMessages = new Array();
var lastOnUnLoad = null;
var A4EDLunLoadFunc = null;
var a4eAdShouldPlay = '';
}
if (typeof(innerDebugMode) == 'undefined')
{
var innerDebugMode = false;
}
var c9259e275860d45a48d09d21ecd3ebdaf_acbebcb3e2df469390e82a44060167b8_obj = new c9259e275860d45a48d09d21ecd3ebdaf_acbebcb3e2df469390e82a44060167b8();
if (adIsNotAlreadyRunning(c9259e275860d45a48d09d21ecd3ebdaf_acbebcb3e2df469390e82a44060167b8_obj))
{
if (validateA4Ead(c9259e275860d45a48d09d21ecd3ebdaf_acbebcb3e2df469390e82a44060167b8_obj))
{
a4eAdShouldPlay = true;
eval("var beginAdHandler"+a4eAdsArray.length);
a4eAdsArray[a4eAdsArray.length] = c9259e275860d45a48d09d21ecd3ebdaf_acbebcb3e2df469390e82a44060167b8_obj;
c9259e275860d45a48d09d21ecd3ebdaf_acbebcb3e2df469390e82a44060167b8_obj.adArrayIndex = a4eAdsArray.length-1;
c9259e275860d45a48d09d21ecd3ebdaf_acbebcb3e2df469390e82a44060167b8_obj.CreativeVersion = c9259e275860d45a48d09d21ecd3ebdaf_acbebcb3e2df469390e82a44060167b8_alt_obj.Version;
runValidatedAd(c9259e275860d45a48d09d21ecd3ebdaf_acbebcb3e2df469390e82a44060167b8_obj);
var contAdPlay = true;
}
else
{
c9259e275860d45a48d09d21ecd3ebdaf_acbebcb3e2df469390e82a44060167b8_obj = null;
a4eAdShouldPlay = false;
}
}
else
{
c9259e275860d45a48d09d21ecd3ebdaf_acbebcb3e2df469390e82a44060167b8_obj = null;
}
}
function adIsNotAlreadyRunning(destObj)
{
if (a4eAdsArray.length >0)
{
for (var i = 0; i < a4eAdsArray.length; i++)
{
if (a4eAdsArray[i].idWebCat == destObj.idWebCat)
{
if (a4eAdsArray[i].idCampaign == destObj.idCampaign)
{
return false;
}
}
}
}
return true;
}
function validateA4Ead(destObj)
{
destObj.atlasObject = c9259e275860d45a48d09d21ecd3ebdaf_acbebcb3e2df469390e82a44060167b8_alt_obj.oAdParams.params;
if (destObj.minBrowserVersion5)
{
destObj.EXPLORER_MIN_VERSION=5.5;
}
var startPoint = destObj.atlasObject.TL_files_path.indexOf("/tl/");
tempFilesDir = destObj.atlasObject.TL_files_path.substring(0, startPoint+3) + "/";
TopLayerVURL = tempFilesDir + "TopLayer." + destObj.Version + ".js";
var appName,appVersion,fappVersion,pos1,pos2,bl,a4e_ver1;
var appVersion = new String(navigator.appVersion);
pos1 = appVersion.indexOf("MSIE");
if (pos1 == -1)
{
destObj.a4e_ver = 6;
}
else
{
fappVersion = new String(appVersion.substring(pos1));
a4e_ver1 = fappVersion.substring(5,8);
destObj.a4e_ver = parseFloat(a4e_ver1);
}
if (destObj.a4e_ver >= destObj.EXPLORER_MIN_VERSION)
{
if (destObj.a4e_ver > 5)
{
destObj.minBrowserVersion5 = true;
}
if ((innerDebugMode) || (checkScreenResolution(destObj, screen.width, screen.height)))
{
movieName = getMovieName(destObj.blTreeLocation, destObj);
if (movieName != -1)
{
var tempFlashMovieVersionRequired = destObj.flashMovieVersionRequired;
destObj.emptyCacheMovie = destObj.emptyCacheMovie + tempFlashMovieVersionRequired + "." + FLASH_EXTENSION;
if ((typeof(oAdsSerializedParams) != 'undefined') && (oAdsSerializedParams[destObj.idTag] != 'undefined'))
{
destObj.IframeTag = true;
}
destObj.emptyCacheMovie = tempFilesDir + destObj.emptyCacheMovie;
if (!destObj.blContent[destObj.blTreeLocation][IS_FROM_DEFAULT_DIR])
{
tempFilesDir = destObj.atlasObject.ds_path.substring(0,destObj.atlasObject.ds_path.lastIndexOf("/")+1);
}
destObj.moviedir = tempFilesDir + movieName;
return true;
}
}
}
return false;
}
function runValidatedAd(destObj)
{
var loadA4EGlobal = true;
if (typeof(contAdPlay) == 'undefined')
{
var s11= new String("<div  style='position:absolute;visibility:hidden;height:0;width:0;top:0;left:0;'><img src= '' alt= '' name=sendy1 width=0 height=0><img src= '' alt= '' name=sendy2 width=0 height=0><img src= '' alt= '' name=sendy3 width=0 height=0><img src= '' alt= '' name=sendy4 width=0 height=0><img src= '' alt= '' name=sendyVar1 width=0 height=0><img src= '' alt= '' name=sendyVar2 width=0 height=0><img src= '' alt= '' name=sendyVar3 width=0 height=0><img src= '' alt= '' name=sendyVar4 width=0 height=0></div>");
ARMRedirLib.Dom.InsertAdjacentHtml(document, "body", s11, true);
lastOnUnLoad = window.onunload;
}
else
{
loadA4EGlobal = false;
}
obtainTrackingFromURL(destObj);
destObj.qsChildMovies = '';	
destObj.fvChildMovies = '';	
var sChildMovies = makeChildMoviesString(destObj);	
if (destObj.blContent[destObj.blTreeLocation][MOVIE_FLASH_VERSION] > 5)
{
destObj.fvChildMovies = '<PARAM NAME=FlashVars value="' + sChildMovies + '">';
}
destObj.qsChildMovies = '&' + sChildMovies;
var tempSWFObjectName = new String("orange" + destObj.adArrayIndex);
var tempSWFLayerObjectName = new String("Outterorange" + destObj.adArrayIndex);
var cachedSWFMovie = new String(
"<OBJECT classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' ID='" + tempSWFObjectName + "_temp' "+
"name='" + tempSWFObjectName + "_temp' style=\"position:absolute; left:0; top:0; visibility:hidden;\">"+
"<PARAM NAME=movie VALUE='" + getAdMovieUrl(destObj, destObj.moviedir) + "'>" +
destObj.fvChildMovies+
"<PARAM NAME=quality VALUE=high>"+
"<PARAM NAME=bgcolor VALUE=#FFFFFF>"+
"<PARAM NAME=wmode VALUE=transparent>"+
"<PARAM NAME=AllowScriptAccess VALUE=never>"+
"<PARAM NAME=MENU VALUE=false>"+
"<PARAM NAME=PLAY VALUE=false>"+
"<EMBED src='" + getAdMovieUrl(destObj, destObj.moviedir) + "' " +
"quality=high bgcolor=#FFFFFF wmode='transparent' AllowScriptAccess='never' menu='false' play='false' "+
"style=\"position:absolute; left:0; top:0; visibility:hidden; overflow:hidden; z-index:999999;\" "+
"NAME='" + tempSWFObjectName + "_temp' TYPE='application/x-shockwave-flash' >"+
"</EMBED>"+
"</OBJECT>");
var s2 = new String(
"<span id='" + tempSWFLayerObjectName + "' " +
"style=\"position:absolute; overflow:hidden; visibility:visible; left:0; top:0; z-index:999998;\">"+
"<OBJECT classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' "+
"ID='" + tempSWFObjectName + "' name='" + tempSWFObjectName + "' "+
"style=\"position:absolute; left:0; top:0; width:100%;height:100%;visibility:visible; z-index:999999;\">" +
"<PARAM NAME=movie VALUE='" + getAdMovieUrl(destObj, destObj.emptyCacheMovie) + "'>" +
destObj.fvChildMovies+
"<PARAM NAME=quality VALUE=high>"+
"<PARAM NAME=bgcolor VALUE=#FFFFFF>"+
"<PARAM NAME=wmode VALUE=transparent>"+
"<PARAM NAME=AllowScriptAccess VALUE=always>"+
"<PARAM NAME=MENU VALUE=false>"+
"<PARAM NAME=PLAY VALUE=false>"+
"<EMBED src='" + getAdMovieUrl(destObj, destObj.emptyCacheMovie) + "' " +
"quality=high bgcolor=#FFFFFF wmode='transparent' menu='false' play='true' AllowScriptAccess='Always' "+
"style=\"position:absolute; left:0; top:0; visibility:visible; overflow:hidden; z-index:999999;\" "+
"NAME='" + tempSWFObjectName + "' TYPE='application/x-shockwave-flash' >"+
"</EMBED>"+
"</OBJECT>"+
"</span>"+
"<div id='atlasUniqueID' style=\"visibility:hidden;position:absolute;\"></div>");
destObj.impressionTrackingURL1 = destObj.atlasObject.atlas_view_url;
if (!destObj.IframeTag)
{
if (loadA4EGlobal)
{
ARMRedirLib.Dom.InsertScript(document, "head", TopLayerVURL);
}
}
else
{
ARMRedirLib.Dom.InsertScript(document, "head", TopLayerVURL);
}
ARMRedirLib.Dom.InsertAdjacentHtml(document, "body", cachedSWFMovie, true);
ARMRedirLib.Dom.InsertAdjacentHtml(document, "body", s2, true);
}
function getAdMovieUrl(destObj, sMoviePath)
{
return ARMPreLib.Movies.getAdMovieUrl(destObj, destObj.atlasObject, sMoviePath, true);
}
function makeChildMoviesString(destObj)
{
return ARMPreLib.ChildMovies.MakeString(destObj, destObj.atlasObject);
}
function getMovieName(treeLocation, destObj)
{
var tempName = -1;
var checkName = '';
if ((treeLocation >= 0) & (treeLocation < destObj.blContent.length))
{
tempName = destObj.blContent[treeLocation][MOVIE_NAME_PLACE];
if ((tempName == '') || (tempName == null) || (tempName == 'null'))
{
tempName = -1;
destObj.idAdvertisement = -1;
}
else
{
destObj.idAdvertisement = destObj.blContent[treeLocation][ID_ADVERTISEMENT_PLACE];
try
{
var tempFlashMovieVersionRequired = destObj.blContent[treeLocation][MOVIE_FLASH_VERSION];
if ((tempFlashMovieVersionRequired >3) && (tempFlashMovieVersionRequired < 9))
{
destObj.flashMovieVersionRequired =
destObj.blContent[treeLocation][MOVIE_FLASH_VERSION];
}
}
catch(e)
{
}
}
}
return tempName;
}
function getNewIdUser()
{
var tempId = "";
tempId = new String(Math.round(Math.random()*100000000));
return tempId;
}
function stripString(sString)
{
if ( (sString.charAt(0) == "'" && sString.charAt(sString.length-1) == "'") ||
(sString.charAt(0) == "\"" && sString.charAt(sString.length-1) == "\""))
{
sString = new String(sString.substring(1,sString.length-1));
}
return sString;
}
function obtainTrackingFromURL(destObj)
{
if (destObj.atlasObject.pub_view_url != '' && typeof(destObj.atlasObject.pub_view_url) != 'undefined')
{
destObj.impressionTrackingURL4 = stripString(destObj.atlasObject.pub_view_url);
}
if (destObj.atlasObject.pub_click_url != '' && typeof(destObj.atlasObject.pub_click_url) != 'undefined')
{
destObj.clickTrackingURL4 = stripString(destObj.atlasObject.pub_click_url);
}
}
function initializeAtlasObject(destObj)
{
try
{
var atlasTPLinfo = document.getElementById("atlasTPLinfoa0ba40393fc142499498cde109d946559259e275860d45a48d09d21ecd3ebdaf");
if ((atlasTPLinfo == 'undefined') || (atlasTPLinfo == undefined) || (atlasTPLinfo == null))
{
return false;
}
if (typeof(destObj.atlasObject) != 'object')
{
destObj.atlasObject = new Object();
}
for (var i = 0; i < atlasTPLinfo.length; i++)
{
eval("destObj.atlasObject." + atlasTPLinfo[i].name + "='" + unescape(atlasTPLinfo[i].value) + "';");
}
}
catch(e)
{
return false;
}
return true;
}
function checkScreenResolution(destObj, nScreenWidth, nScreenHeight)
{

if (destObj.showAnyResolution)
{
return true;
}
var resCompareString = "destObj.res_" + String(nScreenWidth) + "x" + String(nScreenHeight);
var bResolution = eval(resCompareString);
if (typeof(bResolution) == "undefined")
{
return false;
}
else
{
return bResolution;
}
}
//-->
