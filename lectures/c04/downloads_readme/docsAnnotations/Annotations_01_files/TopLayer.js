
var ARMLibrary = function()
{
function ZindexPrivate()
{}
ZindexPrivate.ExpandZindex = 99999997;
ZindexPrivate.BannerZindex = 1150;
ZindexPrivate.change = function (adObjectArrayIndex, newZindexValue)
{
DhtmlUtils.GetObj("Outterorange" + adObjectArrayIndex).style.zIndex = (newZindexValue+1);
document.getElementById("orange" + adObjectArrayIndex).style.zIndex = (newZindexValue+2);
}
ZindexPrivate.getBannerPhaseZindex = function(destObj)
{
var bannerZindex;
if (typeof(destObj.bannerZindex) == "undefined")
bannerZindex = ZindexPrivate.BannerZindex;
else
bannerZindex = destObj.bannerZindex;
if (document.domain.indexOf("aol.com") != -1 )
bannerZindex = 50;
else if (document.domain.indexOf("vh1.com") != -1 )
bannerZindex = 2050;
else if (document.domain.indexOf("winespectator.com") != -1 )
bannerZindex = 950;
else if (document.domain.indexOf("myspace.com") != -1 )
bannerZindex = 10001;
else if (document.domain.indexOf("forbes.com") != -1 )
bannerZindex = 0;
else if (document.domain.indexOf("thegolfchannel.com") != -1 )
bannerZindex = 50; 
else if (document.domain.indexOf("cnnmoney.com") != -1 )
bannerZindex = 50; 
return bannerZindex; 
}
function Zindex()
{}
Zindex.SetExpandZindex = function(destObj)
{
var expandZindex;
if (typeof(destObj.expandZindex) == "undefined")
expandZindex = ZindexPrivate.ExpandZindex;
else
expandZindex = destObj.expandZindex;
ZindexPrivate.change(destObj.adArrayIndex, expandZindex);
}
Zindex.SetBannerZindex = function(destObj)
{
var bannerZindex = ZindexPrivate.getBannerPhaseZindex(destObj);
ZindexPrivate.change(destObj.adArrayIndex, bannerZindex);
}
Zindex.SetDefaultZindex = function(paid, bannerZindex, expandZindex)
{
for (var index = 0; index < a4eAdsArray.length; index++)
{
if (a4eAdsArray[index].idTag.toLowerCase() == paid.toLowerCase())
{
a4eAdsArray[index].bannerZindex = parseInt(bannerZindex);
a4eAdsArray[index].expandZindex = parseInt(expandZindex);
break;
}
}
}
function SurveyVendor()
{}
SurveyVendor.Call = function(destObj, A4EAdPhase)
{
A4EAdPhase = Phase.Convert(A4EAdPhase);
var objectPhaseSurveyVendorTag = destObj.surveyVendorTag[A4EAdPhase];
var bSurveyVendorTagCalled = destObj.surveyVendorTagCalled[A4EAdPhase];
if ((!bSurveyVendorTagCalled) && (objectPhaseSurveyVendorTag != ''))
{
objectPhaseSurveyVendorTag = SurveyVendorPrivate.replaceAliasesWithParams(objectPhaseSurveyVendorTag, destObj.atlasObject);
var oProcessedTag = SurveyVendorPrivate.getScriptSourceOrContents(objectPhaseSurveyVendorTag);
var processedTagText = new String(oProcessedTag[0]);
var sContentType = oProcessedTag[1];
if (!innerDebugMode)
{
ARMRedirLib.Dom.InsertScript(document, "head", processedTagText, sContentType);
}
sendDebugCall ("dl=1", processedTagText, "");
destObj.surveyVendorTagCalled[A4EAdPhase] = true;
}
}
SurveyVendor.Reset = function(destObj)
{
var phases = Phase.GetSupportedPhaseNames();
for(var i = 0; i < phases.length; i++)
destObj.surveyVendorTagCalled[phases[i]] = false;
}
function SurveyVendorPrivate() {}
SurveyVendorPrivate.getScriptSourceOrContents = function(sScriptString)
{
var re = new RegExp("<script\\b[^>]*src\\s*=\\s*([\"'])(.*?)\\1[^>]*>.*</\script>","i");
var matchArray = sScriptString.match(re);
if (matchArray != null)
return new Array(matchArray[2], "src");
re = new RegExp("<script\\b.*>(.*?)</\script>","i");
matchArray = sScriptString.match(re);
if (matchArray != null)
return new Array(matchArray[1], "text");
return new Array(sScriptString, "text");
}
SurveyVendorPrivate.replaceAliasesWithParams = function(sTextToReplace, atlasObject)
{
var returnString = sTextToReplace;
returnString = returnString.replace(/\%site_alias\%/g, atlasObject.site_alias);
returnString = returnString.replace(/\%ad_id\%/g, atlasObject.ad_id);
return returnString;
}
function Phase() {}
Phase.Convert = function(label)
{
var id;
if (label == 'banner')
{
id = 'reminder';
}
else if (label == 'expand' || label == 'maininteractive')
{
id = 'main';
}
else if (label == 'startmovie')
{
id = 'teaser';
}
else
{
id = label;
}
return (id);
}
Phase.GetSupportedPhaseNames = function()
{
return new Array("teaser", "reminder", "main");
}
function Viewport(){}	
Viewport.GetClientHeight = function ()
{
return ViewportPrivate.getViewportElement().clientHeight;
}
Viewport.GetClientWidth = function()
{
return ViewportPrivate.getViewportElement().clientWidth;
}
Viewport.GetScrollHeight = function ()
{
return ViewportPrivate.getViewportElement().scrollHeight;
}
Viewport.GetScrollWidth = function ()
{
return ViewportPrivate.getViewportElement().scrollWidth;
}
Viewport.GetScrollLeft = function()
{
return ViewportPrivate.getViewportElement().scrollLeft;
}
Viewport.GetScrollTop = function ()
{
return ViewportPrivate.getViewportElement().scrollTop;
}
ViewportPrivate = function() {}
ViewportPrivate.getViewportElement = function()
{
if (document.compatMode == "BackCompat")
{
return document.body;
}
else if (document.compatMode == "CSS1Compat")
{
return document.documentElement;
}
}
function FlashObject(nameOrElement)
{
this.m_oFlashObject = null;
this.style = null;
this.name = "";
FlashObject.prototype.setFlashObjectById = function()
{
with(this)
{
if (document.getElementsByTagName('embed')[nameOrElement])
{
m_oFlashObject = document.getElementsByTagName('embed')[nameOrElement];
}
else if (document.getElementsByTagName('object')[nameOrElement])
{
m_oFlashObject = document.getElementsByTagName('object')[nameOrElement];
}
else
{
m_oFlashObject = null;
}
if (m_oFlashObject)
{
style = m_oFlashObject.style;
}
}
}
FlashObject.prototype.init = function()
{
with(this)
{
if(typeof(nameOrElement) == "string")
{
setFlashObjectById();
name = nameOrElement;
}
else
{
m_oFlashObject = nameOrElement;
if(m_oFlashObject.name != "")
{
name = m_oFlashObject.name;
}
else if(m_oFlashObject.id != "")
{
name = m_oFlashObject.id;
}
}
}
}
FlashObject.prototype.GetWmode = function()
{
with(this)
{
if(m_oFlashObject.wmode)
{
return m_oFlashObject.wmode;
}
else if(m_oFlashObject.attributes['wmode'])
{
var wMode = m_oFlashObject.attributes['wmode'].value;
if ( (wMode.toLowerCase() == "transparent") || (wMode.toLowerCase() == "opaque") )
{
return wMode;
}
else
{
return "Window";
}
}
return "Window";
}
}
FlashObject.prototype.SetWmode = function(strWmode)
{
with(this)
{
if(m_oFlashObject.wmode)
{
m_oFlashObject.wmode = strWmode;
}
else if(m_oFlashObject.attributes['wmode'])
{
m_oFlashObject.attributes['wmode'].value = strWmode;
}
else
{
m_oFlashObject.setAttribute("wmode", strWmode, 0);
}
}
}
FlashObject.prototype.GetMovieSrc = function()
{
with(this)
{
if(m_oFlashObject.movie)
{
return m_oFlashObject.movie;
}
else if(m_oFlashObject.attributes['src'])
{
return m_oFlashObject.attributes['src'].value;
}
return null;
}
}
FlashObject.prototype.SetMovieSrc = function(strMovieSrc)
{
with(this)
{
if(m_oFlashObject.movie)
{
m_oFlashObject.movie = strMovieSrc;
}
else if(m_oFlashObject.attributes['src'])
{
m_oFlashObject.attributes['src'].value = strMovieSrc;
}
}
}
FlashObject.prototype.GetObjectReference = function()
{
with(this)
{
return m_oFlashObject;
}
}
FlashObject.prototype.Reload = function()
{
with(this)
{
var flashObjectParent = m_oFlashObject.parentNode;
var flashObjectNextSibling = m_oFlashObject.nextSibling;
flashObjectParent.removeChild(m_oFlashObject);
flashObjectParent.insertBefore(m_oFlashObject, flashObjectNextSibling);
}
}
FlashObject.prototype.PercentLoaded = function()
{
with(this)
{
return m_oFlashObject.PercentLoaded();
}
}
FlashObject.prototype.IsPlaying = function()
{
with(this)
{
if(typeof(m_oFlashObject.IsPlaying) != 'undefined')
{
return m_oFlashObject.IsPlaying();
}
return null;
}
}
FlashObject.prototype.Stop = function()
{
with(this)
{
m_oFlashObject.StopPlay();
}
}
FlashObject.prototype.Show = function(bShow)
{
with(this)
{
var sVisibility = "visible";
if (!bShow)
{
sVisibility = "hidden";
}
style.visibility = sVisibility;
}
}
FlashObject.prototype.SetVariable = function(sVar, sValue)
{
with(this)
{
m_oFlashObject.SetVariable(sVar, sValue);
}
}
this.init();
}
function Position(){}
Position.computeRectWidth = function (localWidth, localSize)
{
var widthVar;
if (localSize == SIZE_METHOD_RELATIVE)
{
widthVar = Math.round((eval(localWidth) * ARMLibrary.Viewport.GetClientWidth()) / 100);
return widthVar;
}
if (localSize == SIZE_METHOD_ABSOLUTE)
{
return localWidth;
}
}
Position.computeRectHeight = function(localHeight, localSize)
{
var heightVal;
if (localSize == SIZE_METHOD_RELATIVE)
{
heightVal = Math.round((eval(localHeight) * ARMLibrary.Viewport.GetClientHeight()) / 100);
return heightVal;
}
if (localSize == SIZE_METHOD_ABSOLUTE)
{
return localHeight;
}
}
Position.computeRectLeft = function(localLeft, localWidth, localSize, localPlace, localAnchor, a4eObject, considerParentOffset)
{
var getRidOfOffset = 0;
if (considerParentOffset)
{
var a4eParent = DhtmlUtils.GetObj("Outterorange" + a4eObject.adArrayIndex).offsetParent;
var a4eParentOffset = ARMRedirLib.GetElementPosition(a4eParent);
getRidOfOffset = a4eParentOffset.x;
}
var leftVal;
if (localPlace == LOCATION_METHOD_RELATIVE)
{
leftVal = scrolledLeft + Math.round((eval(localLeft) * ARMLibrary.Viewport.GetClientWidth()) / 100);
if (innerDebugMode)
{
if (disregard_scroll_on_ad_not_scrollable)
{
leftVal = Math.round((eval(localLeft) * ARMLibrary.Viewport.GetClientWidth()) / 100);
}
}
return leftVal - getRidOfOffset;
}
if (localPlace == LOCATION_METHOD_ABSOLUTE)
{
if (innerDebugMode)
{
if (disregard_scroll_on_ad_not_scrollable)
{
return localLeft + getRidOfOffset;
}
}
return localLeft + scrolledLeft - getRidOfOffset;
}
if (localPlace == LOCATION_METHOD_ABSOLUTE_RELATIVE)
{
switch (localAnchor)
{
case ANCHOR_TOP_LEFT_CORNER:
leftVal = localLeft;
break;
case ANCHOR_TOP_RIGHT_CORNER:
leftVal = eval(localLeft) + ARMLibrary.Viewport.GetClientWidth() - ARMLibrary.Position.computeRectWidth(localWidth, localSize);
break;
case ANCHOR_BOTTOM_LEFT_CORNER:
leftVal = localLeft;
break;
case ANCHOR_BOTTOM_RIGHT_CORNER:
leftVal = eval(localLeft) + ARMLibrary.Viewport.GetClientWidth() - ARMLibrary.Position.computeRectWidth(localWidth, localSize);
break;
case ANCHOR_CENTER_SCREEN:
leftVal = eval(localLeft) + (ARMLibrary.Viewport.GetClientWidth() / 2) - (ARMLibrary.Position.computeRectWidth(localWidth, localSize) / 2);
break;
case ANCHOR_ALTERNATE:
localAnchor = new String("orange_alternate_" + a4eObject.idTag);
default:
var obj = DhtmlUtils.GetObj(localAnchor);
leftVal = computeAnchorElementPosition(obj, localLeft, null, localWidth, null, localSize, a4eObject).x;
}
return leftVal + scrolledLeft- getRidOfOffset;
}
}
Position.computeRectTop = function(localTop, localHeight, localSize, localPlace, localAnchor, a4eObject,considerParentOffset)
{
var getRidOfOffset = 0;
if (considerParentOffset)
{
var a4eParent = DhtmlUtils.GetObj("Outterorange" + a4eObject.adArrayIndex).offsetParent;
var a4eParentOffset = ARMRedirLib.GetElementPosition(a4eParent);
getRidOfOffset = a4eParentOffset.y;
}
var topVal;
if (localPlace == LOCATION_METHOD_RELATIVE)
{
topVal = scrolledTop + Math.round((localTop * ARMLibrary.Viewport.GetClientHeight()) / 100);
if (innerDebugMode)
{
if (disregard_scroll_on_ad_not_scrollable)
{
topVal = Math.round((localTop * ARMLibrary.Viewport.GetClientHeight()) / 100);
}
}
return topVal- getRidOfOffset;
}
if (localPlace == LOCATION_METHOD_ABSOLUTE)
{
if (innerDebugMode)
{
if (disregard_scroll_on_ad_not_scrollable)
{
return localTop - getRidOfOffset;
}
}
return localTop + scrolledTop - getRidOfOffset;
}
if (localPlace == LOCATION_METHOD_ABSOLUTE_RELATIVE)
{
switch (localAnchor)
{
case ANCHOR_TOP_LEFT_CORNER:
topVal = localTop;
break;
case ANCHOR_TOP_RIGHT_CORNER:
topVal = localTop;
break;
case ANCHOR_BOTTOM_LEFT_CORNER:
topVal = eval(localTop) + ARMLibrary.Viewport.GetClientHeight() - ARMLibrary.Position.computeRectHeight(localHeight, localSize);
break;
case ANCHOR_BOTTOM_RIGHT_CORNER:
topVal = eval(localTop) + ARMLibrary.Viewport.GetClientHeight() - ARMLibrary.Position.computeRectHeight(localHeight, localSize);
break;
case ANCHOR_CENTER_SCREEN:
topVal = eval(localTop) + (ARMLibrary.Viewport.GetClientHeight() / 2) - (ARMLibrary.Position.computeRectHeight(localHeight, localSize) / 2);
break;
case ANCHOR_ALTERNATE:
localAnchor = new String("orange_alternate_" + a4eObject.idTag);
default:
var obj = DhtmlUtils.GetObj(localAnchor);
topVal = computeAnchorElementPosition(obj, null, localTop, null, localHeight, localSize, a4eObject).y;
}
return topVal + scrolledTop- getRidOfOffset;
}
}
Const = {}
Const.REPORT_FLASH = 'flash';
Const.MAX_NUM_EXITS = 50;
Const.MAX_TRACK_PER_EVENT = 50;
Const.EventBrandExposure = "d";
Const.EventMainDuration = "r";
Const.EventTimeToMain = "s";
Const.EventTimeToInteract = "t";
Const.EventInitialRollover = "u";
Const.EventRolloverDuration = "v";
function getValueArgStr(origString, paramName)
{
var tempVar = origString.indexOf(paramName);
var startIndex = origString.indexOf("=",tempVar);
if (startIndex == -1)
{
return ("");
}
var endIndex = origString.indexOf("&",startIndex);
if (endIndex == -1)
{
return (origString.substring(startIndex+1));
}
return (origString.substring(startIndex+1,endIndex));
}
FlashApi = {}
FlashApi.FSCommand = function(command, args, objIndex)
{
if (command == "alert")
{
alert(args);
return;
}
var objectToWorkOn = a4eAdsArray[objIndex];
var nextArg = args;
try
{
var mainValue = getValueArgStr(nextArg, "mainValue");
}
catch(e)
{
}
var additionalInfo = getValueArgStr(nextArg, "additionalInfo");
var startPointBlockedFlag = additionalInfo.indexOf("AtlasBlocked");
if (startPointBlockedFlag != -1)
{
if (startPointBlockedFlag == 0)
{
additionalInfo = "";
}
else
{
additionalInfo = additionalInfo.substring(0,startPointBlockedFlag);
}
}
var defaultURL = getValueArgStr(nextArg, "default");
command = command.toLowerCase();
nextArg = nextArg.toLowerCase();
if (!(objectToWorkOn.adEnd))
{
switch (command)
{
case 'exit':
AtlasEvent.exitActionHandler(objectToWorkOn, mainValue, additionalInfo, defaultURL, startPointBlockedFlag);
AtlasEvent.HandleEvent(objectToWorkOn);
break;
case 'event':
AtlasEvent.eventActionHandler(objectToWorkOn, mainValue, additionalInfo);
AtlasEvent.HandleEvent(objectToWorkOn);
break;
case 'initialization':
switch(nextArg)
{
case 'flash_loaded':
objectToWorkOn.bFlashFullyLoaded = true;
a4eloadObject(objectToWorkOn);
break;
}
break;
case 'framelabel':
if (AdRenderer.closeOnInvalidAnchor(objectToWorkOn, nextArg))
{
return;
}
var lastPhase = objectToWorkOn.adCurrentPhase;
objectToWorkOn.adCurrentPhase = nextArg;
switch(nextArg)
{
case 'teaser':
case 'startmovie':
changePhase(nextArg, ARMLibrary.Phase.Convert(nextArg), objectToWorkOn, Const.REPORT_FLASH);
AtlasEvent.HandleEndOfMainPhase(objectToWorkOn);
a4eCallURL(objectToWorkOn);
ARMLibrary.SurveyVendor.Call(objectToWorkOn, nextArg);
break;
case 'banner':
if (!innerDebugMode)
{
ARMLibrary.Zindex.SetBannerZindex(objectToWorkOn);
}
case 'reminder':
changePhase(nextArg, ARMLibrary.Phase.Convert(nextArg), objectToWorkOn, Const.REPORT_FLASH);
AtlasEvent.HandleEndOfMainPhase(objectToWorkOn);
a4eCallURL(objectToWorkOn);
ARMLibrary.SurveyVendor.Call(objectToWorkOn,nextArg);
break;
case 'expand':
ARMLibrary.Zindex.SetExpandZindex(objectToWorkOn);
case 'main':
case 'maininteractive':
objectToWorkOn.numofmain=objectToWorkOn.numofmain+1;
if(ARMLibrary.Phase.Convert(lastPhase) != 'main')
{
AtlasEvent.HandleStartOfMainPhase(objectToWorkOn);
}
changePhase(nextArg, ARMLibrary.Phase.Convert(nextArg), objectToWorkOn, Const.REPORT_FLASH);
ARMLibrary.SurveyVendor.Call(objectToWorkOn,nextArg);
break;
case 'closead':
closeA4Ead(objectToWorkOn);
AtlasEvent.HandleEndOfMainPhase(objectToWorkOn);
AtlasEvent.HandleEndOfAd(objectToWorkOn);
break;
}
break;
case 'a4eplay':
case 'a4estart':
case 'a4eload':
objectToWorkOn.paramonload = false;
break;
case 'loadmovie':
sendDebugCall ("movie=" + mainValue, additionalInfo, "");
break;
case 'html_loaded':
if (innerDebugMode)
{
setHTML_LOADED(objIndex);
}
break;
case 'ebshake':
case 'a4eshake':
case 'shake':
case 'atlasshake':
var tShake = 1;
try
{
tShake = parseInt(nextArg);
}
catch(e)
{
}
a4eshakefunc(10*tShake);
break;
case 'replay':
eval("window.document.orange" + objIndex + ".Rewind()");
objectToWorkOn.a4eexit = false;
a4eloadObject(objectToWorkOn);
break;
}
}
}
AtlasEvent = {}
AtlasEvent.CallReportingUrl = function(obj, url)
{
if (obj.rptImg == null)
{
obj.rptImg = new Array();
}
var img = new Image();
img.src = url;
img.alt ='';
obj.rptImg.push(img);
}
AtlasEvent.CurrentDurationInSeconds = function(startTime)
{
if (startTime == 0)
{
return 0;
}
var currentTime = new Date();
return Math.round((currentTime - startTime) / 1000);
}
AtlasEvent.HandleEvent = function(obj)
{
if (!obj.exitOrEventOccurred)
{
AtlasEvent.EmitEvent(obj, Const.EventTimeToInteract, AtlasEvent.CurrentDurationInSeconds(obj.tViewTime));
obj.exitOrEventOccurred = true;
}
}
AtlasEvent.HandleStartOfMainPhase = function(obj)
{
obj.startTimeOfMainPhase = (new Date()).getTime();
if (1 == obj.numofmain)
{
AtlasEvent.EmitEvent(obj, Const.EventTimeToMain, AtlasEvent.CurrentDurationInSeconds(obj.tViewTime));
AtlasEvent.HandleEvent(obj);
}
}
AtlasEvent.HandleEndOfMainPhase = function(obj)
{
if (obj.startTimeOfMainPhase > 0)
{
AtlasEvent.EmitEvent(obj, Const.EventMainDuration, AtlasEvent.CurrentDurationInSeconds(obj.startTimeOfMainPhase));
obj.startTimeOfMainPhase = 0;
}
}
AtlasEvent.HandleEndOfAd = function(obj)
{
if (obj.BXDReported != true)
{
try
{
AtlasEvent.EmitEvent(obj, Const.EventBrandExposure, AtlasEvent.CurrentDurationInSeconds(obj.tViewTime));
pause(pausableTime);
obj.BXDReported = true;
}
catch(e)
{
obj.BXDReported = false;
}
}
}
AtlasEvent.HandleStartOfAd = function(obj)
{
obj.tViewTime = (new Date()).getTime();
}
AtlasEvent.HandleStartOfRollOver = function(obj)
{
if (obj.bRolloverEventsEnabled)
{
if (!obj.tRollOverTime)
{
AtlasEvent.EmitEvent(obj, Const.EventInitialRollover, AtlasEvent.CurrentDurationInSeconds(obj.tViewTime));
}
obj.tRollOverTime = (new Date()).getTime();
}
}
AtlasEvent.HandleEndOfRollOver = function(obj)
{
if (obj.tRollOverTime)
{
AtlasEvent.EmitEvent(obj, Const.EventRolloverDuration, AtlasEvent.CurrentDurationInSeconds(obj.tRollOverTime));
}
}
AtlasEvent.EmitEvent = function(obj, evt, duration)
{
if (innerDebugMode)
{
if (evt != Const.EventBrandExposure)
{
sendDebugCall(evt + "=", duration, "");
}
}
else
{
var url = obj.atlasObject.click_url_t + evt + ";ea." + duration + obj.atlasObject.report_suffix;
ARMLibrary.AtlasEvent.CallReportingUrl(obj, url);
}
}
AtlasEvent.eventActionHandler = function(destObj, mainValue, additionalInfo, startOfPeriod)
{
if( undefined === startOfPeriod )
{
startOfPeriod = destObj.tViewTime;
}
var eventCounterName = "e" + mainValue;
if (destObj.eventCounter[eventCounterName] == undefined)
{
destObj.eventCounter[eventCounterName] = 1;
}
else
{
destObj.eventCounter[eventCounterName]++;
}
var callURL;
if ((destObj.eventCounter[eventCounterName] <= Const.MAX_TRACK_PER_EVENT) || (innerDebugMode))
{
try
{
if ((destObj.atlasObject.event_url_t != null) &&
(new String(destObj.atlasObject.event_url_t) != ""))
{
callURL = new String(destObj.atlasObject.event_url_t +
mainValue + ";ea." +
AtlasEvent.CurrentDurationInSeconds(startOfPeriod) +
destObj.atlasObject.report_suffix);
}
if (innerDebugMode)
{
sendDebugCall ("event=" + mainValue, additionalInfo, "");
}
else
{
ARMLibrary.AtlasEvent.CallReportingUrl(destObj, callURL);
destObj.lastEventTimeStamp = (new Date()).getTime();
}
destObj.eventsCount++; 
}
catch (e)
{
}
}
}
AtlasEvent.exitActionHandler = function(destObj, mainValue, additionalInfo, defaultURL, blockedByPopUp)
{
if (blockedByPopUp == -1)
{
blockedByPopUp = "";
}
else
{
blockedByPopUp = "blocked=";
}
if ((destObj.clicksCount < Const.MAX_NUM_EXITS) || (innerDebugMode))
{
var callURL = defaultURL;
try
{
if ((destObj.atlasObject.click_url_t != "") && (destObj.atlasObject.click_url_t != null) && (new String(destObj.atlasObject.click_url_t) != ""))
{
callURL = new String(destObj.atlasObject.click_url_t + mainValue + destObj.atlasObject.report_suffix);
if (typeof(_objAdEvents) != 'undefined')
{
if (_objAdEvents != null)
{
callURL = new String(eval("_objAdEvents.exit"+mainValue));
}
}
}
}
catch(e)
{
}
try
{
if ((additionalInfo == "") || (additionalInfo == "null") || (additionalInfo == null))
{
additionalInfo = "_blank";
}
if (innerDebugMode)
{
sendDebugCall ("exit=" + mainValue, defaultURL, blockedByPopUp);
}
else
{
if (additionalInfo == "_none")
{
ARMLibrary.AtlasEvent.CallReportingUrl(destObj, callURL);
}
else
{
window.open(callURL, additionalInfo);
}
}
destObj.clicksCount++;
}
catch(e)
{
}
try
{
if ((destObj.clickTrackingURL4 != "") && (destObj.clickTrackingURL4 != null) && (new String(destObj.clickTrackingURL4) != ""))
{
if (!innerDebugMode)
{
DhtmlUtils.GetObj("sender2").src = AtlasFormatURL(destObj.clickTrackingURL4);
destObj.clickTrackingURL4 = "";
}
}
}
catch(e)
{
}
ARMLibrary.AtlasEvent.HandleEndOfAd(destObj);
}
}
return {
Zindex : Zindex,
SurveyVendor : SurveyVendor,
Phase : Phase,
Viewport : Viewport,
FlashObject : FlashObject,
Position : Position,
FlashApi : FlashApi,
AtlasEvent : AtlasEvent
, TestApi : { Const : Const }
}
}();
function AdDisplayManager()
{}
AdDisplayManager.modifyLocation = function(a4eObject)
{

var a4eObjName = "orange" + a4eObject.adArrayIndex;
var a4eLayerName = "Outterorange" + a4eObject.adArrayIndex;
var oLayer = DhtmlUtils.GetObj(a4eLayerName);
var oFlashAdObject = new ARMLibrary.FlashObject(a4eObjName);
var iWorkspaceHeight = Math.max(ARMLibrary.Viewport.GetClientHeight(), ARMLibrary.Viewport.GetScrollHeight());
var iWorkspaceWidth = Math.max(ARMLibrary.Viewport.GetClientWidth(), ARMLibrary.Viewport.GetScrollWidth());
var oLayerLocationSize = new Object();
oLayerLocationSize.top = Math.min(ARMLibrary.Position.computeRectTop(a4eObject.Top, a4eObject.Height, a4eObject.Size, a4eObject.Place, a4eObject.m_Anchor, a4eObject, true),
iWorkspaceHeight);
oLayerLocationSize.left = Math.min(ARMLibrary.Position.computeRectLeft(a4eObject.Left, a4eObject.Width, a4eObject.Size, a4eObject.Place, a4eObject.m_Anchor, a4eObject, true),
iWorkspaceWidth);
oLayerLocationSize.width = ARMLibrary.Position.computeRectWidth(a4eObject.Width, a4eObject.Size);
oLayerLocationSize.height = ARMLibrary.Position.computeRectHeight(a4eObject.Height, a4eObject.Size);
var oFlashLocationSize = new Object();
oFlashLocationSize.top = '0';
oFlashLocationSize.left = '0';
oFlashLocationSize.height = oLayerLocationSize.height;
oFlashLocationSize.width = oLayerLocationSize.width;
if (oLayerLocationSize.top + oLayerLocationSize.height >= iWorkspaceHeight)
{
oLayerLocationSize.height = Math.max(iWorkspaceHeight - oLayerLocationSize.top, 0);
}
if (oLayerLocationSize.left + oLayerLocationSize.width > iWorkspaceWidth)
{
oLayerLocationSize.width = Math.max(iWorkspaceWidth - oLayerLocationSize.left, 0);
}
var oAlternateObj = DhtmlUtils.GetObj("orange_alternate_" + a4eObject.idTag);
if ((a4eObject.bOverlayAlternate) && (oAlternateObj != null) && (a4eObject.m_Anchor == ANCHOR_ALTERNATE))
{
var altImagePosition = ARMRedirLib.GetElementPosition(oAlternateObj);
var iLeftOffset = oLayerLocationSize.left - altImagePosition.x;
var iTopOffset = oLayerLocationSize.top - altImagePosition.y;
oFlashLocationSize.top = iTopOffset;
oFlashLocationSize.left = iLeftOffset;
oLayerLocationSize.top = altImagePosition.y;
oLayerLocationSize.left = altImagePosition.x;
oLayerLocationSize.height = oAlternateObj.offsetHeight;
oLayerLocationSize.width = oAlternateObj.offsetWidth;
}
AdDisplayManager.updateObjectStyle(oFlashAdObject, oFlashLocationSize);
AdDisplayManager.updateObjectStyle(oLayer, oLayerLocationSize);
a4eObject.computedLeft = oLayerLocationSize.left;
a4eObject.computedTop = oLayerLocationSize.top;
a4eObject.computedWidth = oLayerLocationSize.width;
a4eObject.computedHeight = oLayerLocationSize.height;
return true;
}
AdDisplayManager.updateObjectStyle = function(oDestObj, oDataObj)
{
oDestObj.style.top = oDataObj.top + "px";
oDestObj.style.left = oDataObj.left + "px";
oDestObj.style.height = oDataObj.height + "px";
oDestObj.style.width = oDataObj.width + "px";
}
AdDisplayManager.resizeA4EAd = function()
{
scrolledLeft = ARMLibrary.Viewport.GetScrollLeft();
scrolledTop = ARMLibrary.Viewport.GetScrollTop();
for (var i = 0; i < a4eAdsArray.length; i++)
{
if ((a4eAdsArray[i].playStarted==1) && (!(a4eAdsArray[i].adEnd)))
{
if (!AdDisplayManager.modifyLocation(a4eAdsArray[i]))
{
return true;
}
}
AdDisplayManager.showAndHidePageObjects(a4eAdsArray[i]);
}
return true;
}
AdDisplayManager.scrollA4EAd = function()
{
scrolledLeft = ARMLibrary.Viewport.GetScrollLeft();
scrolledTop = ARMLibrary.Viewport.GetScrollTop();
for (var i = 0; i < a4eAdsArray.length; i++)
{
if ((a4eAdsArray[i].playStarted==1) && (!(a4eAdsArray[i].adEnd)))
{
if (!a4eAdsArray[i].paramonscroll)
{
AdDisplayManager.enableHTMLbelowWithDelay(a4eAdsArray[i], true);
if (!AdDisplayManager.modifyLocation(a4eAdsArray[i]))
{
return true;
}
}
}
AdDisplayManager.showAndHidePageObjects(a4eAdsArray[i]);
}
return true;
}
AdDisplayManager.attachScrollEvents = function()
{

DhtmlUtils.AddEvent(window, 'scroll', AdDisplayManager.scrollA4EAd);
var sBrowserIdString = new String(navigator.userAgent);
var oBrowserInfo = ClientCompatibilityManager.getClientBrowser(sBrowserIdString);
if ((oBrowserInfo.browser == "firefox") && (oBrowserInfo.version < 1.5))
{
DhtmlUtils.AddEvent(document, 'DOMMouseScroll', AdDisplayManager.handleAdditionalScrollEvents);
DhtmlUtils.AddEvent(document, 'keydown', AdDisplayManager.handleAdditionalScrollEvents);
return true;
}
else
{
return false;
}
}
AdDisplayManager.getKeyCode = function(oEvent)
{
return oEvent.keyCode;
}
AdDisplayManager.handleAdditionalScrollEvents = function(oEvent)
{
var pressedKeyCode = AdDisplayManager.getKeyCode(oEvent);
if(((pressedKeyCode >= 32) && (pressedKeyCode <= 40)) || (pressedKeyCode == 0))
{
if ((scrolledTop != document.scrollTop) || (scrolledLeft != document.scrollLeft))
{
window.setTimeout(AdDisplayManager.scrollA4EAd, 10);
}
}
}
AdDisplayManager.showAndHidePageObjects = function(destObj)
{
var sPhase = destObj.adCurrentPhase;
if (destObj.adEnd)
{
return;
}
sPhase = ARMLibrary.Phase.Convert(sPhase);

if (destObj.paramhideselect[sPhase] == true)
{
HtmlElementsVisibilityManager.manageVisibility(false, "visible" , destObj, 'select');
HtmlElementsVisibilityManager.manageVisibility(false, "hidden" , destObj, 'select');
HtmlElementsVisibilityManager.manageVisibility(false, "visible" , destObj, 'applet');
HtmlElementsVisibilityManager.manageVisibility(false, "hidden" , destObj, 'applet');
}
else
{
HtmlElementsVisibilityManager.manageVisibility(true, "visible" , destObj, 'select');
HtmlElementsVisibilityManager.manageVisibility(true, "visible" , destObj, 'applet');
}
if (destObj.paramnoframes[sPhase] == true)
{
HtmlElementsVisibilityManager.manageVisibility(false, "visible" , destObj, 'iframe');
HtmlElementsVisibilityManager.manageVisibility(false, "hidden",destObj,'iframe');
}
else
{
if (destObj.bustedIframe != null && destObj.mouseIn)
AdDisplayManager.hideBustedIframe(destObj);
HtmlElementsVisibilityManager.manageVisibility(true, "visible" , destObj, 'iframe');
}
}
AdDisplayManager.onMouseIn = function(destObj)
{
ARMLibrary.AtlasEvent.HandleStartOfRollOver(destObj);
if (destObj.isFirefox && destObj.bustedIframe != null)
{
destObj.mouseIn = true;
AdDisplayManager.hideBustedIframe(destObj);
}
}
AdDisplayManager.onMouseOut = function(destObj)
{
ARMLibrary.AtlasEvent.HandleEndOfRollOver(destObj);
if (destObj.isFirefox && destObj.bustedIframe != null)
{
destObj.mouseIn = false;
var currentPhase = ARMLibrary.Phase.Convert(destObj.adCurrentPhase);
if (currentPhase == "reminder" || currentPhase == "main")
{
if (destObj.paramnoframes[currentPhase] != true)
AdDisplayManager.showBustedIframe(destObj);
}
}
}
AdDisplayManager.hideBustedIframe = function(destObj)
{
var ListToHide = new Array(destObj.bustedIframe);
var ListOfHidden = new Array();
HtmlElementsVisibilityManager.hideElements(ListToHide, destObj, ListOfHidden);
if (ListOfHidden.length != 0)
{
var ListOfHiddenIframe = destObj.hiddenElementsList["iframe"];
ListOfHiddenIframe.push(destObj.bustedIframe);
}
}
AdDisplayManager.showBustedIframe = function(destObj)
{
var ListToShow = new Array();
var ListOfHiddenIframe = destObj.hiddenElementsList["iframe"];
for (var i = 0; i < ListOfHiddenIframe.length; i++)
{
if (ListOfHiddenIframe[i] == destObj.bustedIframe)
{
ListToShow.push(destObj.bustedIframe);
break;
}
}
if (ListToShow.length > 0)
{
HtmlElementsVisibilityManager.showElements(true, ListToShow, destObj);
if (ListToShow.length == 0)
{
var ListOfHiddenIframe = destObj.hiddenElementsList["iframe"];
for (var i = 0; i < ListOfHiddenIframe.length; i++)
{
if (ListOfHiddenIframe[i] == destObj.bustedIframe)
{
ListOfHiddenIframe.splice(i, 1);
break;
}
}
}
}
}
AdDisplayManager.enableHTMLbelowWithDelay = function(destObj, bSetOuterLayerVisible)
{
if (bSetOuterLayerVisible)
{
var oLayerObj = DhtmlUtils.GetObj("Outterorange" + destObj.adArrayIndex);
oLayerObj.style.visibility = 'visible';
}
var sHideLayerCall = "AdDisplayManager.enableHTMLbelow(" + destObj.adArrayIndex + ")";
timeOutHandles[destObj.adArrayIndex] = window.setTimeout(eval("sHideLayerCall"),2500);
}
AdDisplayManager.enableHTMLbelow = function(adArrayIndex)
{
if (a4eAdsArray[adArrayIndex].a4e_ver > 5)
{
var oLayer = DhtmlUtils.GetObj("Outterorange" + adArrayIndex);
oLayer.style.visibility = 'hidden';
}
window.clearTimeout(timeOutHandles[adArrayIndex]);
}
function EventObject(
oEvent 
)
{
if (typeof(oEvent) != "undefined")
{
this.m_oEvent = oEvent;
}
else
{
this.m_oEvent = window.event;
}
EventObject.prototype.getSourceElement = function()
{
with(this)
{
if (m_oEvent.srcElement)
{
return m_oEvent.srcElement;
}
else if (m_oEvent.target)
{
return m_oEvent.target;
}
else
{
return null;
}
}
}
}
if (typeof(USER_CLICK_CLOSE) == 'undefined')
{
if (typeof(innerDebugMode) == 'undefined')
{
var innerDebugMode = false;
}
if (typeof(AtlasPaTTestTab) == 'undefined')
{
var AtlasPaTTestTab = false;
}
var notifiedTrackingWindow = false;
var initializedFlashFile = false;
var MAX_NUM_EVENTS = 100, MAX_NUM_MOVIES = 4;
var hideElementsCap = 0;
var pausableTime = 600;
var playingAds = 0;
var USER_CLICK_CLOSE = 6;
var ACTION_CLOSE_A4E_AD = 1;
var ACTION_NONE_A4E_AD= 0;
var TEASER = 0;
var REMINDER = 1;
var MAIN = 2;
var SCROLL_INTERVAL = 1;
var METHOD_RELATIVE_STRING = '%';
var METHOD_ABSOLUTE_STRING = 'px';
var LOCATION_METHOD_RELATIVE	= 0;
var LOCATION_METHOD_ABSOLUTE	= 1;
var LOCATION_METHOD_ABSOLUTE_RELATIVE	= 2;
var SIZE_METHOD_ABSOLUTE	= 1;
var SIZE_METHOD_RELATIVE	= 0;
var ANCHOR_TOP_LEFT_CORNER	= 'TopLeftCorner';
var ANCHOR_TOP_RIGHT_CORNER	= 'TopRightCorner';
var ANCHOR_BOTTOM_LEFT_CORNER	= 'BottomLeftCorner';
var ANCHOR_BOTTOM_RIGHT_CORNER	= 'BottomRightCorner';
var ANCHOR_CENTER_SCREEN	= 'CenterOfScreen';
var ANCHOR_ALTERNATE = 'Alternate';
var ANCHOR_OBJECT_IN_PAGE	= 'ObjectInPage';
var REPORT_JAVASCRIPT = 'javascript';
var DEFAULT_PHASE	= 'teaser';
var scrolledLeft = 0;
var scrolledTop = 0;
var timeOutHandles = new Array();
var movieInterval = new Array();
if (typeof(ARM_TestMode) == 'undefined')
{
var beginAdHandler = null;
DhtmlUtils.AddEvent(window, 'error', handleError);
DhtmlUtils.AddEvent(window, 'unload', a4eunload);
DhtmlUtils.AddEvent(window, 'resize', AdDisplayManager.resizeA4EAd);
AdDisplayManager.attachScrollEvents();
var s3= new String("<div style=\"visibility:hidden;position:absolute;height:0;width:0;top:0;left:0;\"><img src='' alt='' id='sender' name=sender width=0 height=0><img src='' alt='' id=sender2 name=sender2 width=0 height=0><img src='' alt='' name=sender3 width=0 height=0></div>");
var shakeFunctionText = new String ("<scr" + "ipt type='text\/javascript'>function a4eshakefunc(n){if (parent.moveBy){for (var i = 3; i > 0; i--){for (var j = n; j > 0; j--){parent.moveBy(0,i);parent.moveBy(i,0);parent.moveBy(0,-i);parent.moveBy(-i,0);}}}}<\/scr" + "ipt>");
ARMRedirLib.Dom.InsertAdjacentHtml(document, "body", shakeFunctionText, true);
ARMRedirLib.Dom.InsertAdjacentHtml(document, "body", s3, true);
}
}
function auto_orange_DoFSCommand(command, args, objIndex)
{
ARMLibrary.FlashApi.FSCommand(command, args, objIndex);
}
function changePhase(phaseLabel, phaseId, objectToWorkOn, sReportSource)
{

objectToWorkOn.adCurrentPhase = phaseId;
updateParams(objectToWorkOn, phaseId);
AdDisplayManager.modifyLocation(objectToWorkOn);
objectToWorkOn.status = phaseId.toUpperCase();
AdDisplayManager.showAndHidePageObjects(objectToWorkOn);
setOverlappingSwfsToOpaque(objectToWorkOn)
AdDisplayManager.enableHTMLbelowWithDelay(objectToWorkOn, false);
sendDebugCall ("label=" + phaseLabel + "&" + sReportSource ,"", "");
}
function a4eload()
{
for (var i = 0; i < a4eAdsArray.length; i++)
{
a4eloadObject(a4eAdsArray[i]);
}
}
function a4eloadObject(a4eObject)
{
if (a4eObject.playStarted == 0)
{
if (playingAds == 0)
{
setOverlappingSwfsToOpaque(a4eObject);
}
a4eObject.playStarted = 1;
}
if (!(a4eObject.paramonscroll==true))
{
scrolledLeft = ARMLibrary.Viewport.GetScrollLeft();
scrolledTop = ARMLibrary.Viewport.GetScrollTop();
}
ARMLibrary.AtlasEvent.HandleStartOfAd(a4eObject);
if (!innerDebugMode)
{
DhtmlUtils.GetObj("orange" + a4eObject.adArrayIndex).style.visibility='visible'
}
sendDebugCall ("beginPlay=", "", "");
if (a4eObject.adCurrentPhase != 'banner')
{
AdDisplayManager.showAndHidePageObjects(a4eObject);
}
AdDisplayManager.enableHTMLbelowWithDelay(a4eObject, false);
var d = new Date();
var dd= d.getTime();
a4eCallURL(a4eObject);
ARMLibrary.SurveyVendor.Call(a4eObject, 'teaser');
if (typeof(toplayer_debug_mode) != 'undefined')
{
if (toplayer_debug_mode)
{
innerDebugMode = true;
}
}
playingAds++;
}
function a4eunload()
{
try
{
sendDebugCall ("label=closead","", "");
for (var i = 0; i < a4eAdsArray.length; i++)
{
ARMLibrary.AtlasEvent.HandleEndOfMainPhase(a4eAdsArray[i]);
ARMLibrary.AtlasEvent.HandleEndOfAd(a4eAdsArray[i]);
}
}
catch (e)
{
}
return true;
}
function handleError()
{
return true;
}
function a4eCallURL(destObj)
{
if ((destObj.onViewOccurred) || (destObj.blContent[destObj.blTreeLocation][ALTERNATE_MOVIE_NAME] != ''))
{
return true;
}
destObj.onViewOccurred = true;
document.getElementById("sender2").src = AtlasFormatURL(destObj.atlasObject.atlas_view_url);
try
{
if ((destObj.impressionTrackingURL4 != "") && (destObj.impressionTrackingURL4 != null) && (new String(destObj.impressionTrackingURL4) != ""))
{
document.getElementById("sender3").src = AtlasFormatURL(destObj.impressionTrackingURL4);
}
}
catch(e)
{
}
}
function computeAnchorElementPosition(anchorElement, localLeft, localTop, localWidth, localHeight, localSize, a4eObject)
{
var leftVal;
var topVal;
if (anchorElement == null)
{
if (innerDebugMode)
{
leftVal = eval(localLeft) + (ARMLibrary.Viewport.GetClientWidth() / 2) - (ARMLibrary.Position.computeRectWidth(localWidth, localSize) / 2);
topVal = eval(localTop) + (ARMLibrary.Viewport.GetClientHeight() / 2) - (ARMLibrary.Position.computeRectHeight(localHeight, localSize) / 2);
}
}
else
{
var alternateOffset = ARMRedirLib.GetElementPosition(anchorElement);
a4eObject.alternateOffsetX = alternateOffset.x;
leftVal = a4eObject.alternateOffsetX + eval(localLeft) - scrolledLeft;
a4eObject.alternateOffsetY = alternateOffset.y;
topVal = a4eObject.alternateOffsetY + eval(localTop) - scrolledTop;
}
return {x: leftVal, y: topVal};
}
function compareLocations(oHtmlObj, a4eObject)
{
var oHtmlObjStart = { x:0, y:0 };
var oHtmlObjEnd = { x:0, y:0 };
var a4eObjectStart = { x:0, y:0 };
var a4eObjectEnd = { x:0, y:0 };
var compareX = true;
var compareY = true;
var htmlObjPosition = ARMRedirLib.GetElementPosition(oHtmlObj);
oHtmlObjStart.x = htmlObjPosition.x;
oHtmlObjStart.y = htmlObjPosition.y;
oHtmlObjEnd.x = oHtmlObjStart.x + parseInt(oHtmlObj.offsetWidth);
oHtmlObjEnd.y = oHtmlObjStart.y + parseInt(oHtmlObj.offsetHeight);
a4eObjectStart.x = a4eObject.computedLeft;
a4eObjectStart.y = a4eObject.computedTop;
a4eObjectEnd.x = a4eObject.computedLeft + a4eObject.computedWidth;
a4eObjectEnd.y = a4eObject.computedTop + a4eObject.computedHeight;
if (a4eObjectStart.y > oHtmlObjEnd.y)
{
compareY = false;
}
if (a4eObjectEnd.y < oHtmlObjStart.y)
{
compareY = false;
}
if (a4eObjectStart.x > oHtmlObjEnd.x)
{
compareX = false;
}
if (a4eObjectEnd.x < oHtmlObjStart.x)
{
compareX = false;
}
return compareX && compareY;
}
function updateParams(a4eObject, phaseID)
{
a4eObject.Place = RELATIVE;
a4eObject.Size = RELATIVE;
a4eObject.Left = 0;
a4eObject.Top = 0;
a4eObject.Height = 100;
a4eObject.Width = 100;
var phaseLocation = a4eObject.locationInfo[phaseID];
a4eObject.bOverlayAlternate = (phaseLocation.altoverlay == 1);
if ((phaseLocation.location_method > RELATIVE) &
(phaseLocation.location_method != NOT_DEFINED) &
(!(isNaN(phaseLocation.location_method))))
{
a4eObject.Place = phaseLocation.location_method;
}
if ((phaseLocation.size_method > RELATIVE) &
(phaseLocation.size_method != NOT_DEFINED) &
(!(isNaN(phaseLocation.size_method))))
{
a4eObject.Size = phaseLocation.size_method;
}
if ((phaseLocation.left != NOT_DEFINED) &
(!(isNaN(phaseLocation.left))))
{
a4eObject.Left = phaseLocation.left;
}
if ((phaseLocation.width > 0 ) &
(phaseLocation.width != NOT_DEFINED) &
(!(isNaN(phaseLocation.width))))
{
a4eObject.Width = phaseLocation.width;
}
if ((phaseLocation.top != NOT_DEFINED) &
(!(isNaN(phaseLocation.top))))
{
a4eObject.Top = phaseLocation.top;
}
if ((phaseLocation.height > 0 ) &
(phaseLocation.height != NOT_DEFINED) &
(!(isNaN(phaseLocation.height))))
{
a4eObject.Height = phaseLocation.height;
}
if ((phaseLocation.location_method == ABSOLUTE_RELATIVE) &
(phaseLocation.anchor != null) &
(phaseLocation.anchor != NOT_DEFINED))
{
a4eObject.m_Anchor = phaseLocation.anchor;
}
}
function findleft(el)
{
var atlasCounter=0;
while (el!=null)
{
atlasCounter=atlasCounter+el.offsetLeft;el=el.offsetParent;
}
return(atlasCounter-ARMLibrary.Viewport.GetScrollLeft());
}
function findtop(el)
{
var atlasCounter=0;
while (el!=null)
{
atlasCounter=atlasCounter+el.offsetTop;el=el.offsetParent;
}
return(atlasCounter-ARMLibrary.Viewport.GetScrollTop());
}
function clearAtlasDivs(sObjectToClear)
{
var oHtmlObj = DhtmlUtils.GetObj(sObjectToClear);
if (oHtmlObj != null)
{
oHtmlObj.style.width = 0;
oHtmlObj.style.height = 0;
oHtmlObj.style.visibility='hidden';
oHtmlObj.style.display='none';
}
}
function HtmlElementsVisibilityManager()
{}
HtmlElementsVisibilityManager.manageVisibility = function(showAll, workMode, a4eObject, sHtmlTag)
{
var oHiddenElementsList = null;
sHtmlTag = sHtmlTag.toLowerCase();
oHiddenElementsList = a4eObject.hiddenElementsList[sHtmlTag] ;
if (workMode == "hidden")
{
var oElementsToHide = document.getElementsByTagName(sHtmlTag);
HtmlElementsVisibilityManager.hideElements(oElementsToHide, a4eObject,
oHiddenElementsList);
a4eObject.hiddenElementsList[sHtmlTag] = oHiddenElementsList;
}
else
{
HtmlElementsVisibilityManager.showElements(showAll,oHiddenElementsList, a4eObject);
}
}
HtmlElementsVisibilityManager.hideElements = function (oElementsToHide, a4eObject,
oHiddenElementsList)
{
for (var i = 0; i < oElementsToHide.length; i++)
{
if (oElementsToHide[i].style.visibility != "hidden")
{
if (compareLocations(oElementsToHide[i], a4eObject))
{
var sElementName = oElementsToHide[i].name;
if (sElementName.indexOf ("orange") != 0)
{
oElementsToHide[i].style.visibility = 'hidden';
oHiddenElementsList[oHiddenElementsList.length] = oElementsToHide[i];
}
}
}
}
}
HtmlElementsVisibilityManager.showElements = function (showAll,oHiddenElementsList, a4eObject)
{
for (var i = 0; i < oHiddenElementsList.length; i++)
{
if ((!compareLocations(oHiddenElementsList[i], a4eObject)) || (showAll && !(oHiddenElementsList[i] == a4eObject.bustedIframe && a4eObject.mouseIn)))
{
oHiddenElementsList[i].style.visibility = 'visible';
oHiddenElementsList.splice(i,1);
--i;
}
}
}
function setHTML_LOADED(objIndex)
{
if (a4eAdsArray[objIndex] != null)
{
if (typeof(a4eAdsArray[objIndex]) == 'object')
{
if (a4eAdsArray[objIndex].bFlashFullyLoaded)
{
var oFlash = new ARMLibrary.FlashObject('orange' + objIndex);
oFlash.SetVariable('html_loaded', 'true');
return true;
}
}
}
return false;
}
function AdRenderer()
{}
AdRenderer.igniteAllTopLayer = function()
{
var destObj;
for (var i = 0; i < a4eAdsArray.length; i++)
{
if (a4eAdsArray[i] != null)
{
if (typeof(a4eAdsArray[i]) == 'object' || typeof(a4eAdsArray[i]) == 'function')
{
destObj = a4eAdsArray[i];
var oSwfCacheObject = new ARMLibrary.FlashObject("orange" + destObj.adArrayIndex + "_temp");
if ((destObj.playStarted == 0) && (oSwfCacheObject.m_oFlashObject != null))
{
if (oSwfCacheObject.PercentLoaded() == 100)
{
sendDebugCall ("adLoaded=1", "", "");
if ((innerDebugMode) && (AtlasPaTTestTab) && (!checkScreenResolution(destObj, screen.width, screen.height)))
{
sendMessageToPaT("screenresolution=noplay");
}
else
{
if (AtlasPageLoaded)
{
destObj.politeDownload = false;
}
if ( (innerDebugMode && (!AtlasPaTTestTab)) ||
((!destObj.adEnd) && (!destObj.politeDownload) && (!destObj.paramonload)) )
{
AdRenderer.handleCacheSwfLoaded(destObj);
}
else
{
if ((innerDebugMode) && (!AtlasPaTTestTab) && (destObj.paramonload == true))
{
sendMessageToPaT("manualadplay=noplay");
}
}
}
}
}
else if (!destObj.adEnd)
{

var flashObject = new ARMLibrary.FlashObject('orange' + i);
var nTmpPctLoaded = flashObject.PercentLoaded();
if ((!destObj.bFlashFileInitialized) && (AtlasPageLoaded) && (nTmpPctLoaded == 100))
{
destObj.bFlashFileInitialized = setHTML_LOADED(i);
}
if ((destObj.m_Anchor != ANCHOR_TOP_LEFT_CORNER) && (destObj.m_Anchor != ANCHOR_TOP_RIGHT_CORNER) && (destObj.m_Anchor != ANCHOR_BOTTOM_LEFT_CORNER) && (destObj.m_Anchor != ANCHOR_BOTTOM_RIGHT_CORNER) && (destObj.m_Anchor != ANCHOR_CENTER_SCREEN) && (destObj.m_Anchor != '') && (destObj.m_anchor != NOT_DEFINED) && (destObj.m_Anchor != null) && (destObj.m_Anchor != -100000))
{
var localAnchor;
if (destObj.m_Anchor == ANCHOR_ALTERNATE)
{
localAnchor = new String("orange_alternate_" + destObj.idTag);
}
else
{
localAnchor = destObj.m_Anchor;
}
var obj = document.getElementById(localAnchor);
if (obj != null)
{
if ((obj.offsetTop != destObj.alternateOffsetY) || (obj.offsetLeft != destObj.alternateOffsetX))
{
if (!AdDisplayManager.modifyLocation(destObj))
{
return;
}
}
}
}
}
if (hideElementsCap < 10)
{
setOverlappingSwfsToOpaque(destObj);
recheckHiddenElements(destObj);
}
}
}
}
}
AdRenderer.handleCacheSwfLoaded = function(destObj)
{
if (AdRenderer.closeOnInvalidAnchor(destObj, DEFAULT_PHASE))
{
return;
}
var oSwfAdObject = new ARMLibrary.FlashObject('orange' + destObj.adArrayIndex);
changePhase(DEFAULT_PHASE, ARMLibrary.Phase.Convert(DEFAULT_PHASE), destObj, REPORT_JAVASCRIPT);
var oSwfCacheObject = new ARMLibrary.FlashObject("orange" + destObj.adArrayIndex + "_temp");
AdRenderer.replaceFlashMovieSrc(oSwfCacheObject, oSwfAdObject);
attachAtlasEvents(destObj.adArrayIndex);
removeElementsByName('orange' + destObj.adArrayIndex + '_temp');
}
AdRenderer.replaceFlashMovieSrc = function(sourceFlashObject, targetFlashObject)
{
if(sourceFlashObject.GetMovieSrc() != targetFlashObject.GetMovieSrc())
{
targetFlashObject.SetMovieSrc(sourceFlashObject.GetMovieSrc());
targetFlashObject.Reload();
}
}
AdRenderer.closeOnInvalidAnchor = function(oAdObject, sPhaseId)
{
var bIsAnchorValid = AdRenderer.isAnchorValid(oAdObject, sPhaseId);
if (bIsAnchorValid || innerDebugMode)
{
return false;
}
else
{
closeA4Ead(oAdObject);
ARMLibrary.AtlasEvent.HandleEndOfMainPhase(oAdObject);
ARMLibrary.AtlasEvent.HandleEndOfAd(oAdObject);
return true;
}
}
AdRenderer.isAnchorValid = function(oAdObject, sPhaseId)
{
var sPhaseId = ARMLibrary.Phase.Convert(sPhaseId);
var phaseLocation = oAdObject.locationInfo[sPhaseId];
if (phaseLocation == 'undefined' ||
phaseLocation == null)
{
return true;
}
var sPhaseAnchor = phaseLocation.anchor;
var aAnchorsArray = AdRenderer.getAnchorsArray();
if (phaseLocation.location_method != ABSOLUTE_RELATIVE)
{
return true;
}
for (var i = 0; i < aAnchorsArray.length; i++)
{
if (sPhaseAnchor == aAnchorsArray[i])
{
return true;
}
}
if (sPhaseAnchor == ANCHOR_ALTERNATE)
{
sPhaseAnchor = new String("orange_alternate_" + oAdObject.idTag);
}
if (DhtmlUtils.GetObj(sPhaseAnchor) != null)
{
return true;
}
return false;
}
AdRenderer.getAnchorsArray = function()
{
var aAnchorsArray = new Array();
aAnchorsArray.push(ANCHOR_TOP_LEFT_CORNER);
aAnchorsArray.push(ANCHOR_TOP_RIGHT_CORNER);
aAnchorsArray.push(ANCHOR_BOTTOM_LEFT_CORNER);
aAnchorsArray.push(ANCHOR_BOTTOM_RIGHT_CORNER);
aAnchorsArray.push(ANCHOR_CENTER_SCREEN);
return aAnchorsArray;
}
function sendMessageToPaT(sMessage)
{
if (!notifiedTrackingWindow)
{
sendDebugCall (sMessage , "", "");
notifiedTrackingWindow = true;
}
}
function removeElementsByName(elementName)
{
elements = document.getElementsByName(elementName);
for(var i = 0 ; i < elements.length ; i++)
{
elements[i].parentNode.removeChild(elements[i]);
}
}
function pause (nMillis)
{
var now = new Date();
var exitTime = now.getTime() + nMillis;
while (true)
{
now = new Date();
if (now.getTime() > exitTime)
{
return;
}
}
}
function sendDebugCall(eventExpandoInfo, originalInfo, blockedByPopUp)
{
if (!innerDebugMode)
{
return;
}
try
{
var eventObj = document.createEventObject();
blockedByPopUp = "&" + blockedByPopUp;
if (blockedByPopUp.length == 1)
{
blockedByPopUp = "";
}
eventObj.expando = eventExpandoInfo + "&" + originalInfo + blockedByPopUp;
document.all.TopLayerDebugObject.fireEvent("onchange",eventObj);
}
catch(e)
{
}
}
function recheckHiddenElements(a4eObject)
{
var reHide = false;
hideElementsCap ++;
var objectsCollection = document.getElementsByTagName('select');
if ((a4eObject.hiddenElementsList['select'] != null) && (a4eObject.hiddenElementsList['select'] != ''))
{
if (a4eObject.hiddenElementsList['select'].length != objectsCollection.length)
{
var tempArray = new Array();
for(var i=0; i<objectsCollection.length; i++)
{
tempArray.push(objectsCollection[i]);
}
a4eObject.hiddenElementsList['select'] = tempArray;
reHide = true;
}
}
objectsCollection = document.getElementsByTagName('iframe');
if ((a4eObject.hiddenElementsList['iframe'] != null) && (a4eObject.hiddenElementsList['iframe'] != ''))
{
if ((a4eObject.hiddenElementsList['iframe'].length != objectsCollection.length) && (a4eObject.hiddenElementsList['iframe'].length+1 != objectsCollection.length) && (a4eObject.hiddenElementsList['iframe'].length+2 != objectsCollection.length))
{
var tempArray = new Array();
for(var i=0; i<objectsCollection.length; i++)
{
tempArray.push(objectsCollection[i]);
}
a4eObject.hiddenElementsList['iframe'] = tempArray;
reHide = true;
}
}
objectsCollection = document.getElementsByTagName('applet');
if ((a4eObject.hiddenElementsList['applet'] != null) && (a4eObject.hiddenElementsList['applet'] != ''))
{
if (a4eObject.hiddenElementsList['applet'].length != objectsCollection.length)
{
var tempArray = new Array();
for(var i=0; i<objectsCollection.length; i++)
{
tempArray.push(objectsCollection[i]);
}
a4eObject.hiddenElementsList['applet'] = tempArray;
reHide = true;
}
}
if (reHide)
{
AdDisplayManager.scrollA4EAd();
}
}
if (beginAdHandler == null)
{
beginAdHandler = window.setInterval("AdRenderer.igniteAllTopLayer()",700);
}
function AtlasFormatURL(URLString)
{
if (URLString.indexOf("http") != 0)
{
return (new String(HTTP_CONST + URLString));
}
else
{
return (new String(URLString));
}
}
function attachAtlasEvents(objectId)
{
var flashAdObj = DhtmlUtils.GetObj('orange' + objectId);
DhtmlUtils.AddEvent(flashAdObj, 'mouseover', invokeFlashMouseIn);
DhtmlUtils.AddEvent(flashAdObj, 'mouseout', invokeFlashMouseOut);
}
function invokeFlashMouseIn(oEvent)
{
var oEventObj = new EventObject(oEvent);
var oFlash = new ARMLibrary.FlashObject(oEventObj.getSourceElement().name);
var elemIndex = getAdIndexByFlashName(oFlash.name);
var a4eObject = a4eAdsArray[elemIndex];
if((oFlash.PercentLoaded() == 100) &&
a4eObject.bFlashFullyLoaded)
{
oFlash.SetVariable('isMouseOver', 'true');
}
AdDisplayManager.onMouseIn(a4eObject);
}
function invokeFlashMouseOut(oEvent)
{
var oEventObj = new EventObject(oEvent);
var oFlash = new ARMLibrary.FlashObject(oEventObj.getSourceElement().name);
var elemIndex = getAdIndexByFlashName(oFlash.name);
var a4eObject = a4eAdsArray[elemIndex];
if(a4eObject.adEnd == false &&
a4eObject.bFlashFullyLoaded &&
(oFlash.PercentLoaded() == 100))
{
oFlash.SetVariable('isMouseOver', 'false');
}
AdDisplayManager.onMouseOut(a4eObject);
}
function getAdIndexByFlashName(sFlashName)
{
return parseInt(sFlashName.substring("orange".length));
}
function closeA4Ead(objectToWorkOn)
{
sendDebugCall ("label=closead","", "");
var objIndex = objectToWorkOn.adArrayIndex;
var flashAdObject = new ARMLibrary.FlashObject("orange"+objIndex);
if (objectToWorkOn.bFlashFullyLoaded)
{
flashAdObject.Stop();
}
flashAdObject.Show(false);
if (!innerDebugMode)
{
objectToWorkOn.a4eexit=true;
objectToWorkOn.adEnd = true;
}
clearAtlasDivs("orange" + objIndex);
clearAtlasDivs("Outterorange" + objIndex);
clearAtlasDivs("div_alt_" + objectToWorkOn.idTag);
HtmlElementsVisibilityManager.manageVisibility(true, "visible", objectToWorkOn, 'select');
HtmlElementsVisibilityManager.manageVisibility(true, "visible", objectToWorkOn, 'applet');
HtmlElementsVisibilityManager.manageVisibility(true, "visible", objectToWorkOn, 'iframe');
}
function setOverlappingSwfsToOpaque(a4eObject)
{
var flashObjects = document.getElementsByTagName("OBJECT");
for (var i = 0; i < flashObjects.length; i++)
{
var flashObj = flashObjects[i];
if (flashObj.WMode!= null)
{
if (((flashObj.wmode).toLowerCase() == "window") &&
((flashObj.id).indexOf("orange") != 0) &&
(compareLocations(flashObj,a4eObject)))
{
var playFlash = flashObj.IsPlaying();
flashObj.WMode = "Opaque";
flashObj.outerHTML += "";
if (playFlash)
{
flashObj.Play();
}
}
}
}
var flashEmbeds = document.getElementsByTagName("EMBED");
for (var i = 0; i < flashEmbeds.length; i++)
{
var flashEmbed = new ARMLibrary.FlashObject(flashEmbeds[i]);
if (flashEmbed.m_oFlashObject.attributes['type'] &&
(flashEmbed.m_oFlashObject.attributes['type'].value.indexOf('flash') != -1) )
{
if (((flashEmbed.GetWmode()).toLowerCase() == "window") &&
((flashEmbed.name).indexOf("orange") != 0) &&
(compareLocations(flashEmbed.GetObjectReference(),a4eObject)))
{
flashEmbed.SetWmode("Opaque");
flashEmbed.Reload();
}
}
}
}
