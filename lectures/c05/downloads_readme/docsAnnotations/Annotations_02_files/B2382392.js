document.write('');

//  (c) 2004. All Rights Reserved.  DoubleClick Inc.

if(typeof(dartMotifCreatives) == "undefined")
	var dartMotifCreatives = new Array();

if(typeof(dartCallbackObjects) == "undefined")
	var dartCallbackObjects = new Array();

if(typeof(dartGlobalTemplateObjects) == "undefined")
	var dartGlobalTemplateObjects = new Array();

function DARTGlobalTemplate_19_09(creativeIdentifier) {
	this.version = "19_09";
	this.creativeIdentifier = creativeIdentifier;
	this.dartPopupArray = new Array();
	this.dartPopupAssetMap = new Object();
	this.dartIsInPreviewMode = (("%PreviewMode" == "true") ? true : false);
	this.dartIsInDebugEventsMode = (("%DebugEventsMode" == "true") ? true : false);
	this.dartIsInMMPreviewMode = (("%MMPreviewMode" == "true") ? true : false);
	this.dartIsFsvEnabled = false;

	this.debugEventBin = null;
	if(this.dartIsInDebugEventsMode)
		this.debugEventBin = new DARTDebugEventBin_19_09(this.creativeIdentifier, this);

	function _isValidStartTime(startTime) {
		return this._isValidNumber(startTime);
	}
	this._isValidStartTime = _isValidStartTime;

	function _convertDuration(duration) {
		if(duration) {
			duration = duration.toString().toUpperCase();
			switch(duration) {
				case "AUTO": return "AUTO";
				case "NONE": return 0;
				default: return (this._isValidNumber(duration) ? eval(duration) : 0);
			}
		}
		return 0;
	}
	this._convertDuration = _convertDuration;

	function _isValidNumber(num) {
		var floatNum = parseFloat(num);
		if(isNaN(floatNum) || floatNum < 0)
			return false;
		return ((floatNum == num) ? true : false);
	}
	this._isValidNumber = _isValidNumber;

	function isPartOfArrayPrototype(subject) {
		for(var prototypeItem in Array.prototype) {
			if(prototypeItem == subject) {
				return true;
			}
		}
		return false;
	}
	this.isPartOfArrayPrototype = isPartOfArrayPrototype;

	function writeSurveyURL(surveyUrl) {
		if(!this.dartIsInPreviewMode && surveyUrl.length > 0) {
			document.write('<scr' + 'ipt src="' + surveyUrl + '" language="JavaScript"></scr' + 'ipt>');
		}
	}
	this.writeSurveyURL = writeSurveyURL;

	function postPublisherData(isInterstitial, publisherURL) {
		if(!this.dartIsInPreviewMode && isInterstitial && publisherURL != "") {
			var postImg = new Image();
			postImg.src = publisherURL;
		}
	}
	this.postPublisherData = postPublisherData;

	this.convertUnit = function(pos) {
		if(pos != "") {
			pos = pos.toLowerCase().replace(new RegExp("pct", "g"), "%");
			if(pos.indexOf("%") < 0 && pos.indexOf("px") < 0 && pos.indexOf("pxc") < 0)
				pos += "px";
		}
		return pos;
	}

	function isGlobalTemplateJSLoaded() {
		return (typeof(dartGlobalTemplateJSLoaded_19_09) != "undefined") ? true : false;
	}
	this.isGlobalTemplateJSLoaded = isGlobalTemplateJSLoaded;

	function isGlobalTemplateJSLoading() {
		return (typeof(dartGlobalTemplateJSLoading_19_09) != "undefined") ? true : false;
	}
	this.isGlobalTemplateJSLoading = isGlobalTemplateJSLoading;

	function addCreativeToDisplayQueue(creative, advertiser) {
		if(creative.isFSV) {
			this.writeFSVPlayerTag(this.creativeIdentifier);
		}

		if(this.isGlobalTemplateJSLoaded()) {
			if(this.isFirefox() && creative.type == "ExpandingFlash") {
				this.expandingCreative = creative;
				this.registerTimeoutHandler(200, "displayExpandingCreative()", this);
			}
			else {
				var scheduler = new MotifCreativeDisplayScheduler_19_09();
				scheduler.displayCreative(creative);
			}
		}
		else if(this.isGlobalTemplateJSLoading()) {
			dartMotifCreatives[dartMotifCreatives.length] = creative;
		}
		else {
			dartMotifCreatives[dartMotifCreatives.length] = creative;
			window.eval("var dartGlobalTemplateJSLoading_19_09 = true;");
			document.write('<scr' + 'ipt src="' + 'http://m1.2mdn.net/' + advertiser + '/globalTemplate_19_09.js' + '" language="JavaScript"></scr' + 'ipt>');
		}
	}
	this.addCreativeToDisplayQueue = addCreativeToDisplayQueue;

	this.displayExpandingCreative = function() {
		var variableName = "FLASH_" + this.expandingCreative.assets["ExpandingFlash"].variableName;
		var flashObj = this.toObject(variableName);
		if(flashObj == null) {
			this.registerTimeoutHandler(200, "displayExpandingCreative()", this);
			return;
		}
		var scheduler = new MotifCreativeDisplayScheduler_19_09();
		scheduler.displayCreative(this.expandingCreative);
	}

	function createCreative(type, rid) {
		var creative = new Object();
		creative.gtVersion = this.version;
		creative.renderingId = rid;
		creative.type = type;
		creative.assets = new Array();
		creative.creativeIdentifier = this.creativeIdentifier;
		creative.previewMode = this.dartIsInPreviewMode;
		creative.debugEventsMode = this.dartIsInDebugEventsMode;
		creative.isFSV = this.isFSVCreative();
		return creative;
	}
	this.createCreative = createCreative;

	function isBrowserComplient(plugin) {
		return (this.isInternetExplorer() || this.isFirefox() || this.isSafari()) && (this.isWindows() || this.isMac() ||this.dartIsInMMPreviewMode) && this.getPluginInfo() >= plugin;
	}
	this.isBrowserComplient = isBrowserComplient;

	function shouldDisplayFloatingAsset(duration) {
		return !this.isInternetExplorer() || this._convertDuration(duration) || this.getIEVersion() >= 5.5 || (this.dartIsInMMPreviewMode && this.isMac());
	}
	this.shouldDisplayFloatingAsset = shouldDisplayFloatingAsset;

	function isWindows() {
		return (navigator.appVersion.indexOf("Windows") != -1);
	}
	this.isWindows = isWindows;

	function isFirefox() {
		var appUserAgent = navigator.userAgent.toUpperCase();
		if(appUserAgent.indexOf("GECKO") != -1) {
			if(appUserAgent.indexOf("FIREFOX") != -1) {
				var version = parseFloat(appUserAgent.substr(appUserAgent.lastIndexOf("/") + 1));
				return (version >= 1) ? true : false;
			}
			else if(appUserAgent.indexOf("NETSCAPE") != -1) {
				var version = parseFloat(appUserAgent.substr(appUserAgent.lastIndexOf("/") + 1));
				return (version >= 8) ? true : false;
			}
		}
		else
			return false;
	}
	this.isFirefox = isFirefox;

	function isSafari() {
		return (navigator.appVersion.indexOf("Safari") != -1) && parseFloat(navigator.userAgent.split('/')[3])>=312.6;
	}
	this.isSafari = isSafari;

	function isMac() {
		return (navigator.appVersion.indexOf("Mac") != -1);
	}
	this.isMac = isMac;

	function isInternetExplorer() {
		return (navigator.appVersion.indexOf("MSIE") != -1 && navigator.userAgent.indexOf("Opera") < 0);
	}
	this.isInternetExplorer = isInternetExplorer;

	function getIEVersion() {
		var version = 0;
		if(this.isInternetExplorer()) {
			var key = "MSIE ";
			var index = navigator.appVersion.indexOf(key) + key.length;
			var subString = navigator.appVersion.substr(index);
			version = parseFloat(subString.substring(0, subString.indexOf(";")));
		}
		return version;
	}
	this.getIEVersion = getIEVersion;

	function getPlatform() {
		return navigator.platform;
	}
	this.getPlatform = getPlatform;

	function getPluginInfo() {
		return (this.isInternetExplorer() && this.isWindows()) ? this._getIeWindowsVersion() : this._detectNonWindows();
	}
	this.getPluginInfo = getPluginInfo;

	function _getIeWindowsVersion() {
		var lineFeed = "\r\n";
		var majorVersion = 10;
		var str = 'mtfCounter = ' + majorVersion + lineFeed +
				  'mtfIsOk = ' + false + lineFeed +
				  'Do' + lineFeed +
					'On Error Resume Next' + lineFeed +
					'mtfIsOk = (IsObject(CreateObject(\"ShockwaveFlash.ShockwaveFlash.\" & mtfCounter & \"\")))' + lineFeed +
					'If mtfIsOk = true Then Exit Do' + lineFeed +
					'mtfCounter = mtfCounter - 1' + lineFeed +
				 'Loop While mtfCounter > 0';
		window.execScript(str, "VBScript");
		return (mtfIsOk == true) ? mtfCounter : 0;
	}
	this._getIeWindowsVersion = _getIeWindowsVersion;

	function _detectNonWindows() {
		var flashVersion = 0;
		var key = "Shockwave Flash";
		if(navigator.plugins && (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins[key])) {
			var version2Offset = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
			var flashDescription = navigator.plugins[key + version2Offset].description;
			var keyIndex = flashDescription.indexOf(key) + (key.length+1);
			var majorVersion = flashDescription.substring(keyIndex, keyIndex+1);
			var minorVersion = "0";
			var minorVersionKey = "r";
			var minorVersionKeyIndex = flashDescription.indexOf(minorVersionKey ) + (minorVersionKey.length);
			if(minorVersionKeyIndex > 1) {
				minorVersion = flashDescription.substring(minorVersionKeyIndex)
			}
			flashVersion = parseFloat(majorVersion + "." + minorVersion);
			if(flashVersion > 6.0 && flashVersion < 6.65) {
				flashVersion = 0 ;
			}
		}
		return flashVersion;
	}
	this._detectNonWindows = _detectNonWindows;

	function toObject(variableName) {
		if(document.layers) {
			return (document.layers[variableName]) ? eval(document.layers[variableName]) : null;
		}
		else if(document.all && !document.getElementById) {
			return (eval("window." + variableName)) ? eval("window." + variableName) : null;
		}
		else if(document.getElementById && document.body.style) {
			return (document.getElementById(variableName)) ? eval(document.getElementById(variableName)) : null;
		}
	}
	this.toObject = toObject;

	function getObjectHtml() {
		var ret = this.getArgs(arguments);
		return this.generateObj(ret.objAttrs, ret.params, ret.embedAttrs);
	}
	this.getObjectHtml = getObjectHtml;

	function getArgs(args) {
		var ret = new Object();
		ret.embedAttrs = new Object();
		ret.params = new Object();
		ret.objAttrs = new Object();
		var queryString="";
		for(var i=0; i < args.length; i=i+2) {
			var currArg = args[i].toLowerCase();
			switch(currArg) {
				case "codebase":
				case "pluginspage":
				case "type":
				case "classid":
				case "minversion":
					break;
				case "src":
				case "movie":

					ret.params["movie"] = ret.embedAttrs["src"] = args[i+1];
					break;
			    case "querystring":
			        queryString=args[i+1] = args[i+1] + '&br=' + escape(this.getBrowser()) + '&os=' + escape(this.getOS());
			        break;
				case "width":
				case "height":
				case "align":
				case "vspace":
				case "hspace":
				case "class":
				case "title":
				case "accesskey":
				case "name":
				case "id":
				case "tabindex":
				case "alt":
					ret.embedAttrs[args[i]] = ret.objAttrs[args[i]] = args[i+1];
					break;
				case "swliveconnect":
					ret.embedAttrs[args[i]] = args[i+1];
					break;
				default:
					ret.embedAttrs[args[i]] = ret.params[args[i]] = args[i+1];
			}
		}
		if(this.getPluginInfo()>=6){
			ret.params["FlashVars"] = ret.embedAttrs["FlashVars"] = queryString;
		}
		else{
			var url=ret.params["movie"];
			ret.params["movie"] = ret.embedAttrs["src"] =url+"?"+queryString;
		}
		ret.objAttrs["classid"] = "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000";
		ret.embedAttrs["type"] = "application/x-shockwave-flash";
		ret.params["allowScriptAccess"] = "always";
		ret.embedAttrs["allowScriptAccess"] = "always";
		return ret;
	}
	this.getArgs = getArgs;

	function generateObj(objAttrs, params, embedAttrs) {
		var str = "";
		if(this.isInternetExplorer()) {
			str += '<object ';
			for (var i in objAttrs) {
				if(!this.isPartOfArrayPrototype(i)) {
					str += i + '="' + objAttrs[i] + '" ';
				}
			}
			str += '>';
			for (var i in params) {
				if(!this.isPartOfArrayPrototype(i)) {
					str += '<param name="' + i + '" value="' + params[i] + '" /> ';
				}
			}
		}

		str += '<embed ';
		for (var i in embedAttrs) {
			if(!this.isPartOfArrayPrototype(i)) {
				str += i + '="' + embedAttrs[i] + '" ';
			}
		}
		str += ' ></embed>';

		if(this.isInternetExplorer()) {
			str += '</object>';
		}
		return str;
	}
	this.generateObj = generateObj;

	function writeHtml(html) {
		if((("j") == "i" || this.dartIsInPreviewMode) && typeof(motifWriteHtml) != "undefined") {
			motifWriteHtml(html);
		}
		else {
			document.write(html);
		}
	}
	this.writeHtml = writeHtml;

	function getCallbackObjectIndex(obj) {
		for(var i = 0; i < dartCallbackObjects.length; i++) {
			if(dartCallbackObjects[i] == obj)
				return i;
		}
		dartCallbackObjects[dartCallbackObjects.length] = obj;
		return dartCallbackObjects.length - 1;
	}
	this.getCallbackObjectIndex = getCallbackObjectIndex;

	function registerPageLoadHandler(handler, obj) {
		var callback = this.generateGlobalCallback(handler, obj);
		if(this.isInternetExplorer()) {
			if(this.isMac()) {
				this.scheduleCallbackOnLoad(handler);
			}
			else {
				if(self.document.readyState == "complete")
					callback();
				else
					self.attachEvent("onload", callback);
			}
		}
		else if(this.isFirefox()) {
			self.addEventListener("load", callback, true);
		}
		else if(this.isSafari()) {
			if(self.document.readyState == "complete")
				callback();
			else
				self.addEventListener("load", callback, true);
		}
	}
	this.registerPageLoadHandler = registerPageLoadHandler;

	function registerPageUnLoadHandler(handler, obj) {
		var callback = this.generateGlobalCallback(handler, obj);
		if(this.isInternetExplorer() && this.isWindows()) {
			self.attachEvent("onunload", callback);
		}
		else if(this.isFirefox() || this.isSafari()) {
			self.addEventListener("unload", callback, true);
		}
	}
	this.registerPageUnLoadHandler = registerPageUnLoadHandler;



	function registerTimeoutHandler(timeout, handler, obj) {
		window.setTimeout(this.generateGlobalCallback(handler, obj), timeout);
	}
	this.registerTimeoutHandler = registerTimeoutHandler;


	this.createFunction = function(name, ownerObject, args) {
		var fun = "dartCallbackObjects[" + this.getCallbackObjectIndex(ownerObject) + "]." + name + "(";
		for(var i = 0; i < args.length; i++) {
			fun += "dartCallbackObjects[" + this.getCallbackObjectIndex(args[i]) + "]";
			if(i != (args.length - 1))
				fun += ","
		}
		fun += ")";
		return new Function(fun);
	}


	function generateGlobalCallback(handler, obj) {
		if(obj) {
			var index = this.getCallbackObjectIndex(obj);
			handler = "if(dartCallbackObjects["+ index +"] != null) dartCallbackObjects["+ index +"]." + handler;
		}
		return new Function(handler);
	}
	this.generateGlobalCallback = generateGlobalCallback;

	function registerEventHandler(event, element, handler, obj) {
		var callback = this.generateGlobalCallback(handler, obj);
		if(this.isInternetExplorer() && this.isWindows()) {
			self.attachEvent("on" + event, callback)
		}
		else if(this.isFirefox() || this.isSafari()) {
			element.addEventListener(event, callback, false);
		}
	}
	this.registerEventHandler = registerEventHandler;

	function scheduleCallbackOnLoad(callback) {
		var onloadCheckInterval = 200;
		if(window.document.readyState.toLowerCase() == "complete")
			eval(callback);
		else
			this.registerTimeoutHandler(onloadCheckInterval, "scheduleCallbackOnLoad('" + callback + "')", this);
	}
	this.scheduleCallbackOnLoad = scheduleCallbackOnLoad;


	function isFSVCreative() {
		return (this.dartIsFsvEnabled && this.isFullScreenVideoSupported());
	}
	this.isFSVCreative = isFSVCreative;


	function isFullScreenVideoSupported() {
		var version = 0;
		try {
			if(this.isWindows() && this.isInternetExplorer()) {
				var player = new ActiveXObject("WMPlayer.OCX");
				version = parseFloat(player.versionInfo);
			}
		}
		catch(e) {
			version = 0;
		}
		return (version >= 9);
	}
	this.isFullScreenVideoSupported = isFullScreenVideoSupported;

	function getWMPObjectHTML(fsvCreativeIdentifier) {
		var wmpObjectName = "OBJECT_" + fsvCreativeIdentifier;
		var obj = '<object id="' + wmpObjectName + '" CLASSID="CLSID:6BF52A52-394A-11D3-B153-00C04F79FAA6"';
		obj += 'TYPE="application/x-oleobject" width="0" height="0">';
		obj += '<param name="AutoStart" value="false">';
		obj += '<param name="uiMode" value="none">';
		obj += '<param name="fullScreen" value="false">';
		obj += '</object>';
		return obj;
	}
	this.getWMPObjectHTML = getWMPObjectHTML;

	function writeFSVPlayerTag(creativeIdentifier) {
		var fsvCreativeIdentifier = "FSV_" + creativeIdentifier;
		var divVideoName = "DIV_" + fsvCreativeIdentifier;
		var fsvDiv = '<DIV id="' + divVideoName + '" style="visibility:hidden" align=left>';
		fsvDiv += this.getWMPObjectHTML(fsvCreativeIdentifier);
		fsvDiv += "</div>";

		this.writeHtml(fsvDiv);
	}
	this.writeFSVPlayerTag = writeFSVPlayerTag;

	function getBrowser() {
		if(this.isInternetExplorer())
			return "ie";
		else if(this.isFirefox())
			return "ff";
		else if(this.isSafari())
			return "sf";
		else
			return "NOT_SUPPORTED";
	}
	this.getBrowser = getBrowser;

	function getOS() {
		if(this.isWindows())
			return "win"
		if(this.isMac())
			return "mac";
		else
			return "NOT_SUPPORTED";
	}
	this.getOS = getOS;

	this.trackBackupImageEvent = function(adserverUrl) {
		var activityString = "eid1=9;ecn1=1;etm1=0;";
		var timeStamp = new Date();
		var postImage = document.createElement("IMG");
		var postUrl = adserverUrl + "&timestamp=" + timeStamp.getTime() + ";" + activityString;
		postImage.src = postUrl;
	}

	this.logThirdPartyImpression = function(url) {
		if(!this.dartIsInPreviewMode && url != "") {
			document.write('<IMG SRC="'+ url + '" style="visibility:hidden" width="0px" height="0px" alt="">');
		}
	}

	this.logThirdPartyBackupImageImpression = function(url, createElement) {
		if (createElement && url != "") {
			var postImage = document.createElement("IMG");
			postImage.src = url;
		}
		else if(!this.dartIsInPreviewMode && url != "") {
			document.write('<IMG SRC="'+ url + '" style="visibility:hidden" width="0px" height="0px" alt="">');
		}
	}

	this.logThirdPartyFlashDisplayImpression = function(url, createElement) {
		if (createElement && url != "") {
			var postImage = document.createElement("IMG");
			postImage.src = url;
		}
		else if(!this.dartIsInPreviewMode && url != "") {
			document.write('<IMG SRC="'+ url + '" style="visibility:hidden" width="0px" height="0px" alt="">');
		}
	}

	this.openPopupAsset = function(assetID) {
		if (this.dartPopupAssetMap[assetID]) {
			var cback = this.generateGlobalCallback("dartPopupAssetMap['" + assetID + "']._openPopup()", this);
			setTimeout(cback, 100);
		}
	}

	this.closePopupAsset = function(assetID) {
		if (this.dartPopupAssetMap[assetID]) {
			this.dartPopupAssetMap[assetID]._closePopup();
		}
	}

	this.removeArrayElement = function(array, obj) {
		for(var i = 0; i < array.length; i++) {
			if(array[i] == obj)
				array[i] = null;
		}
	}

	this.getSalign = function(expandedWidth, expandedHeight, offsetTop,offsetLeft,offsetRight,offsetBottom) {
		var salign = "";
		if (offsetTop == 0 && offsetBottom != expandedHeight) {
			salign += "T";
		} else if (offsetTop != 0 && offsetBottom == expandedHeight) {
			salign += "B";
		}
		if (offsetLeft == 0 && offsetRight != expandedWidth) {
			salign += "L";
		} else if (offsetLeft != 0 && offsetRight == expandedWidth) {
			salign += "R";
		}

		return salign;
	}

	this.usesSalignForExpanding = function(salign, wmode) {
		return ((this.isMac() && (this.isSafari() || this.isFirefox())) || (this.isWindows() && this.isFirefox() && wmode == "window")) && salign.length > 0;
	}

}   // end of DARTGlobalTemplate_XX

