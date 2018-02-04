
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
return {
Iframes : Iframes,
Dom : Dom,
GetElementPosition : getElementPosition,
FlashPlayer : FlashPlayer
}
}();
//-->
<!--
function getValueFromDelimitedString(paramKey, delimiter, queryString)
{
re = new RegExp(paramKey + "=" + "(.*?)" + "("+ delimiter +"|$)");
var matchArray = queryString.match(re);
if (matchArray == null)
{
return "";	
}
else
{
return matchArray[1];
}
}
function getTlDirectory()
{
if ( typeof(imageServerURL) != 'undefined' )
{
var queryVar = imageServerURL;
var queryVarLen = queryVar.length;
return queryVar.substring(0,queryVarLen - 13);
}
else
{
var tlFilesPath = new AdParams("f50434659b594a32bc38fa5067e467e1f31506801be34843a982d6ef897f7b7d").params.TL_files_path;
var queryVar = tlFilesPath;
var queryVarLen = queryVar.length;
return queryVar.substring(0,queryVarLen - 46);
}
}
function ClientCompatibilityManager()
{}
ClientCompatibilityManager.setCompatibleClient = function(oCompatibleClientsObject, sCompaibleOS, sCompatibleBrowser, nBrowserVersion, sBrowserVersionLetters)
{
if (typeof(oCompatibleClientsObject[sCompaibleOS]) == 'undefined')
{
oCompatibleClientsObject[sCompaibleOS] = new Object();
}
if (typeof(oCompatibleClientsObject[sCompaibleOS][sCompatibleBrowser]) == 'undefined')
{
oCompatibleClientsObject[sCompaibleOS][sCompatibleBrowser] = new Object();
}
oCompatibleClientsObject[sCompaibleOS][sCompatibleBrowser].version = nBrowserVersion;
oCompatibleClientsObject[sCompaibleOS][sCompatibleBrowser].versionLetters = sBrowserVersionLetters;
}
ClientCompatibilityManager.getBrowserRegularExpressions = function()
{
var re = new Object();
re["aol"] = new RegExp(".*(America\\sOnline\\sBrowser).*rev([0-9]*[\.]*[0-9]*)().*","i");
re["avant"] = new RegExp(".*(Advanced\\sBrowser|Avant\\sBrowser).*()()","i");
re["netscape"] = new RegExp(".*(Netscape)[^\/]*\/([0-9]*[\.]*[0-9]*)()","i");
re["opera"] = new RegExp(".*(Opera)\\s*\/*\\s*([0-9]*[\.]*[0-9]*)()","i");
re["safari"] = new RegExp(".*(Safari)\\s*\/*\\s*([0-9]*[\.]*[0-9]*)()","i");
re["firefox"] = new RegExp(".*(Firefox|BonEcho|Minefield)[\\s|\/]*([0-9]*[\.]*[0-9]*)[\.]*([^\s]*)","i");
re["msie"] = new RegExp(".*(MSIE|Microsoft\\sInternet\\sExplorer)[\\s|\/]([0-9]+\.[0-9]*)([^\;|^\\s]*)","i");
return re;
}
ClientCompatibilityManager.getOSRegularExpressions = function()
{
var osRegExp = new RegExp(".*(Win|SunOS|Mac|Linux|FreeBSD|OS\/2|PalmOS|Symbian\\sOS).*","i");
return osRegExp;
}
ClientCompatibilityManager.getClientBrowser = function(sBrowserIdString)
{
var re=ClientCompatibilityManager.getBrowserRegularExpressions();
var oBrowserDetails = new Object();
oBrowserDetails.browser = null;
oBrowserDetails.version = null;
oBrowserDetails.versionLetters = null;
for (var regExpression in re)
{
var matchBrowser = sBrowserIdString.match(re[regExpression]);
if (matchBrowser != null)
{
oBrowserDetails.browser = regExpression;
oBrowserDetails.version = parseFloat(matchBrowser[2]);
oBrowserDetails.versionLetters = matchBrowser[3];
return oBrowserDetails;
}
}
return oBrowserDetails;
}
ClientCompatibilityManager.getClientOS = function(sBrowserIdString)
{
var osRegExp = ClientCompatibilityManager.getOSRegularExpressions();
var sMatchOS = sBrowserIdString.match(osRegExp)
var sClientOS = null;
if (sMatchOS != null)
{
sClientOS = sMatchOS[1];
}
return sClientOS;
}
ClientCompatibilityManager.isCompatibleBrowserAndOS = function(sBrowserIdString)
{
var bIsCompatibleBrowserAndOS = false;
var sClientOs = ClientCompatibilityManager.getClientOS(sBrowserIdString);
var oClientBrowser = ClientCompatibilityManager.getClientBrowser(sBrowserIdString);
if (oCompatibleClients[sClientOs] != null &&
typeof(oCompatibleClients[sClientOs]) != 'undefined')
{
if (oCompatibleClients[sClientOs][oClientBrowser.browser] != null &&
typeof(oCompatibleClients[sClientOs][oClientBrowser.browser]) != 'undefined')
{
var nCompatibleBrowserVersion = oCompatibleClients[sClientOs][oClientBrowser.browser].version;
var sCompatibleBrowserVersionLetters = oCompatibleClients[sClientOs][oClientBrowser.browser].versionLetters;
var nClientBrowserVersion = oClientBrowser.version;
var sClientBrowserVersionLetters = oClientBrowser.versionLetters;
if (nClientBrowserVersion > nCompatibleBrowserVersion)
{
bIsCompatibleBrowserAndOS = true;
}
else if (nClientBrowserVersion == nCompatibleBrowserVersion)
{
if ((sClientBrowserVersionLetters >= sCompatibleBrowserVersionLetters) ||
sClientBrowserVersionLetters=='')
{
bIsCompatibleBrowserAndOS = true;
}
}
}
}
return bIsCompatibleBrowserAndOS;
}
ClientCompatibilityManager.isCompatibleClient = function(iRequiredFlashVersion)
{
var sBrowserIdString = new String(navigator.userAgent);
return (ClientCompatibilityManager.isCompatibleBrowserAndOS(sBrowserIdString) &&
ARMRedirLib.FlashPlayer.IsVersionSupported(iRequiredFlashVersion));
}
var cf31506801be34843a982d6ef897f7b7d_108e8cad43a74d2bab1bd2704d4f7240_alt_obj = null;
if (typeof(bFirefoxGlobalVarsLoaded) == 'undefined')
{
if (typeof(toplayer_debug_mode) == 'undefined')
{
var innerDebugMode = false;
}
else
{
var innerDebugMode = toplayer_debug_mode;
}
var bIsCompatibleClient = false;
var VBEngineEnabled = true;
var HTTP_CONST = "http://";
var MOVIE_NAME_PLACE = 0, IS_FROM_DEFAULT_DIR = 1, ID_ADVERTISEMENT_PLACE = 2, IMPRESSION = 3, CLICK = 4, INTERACT = 5, OPEN_FORM = 6, ACTION = 7, MOVIE_FLASH_VERSION = 8, IS_AUTO_CONVERTED = 9, ALTERNATE_MOVIE_NAME = 13,IS_ALT_FROM_DEFAULT_DIR = 14, ALTERNATE_CONTENTS_FLASH_VERSION = 16, IS_ALTERNATE_CONTENTS_EXTERNAL = 17, ALTERNATE_MOVIE_URL = 18, STOP_COMMAND_EXISTS = 19, INDEX_LOCATIONARRAY_ARRAY = 20;
var oCompatibleClients = new Object();
ClientCompatibilityManager.setCompatibleClient(oCompatibleClients, "Win", "msie", 5,"");
ClientCompatibilityManager.setCompatibleClient(oCompatibleClients, "Win", "firefox", 1.5,"");
ClientCompatibilityManager.setCompatibleClient(oCompatibleClients, "Mac", "firefox", 1.5,"");
var AtlasPageLoaded = false;
var pageLoadDetectorInstance = null;
var bFirefoxGlobalVarsLoaded = true;
}
function runAlt()
{
var idTag = "f50434659b594a32bc38fa5067e467e1f31506801be34843a982d6ef897f7b7d";
var alternateImageName = new String("orange_alternate_" + idTag);
var altObj = document.getElementById(alternateImageName);
altObj.style.visibility = 'visible';
}
function createInputElement (elementName, elementValue)
{
return (new String ("<input type=hidden name='" + elementName + "' value='" + escape(elementValue) + "'>"));
}
function reportA4EBannerActivity(externalPubClickURL, A4EReportIMGName , callURLstring , A4EBannerShowTimeStamp)
{
var oNewWindow;
if (callURLstring != '')
{
if (innerDebugMode == false)
{
if ((callURLstring.indexOf(HTTP_CONST) != 0) && (callURLstring.indexOf('https') != 0))
oNewWindow = window.open(HTTP_CONST + callURLstring);
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
function parsePortOff(stringIncPort)
{
var origStringSent = stringIncPort;
var startSearchFrom = stringIncPort.indexOf("//");
if ((startSearchFrom == -1) || (startSearchFrom > 10))
{
startSearchFrom = 0;
}
var endSearchAt = stringIncPort.indexOf("/",startSearchFrom+2);
var stringToLookIn = origStringSent.substring(0,endSearchAt);
var portStartPoint = stringToLookIn.indexOf(":",startSearchFrom+2);
if (portStartPoint == -1)
{
return origStringSent;
}
stringToLookIn = origStringSent.substring(0,portStartPoint) + origStringSent.substr(endSearchAt);
return stringToLookIn;
}
function alternateAdExists(destObj)
{
var sAlternateAdName = destObj.blContent[destObj.blTreeLocation][ALTERNATE_MOVIE_NAME];
if ((sAlternateAdName == '') || (sAlternateAdName == null) || (sAlternateAdName == 'null') ||
(sAlternateAdName == -1) || (sAlternateAdName == '-1'))
{
return false;
}
else
{
return true;
}
}
function runAlternateAd(destObj, bDoAttach)
{
var treeLocation = destObj.blTreeLocation;
var alternateTextToWrite = '';
var tempAlternateMovieName = destObj.blContent[treeLocation][ALTERNATE_MOVIE_NAME];
if (!destObj.alternateExists)
{
return;
}
var alternateVisibilityParam = "hidden";
if ((!bIsCompatibleClient) || (innerDebugMode == true))
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
var startPoint = destObj.oAdParams.params.TL_files_path.indexOf("/tl/");
var tempFilesDir = destObj.oAdParams.params.TL_files_path.substring(0, startPoint+3);
tempFilesDir = tempFilesDir + "/";
tempAlternateMovieName = tempFilesDir+ tempAlternateMovieName;
}
else
{
tempAlternateMovieName = HTTP_CONST + destObj.oAdParams.params.ds_path.substring(0,destObj.oAdParams.params.ds_path.lastIndexOf("/")+1) + tempAlternateMovieName;
}
}
var tempA4EArray = tempAlternateMovieName.split(".");
var alternateExtension = tempA4EArray[tempA4EArray.length-1].toLowerCase();
var alternateImageName = new String("orange_alternate_" + destObj.idTag);
var urlofpage = escape((String(document.location)).substring(0,98));
switch(alternateExtension)
{
case 'gif':
case 'jpg':
case 'jpeg':
alternateTextToWrite = getAlternateText(destObj, alternateImageName, alternateVisibilityParam,
tempAlternateMovieName, bDoAttach);
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
if (destObj.oAdParams.params.pub_view_url != '')
{
alternateTextToWrite = alternateTextToWrite + "<div style='visibility:hidden;position:absolute;height:0;width:0;top:0;left:0;'><IMG alt='' style='visibility:hidden;position:absolute;top:0;left:0;' name='AtlasPubReportImage' id='AtlasPubReportImage' border=0 width=1 height=1 src='"+destObj.oAdParams.params.pub_view_url+"'></div>";
}
document.write(alternateTextToWrite + extraStringToAdd);
}
if (bIsCompatibleClient)
{
var altImage = DhtmlUtils.GetObj(alternateImageName);
var altImagePosition = ARMRedirLib.GetElementPosition(altImage);
destObj.oAdParams.addParam("altImageOffsetLeft", altImagePosition.x);
destObj.oAdParams.addParam("altImageOffsetTop", altImagePosition.y);
destObj.oAdParams.addParam("altImageOffsetWidth", altImage.offsetWidth);
destObj.oAdParams.addParam("altImageOffsetHeight", altImage.offsetHeight);
}
}
function setAlternateStylePosition(destObj)
{
var altImage = DhtmlUtils.GetObj("orange_alternate_" + destObj.idTag);
var element = altImage;
while(element.offsetParent)
{
element = element.offsetParent;
if (element.tagName.toLowerCase() == "table" && element.style.display == "inline")
{
altImage.style.position = 'relative';
break;
}
}
}
function setUpAlternateParams(destObj)
{
var altImage = DhtmlUtils.GetObj("orange_alternate_" + destObj.idTag);
var altImagePosition = ARMRedirLib.GetElementPosition(altImage);
destObj.oAdParams.addParam("altImageOffsetLeft", altImagePosition.x);
destObj.oAdParams.addParam("altImageOffsetTop", altImagePosition.y);
destObj.oAdParams.addParam("altImageOffsetWidth", altImage.offsetWidth);
destObj.oAdParams.addParam("altImageOffsetHeight", altImage.offsetHeight);
}
function handleAlternateOnload(destObj)
{
setAlternateStylePosition(destObj);
setUpAlternateParams(destObj);
if (destObj.bustingOut)
{
IframeAdManager.setUpIframe(destObj, imageServerURL);
destObj.bustingOut = void(0);
}
}
function getAlternateText(oDestObj, sAlternateImageName ,sAlternateVisibilityParam, sTempAlternateMovieName, bDoAttach)
{
var sTextToAttach = "";
if (bDoAttach)
{
sTextToAttach = "onload='handleAlternateOnload(cf31506801be34843a982d6ef897f7b7d_108e8cad43a74d2bab1bd2704d4f7240_alt_obj)'";
}
var sTimeStamp = (new Date()).getTime();
return ("<a href='javascript:reportA4EBannerActivity(\"" + oDestObj.oAdParams.params.pub_click_url +
"\",\"" + sAlternateImageName + "_rep\", \"" + oDestObj.oAdParams.params.click_url_t + "1" + "\", " + sTimeStamp +
")'><IMG alt='' " + sTextToAttach + " onclick='reportA4EBannerActivity(\""+oDestObj.oAdParams.params.pub_click_url +
"\",\"" + sAlternateImageName + "_rep\",\"" + oDestObj.oAdParams.params.click_url_t + "1" + "\"," + sTimeStamp +
")' usemap=\"#AtlasAltMap\" style='visibility:" + sAlternateVisibilityParam + "' border=0 name='" +
sAlternateImageName + "' id='" + sAlternateImageName + "' src='" + sTempAlternateMovieName + "?spd=" +
oDestObj.Version + "'></a><map name=\"AtlasAltMap\"><area href='javascript:reportA4EBannerActivity(\"" +
oDestObj.oAdParams.params.pub_click_url + "\",\"" + sAlternateImageName + "_rep\", \"" +
oDestObj.oAdParams.params.click_url_t + "1" + "\", " + sTimeStamp + ")' shape='default'>" +
"</map><div style='visibility:hidden;position:absolute;height:0;width:0;top:0;left:0;'>" +
"<IMG alt='' style='visibility:hidden;position:absolute;top:0;left:0;'  border=0 width=1 height=1 name='" +
sAlternateImageName + "_rep' id='" + sAlternateImageName + "_rep' src='" + oDestObj.oAdParams.params.atlas_view_url + "'></div>");
}
function cf31506801be34843a982d6ef897f7b7d_108e8cad43a74d2bab1bd2704d4f7240_alt()
{
this.bFirefoxEnabled = true;
this.idCampaign = "f31506801be34843a982d6ef897f7b7d";
this.idTag = "f50434659b594a32bc38fa5067e467e1f31506801be34843a982d6ef897f7b7d";
this.idWebCat = "108e8cad43a74d2bab1bd2704d4f7240";
this.blContent = new Array();
this.blContent[0]= new Array('NMMRTUMISVSE/mrs06322_sban_long_336x280_arm.swf',true,'215c03c58f-063e-462b-9a12-6c532b1e0665',0,0,0,0,0,7,1,-1,-1,-1,'NMMRTUMISVSE/mrs06322_sban_long_336x280.jpg',false,'21591cce54-59eb-41f1-b65f-63eb7a14beb1',-1,false,'',1,0);

this.Version = '120';
this.blTreeLocation = 0;
this.uniqueImp = true;
this.alternateExists = true;
this.oAdParams = null;
this.armScriptVersion = "ifb.3";
}
function startAdf31506801be34843a982d6ef897f7b7d_108e8cad43a74d2bab1bd2704d4f7240()
{
cf31506801be34843a982d6ef897f7b7d_108e8cad43a74d2bab1bd2704d4f7240_alt_obj = new cf31506801be34843a982d6ef897f7b7d_108e8cad43a74d2bab1bd2704d4f7240_alt();
generalValidation(cf31506801be34843a982d6ef897f7b7d_108e8cad43a74d2bab1bd2704d4f7240_alt_obj);
}
function AdParams(sIdTag)
{
this.params = new Object();
this.AD_PARAMS_DELIM = "adparamdelim";
this.SEPARATOR_CHAR = "=";
AdParams.prototype.init = function(sIdTag)
{
with(this)
{
if (typeof(__atlas_ad_info) != 'undefined' && typeof(__atlas_ad_info[sIdTag]) != 'undefined')
{
initParamsFromTpl(sIdTag);
}
else
{
initParamsFromString(sIdTag);
}
}
}
AdParams.prototype.addParam = function(sParamName, sParamValue)
{
with(this)
{
params[sParamName] = sParamValue;
}
}
AdParams.prototype.initParamsFromTpl = function(sIdTag)
{
with(this)
{
params = __atlas_ad_info[sIdTag];
}
}
AdParams.prototype.initParamsFromString = function(sIdTag)
{
with(this)
{
var oRegExpDelimiter = new RegExp(AD_PARAMS_DELIM);
var oRegExpSeparator = new RegExp("([^\\" + SEPARATOR_CHAR + "]*)" + SEPARATOR_CHAR + "(.*)","i");
var sSerializedParams = unescape(oAdsSerializedParams[sIdTag]);
var aParams = sSerializedParams.split(oRegExpDelimiter);
var aParam = new Array();
for (var index = 0; index < aParams.length; index++)
{
aParam = aParams[index].match(oRegExpSeparator);
params[aParam[1]] = aParam[2];
}
}
}
AdParams.prototype.serializeAdParams = function()
{
with(this)
{
var sSerializedParams = '';
for (var paramName in params)
{
sSerializedParams += (paramName + SEPARATOR_CHAR + params[paramName]+ AD_PARAMS_DELIM);
}
sSerializedParams = sSerializedParams.substr(0,(sSerializedParams.length-AD_PARAMS_DELIM.length));
return escape(sSerializedParams);
}
}
this.init(sIdTag);
}
function handleAdParamsDefaultValues(oParams)
{
var oParamsToHandle = new Object();
oParamsToHandle["pub_click_url"] = new Array();
oParamsToHandle["pub_view_url"] = new Array();
oParamsToHandle["buster_url"] = new Array();
oParamsToHandle["pub_click_url"][0] = "pub_click_url";
oParamsToHandle["pub_click_url"][1] = "%pub_click_url%";
oParamsToHandle["pub_view_url"][0] = "pub_view_url";
oParamsToHandle["pub_view_url"][1] = "%pub_view_url%";
oParamsToHandle["buster_url"][0] = "buster_url";
oParamsToHandle["buster_url"][1] = "%buster_url%";
for (var paramToHandle in oParamsToHandle)
{
for (i = 0; i < oParamsToHandle[paramToHandle].length; i++)
{
if (oParams[paramToHandle] == oParamsToHandle[paramToHandle][i])
{
oParams[paramToHandle] = '';
}
}
}
}
function setBaseLinkTarget(bIsAlternateExists)
{
if (bIsAlternateExists && !document.layers)
{
var oBaseColl = document.getElementsByTagName('BASE');
if (oBaseColl.length > 0)
{
oBaseColl[0].target = "_self";
}
}
}
function generalValidation(destObj)
{
destObj.oAdParams = new AdParams(destObj.idTag);
var A4EtimeStamp = (new Date()).getTime();
handleAdParamsDefaultValues(destObj.oAdParams.params);
destObj.alternateExists = alternateAdExists(destObj);
bIsCompatibleClient = ClientCompatibilityManager.isCompatibleClient(destObj.blContent[destObj.blTreeLocation][MOVIE_FLASH_VERSION]);
if (!bIsCompatibleClient)
{
runAlternateAd(destObj, false);
setBaseLinkTarget(destObj.alternateExists);
return true;
}
destObj.bustingOut = IframeAdManager.isParentIframe() && destObj.oAdParams.params.buster_url != "";
if ((typeof(oAdsSerializedParams) != 'undefined') && (oAdsSerializedParams[destObj.idTag] != 'undefined'))
{
IframeAdManager.createMockAlternateImage(destObj);
destObj.bustingOut = false;
}
else
{
if (destObj.alternateExists)
runAlternateAd(destObj, true);
}
if (destObj.bustingOut)
{
if (!destObj.alternateExists)
{
IframeAdManager.setUpIframe(destObj, imageServerURL);
}
}
else
{
var sBasicTemplateUrl = destObj.oAdParams.params.TL_files_path + destObj.idTag + "a.ff.js" + '?spd=' + destObj.Version;
ARMRedirLib.Dom.InsertScript(document, "head", sBasicTemplateUrl + "&" + A4EtimeStamp);
}
return true;
}
function DhtmlUtils ()
{ }
DhtmlUtils.GetObj = function (name)
{
var obj;
if (document.getElementById)
{
obj = document.getElementById(name);
if (obj == null)
{
var aObjects = document.getElementsByName(name);
if (aObjects.length != 0)
{
obj = aObjects[0];
}
else
{
obj = null;
}
}
}
else if (document.all)
{
obj = document.all[name];
}
else if (document.layers)
{
if (document.layers[name])
{
obj = document.layers[name];
obj.style = document.layers[name];
}
else
{
obj = document.layers.testP.layers[name];
obj.style = document.layers.testP.layers[name];
}
}
return obj;
}
DhtmlUtils.AddEvent = function (object, event, funct, capturing)
{
if(capturing == undefined)
{
capturing = false;
}
if(object.addEventListener)
{
object.addEventListener(event, funct, capturing);
}
else if(object.attachEvent)
{
object.attachEvent("on" + event, funct);
}
}
function PageLoadDetector()
{
this.m_bLoadEventHandled = false;
this.m_bIsIframeMode = null;
this.m_bReadyStateSupported = null;
this.PAGE_LOAD_TIMEOUT = 3000;
this.m_bPageLoadMonitored = false;
PageLoadDetector.prototype.init = function()
{
with(this)
{
m_bIsIframeMode = (typeof(oAdsSerializedParams) != 'undefined') && (oAdsSerializedParams['f50434659b594a32bc38fa5067e467e1f31506801be34843a982d6ef897f7b7d'] != null);
m_bReadyStateSupported = (typeof(document.readyState) != "undefined");
}
}
PageLoadDetector.prototype.getReadyState = function()
{
return document.readyState;
}
PageLoadDetector.prototype.isReadyStateComplete = function()
{
with (this)
{
if (m_bReadyStateSupported)
{
if (getReadyState() == "complete")
{
return true;
}
else
{
return false;
}
}
else
{
return false;
}
}
}
PageLoadDetector.prototype.loadEventHandler = function()
{
with(this)
{
if (!m_bLoadEventHandled)
{
AtlasPageLoaded = true;
m_bLoadEventHandled = true;
}
}
}
PageLoadDetector.prototype.attachLoadEvent = function()
{
with(this)
{
var fnHandlerFunction = function() {PageLoadDetector.getInstance().loadEventHandler();};
DhtmlUtils.AddEvent(window,"load",fnHandlerFunction);
DhtmlUtils.AddEvent(document,"load",fnHandlerFunction);
}
}
PageLoadDetector.prototype.callFunctionByTimeInterval = function()
{
with(this)
{
window.setTimeout("PageLoadDetector.getInstance().checkPageLoaded()", PAGE_LOAD_TIMEOUT);
}
}
PageLoadDetector.prototype.startMonitoringPageLoad = function()
{
with(this)
{
if (!m_bPageLoadMonitored)
{
m_bPageLoadMonitored = true;
if (isReadyStateComplete())
{
loadEventHandler();
}
else
{
attachLoadEvent();
if (this.m_bIsIframeMode)
{
callFunctionByTimeInterval();
}
}
}
}
}
PageLoadDetector.prototype.checkPageLoaded = function()
{
with(this)
{
if (!(m_bLoadEventHandled || m_bReadyStateSupported))
{
loadEventHandler();
}
}
}
this.init()
}
PageLoadDetector.getInstance = function()
{
if (pageLoadDetectorInstance == null)
{
pageLoadDetectorInstance = new PageLoadDetector();
}
return pageLoadDetectorInstance;
}
if (typeof(ARM_TestMode) == 'undefined')
{
PageLoadDetector.getInstance().startMonitoringPageLoad();
}
function IframeAdManager()
{}
function ARMGetAllDocFrames()
{
var Frames = new Array();
var FrameElements = document.getElementsByTagName('iframe');
for (var idx = 0; idx < FrameElements.length; idx++)
{
var Entry = new Object();
Entry.FrameObj = FrameElements[idx];
Entry.FrameSrc = unescape(parsePortOff(FrameElements[idx].src).toLowerCase().replace(/^\s+|\s+$/g,""));
Frames.push(Entry);
}
return Frames;
}
function ARMGetIframeBySource(oPageFrames, sIframeSource, bExactMatch)
{
for (var i = 0; i < oPageFrames.length; i++)
{
if (( bExactMatch && sIframeSource == oPageFrames[i].FrameSrc) ||
(!bExactMatch && sIframeSource.indexOf(oPageFrames[i].FrameSrc) != -1 && oPageFrames[i].FrameSrc != '') ||
(!bExactMatch && oPageFrames[i].FrameObj.src.toLowerCase().indexOf(sIframeSource) != -1 && sIframeSource != ''))
{ 
return oPageFrames[i].FrameObj;
}	
}
return null;
}
IframeAdManager.getAlternateImageIframe = function(oAdObject)
{
var oAlternateImageIframe = null;
if ((typeof(oAdObject.oAdParams.params.frameSource) != 'undefined') &&
(oAdObject.oAdParams.params.frameSource != null))
{
var sIframeSource = unescape(parsePortOff(oAdObject.oAdParams.params.frameSource).toLowerCase());
var Frames = ARMGetAllDocFrames();
oAlternateImageIframe = ARMGetIframeBySource(Frames, sIframeSource, true);
if (oAlternateImageIframe == null)
{
oAlternateImageIframe = ARMGetIframeBySource(Frames, sIframeSource, false);
}
}
return oAlternateImageIframe;
}
IframeAdManager.createMockAlternateImage = function(destObj)
{
var sourceIframe = IframeAdManager.getAlternateImageIframe(destObj);
if (sourceIframe != null)
{
var sourceIframePosition = ARMRedirLib.GetElementPosition(sourceIframe); 
var sourceIframeLeft = sourceIframePosition.x;
var sourceIframeTop = sourceIframePosition.y;
var sMockTextToWrite = "<div id='orange_alternate_" + destObj.idTag + "' style=\"visibility: hidden; position:absolute; " +
"top: " + (parseInt(destObj.oAdParams.params.altImageOffsetTop) + parseInt(sourceIframeTop)) + "px; " +
"left: " + (parseInt(destObj.oAdParams.params.altImageOffsetLeft) + parseInt(sourceIframeLeft)) + "px; " +
"height: " + destObj.oAdParams.params.altImageOffsetHeight + "px; " +
"width: " + destObj.oAdParams.params.altImageOffsetWidth + "px;\"><\/div>";
ARMRedirLib.Dom.InsertAdjacentHtml(document, "body", escape(sMockTextToWrite), true);
}
}
IframeAdManager.setUpIframe = function(destObj, sImageServerPath)
{
with (this)
{
var sIframeBusterUrl = ARMRedirLib.Iframes.getIframeBusterUrl(destObj.oAdParams.params.buster_url);
setBaseLinkTarget(destObj.alternateExists);
destObj.oAdParams.addParam("frameSource", String(document.location));
var atlasIfrName = destObj.oAdParams.serializeAdParams();
var sRedirectFileName = destObj.idCampaign + "\/" + destObj.idTag + ".ff.js?spd=" + destObj.Version;
var iFrameString = "<iframe style='display:none' name='" + atlasIfrName + "' id='" + atlasIfrName + "' height=0 width=0 src='" +
sIframeBusterUrl + "?" + sRedirectFileName+ "&imgSrv=" + sImageServerPath +
"a4edelim&idTag=" + destObj.idTag + "a4edelim&armver=" + cf31506801be34843a982d6ef897f7b7d_108e8cad43a74d2bab1bd2704d4f7240_alt_obj.armScriptVersion + "'> <\/iframe>";
ARMRedirLib.Dom.InsertAdjacentHtml(document, "body", escape(iFrameString), true);
if (destObj.alternateExists)
{
window.setTimeout("runAlt()",3000);
}
}
}
IframeAdManager.isParentIframe = function()
{
return (window.self != window.top);
}
function getScriptSrc(substring)
{
var returnValue = "";
var scripts = document.getElementsByTagName('script');
for (var i = 0; i < scripts.length; i++)
{
if (scripts[i].src.indexOf(substring) > -1)
returnValue = new String(scripts[i].src);
}
return returnValue;
}
if (typeof(ARM_TestMode) == 'undefined')
{
startAdf31506801be34843a982d6ef897f7b7d_108e8cad43a74d2bab1bd2704d4f7240();
}
//-->
