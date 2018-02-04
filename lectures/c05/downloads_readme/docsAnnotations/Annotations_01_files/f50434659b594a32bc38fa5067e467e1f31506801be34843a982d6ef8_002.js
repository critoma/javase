
<!--
var ARMRedirLib = function()
{
function priv() {}
function Iframes() {}
Iframes.getDocumentReferrer = function()
{
return document.referrer;
}
Iframes.getIframeBusterUrl = function(sIframeBusterUrl)
{
var sDocumentReferrer = "";
var DEFAULT_IFRAME_BUSTER_PATH = "atlas/atlas_rm.htm";
var sIframeBusterPath = DEFAULT_IFRAME_BUSTER_PATH;
try
{
sDocumentReferrer = Iframes.getDocumentReferrer();
}
catch(e)
{
}
if (sDocumentReferrer == "")
{
return sIframeBusterUrl;
}
var regExpReferrerDomain = new RegExp("([http[s]*[\:\/\/]*]*[^\/]*\/).*","i");
var sReferrerDomain = sDocumentReferrer.match(regExpReferrerDomain)[1];
if (sIframeBusterUrl != "")
{
var regExpIframeBusterPath = new RegExp("(http[s]?\:\/\/[^\/]+[\/]|[^\.]+[\.]+[^\/]+[\/])*(.*)" ,"i");
sIframeBusterPath = sIframeBusterUrl.match(regExpIframeBusterPath)[2];
}
if (sReferrerDomain.length > 0 &&
sReferrerDomain.substr(sReferrerDomain.length - 1) == "/" &&
sIframeBusterPath.length > 0 &&
sIframeBusterPath.substr(0, 1) == "/")
{
sIframeBusterPath = sIframeBusterPath.substr(1);
}
return sReferrerDomain + sIframeBusterPath;
}
function Dom() {}
Dom.InsertScript = function(oTargetDocument, sTargetTag, sSrcOrText, sScriptType, sForAttribute, sEventAttribute)
{
var oTargetDocumentAndTag = oTargetDocument.getElementsByTagName(sTargetTag)[0];
var oScript = oTargetDocument.createElement("SCRIPT");
oScript.type = "text/javascript";
oScript.defer = "true";
if (typeof(sScriptType)=='undefined')
{
var sScriptType = "src";
}
if ((typeof(sForAttribute) != 'undefined') && (typeof(sEventAttribute) != 'undefined'))
{
oScript.htmlFor = sForAttribute;
oScript.event = sEventAttribute;
}
oScript[sScriptType] = sSrcOrText;
oTargetDocumentAndTag.appendChild(oScript);
}
Dom.InsertAdjacentHtml = function(oTargetDocument, sTargetTag, sTagsAsString, doUnescape)
{
var oTargetDocumentAndTag = oTargetDocument.getElementsByTagName(sTargetTag)[0];
var oDvStringContainer = oTargetDocument.createElement("DIV");
oDvStringContainer.name = "dvStringContainer";
oDvStringContainer.id = "dvStringContainer";
oDvStringContainer.style.visibility = "hidden";
oTargetDocumentAndTag.appendChild(oDvStringContainer);
if (doUnescape)
{
oDvStringContainer.innerHTML = unescape(sTagsAsString);
}
else
{
oDvStringContainer.innerHTML = sTagsAsString;
}
for (i=0 ; i < oDvStringContainer.childNodes.length ; i++)
{
oTargetDocumentAndTag.appendChild(oDvStringContainer.childNodes[i]);
}
oTargetDocumentAndTag.removeChild(oDvStringContainer);
}
function getElementPosition(element)
{
var coord = { x:0, y:0 };
while (element)
{
coord.x += element.offsetLeft;
coord.y += element.offsetTop;
var leftBorderWidth = "NaN";
var topBorderWidth = "NaN";
if(element.currentStyle)
{
if (element.currentStyle.borderLeftWidth)
{
leftBorderWidth = parseInt(element.currentStyle.borderLeftWidth);
}
if (element.currentStyle.borderTopWidth)
{
topBorderWidth = parseInt(element.currentStyle.borderTopWidth);
}
}
else if(element.style)
{
if(element.style.borderLeftWidth)
{
leftBorderWidth = parseInt(element.style.borderLeftWidth);
}
if(element.style.borderTopWidth)
{
topBorderWidth = parseInt(element.style.borderTopWidth);
}
}
if(!isNaN(leftBorderWidth))
{
coord.x += leftBorderWidth;
}
if(!isNaN(topBorderWidth))
{
coord.y += topBorderWidth;
}
element = element.offsetParent;
}
return coord;
}
function FlashPlayer() {}
FlashPlayer.IsVersionSupported = function(RequiredVersion)
{
var InstalledVersion = 0;
if (navigator.plugins && navigator.plugins.length > 0)
{
var plugin = navigator.plugins["Shockwave Flash"];
if (plugin)
{
if (plugin.description)
{
var re = new RegExp("-?[0-9]+\.[0-9]+");
InstalledVersion = parseInt(plugin.description.match(re)[0]);
}
}
}
else
{
try
{
var obj = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + RequiredVersion);
if (typeof(obj) != 'undefined')
{
InstalledVersion = RequiredVersion;
}
}
catch(e)
{
}
}
return InstalledVersion >= RequiredVersion;
}
function ClientCapabilities() {}
ClientCapabilities.getBrowserVesion = function()
{
return navigator.appVersion;
}
ClientCapabilities.getBrowserUserAgent = function()
{
return navigator.userAgent;
}
return {
Iframes : Iframes,
Dom : Dom,
GetElementPosition : getElementPosition,
FlashPlayer : FlashPlayer, 
ClientCapabilities : ClientCapabilities
}
}();
//-->
<!--
var dynamicIframe = false;
var busterIframeHtml = "";
var busterDynamicIframeHtml = "";
if (typeof(ALTERNATE_MOVIE_NAME) == 'undefined')
{
if (typeof(toplayer_debug_mode) == 'undefined')
var innerDebugMode = false;
else
var innerDebugMode = toplayer_debug_mode;
var nonCompliantClient = false;
var VBEngineEnabled = true;
var httpConst = "http://";
var MOVIE_NAME_PLACE = 0, IS_FROM_DEFAULT_DIR = 1, ID_ADVERTISEMENT_PLACE = 2, IMPRESSION = 3, CLICK = 4, INTERACT = 5, OPEN_FORM = 6, ACTION = 7, MOVIE_FLASH_VERSION = 8, IS_AUTO_CONVERTED = 9, ALTERNATE_MOVIE_NAME = 13,IS_ALT_FROM_DEFAULT_DIR = 14, ALTERNATE_CONTENTS_FLASH_VERSION = 16, IS_ALTERNATE_CONTENTS_EXTERNAL = 17, ALTERNATE_MOVIE_URL = 18, STOP_COMMAND_EXISTS = 19, INDEX_LOCATIONARRAY_ARRAY = 20;
var EXPLORER_MIN_VERSION=5;
}
function runAlt()
{
var idTag = "f50434659b594a32bc38fa5067e467e1f31506801be34843a982d6ef897f7b7d";
var tempSWFObjectName = new String("orange_alternate_" + idTag);
var altObj = document.getElementById(tempSWFObjectName);
altObj.style.visibility = 'visible';
}
function createInputElement (elementName, elementValue)
{
return (new String ("<input type=hidden name=" + elementName + " value='" + escape(elementValue) + "'></input>"));
}
function getParamsFromTPL(atlasObject, uniqueTagID)
{
var returnString = "";
returnString = returnString + "<form name='atlasTPLinfo" + uniqueTagID + "' id='atlasTPLinfo" + uniqueTagID + "'>";
for (propName in atlasObject)
{
returnString = returnString + createInputElement (propName,atlasObject[propName]);
}
return returnString + "</form>";
}
function setRecordNumberAtl(destObj)
{
destObj.A4ERecordNumber = "0";
}
function reportA4EBannerActivity(externalPubClickURL, A4EReportIMGName , callURLstring , A4EBannerShowTimeStamp)
{
var oNewWindow;
if (callURLstring != '')
{
if (innerDebugMode == false)
{
if ((callURLstring.indexOf(httpConst) != 0) && (callURLstring.indexOf('https') != 0))
oNewWindow = window.open(httpConst + callURLstring);
else
oNewWindow = window.open(callURLstring);
if (oNewWindow != null)
{
if (document.layers)
{
document["AtlasPubReportImage"].src=externalPubClickURL;
}
else
{
var imageA = new Image();
imageA.src = externalPubClickURL;
}
}
}
else
{
var eventObj = document.createEventObject();
eventObj.expando = 'exit=1&[No data Available]';
document.all.TopLayerDebugObject.fireEvent("onchange",eventObj);
event.cancelBubble = false;
}
}
elapsedShowtime = (new Date()).getTime() - A4EBannerShowTimeStamp;
}
function handleError()
{
}
function igniteAlternateAd(destObj)
{
runAlternateAd(destObj,destObj.blTreeLocation);
return true;
}
function runAlternateAd(destObj,treeLocation)
{
var alternateTextToWrite = '';
var tempAlternateMovieName = destObj.blContent[treeLocation][ALTERNATE_MOVIE_NAME];
if ((tempAlternateMovieName == '') || (tempAlternateMovieName==null) || (tempAlternateMovieName=='null') || (tempAlternateMovieName==-1) || (tempAlternateMovieName=='-1'))
{
destObj.alternateExists = false;
return;
}
var alternateVisibilityParam = "hidden";
if ((nonCompliantClient) || (innerDebugMode == true))
{
alternateVisibilityParam = "visible";
}
var tempAlternateMovieLocation = destObj.blContent[treeLocation][ALTERNATE_MOVIE_URL];
if (destObj.blContent[treeLocation][IS_ALTERNATE_CONTENTS_EXTERNAL])
{
tempAlternateMovieName = tempAlternateMovieLocation + tempAlternateMovieName;
}
else
{
if (destObj.blContent[treeLocation][IS_ALT_FROM_DEFAULT_DIR])
{
var startPoint = destObj.filesDir.indexOf("/tl/");
var tempFilesDir = destObj.filesDir.substring(0, startPoint+3);
tempFilesDir = tempFilesDir + "/";
tempAlternateMovieName = tempFilesDir+ tempAlternateMovieName;
}
else
{
destObj.dsPath = httpConst + destObj.dsPath.substring(0,destObj.dsPath.lastIndexOf("/")+1);
tempAlternateMovieName = destObj.dsPath + tempAlternateMovieName;
}
}
tempAlternateMovieName = tempAlternateMovieName + destObj.Version;
var tempA4EArray = tempAlternateMovieName.split(".");
var alternateExtension = tempA4EArray[tempA4EArray.length-1].toLowerCase();
var alternateExtension = alternateExtension.substring(0, alternateExtension.indexOf('?'));
var tempSWFObjectName = new String("orange_alternate_" + destObj.idTag);
var urlofpage = escape((String(document.location)).substring(0,98));
setRecordNumberAtl(destObj);
var topLayerServerViewURL = destObj.internalViewReport;
var topLayerServerClickURL = destObj.internalClickReport;
var tempTimeStamp = (new Date()).getTime();
switch(alternateExtension)
{
case 'gif':
case 'jpg':
case 'jpeg':
alternateTextToWrite = getAlternateText(destObj.clickTrackingURL1, 
tempSWFObjectName, 
topLayerServerClickURL, 
tempTimeStamp, 
destObj.idTag, 
alternateVisibilityParam, 
tempAlternateMovieName, 
OrigVersion, 
topLayerServerViewURL );
break;
}
if (alternateTextToWrite != '')
{
var specialLoc = (document.domain).indexOf("weather.com");
var extraStringToAdd = "";
if ((specialLoc >0) && (specialLoc < 10))
extraStringToAdd = "<BR>";
specialLoc = (document.domain).indexOf("ultimateavmag.com");
if ((specialLoc >0) && (specialLoc < 10))
extraStringToAdd = "<BR>";

if (destObj.impressionTrackingURL1 != '')
alternateTextToWrite = alternateTextToWrite + "<div style='visibility:hidden;position:absolute;height:0;width:0;top:0;left:0;'><IMG style='visibility:hidden;position:absolute;top:0;left:0;' name='AtlasPubReportImage' id='AtlasPubReportImage' border=0 width=1 height=1 src='"+destObj.impressionTrackingURL1+"'></div>";
document.write(alternateTextToWrite + extraStringToAdd);
}
}
function getAlternateText(clickTrackingURL, SWFObjectName, topLayerServerClickURL, timeStamp, idTag, alternateVisibilityParam, alternateMovieName, origVersion, topLayerServerViewURL)
{
return "<a href='javascript:reportA4EBannerActivity(\""+clickTrackingURL+"\",\""+SWFObjectName+"_rep\", \"" + topLayerServerClickURL + "\", " + timeStamp + ")'><IMG onclick='reportA4EBannerActivity(\""+clickTrackingURL+"\",\""+SWFObjectName+"_rep\",\"" + topLayerServerClickURL + "\"," + timeStamp + ")' usemap='#AtlasAltMap_" + idTag + "' style='visibility:"+ alternateVisibilityParam + "' border=0 name='"+SWFObjectName+"' id='"+SWFObjectName+"' src='"+alternateMovieName+"?spd="+origVersion+"'></a><map name='AtlasAltMap_" + idTag + "'><area href='javascript:reportA4EBannerActivity(\""+clickTrackingURL+"\",\""+SWFObjectName+"_rep\", \"" + topLayerServerClickURL + "\", " + timeStamp + ")' shape='default'></map><div style='visibility:hidden;position:absolute;height:0;width:0;top:0;left:0;'><IMG style='visibility:hidden;position:absolute;top:0;left:0;'  border=0 width=1 height=1 name='"+SWFObjectName+"_rep' id='"+SWFObjectName+"_rep' src='"+topLayerServerViewURL+"'></div>";
}
var cf31506801be34843a982d6ef897f7b7d_108e8cad43a74d2bab1bd2704d4f7240_alt_obj = null;
function cf31506801be34843a982d6ef897f7b7d_108e8cad43a74d2bab1bd2704d4f7240_alt()
{
this.idCampaign = "f31506801be34843a982d6ef897f7b7d";
this.idTag = "f50434659b594a32bc38fa5067e467e1f31506801be34843a982d6ef897f7b7d";
this.idWebCat = "108e8cad43a74d2bab1bd2704d4f7240";
this.A4ERecordNumber=-1;
this.blContent = new Array();
this.blContent[0]= new Array('NMMRTUMISVSE/mrs06322_sban_long_336x280_arm.swf',true,'215c03c58f-063e-462b-9a12-6c532b1e0665',0,0,0,0,0,7,1,-1,-1,-1,'NMMRTUMISVSE/mrs06322_sban_long_336x280.jpg',false,'21591cce54-59eb-41f1-b65f-63eb7a14beb1',-1,false,'',1,0);

this.oIframeTag = false;
this.Version = '118';
this.TopLayerAdURL = "";
this.blTreeLocation = 0;
this.filesDir='rmd.atdmt.com/tl/f31506801be34843a982d6ef897f7b7d/';
this.dsPath = "";
this.impressionTrackingURL1 = '';
this.clickTrackingURL1 = '';
this.internalViewReport = "";
this.internalClickReport = "";
this.uniqueImp = true;
this.alternateExists = true;
this.atlasObject = null;
this.advertiserID = '';
this.OrigVersion = '118';
this.bFirefoxEnabled = true;
this.Run = function()
{
cf31506801be34843a982d6ef897f7b7d_108e8cad43a74d2bab1bd2704d4f7240_alt_obj = this;
generalSetup(this, true);
if (!nonCompliantClient)
{
IsDynamicIframe();
generalValidation(this, true);
}
}
}
if (typeof(ARM_rtc) == "undefined")
{
var ARM_rtc = {};
ARM_rtc.ver = "a1";
ARM_rtc.AdLoad = function(AdModule)
{
AdModule.Run();
}
}
if (typeof(ARM_TestMode) == 'undefined')
{
ARM_rtc.AdLoad(new cf31506801be34843a982d6ef897f7b7d_108e8cad43a74d2bab1bd2704d4f7240_alt());
}
function UserAgentIsFireFox(userAgent)
{
var ua = new String(userAgent);
var bni = ua.indexOf("Firefox");
if (bni > -1)
{
var bns = new String(ua.substr(bni));
var bna = bns.split("/");
var bvs = new String(bna[1]);
var bva = bvs.split(".");
var major = parseInt(bva[0]);
var minor = parseInt(bva[1]);
if (major == 1 && minor >= 5 || major > 1)
return true;
}
return false;
}
function FirefoxScriptSource(destObj)
{
return destObj.filesDir + destObj.idTag + ".ff.js?ver=" + TopLayer_version;
}
function getRedirectScript(destObj, isUserAgentFirefox)
{
var redirectScript = "";
if (destObj.bFirefoxEnabled && isUserAgentFirefox)
{
redirectScript = "<script src='" + FirefoxScriptSource(destObj) + "'></scr";
redirectScript +="ipt>";
}
return redirectScript;
}
function generalSetup(destObj, VBEngineEnabled)
{
OrigVersion = destObj.Version;
destObj.Version = OrigVersion + "&atdmt=";
var appVersion = new String(ARMRedirLib.ClientCapabilities.getBrowserVesion());
populateAtlasAdObject(destObj);
if(RedirectedToFireFox(destObj))
{
nonCompliantClient = true;
return;
}
if (appVersion.indexOf("Windows") == -1 )
nonCompliantClient = true;
var pos1 = appVersion.indexOf("MSIE");
if (pos1 == -1)
nonCompliantClient = true;
var fappVersion = new String(appVersion.substring(pos1));
var a4e_ver1 = fappVersion.substring(5,8);
var a4e_ver = parseFloat(a4e_ver1);
if (a4e_ver < EXPLORER_MIN_VERSION)
nonCompliantClient = true;
if (typeof(window.opera)=="object")
if (window.opera != null)
nonCompliantClient = true;
if(appVersion.indexOf("Safari") != -1)
nonCompliantClient = true;
if (!ARMRedirLib.FlashPlayer.IsVersionSupported(destObj.blContent[destObj.blTreeLocation][MOVIE_FLASH_VERSION]))
nonCompliantClient = true;
destObj.Version = '?spd='+ destObj.Version;
if (nonCompliantClient)
{
igniteAlternateAd(destObj);
if (destObj.alternateExists)
{
if (!document.layers)
{
var oBaseColl = document.getElementsByTagName('BASE');
if (oBaseColl.length > 0)
oBaseColl[0].target = "_self";
}
}
return true;
}
}
function generalValidation(destObj, VBEngineEnabled)
{
var newTopLayerAdURL;
var innerTempTopLayerAdURL = "";
destObj.TopLayerAdURL = destObj.tempTopLayerAdURL + destObj.Version;
var uniqueA4EIdForTag2 = new String (destObj.idCampaign + "\/" + destObj.idTag + ".js");
var isParentIframe = false;
var varStr = "";
newTopLayerAdURL = destObj.TopLayerAdURL;
window.onerror = null;
for (i=0;i<document.scripts.length;i++)
{
if (document.scripts(i).src.indexOf(uniqueA4EIdForTag2) >-1)
varStr = new String(document.scripts(i).src);
}
if ((varStr != null) && (varStr.length != 0))
{
varStr = varStr.split(".js?");
for (i=1;i<varStr.length;i++)
{
innerTempTopLayerAdURL = innerTempTopLayerAdURL + varStr[i];
}
innerTempTopLayerAdURL = innerTempTopLayerAdURL.substr(innerTempTopLayerAdURL.indexOf("atdmt=")+7);
newTopLayerAdURL = destObj.TopLayerAdURL + innerTempTopLayerAdURL;
}
if (window.self != window.top)
isParentIframe = true;
if (newTopLayerAdURL.indexOf("a4eflag") != -1)
{
innerTempTopLayerAdURL = destObj.Version + innerTempTopLayerAdURL;
isParentIframe = false;
var tempLocationString = escape(String(document.location));
var A4ERecordNumberParam = tempLocationString.indexOf("A4ERecordNumber=");
if (A4ERecordNumberParam != -1)
{
var endOfString = tempLocationString.indexOf("a4edelim",A4ERecordNumberParam+1);
if (endOfString > -1)
{
A4ERecordNumberParam = tempLocationString.substring(A4ERecordNumberParam+16,endOfString);
}
newTopLayerAdURL = newTopLayerAdURL + A4ERecordNumberParam;
}
}
else
{
if (!igniteAlternateAd(destObj))
return false;
if (destObj.A4ERecordNumber != -1)
{
var temAddonStr = "A4ERecordNumber=" + destObj.A4ERecordNumber + "a4edelim";
innerTempTopLayerAdURL = innerTempTopLayerAdURL + temAddonStr;
newTopLayerAdURL = newTopLayerAdURL + temAddonStr;
}
}
if (isParentIframe)
{
if (typeof(a4eHTM) == 'undefined')
{
if (destObj.tempTopLayerAdURL != "")
{
var a4eHTM = newTopLayerAdURL.indexOf("a4ehtm=");
if (a4eHTM > -1)
{
var endOfString = newTopLayerAdURL.indexOf("a4edelim",a4eHTM+1);
if (endOfString > -1)
{
a4eHTM = newTopLayerAdURL.substring(a4eHTM+7,endOfString);
if (a4eHTM.length >1)
{
a4eHTM = ARMRedirLib.Iframes.getIframeBusterUrl(a4eHTM);
}
else
{
if (!dynamicIframe)
isParentIframe = false;
}
}
}
else
{
if (!dynamicIframe)
isParentIframe = false; 
}
}
else
{
if (!dynamicIframe)
isParentIframe = false;
}
}
else
if ((a4eHTM.indexOf('http') != 0) && (a4eHTM.indexOf('https') != 0))
a4eHTM = httpConst + a4eHTM;
}
if (typeof(a4eIframe) != 'undefined')
destObj.oIframeTag = a4eIframe;
if (isParentIframe)
{
if (destObj.alternateExists)
{
var tempSWFObjectName = new String("orange_alternate_" + destObj.idTag);
document.getElementById(tempSWFObjectName).onload = altImageLoaded;
if (!document.layers)
{
var oBaseColl = document.all.tags('BASE');
if (oBaseColl.length > 0)
oBaseColl[0].target = "_self";
}
}
var atlasIfrName = getParamsFromTPL(destObj.atlasObject, destObj.idTag);
atlasIfrName = escape(atlasIfrName);
if (!dynamicIframe)
{
busterIframeHtml = "<iframe name='" + atlasIfrName + "' id='" + atlasIfrName + "' height=0 width=0 src='" + a4eHTM+ "?"+uniqueA4EIdForTag2+destObj.Version+innerTempTopLayerAdURL+"a4eflag&fn="+eval('escape(document.location)')+"a4edelim&a4eol=a4edelim&a4eot=a4edelim&imgSrv=" + imageServerURL +"'> <\/iframe>";
}
else
{
var tlPath = destObj.atlasObject.TL_files_path;
var startPoint = tlPath.indexOf("/tl/");
tlPath = tlPath.substring(0, startPoint+4);
var iframeBustingScriptPath = tlPath + "newIframeScript.js";
addUniqueIdToParentIframe(destObj.idTag);
busterIframeHtml = "<iframe name='" + atlasIfrName + "' id='" + atlasIfrName + "' height=0 width=0 src='about:blank' frameborder='0' scrolling='no'> <\/iframe>";
busterDynamicIframeHtml = "<html><head><title>Advertisement</title></head><body leftmargin='0' topmargin='0'><scr"+"ipt type='text/javascript' src='"+iframeBustingScriptPath+"?"+uniqueA4EIdForTag2+destObj.Version+innerTempTopLayerAdURL+"a4eflag&fn=dia4edelim&a4eol=a4edelim&a4eot=a4edelim&imgSrv=" + imageServerURL +"'></scr"+"ipt><scr"+"ipt type='text/javascript'>window.setTimeout('document.close();', 500);</scr"+"ipt></body></html>";
}
if (!destObj.alternateExists)
{
altImageLoaded();
}
else
{
runAltAsync(6000);
}
}
else
{
if (!destObj.oIframeTag)
{
document.write("<\script src='" + newTopLayerAdURL + "'> <\/script>");
}
else
{
var tempScript10 = new String("<input type=hidden width=260 height=20 name=ad4Input31"+destObj.idTag+" value=" + "\"" + newTopLayerAdURL + "\"><script LANGUAGE='JavaScript' src='' id='ad4everscript41"+destObj.idTag+"'><\/script><script DEFER LANGUAGE='JavaScript' src='' id='ad4everscript31"+destObj.idTag+"'>document.all.ad4everscript41"+destObj.idTag+".src = document.all.ad4Input31"+destObj.idTag+".value<\/script>");
eval("document.body.insertAdjacentHTML('afterBegin',tempScript10)");
}
}
return true;
}
function populateAtlasAdObject(destObj)
{
if (typeof(atlasTPLinfof50434659b594a32bc38fa5067e467e1f31506801be34843a982d6ef897f7b7d) != 'undefined')
{
destObj.internalViewReport = unescape(document.body.all.atlasTPLinfof50434659b594a32bc38fa5067e467e1f31506801be34843a982d6ef897f7b7d.atlas_view_url.value);
destObj.internalClickReport = unescape(document.body.all.atlasTPLinfof50434659b594a32bc38fa5067e467e1f31506801be34843a982d6ef897f7b7d.click_url_t.value) + "1";
destObj.advertiserID = unescape(document.body.all.atlasTPLinfof50434659b594a32bc38fa5067e467e1f31506801be34843a982d6ef897f7b7d.advertiserID.value);
destObj.filesDir = unescape(document.body.all.atlasTPLinfof50434659b594a32bc38fa5067e467e1f31506801be34843a982d6ef897f7b7d.TL_files_path.value);
destObj.tempTopLayerAdURL = destObj.filesDir + destObj.idTag + "a.js";
destObj.dsPath = unescape(document.body.all.atlasTPLinfof50434659b594a32bc38fa5067e467e1f31506801be34843a982d6ef897f7b7d.ds_path.value);
destObj.clickTrackingURL1 = unescape(document.body.all.atlasTPLinfof50434659b594a32bc38fa5067e467e1f31506801be34843a982d6ef897f7b7d.pub_click_url.value);
destObj.impressionTrackingURL1 = unescape(document.body.all.atlasTPLinfof50434659b594a32bc38fa5067e467e1f31506801be34843a982d6ef897f7b7d.pub_view_url.value);
}
else
{
destObj.atlasObject = eval('__atlas_ad_info["'+destObj.idTag+'"];');
destObj.internalViewReport = destObj.atlasObject.atlas_view_url;
destObj.internalClickReport = destObj.atlasObject.click_url_t + "1";
destObj.advertiserID = destObj.atlasObject.advertiserID;
destObj.filesDir = destObj.atlasObject.TL_files_path;
destObj.tempTopLayerAdURL = destObj.filesDir + destObj.idTag + "a.js";
destObj.dsPath = destObj.atlasObject.ds_path;
destObj.clickTrackingURL1 = destObj.atlasObject.pub_click_url;
destObj.impressionTrackingURL1 = destObj.atlasObject.pub_view_url;
}
if ((destObj.clickTrackingURL1).indexOf('pub_click_url') != -1)
destObj.clickTrackingURL1 = '';
if ((destObj.impressionTrackingURL1).indexOf ('pub_view_url') != -1)
destObj.impressionTrackingURL1 = '';
}
function RedirectedToFireFox(destObj)
{
var sRedirectScript = getRedirectScript(destObj, UserAgentIsFireFox(ARMRedirLib.ClientCapabilities.getBrowserUserAgent()));
if (sRedirectScript != "")
{
document.write(sRedirectScript);
return true;
}
return false;
}
function runAltAsync(delay)
{
window.setTimeout('runAlt()', delay);
}
function altImageLoaded()
{
var idTag = "f50434659b594a32bc38fa5067e467e1f31506801be34843a982d6ef897f7b7d";
var tempSWFObjectName = new String("orange_alternate_" + idTag);
altPosition = ARMRedirLib.GetElementPosition(document.getElementById(tempSWFObjectName));
var ol = altPosition.x;
var ot = altPosition.y;
if (!dynamicIframe)
{
busterIframeHtml = busterIframeHtml.replace("a4eol=a4edelim", "a4eol="+ol+"a4edelim");
busterIframeHtml = busterIframeHtml.replace("a4eot=a4edelim", "a4eot="+ot+"a4edelim");
if((document.readyState == "complete" || document.readyState == "interactive") && document.body)
{
document.body.insertAdjacentHTML('afterBegin', busterIframeHtml);
}
else
{
document.write(busterIframeHtml);
document.close();
}
}
else
{
busterDynamicIframeHtml = busterDynamicIframeHtml.replace("a4eol=a4edelim", "a4eol="+ol+"a4edelim");
busterDynamicIframeHtml = busterDynamicIframeHtml.replace("a4eot=a4edelim", "a4eot="+ot+"a4edelim");
busterIframeHtml.match("name='(.*?)'");
var atlasIfrName = RegExp.$1;
if((document.readyState == "complete" || document.readyState == "interactive") && document.body)
{
document.body.insertAdjacentHTML('afterBegin', busterIframeHtml);
document.frames[atlasIfrName].document.open("text/html", "replace");
document.frames[atlasIfrName].document.write(busterDynamicIframeHtml);
}
else
{
document.write(busterIframeHtml);
document.frames[atlasIfrName].document.open("text/html", "replace");
document.frames[atlasIfrName].document.write(busterDynamicIframeHtml);
document.close();
}
}
}
function handleDomainError()
{
window.onerror = null;
generalValidation(cf31506801be34843a982d6ef897f7b7d_108e8cad43a74d2bab1bd2704d4f7240_alt_obj, true);
return true;
}
function IsDynamicIframe()
{
window.onerror = handleDomainError;
if (window.self != window.top)
if (window.top.document.domain)
if (top.location.href == self.location.href || (typeof(inDapIF) != "undefined" && inDapIF))
dynamicIframe = true;
window.onerror = null;
}
function addUniqueIdToParentIframe(uniqueId)
{
var iframeList = top.document.getElementsByTagName('iframe');
for(var j=0; j < iframeList.length; j++)
{
if (iframeList[j] == window.frameElement)
{
iframeList[j].atlasUniqueId = uniqueId;
}
}
}
//-->