function DARTMotifUtil_19_09() {

	this.isInFriendlyIFrame = function() {
		return (typeof(inDapIF) != "undefined" && inDapIF);
	}

	this.isInMsnFriendlyIFrame = function() {
		return (typeof(inDapIF) != "undefined" && inDapIF);
	}

	this.isInMsnAjaxEnvironment = function() {
		return (typeof(inDapMgrIf) != "undefined" && inDapMgrIf);
	}
}


document.write('\n\n\n		\n		<script src=\"http://m1.2mdn.net/879366/MotifExternalScript_01_01.js\" language=\"JavaScript\"><\/script>');document.write('\n\n		');

		var creativeIdentifier = "GlobalTemplate_" + "21728426_" + (new Date()).getTime();
		var globalTemplate = new DARTGlobalTemplate_19_09(creativeIdentifier);
		dartGlobalTemplateObjects[creativeIdentifier] = globalTemplate;
		globalTemplate.logThirdPartyImpression("");

		function FixedFlash_21728426_1(variableName) {
			this.variableName = variableName;
			this.duration = "none";
			this.startTime = 0;
			this.hideDropdowns = false;
			this.hideIframes = false;
			this.hideScrollbars = false;
			this.hideObjects = false;
			this.hideApplets = false;
			this.adserverUrl = "http://ad.doubleclick.net/activity;src=1365243;met=1;v=1;pid=17931750;aid=117355179;ko=0;cid=21710536;rid=21728426;rv=1;";
			this.assetType = "banner";
			this.isMainAsset = true;
		}

		function _generateFixedFlashCode(variableName) {
			var fixedFlash = new FixedFlash_21728426_1(variableName);
			if(globalTemplate.isBrowserComplient(8)) {
				var creative = globalTemplate.createCreative("FixedFlash", "21728426");
				var isFSV = creative.isFSV;

				document.write('<div id="DIV_' + variableName + '" style="position:static;visibility:hidden;z-index:999999;">');
				var movie = 'http://m1.2mdn.net/1365243/PID_273027_TBC_Phs1_DTA_Pep_336x850_main.swf';
				var queryString='click='+ escape("http://ad.doubleclick.net/click%3Bh=v8/35b2/3/0/%2a/j%3B117355179%3B1-0%3B0%3B17931750%3B10408-336/850%3B21710536/21728426/1%3B%3B%7Esscs%3D%3f") + '&rid=21728426&clickN=&FSV=' + isFSV + '&varName=' + variableName + '&td=' + escape(self.location.hostname) + '&ct=RO&st=&ac=234&zp=&bw=4&dma=1&city=11468';
				var html = globalTemplate.getObjectHtml("alt", "Click Here!", "id", "FLASH_" + variableName,
								"WIDTH", "336", "HEIGHT", "850",
								"movie", movie, "quality", "high", "bgcolor", "#",
								"wmode", "opaque", "name", "FLASH_" + variableName, "swLiveConnect", "TRUE",
								"queryString",queryString
								);
				globalTemplate.writeHtml(html);
				document.write('</div>');

				creative.assets["FixedFlash"] = fixedFlash;
				globalTemplate.addCreativeToDisplayQueue(creative, "879366");
				globalTemplate.logThirdPartyFlashDisplayImpression("", false);
			}
			else {
				document.write('<A TARGET="_blank" HREF="http://ad.doubleclick.net/activity;src%3D1365243%3Bmet%3D1%3Bv%3D1%3Bpid%3D17931750%3Baid%3D117355179%3Bko%3D0%3Bcid%3D21710536%3Brid%3D21728426%3Brv%3D1%3Bcs%3De%3Beid1%3D1204%3Becn1%3D1%3Betm1%3D0%3B_dc_redir%3Durl%3fhttp://ad.doubleclick.net/click%3Bh=v8/35b2/3/0/%2a/j%3B117355179%3B1-0%3B0%3B17931750%3B10408-336/850%3B21710536/21728426/1%3B%3B%7Esscs%3D%3fhttp://www.ibm.com/software/info/takebackcontrol/r/open?orgid=2091&p_creative=PepSquadearthweb&s_tact=106AH0LW"><IMG SRC="http://m1.2mdn.net/1365243/PID_273027_TBC_Phs1_DTA_Pep_336x850.jpg" width="336" height="850" BORDER=0 alt="Click Here!"></A>');
				globalTemplate.trackBackupImageEvent(fixedFlash.adserverUrl);
				globalTemplate.logThirdPartyBackupImageImpression("", false);
			}
			globalTemplate.writeSurveyURL("");
		}
		_generateFixedFlashCode("21728426_1" + (new Date()).getTime());
		
document.write('\n		<NOSCRIPT>\n		<A TARGET=\"_blank\" HREF=\"http://ad.doubleclick.net/activity;src%3D1365243%3Bmet%3D1%3Bv%3D1%3Bpid%3D17931750%3Baid%3D117355179%3Bko%3D0%3Bcid%3D21710536%3Brid%3D21728426%3Brv%3D1%3Bcs%3De%3Beid1%3D1204%3Becn1%3D1%3Betm1%3D0%3B_dc_redir%3Durl%3fhttp://ad.doubleclick.net/click%3Bh=v8/35b2/3/0/%2a/j%3B117355179%3B1-0%3B0%3B17931750%3B10408-336/850%3B21710536/21728426/1%3B%3B%7Esscs%3D%3fhttp://www.ibm.com/software/info/takebackcontrol/r/open?orgid=2091&p_creative=PepSquadearthweb&s_tact=106AH0LW\">\n		<IMG SRC=\"http://m1.2mdn.net/1365243/PID_273027_TBC_Phs1_DTA_Pep_336x850.jpg\" width=\"336\" height=\"850\" BORDER=\"0\" alt=\"Click Here!\">\n		</A>\n		<IMG SRC=\"http://ad.doubleclick.net/activity;src=1365243;met=1;v=1;pid=17931750;aid=117355179;ko=0;cid=21710536;rid=21728426;rv=1;&timestamp=1552082;eid1=9;ecn1=1;etm1=0;\" width=\"0px\" height=\"0px\" style=\"visibility:hidden\" BORDER=\"0\"/>\n		<IMG SRC=\"\" width=\"0px\" height=\"0px\" style=\"visibility:hidden\" BORDER=\"0\"/>\n		<IMG SRC=\"\" width=\"0px\" height=\"0px\" style=\"visibility:hidden\" BORDER=\"0\"/>\n		</NOSCRIPT>\n\n		');

			var motifUtil = new DARTMotifUtil_19_09();
			if(motifUtil.isInMsnAjaxEnvironment()) {
				window.setTimeout("document.close();", 1000);
			}
		
document.write('');
