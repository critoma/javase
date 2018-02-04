
//  (c) 2006. All Rights Reserved.  DoubleClick Inc.

if(typeof(dartCreativeDisplayManagers) == "undefined")
    var dartCreativeDisplayManagers = new Array();
if(typeof(dartMotifAds) == "undefined")
    var dartMotifAds = new Array();
if(typeof(dartFSVManagers) == "undefined")
    var dartFSVManagers = new Array();

function DARTCreativeDisplayManager_19_09(creative) {
    this.creative = creative;
    this.creativeIdentifier = creative.creativeIdentifier;
    this.previewMode = creative.previewMode;
    this.debugEventsMode = creative.debugEventsMode;
    this.renderingId = creative.renderingId;
    this.creativeType = creative.type;

    this.dartPopupArray = new Array();
    this.dartEntityPropertiesArray = new Array();
    this.noAdjustElements = new _doNotAdjustElement();
    this.isDisplayTimerRunning = false;
    this.fsCommandHandlers = new Array();

    this.globalTemplate = dartGlobalTemplateObjects[this.creativeIdentifier];
    this.browser = new DARTBrowser_19_09(this.globalTemplate);

    this.dartEventBin = null;
    if(!this.previewMode)
        this.dartEventBin = new DARTEventBin_19_09(this.creativeIdentifier, this.globalTemplate);
    else if(this.debugEventsMode)
        this.dartDebugEventBin = this.globalTemplate.debugEventBin;

    this.assets = new Array();
    for(var type in creative.assets) {
        if(!this.globalTemplate.isPartOfArrayPrototype(type))
            this.assets[creative.assets[type].variableName] = creative.assets[type];
    }

    dartMotifAds[dartMotifAds.length] = creative;

    function fsHook(variableName) {
        var str = "";
        str += variableName + '_DoFSCommand = function(command, args) { \n';
        str += '    dartCreativeDisplayManagers["' + this.creativeIdentifier + '"].FSCommandHandler(command, args);\n';
        str += '}\n';
        window.eval(str);

        if(this.globalTemplate.isWindows()) {
            var flashObj = this.globalTemplate.toObject(variableName);
            var pointer = eval(variableName + "_DoFSCommand");
            this.fsCommandHandlers[variableName] = pointer;
            if(this.globalTemplate.isInternetExplorer()) {
                if(flashObj.attachEvent("FSCommand", pointer))
                    this.globalTemplate.registerPageUnLoadHandler("detachFSCommandHandler()", this);
            }
            else {
                flashObj.addEventListener("FSCommand", pointer, true);
                this.globalTemplate.registerPageUnLoadHandler("detachFSCommandHandler()", this);
            }
        }
    }
    this.fsHook = fsHook;

    function detachFSCommandHandler() {
        for(var varName in this.assets) {
            if(!this.globalTemplate.isPartOfArrayPrototype(varName)) {
                var variableName = "FLASH_" + varName;
                var flashObj = this.globalTemplate.toObject(variableName);
                var pointer = this.fsCommandHandlers[variableName];
                if(this.globalTemplate.isInternetExplorer())
                    flashObj.detachEvent("FSCommand", pointer);
                else
                    flashObj.removeEventListener("FSCommand", pointer, true);
            }
        }
    }
    this.detachFSCommandHandler = detachFSCommandHandler;

    function FSCommandHandler(command, args) {
        var argArray = this._splitArgs(args);
        var functionCall = command + "(";
        var count = 0;
        for(var k = 0; k < argArray.length; k++) {
            if(count > 0)
                functionCall += ", ";
            functionCall += "\"" + argArray[k] + "\"";
            count++;
        }
        functionCall += ")";
        try {
            return eval("dartCreativeDisplayManagers[\"" + this.creativeIdentifier + "\"]." + functionCall);
        }
        catch(e) {
            try {eval(functionCall);}
            catch(e) {}
        }
    }
    this.FSCommandHandler = FSCommandHandler;

    function conduitInitialized(assetName) {
        var asset = this.getAsset(assetName);
        asset.conduitInitialized = true;
    }
    this.conduitInitialized = conduitInitialized;

    function getEventBin() {
        if(!this.previewMode)
            return this.dartEventBin;
        else if(this.debugEventsMode)
            return this.dartDebugEventBin;
        else
            return null;
    }
    this.getEventBin = getEventBin;

    function logEvent(eventType, eventId, erid, isCumulative) {
        if(eventId == "2") {
            this.logDisplayTimerEvent(eventType, erid);
        }
        else {
            var eventBin = this.getEventBin();
            if(eventBin)
                eventBin.logMetEvent(eventType, eventId, erid, isCumulative);
        }
    }
    this.logEvent = logEvent;

    function logDisplayTimerEvent(eventType, erid) {
        var eventBin = this.getEventBin();
        if(eventType == "Start") {
            if(!this.isDisplayTimerRunning) {
                if(eventBin)
                    eventBin.logMetEvent("Start", "2", erid);
                this.isDisplayTimerRunning = true;
            }
        }
        else if(eventType == "Stop") {
            if(this.isDisplayTimerRunning) {
                if(eventBin)
                    eventBin.logMetEvent("Stop", "2", erid);
                this.isDisplayTimerRunning = false;
            }
        }
    }
    this.logDisplayTimerEvent = logDisplayTimerEvent;

    function flushCounters(erid) {
        var eventBin = this.getEventBin();
        if(eventBin)
            eventBin.flushMetCounters(erid);
    }
    this.flushCounters = flushCounters;

    function setShouldFlush(erid, flag) {
        var eventBin = this.getEventBin();
        if(eventBin)
            eventBin.setMetShouldFlush(erid, flag);
    }
    this.setShouldFlush = setShouldFlush;

    function getShouldFlush(erid) {
        var eventBin = this.getEventBin();
        return (eventBin && eventBin.getShouldFlush(erid));
    }
    this.getShouldFlush = getShouldFlush;

    function registerUrl(erid, adServerUrl, startTime) {
        var eventBin = this.getEventBin();
        if(eventBin)
            eventBin.registerEventBinUrl(erid, adServerUrl, startTime);
    }
    this.registerUrl = registerUrl;

    function _logEventFlushCounters(eventType, eventId, erid) {
        this.logEvent(eventType, eventId, erid, true);
        this.flushCounters(erid);
    }
    this._logEventFlushCounters = _logEventFlushCounters;

    function _logEventFlushCountersOpenPopup(eventType, eventId, erid, url, dartWindowName, features, isPopUnder) {
        this.logEvent(eventType, eventId, erid, true);
        this.flushCounters(erid);
        this.openPopup(url, dartWindowName, features, isPopUnder);
    }
    this._logEventFlushCountersOpenPopup = _logEventFlushCountersOpenPopup;

    function onMouseOver(assetName) {
        try {
            var flashObject = this.globalTemplate.toObject("FLASH_" + assetName);
            flashObject.TCallFrame("/motifExpandingController", 1);
        }
        catch(e) {
        }
    }
    this.onMouseOver = onMouseOver;

    function onMouseOut(assetName) {
        try {
            var flashObject = this.globalTemplate.toObject("FLASH_" + assetName);
            flashObject.TCallFrame("/motifExpandingController", 3);
        }
        catch(e) {
        }
    }
    this.onMouseOut = onMouseOut;

    this.expandAsset = function(assetId) {
        var variableName = "DIV_" + assetId;
        var exp = this.globalTemplate.toObject(variableName);
        this._adjustWindowElements(assetId, true);
        var asset = this.getAsset(assetId);
        if(asset.pushContents) {
            this.startAnimation(asset, true);
        }
        else {
            if (this.globalTemplate.usesSalignForExpanding(asset.salign, asset.wmode)) {
                var fl = document.getElementById("FLASH_"+assetId);
                fl.style.width = asset.expandedWidth + "px";
                fl.style.height = asset.expandedHeight + "px";
                fl.width = asset.expandedWidth + "px";
                fl.height = asset.expandedHeight + "px";
                fl.style.marginLeft = "0px";
                fl.style.marginTop = "0px";
            }
            exp.style.clip = "rect(auto auto auto auto)";
        }
    }

    this.collapseAsset = function(assetId) {
        var variableName = "DIV_" + assetId;
        var exp = this.globalTemplate.toObject(variableName);
        var asset = this.getAsset(assetId);
        if(asset.pushContents) {
            this.startAnimation(asset, false);
        }
        else {
            if (this.globalTemplate.usesSalignForExpanding(asset.salign, asset.wmode)) {
                var fl = document.getElementById("FLASH_"+assetId);
                fl.style.width = asset.width + "px";
                fl.style.height = asset.height + "px";
                fl.width = asset.width + "px";
                fl.height = asset.height + "px";
                fl.style.marginLeft = asset.offsetLeft + "px";
                fl.style.marginTop = asset.offsetTop + "px";
            }
            exp.style.clip = "rect(" + asset.offsetTop + "px " + asset.offsetRight + "px " + asset.offsetBottom + "px " + asset.offsetLeft + "px)";
        }
        this._adjustWindowElements(assetId, false);
    }

    this.startAnimation = function(asset, expandMode) {
        if(asset.animationState == null) {
            var state = new Object();
            state.isRunning = false;
            state.animateCallback = this.globalTemplate.generateGlobalCallback("updateExpandingViewPort(\"" + asset.variableName + "\")", this);
            state.expandMode = true;
            var height = parseInt(asset.height);
            state.currentHeight = height;
            var expandedHeight = parseInt(asset.expandedHeight);
            var expandLenght = expandedHeight - height;
            var animationTime = asset.animationTime * 1000;
            state.updateInterval = 50;
            var totalIntervals = Math.ceil(animationTime / state.updateInterval);
            state.stepLength = Math.ceil(expandLenght / (totalIntervals + 1));
            asset.animationState = state;
        }
        asset.animationState.expandMode = expandMode;
        if(!asset.animationState.isRunning) {
            asset.animationState.isRunning = true;
            this.updateExpandingViewPort(asset.variableName);
        }
    }

    this.updateExpandingViewPort = function(assetId) {
        var asset = this.getAsset(assetId);
        var state = asset.animationState;
        var animationComplete = false;
        var top = "auto";
        var right = "auto";
        var left = "auto";
        if(state.expandMode) {
            var expandedHeight = parseInt(asset.expandedHeight);
            state.currentHeight += state.stepLength;
            if(state.currentHeight >= expandedHeight) {
                state.currentHeight = expandedHeight;
                animationComplete = true;
            }
        }
        else {
            var height = parseInt(asset.height);
            var top = asset.offsetTop + "px";
            var right = asset.offsetRight + "px";
            var left = asset.offsetLeft + "px";
            state.currentHeight -= state.stepLength;
            if(state.currentHeight <= height) {
                state.currentHeight = height;
                animationComplete = true;
            }
        }

        var placeholder = this.globalTemplate.toObject("EXPANDO_PLACEHOLDER_" + assetId);
        placeholder.style.height = state.currentHeight + "px";
        var variableName = "DIV_" + assetId;
        var exp = this.globalTemplate.toObject(variableName);
        if (this.globalTemplate.usesSalignForExpanding(asset.salign, asset.wmode)) {
            exp = document.getElementById("FLASH_"+assetId);
            exp.style.width = top == "auto" ? asset.expandedWidth + "px" : asset.width + "px";
            exp.style.height = state.currentHeight + "px";
            exp.style.marginLeft = top == "auto" ? "0px" : asset.offsetLeft + "px";
            exp.style.marginTop = top == "auto" ? "0px" : asset.offsetTop + "px";
        }
        exp.style.clip = "rect(" + top + " " + right + " " + state.currentHeight + "px " + left + ")";
        if(animationComplete) {
            state.isRunning = false;
        }
        else {
            window.setTimeout(state.animateCallback, state.updateInterval);
        }
    }

    function scheduleCallbackOnLoad(callback) {
        callback = "dartCreativeDisplayManagers[\"" + this.creativeIdentifier + "\"]." + callback;
        this.globalTemplate.registerPageLoadHandler(callback, null);
    }
    this.scheduleCallbackOnLoad = scheduleCallbackOnLoad;

    function scheduleDisplay(variableName, startTime, duration, adjustElements) {
        adjustElements = (adjustElements == false || adjustElements == "false") ? false : true;
        if(this.globalTemplate._isValidStartTime(startTime)) {
            startTime = eval(startTime);
            duration = this.globalTemplate._convertDuration(duration);
            this.globalTemplate.registerTimeoutHandler(startTime * 1000, "_startDisplay('" + variableName + "', " + adjustElements + ")", this);
            if(duration == "AUTO") {
                this.globalTemplate.registerTimeoutHandler((startTime + 1) * 1000, "_autoStopPlaying('" + variableName + "')", this);
            }
            else if(duration > 0) {
                duration = eval(duration);
                this.globalTemplate.registerTimeoutHandler((startTime + duration) * 1000, "stopDisplay('" + variableName + "')", this);
            }
        }
    }
    this.scheduleDisplay = scheduleDisplay;

    function getCompanionAssetName(myName, type) {
        if(typeof(type) != "undefined") {
            for(var i in this.assets) {
                if(!this.globalTemplate.isPartOfArrayPrototype(i) && this.assets[i].assetType == type)
                    return i;
            }
        }
        else {
            for(var i in this.assets) {
                if(!this.globalTemplate.isPartOfArrayPrototype(i) && i != myName)
                    return i;
            }
        }

        return null;
    }
    this.getCompanionAssetName = getCompanionAssetName;

    function getAsset(name) {
        return this.assets[name];
    }
    this.getAsset = getAsset;

    function tellAssetHide(assetName) {
        this.stopDisplay(assetName);
    }
    this.tellAssetHide = tellAssetHide;

    function tellAssetShow(assetName) {
        this._startDisplay(assetName)
    }
    this.tellAssetShow = tellAssetShow;

    function tellAssetStart(assetName) {
        if(this.isFlashScriptingSupported()) {
            this.playFlash(assetName);
        }
    }
    this.tellAssetStart = tellAssetStart;

    function tellAssetStop(assetName) {
        var flashObject = this.globalTemplate.toObject("FLASH_" + assetName);
        if(flashObject && this.isFlashScriptingSupported()) {
            flashObject.StopPlay();
        }
    }
    this.tellAssetStop = tellAssetStop;

    function tellAssetGotoFrame(assetName, frameNumber) {
        var flashObject = this.globalTemplate.toObject("FLASH_" + assetName);
        if(flashObject && this.isFlashScriptingSupported()) {
            flashObject.GotoFrame(frameNumber);
        }
    }
    this.tellAssetGotoFrame = tellAssetGotoFrame;

    function tellCompanionAssetStop(myName, type) {
        var companion = this.getCompanionAssetName(myName, type);
        if(companion != null) {
            this.tellAssetStop(companion);
        }
    }
    this.tellCompanionAssetStop = tellCompanionAssetStop;

    function tellCompanionAssetStart(myName, type) {
        var companion = this.getCompanionAssetName(myName, type);
        if(companion != null) {
            this.tellAssetStart(companion);
        }
    }
    this.tellCompanionAssetStart = tellCompanionAssetStart;

    function tellCompanionAssetHide(myName, type) {
        var companion = this.getCompanionAssetName(myName, type);
        if(companion != null) {
            this.stopDisplay(companion);
        }
    }
    this.tellCompanionAssetHide = tellCompanionAssetHide;

    function tellCompanionAssetShow(myName, type) {
        var companion = this.getCompanionAssetName(myName, type);
        if(companion != null) {
            var divObject = this.globalTemplate.toObject("DIV_" + companion);
            if(divObject && divObject.style.visibility != "visible") {
                var asset = this.getAsset(companion);
                if(asset != null) {
                    var flashObject = this.globalTemplate.toObject("FLASH_" + companion);
                    if(flashObject && this.isFlashScriptingSupported() && asset.conduitInitialized) {
                        flashObject.Rewind();
                        flashObject.StopPlay();
                    }
                    this.scheduleDisplay(companion, 0, asset.duration);

                    if(asset.isMainAsset) {
                        var rid = this.getRenderingId(companion);
                        this.logEvent("Start", "2", rid);
                    }
                }
            }
        }
    }
    this.tellCompanionAssetShow = tellCompanionAssetShow;

    function isAssetPlaying(assetName) {
        var flashObject = this.globalTemplate.toObject("FLASH_" + assetName);
        if(flashObject && this.isFlashScriptingSupported()) {
            return flashObject.IsPlaying();
        }
        return false;
    }
    this.isAssetPlaying = isAssetPlaying;

    function openPopup(url, dartWindowName, features, isPopUnder) {
        var windowRef = window.open(url, dartWindowName, features);
        this.dartPopupArray[dartWindowName] = windowRef;
        if(eval(isPopUnder)) {
            window.focus();
        }
        return windowRef;
    }
    this.openPopup = openPopup;

    function openPopupAsset(assetName) {
        this.globalTemplate.openPopupAsset(assetName);
    }
    this.openPopupAsset = openPopupAsset;

    function closePopupAsset(assetName) {
        this.globalTemplate.closePopupAsset(assetName);
    }
    this.closePopupAsset = closePopupAsset;

    function stopDisplay(variableName) {
        var divObject = this.globalTemplate.toObject("DIV_" + variableName);
        var flash = this.globalTemplate.toObject("FLASH_" + variableName);
        if(divObject && divObject.style.visibility == "visible") {
            var rid = this.getRenderingId(variableName);
            if(rid) {
                var asset = this.getAsset(variableName);
                if(asset != null && asset.isMainAsset) {
                    this.logEvent("Stop", "2", rid);
                    this.logEvent("Stop", "3", rid);
                }

                this.flushCounters(rid);
                if(!this.isAnyCompanionVisible(variableName))
                    this.setShouldFlush(rid, false);
            }
            flash.StopPlay();
            divObject.style.visibility = "hidden";
        }
        this._adjustWindowElements(variableName, false);
    }
    this.stopDisplay = stopDisplay;

    function isAnyCompanionVisible(variableName) {
        for(var i in this.assets) {
            if(!this.globalTemplate.isPartOfArrayPrototype(i) && i != variableName) {
                var divObject = this.globalTemplate.toObject("DIV_" + i);
                if(divObject && divObject.style.visibility == "visible")
                    return true;
            }
        }

        return false;
    }
    this.isAnyCompanionVisible = isAnyCompanionVisible;

    function addEntityProperties(entityName, hideDropDowns, hideIFrames, hideScrollBars, hideObjects, hideApplets, adjustZIndex) {
        this.dartEntityPropertiesArray[entityName] = new _entityProperties(hideDropDowns, hideIFrames, hideScrollBars, hideObjects, hideApplets, adjustZIndex);
    }
    this.addEntityProperties = addEntityProperties;

    function doNotAdjustIFrame(variableName, iFrameID) {
        this.noAdjustElements.iFrames[this.noAdjustElements.iFrames.length] = iFrameID;
    }
    this.doNotAdjustIFrame = doNotAdjustIFrame;

    function doNotAdjustObject(variableName, objectID) {
        this.noAdjustElements.objects[this.noAdjustElements.objects.length] = objectID;
    }
    this.doNotAdjustObject = doNotAdjustObject;

    function getRenderingId(variableName) {
        var splitArray = variableName.split("_");
        var renderingId = (splitArray.length > 1) ? splitArray[0] : null;
        return renderingId;
    }
    this.getRenderingId = getRenderingId;

    function _splitArgs(args) {
        var parameterArray = new Array();
        var unescapedArgs = unescape(args)
        var stringArray = unescapedArgs.split("#mtf#");
        for(var k = 0; k < stringArray.length; k++) {
            parameterArray[k] = stringArray[k];
        }
        return parameterArray;
    }
    this._splitArgs = _splitArgs;

    function _startDisplay(variableName, adjustElements) {
        adjustElements = (adjustElements == false || adjustElements == "false") ? false : true;
        var divObject = this.globalTemplate.toObject("DIV_" + variableName);
        var flashObject = this.globalTemplate.toObject("FLASH_" + variableName);
        if(adjustElements) {
            this._adjustWindowElements(variableName, true);
        }
        if(divObject) {
            divObject.style.visibility = "visible";
        }
        if(flashObject && this.isFlashScriptingSupported()) {
            this.playFlash(variableName);
        }

        var rid = this.getRenderingId(variableName);
        if(flashObject && this.debugEventsMode) {
            if(!this.dartDebugEventBin.getShouldFlush(rid)) {
                this.setShouldFlush(rid, true);
                this.dartDebugEventBin.flushMetCounters(rid);
            }
        }
        else {
            if(flashObject && !this.previewMode && !this.dartEventBin.getShouldFlush(rid))
                this.setShouldFlush(rid, true);
        }
    }
    this._startDisplay = _startDisplay;

    function playFlash(variableName) {
        var flashObject = this.globalTemplate.toObject("FLASH_" + variableName);
        var asset = this.getAsset(variableName);
        if(this.globalTemplate.isInternetExplorer() || this.globalTemplate.dartIsInMMPreviewMode) {
            flashObject.Play();
        }
        else if(asset.assetType == "float" || asset.assetType == "reminder") {
            if(asset.conduitInitialized)
                flashObject.Play();
            else
                this.globalTemplate.registerTimeoutHandler(100, "playFlash('" + variableName + "')", this);
        }
    }
    this.playFlash = playFlash;

    function _autoStopPlaying(variableName) {
        var flashObject = this.globalTemplate.toObject("FLASH_" + variableName);
        if(flashObject && this.isFlashScriptingSupported()) {
            if(flashObject.PercentLoaded() == 100 && !flashObject.IsPlaying())
                this.stopDisplay(variableName);
            else
                this.globalTemplate.registerTimeoutHandler(300, "_autoStopPlaying('" + variableName + "')", this);
        }
    }
    this._autoStopPlaying = _autoStopPlaying;

    function _adjustWindowElements(entityName, shouldHide) {
        var entityProperty = this.dartEntityPropertiesArray[entityName];
        if(entityProperty) {
            if(entityProperty.hideDropDowns)
                this._adjustElements(shouldHide, "select");
            if(entityProperty.hideScrollBars && (this.globalTemplate.isInternetExplorer() || this.globalTemplate.isSafari()))
                this.browser.adjustScrollbars(shouldHide);
            if(entityProperty.hideIFrames)
                this._adjustElements(shouldHide, "iframe");
            if(entityProperty.hideObjects) {
                this._adjustElements(shouldHide, "object");
                this._adjustElements(shouldHide, "embed");
            }
            if(entityProperty.hideApplets)
                this._adjustElements(shouldHide, "applet");
            if(entityProperty.adjustZIndex)
                this._adjustZIndex(entityName, shouldHide);
        }
    }
    this._adjustWindowElements = _adjustWindowElements;

    function _adjustZIndex(entityName, shouldHide) {
        try {
            this._adjustParentZIndex(entityName, shouldHide);
        }
        catch(e) {}
    }
    this._adjustZIndex = _adjustZIndex;

    function _adjustParentZIndex(entityName, shouldHide) {
        var div = this.globalTemplate.toObject("DIV_" + entityName);
        var parent = null;
        var asset = this.getAsset(entityName);
        if(div && typeof(asset.assetType) != "undefined" && asset.assetType == "expando") {
            parent = div.parentNode.parentNode;
        }
        else {
            return;
        }

        while(parent && parent.tagName != "BODY") {
            if(shouldHide) {
                var css = this.browser.getCascadedStyle(parent);
                if((div.style.zIndex > css.zIndex) && (css.position == "relative" || css.position == "absolute")) {
                    parent.style.originalZIndex = this.browser.getCascadedStyle(parent).zIndex;
                    parent.style.zIndex = div.style.zIndex;
                }
            }
            else {
                if(typeof(parent.style.originalZIndex) != "undefined") {
                    parent.style.zIndex = parent.style.originalZIndex;
                }
            }
            parent = parent.parentNode;
        }
    }
    this._adjustParentZIndex = _adjustParentZIndex;

    function _adjustElements(shouldHide, tagName) {
        var arr = self.document.getElementsByTagName(tagName);
        tagName = tagName.toLowerCase();
        for(var k = 0; k < arr.length; k++) {
            var adjust = true;
            if(tagName == "iframe") {
                if(typeof(arr[k].MotifIFrameID) != "undefined")
                    adjust = this._shouldAdjustIFrame(arr[k].MotifIFrameID);
            }
            else if(tagName == "object" || tagName == "embed")
                adjust = !this.isMotifObject(arr[k].id);

            if(adjust)
                shouldHide ? this.hideElement(arr[k]) : this.showElement(arr[k]);
        }
    }
    this._adjustElements = _adjustElements;

    function hideElement(element) {
        var hideCountValue = element.getAttribute("hideCount");
        if(hideCountValue == null || hideCountValue == "") {
            element.setAttribute("initialVisibility", element.style.visibility);
            element.setAttribute("hideCount", 0);
        }

        var count = parseInt(element.getAttribute("hideCount"));
        if(count == 0) {
            if((element.tagName).toLowerCase() == "iframe" && this.globalTemplate.isFirefox())
                this.browser.hideFirefoxIFrame(element);
            else
                element.style.visibility = "hidden";
        }
        count++;
        element.setAttribute("hideCount", count);
    }
    this.hideElement = hideElement;

    function showElement(element) {
        if(element.getAttribute("hideCount") != null) {
            var count = parseInt(element.getAttribute("hideCount"));
            if(count != 0)
                count--;
            element.setAttribute("hideCount", count);
            if(count == 0) {
                if((element.tagName).toLowerCase() == "iframe" && this.globalTemplate.isFirefox())
                    this.browser.displayFirefoxIFrame(element);
                else
                    element.style.visibility = element.getAttribute("initialVisibility");
            }
        }
    }
    this.showElement = showElement;

    function _shouldAdjustIFrame(motifIFrameId) {
        var iframes = this.noAdjustElements.iFrames;
        for(var k = 0; k < iframes.length; k++) {
            if(iframes[k] == motifIFrameId)
                return false;
        }
        return true;
    }
    this._shouldAdjustIFrame = _shouldAdjustIFrame;

    function isMotifObject(objectId) {
        for(var i = 0; i < dartMotifAds.length; i++) {
            var creative = dartMotifAds[i];
            for(var type in creative.assets) {
                if(objectId == "FLASH_" + creative.assets[type].variableName)
                    return true;
            }
        }
        return false;
    }
    this.isMotifObject = isMotifObject;

    function _entityProperties(hideDropDowns, hideIFrames, hideScrollBars, hideObjects, hideApplets, adjustZIndex) {
        this.hideDropDowns = hideDropDowns;
        this.hideIFrames = hideIFrames;
        this.hideScrollBars = hideScrollBars;
        this.hideObjects = hideObjects;
        this.hideApplets = hideApplets;
        this.adjustZIndex = adjustZIndex;
    }
    this._entityProperties = _entityProperties;

    function _doNotAdjustElement() {
        this.iFrames = new Array();
        this.objects = new Array();
    }
    this._doNotAdjustElement = _doNotAdjustElement;

    function getPercentPosition(assetPos, adLength, screenLength) {
        assetPos = this.extractLength(assetPos);
        adLength = parseInt(adLength);
        return (screenLength - adLength) * assetPos/100;
    }
    this.getPercentPosition = getPercentPosition;

    this.extractUnit = function(pos) {
        if(pos.indexOf("%") > -1)
            return "%";
        else if(pos.indexOf("pxc") > -1)
            return "pxc";
        else
            return "px";
    }

    function extractLength(pos) {
        if(pos.indexOf("%") > -1)
            return parseInt(pos.substring(0, pos.indexOf("%")));
        else if(pos.indexOf("px") > -1)
            return parseInt(pos.substring(0, pos.indexOf("px")));
        else
            return parseInt(pos);
    }
    this.extractLength = extractLength;


    //only works for relative body element with margins set to auto (centering)
    function getBodyLeft() {
        var left;
        var position;

        if (this.globalTemplate.isInternetExplorer()) {
            left = this.extractLength(document.body.currentStyle.left);
            position = document.body.currentStyle.position;
        }
        else{
            var style=window.getComputedStyle(document.body, "");
            left = this.extractLength(style.getPropertyValue("left"));
            position = style.getPropertyValue("position");
        }

        if (position == "relative") {
            left = (this.browser.getWindowDimension().width-document.body.clientWidth)*.5;
        }

        return (isNaN(parseInt(left)) || left <1)?0:left;
    }
    this.getBodyLeft = getBodyLeft;


    this.adjustAdDiv = function(adDiv, asset) {
        var left = this.extractLength(asset.left);
        var top = this.extractLength(asset.top);
        var dimension = this.browser.getWindowDimension();
        var scroll = this.browser.getScrollbarPosition();
        var leftUnit = this.extractUnit(asset.left);
        if(leftUnit == "%")
            left = this.getPercentPosition(asset.left, asset.width, dimension.width);
        else if(leftUnit == "pxc")
            left = left + dimension.width/2;
        if(this.extractUnit(asset.top) == "%")
            top = this.getPercentPosition(asset.top, asset.height, dimension.height);
        if(asset.ignoreHorizontalScroll)
            left = left + scroll.scrollLeft;
        if(asset.ignoreVerticalScroll)
            top = top + scroll.scrollTop;

        if(typeof(asset.isRelativeBody) == "boolean" && asset.isRelativeBody) {
            left -= this.getBodyLeft();
        }

        adDiv.style.left = left + "px";
        adDiv.style.top = top + "px";
    }

    function adjustPosition() {
        for(var varName in this.assets) {
            if(!this.globalTemplate.isPartOfArrayPrototype(varName)) {
                var asset = this.getAsset(varName);
                if(asset.assetType == "float" || asset.assetType == "reminder") {
                    var adDiv = this.globalTemplate.toObject("DIV_" + varName);
                    if(adDiv != null)
                        this.adjustAdDiv(adDiv, asset);
                }
            }
        }
    }
    this.adjustPosition = adjustPosition;

    function registerPercentPositioningHandler() {
        var isPercentPositioned = false;
        var ignoreScroll = false;
        var centerPositioned = false;
        for(var name in this.assets) {
            if(!this.globalTemplate.isPartOfArrayPrototype(name)) {
                var asset = this.getAsset(name);
                if(asset.assetType == "float" || asset.assetType == "reminder") {
                    if(this.extractUnit(asset.top) == "%" || this.extractUnit(asset.left) == "%")
                        isPercentPositioned = true;
                    if(asset.ignoreVerticalScroll || asset.ignoreHorizontalScroll)
                        ignoreScroll = true;
                    if(this.extractUnit(asset.left) == "pxc")
                        centerPositioned = true;
                }
            }
        }
        if(isPercentPositioned || ignoreScroll || centerPositioned)
            this.globalTemplate.registerEventHandler("resize", self, "adjustPosition()", this);
        if(ignoreScroll)
            this.globalTemplate.registerEventHandler("scroll", self, "adjustPosition()", this);
    }
    this.registerPercentPositioningHandler = registerPercentPositioningHandler;

    function getFloatingDiv(fl, interstitialImage) {
        var adDiv = document.createElement("DIV");
        adDiv.id = "DIV_" + fl.variableName;
        adDiv.style.position = fl.position;
        adDiv.style.visibility = "hidden";
        adDiv.style.zIndex = fl.zIndex;
        this.adjustAdDiv(adDiv, fl);
        var movie = fl.url;
        var queryString=fl.queryString+'&td=' + escape(self.location.hostname);
        var loop = (this.globalTemplate._convertDuration(fl.duration) == "AUTO") ? "false" : "true";
        var html = this.globalTemplate.getObjectHtml("id", "FLASH_" + fl.variableName, "name", "FLASH_" + fl.variableName,
                            "WIDTH", fl.width, "HEIGHT", fl.height, "movie", movie, "play", "false",
                            "quality", "high", "wmode", fl.wmode, "loop", loop,
                            "queryString",queryString
                            );
        if(this.globalTemplate.dartIsInMMPreviewMode && typeof(_motifPreviewBaseURL) != "undefined")
            adDiv.innerHTML = '<base href="' + _motifPreviewBaseURL + '" />' + html;
        else
            adDiv.innerHTML = html;

        if(interstitialImage != "") {
            var imgDiv = document.createElement("DIV");
            imgDiv.style.position = "absolute";
            imgDiv.style.top = "0px";
            imgDiv.style.left = "0px";
            imgDiv.innerHTML = ' <img src="' + interstitialImage + '" style="visibility:hidden" width="1px" height="1px">';
            adDiv.appendChild(imgDiv);
        }
        this.doNotAdjustObject(fl.variableName, "FLASH_" + fl.variableName);
        return adDiv;
    }
    this.getFloatingDiv = getFloatingDiv;

    function displayFloatingAsset(fl, interstitialImage) {
        try {
            var adDiv = this.getFloatingDiv(fl, interstitialImage);
            document.body.appendChild(adDiv);
            this.fsHook("FLASH_" + fl.variableName);
            this.addEntityProperties(fl.variableName, fl.hideDropdowns, fl.hideIframes, fl.hideScrollbars, fl.hideObjects, fl.hideApplets, false);
            this.scheduleDisplay(fl.variableName, fl.startTime, fl.duration);
            this.registerUrl(this.renderingId, fl.adserverUrl, fl.startTime);
        }
        catch(e) {}
    }
    this.displayFloatingAsset = displayFloatingAsset;

    function displayFloatingFlash() {
        var fl = this.creative.assets["FloatingFlash"];
        this.displayFloatingAsset(fl, fl.interstitialImage);
        this.registerPercentPositioningHandler();
    }
    this.displayFloatingFlash = displayFloatingFlash;

    function displayFloatingWithReminder() {
        var fl = this.creative.assets["FloatingFlash"];
        this.displayFloatingAsset(fl, fl.interstitialImage);
        var rem = this.creative.assets["ReminderFlash"];
        this.displayFloatingAsset(rem, "");
        this.registerPercentPositioningHandler();
    }
    this.displayFloatingWithReminder = displayFloatingWithReminder;

    function triggerPoliteDownload() {
        for(assetName in this.assets) {
            if(!this.globalTemplate.isPartOfArrayPrototype(assetName)) {
                this.finishPoliteDownload(assetName);
            }
        }
    }
    this.triggerPoliteDownload = triggerPoliteDownload;

    function finishPoliteDownload(assetName) {
        var flashObject = this.globalTemplate.toObject("FLASH_" + assetName);
        if(flashObject && flashObject.PercentLoaded() > 0 && this.getAsset(assetName).conduitInitialized) {
            flashObject.SetVariable("_root.mtfContinue", "1");
        }
        else {
            var callback = "dartCreativeDisplayManagers['" + this.creativeIdentifier + "'].finishPoliteDownload('" + assetName + "');";
            window.setTimeout(callback, 100);
        }
    }
    this.finishPoliteDownload = finishPoliteDownload;

    function forceAnimation(variableName) {
        var flash = this.globalTemplate.toObject("FLASH_" + variableName);
        var div = this.globalTemplate.toObject("DIV_" + variableName);
        if(div.style.visibility == "visible") {
            flash.Zoom(50);
            flash.Zoom(0);
        }
    }
    this.forceAnimation = forceAnimation;


    function launchFullScreenVideo(url, shouldTrack, isMute) {
        var fsvManager = dartFSVManagers["FSV_" + this.globalTemplate.creativeIdentifier];
        fsvManager.launchVideo(url, eval(shouldTrack), isMute);
    }
    this.launchFullScreenVideo = launchFullScreenVideo;

    function isFlashScriptingSupported() {
        return (this.globalTemplate.isWindows() || (this.globalTemplate.isMac() && (this.globalTemplate.isFirefox() || this.globalTemplate.isSafari())));
    }
    this.isFlashScriptingSupported = isFlashScriptingSupported;

}  // end of DARTCreativeDisplayManager_XX




function DARTBrowser_19_09(globalTemplate) {
    this.iframePlaceHolderDivIndex = 0;
    this.hiddenIframes = new Array();
    this.globalTemplate = globalTemplate;

    function hideFirefoxIFrame(iframe) {
        var div = null;
        var iframeInfo = null;
        if(!iframe.hasAttribute("Motif_IFramePlaceHolderDivIndex")) {
            div = document.createElement("DIV");
            div.id = "MOTIF_IFRAMEPLACEHOLDER_" + this.iframePlaceHolderDivIndex;
            div.style.width = "0px";
            div.style.height = "0px";
            div.style.visibility = "hidden";
            div.style.padding = "0px";
            div.style.margin = "0px";
            div.style.display = "inline";
            iframe.parentNode.insertBefore(div, iframe);
            div.innerHTML = '<img src="" width="0px" height="0px" padding="0px" margin="0px"></img>';
            iframe.setAttribute("Motif_IFramePlaceHolderDivIndex", this.iframePlaceHolderDivIndex);
            iframeInfo = new Object();
            this.hiddenIframes[this.iframePlaceHolderDivIndex] = iframeInfo;
            this.iframePlaceHolderDivIndex++;
        }
        else {
            var index = iframe.getAttribute("Motif_IFramePlaceHolderDivIndex");
            var id = "MOTIF_IFRAMEPLACEHOLDER_" + index;
            div = document.getElementById(id);
            iframeInfo = this.hiddenIframes[parseInt(index)];
        }
        iframeInfo.width = iframe.width;
        iframeInfo.height = iframe.height;
        div.style.width = iframeInfo.width;
        div.style.height = iframeInfo.height;
        div.firstChild.width = iframeInfo.width;
        div.firstChild.height = iframeInfo.height;
        iframe.style.visibility = "hidden";
        iframe.width = 0;
        iframe.height = 0;
    }
    this.hideFirefoxIFrame = hideFirefoxIFrame;

    function displayFirefoxIFrame(iframe) {
        var index = iframe.getAttribute("Motif_IFramePlaceHolderDivIndex");
        var id = "MOTIF_IFRAMEPLACEHOLDER_" + index;
        var div = document.getElementById(id);
        var iframeInfo = this.hiddenIframes[parseInt(index)];
        if(div != null) {
            iframe.width = iframeInfo.width;
            iframe.height = iframeInfo.height;
            div.style.width = "0px";
            div.style.height = "0px";
            div.firstChild.width = 0;
            div.firstChild.height = 0;
        }
        iframe.style.visibility = iframe.getAttribute("initialVisibility");
    }
    this.displayFirefoxIFrame = displayFirefoxIFrame;

    function adjustScrollbars(hide) {
        var doc = self.document.documentElement;
        var standardCSSMode = ((typeof(document.compatMode) != "undefined" && document.compatMode == "CSS1Compat") ? true : false);
        standardCSSMode |= this.globalTemplate.isSafari();
        if(hide) {
            if(standardCSSMode) {
                doc.style.originalOverflow = typeof(doc.currentStyle) == "object" ? doc.currentStyle.overflow : doc.style.overflow;
                doc.style.overflow = "hidden";
            }
            else
                self.document.body.scroll = "no";
        }
        else {
            if(standardCSSMode) {
                if(typeof(doc.style.originalOverflow) != "undefined")
                    doc.style.overflow = doc.style.originalOverflow;
            }
            else
                self.document.body.scroll = "yes";
        }
    }
    this.adjustScrollbars = adjustScrollbars;

    function getCascadedStyle(obj) {
        if(this.globalTemplate.isInternetExplorer())
            return obj.currentStyle;
        else
            return obj.style;
    }
    this.getCascadedStyle = getCascadedStyle;

    this.getWindowDimension = function() {
        var dimension = new Object();
        if(document.documentElement && document.compatMode == "CSS1Compat") {
            dimension.width = document.documentElement.clientWidth;
            dimension.height = document.documentElement.clientHeight;
        } else if(document.body && (document.body.clientWidth || document.body.clientHeight) && !this.globalTemplate.isSafari()) {
            dimension.width = document.body.clientWidth;
            dimension.height = document.body.clientHeight;
        } else if(typeof(window.innerWidth) == 'number') {
            dimension.width = window.innerWidth;
            dimension.height = window.innerHeight;
        }
        return dimension;
    }

    this.getScrollbarPosition = function() {
        var scrollPos = new Object();
        scrollPos.scrollTop = 0;
        scrollPos.scrollLeft = 0;
        if(typeof(window.pageYOffset) == 'number') {
            scrollPos.scrollTop = window.pageYOffset;
            scrollPos.scrollLeft = window.pageXOffset;
        } else if(document.body && (document.body.scrollLeft || document.body.scrollTop)) {
            scrollPos.scrollTop = document.body.scrollTop;
            scrollPos.scrollLeft = document.body.scrollLeft;
        } else if(document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
            scrollPos.scrollTop = document.documentElement.scrollTop;
            scrollPos.scrollLeft = document.documentElement.scrollLeft;
        }
        return scrollPos;
    }


} // end of DARTBrowser_XX



function DARTEventBin_19_09(creativeIdentifier, globalTemplate) {
    this.dartIntervalArray = new Array(10, 20, 50, 120, 240);
    this.dartEventBinCollection = new Array();
    this.dartRegistrationTime = null;
    this.dartMaxTimeMilliseconds = (20 * 60 * 1000);
    this.dartCreativeIdentifier = creativeIdentifier;
    this.dartGlobalTemplate = globalTemplate;


    function registerEventBinUrl(erid, adServerUrl, startTime) {
        if(!this.dartEventBinCollection[erid] && this.dartGlobalTemplate._isValidStartTime(startTime)) {
            startTime = (startTime) ? eval(startTime) : 0;
            var eventBin = new Array();
            eventBin["counter"]  = new Array();
            eventBin["timer"]    = new Array();
            eventBin["duration"] = new Array();
            eventBin["nonCumulativeCounters"] = new Array();
            eventBin["flushUrl"] = adServerUrl;
            eventBin["shouldFlush"] = true;
            this.dartEventBinCollection[erid] = eventBin;
            this.dartRegistrationTime = new Date();
            this.dartGlobalTemplate.registerTimeoutHandler(startTime * 1000, "setFlushInterval('" + erid + "')", this);
        }
    }
    this.registerEventBinUrl = registerEventBinUrl;

    function logMetEvent(eventType, eventId, erid, isCumulative) {
        if(this.dartEventBinCollection[erid] && eventId && !isNaN(eventId)) {
            switch(eventType)   {
                case "Count": {
                    this.processCounter(eventId, erid, isCumulative);
                    break;
                }
                case "Start": {
                    this.processStart(eventId, erid);
                    break;
                }
                case "Stop": {
                    this.processStopTimer(eventId, erid);
                    break;
                }
                default : break;
            }
        }
    }
    this.logMetEvent = logMetEvent;

    function processCounter(eventId, erid, isCumulative) {
        var nonCumulativeCounters = this.getNonCumulativeCountersArray(erid);
        var counterArray = this.getCounterArray(erid);
        isCumulative = (isCumulative && (isCumulative == "true" || isCumulative == true)) ? true : false;
        if(isCumulative == false) {
            if(!nonCumulativeCounters[eventId])
               counterArray[eventId] = 1;
            nonCumulativeCounters[eventId] = true;
        }
        else {
            if(!counterArray[eventId])
               counterArray[eventId] = 0;
            counterArray[eventId] = counterArray[eventId]+1;
            }
        }
    this.processCounter = processCounter;

    function processStart(eventId, erid) {
        var timerArray = this.getTimerArray(erid);
        if(!timerArray[eventId]) {
            timerArray[eventId] = new Date();
            this.processCounter(eventId, erid, false);
        }
    }
    this.processStart = processStart;

    function processStopTimer(eventId, erid) {
        var timerArray = this.getTimerArray(erid);
        var durationArray = this.getDurationArray(erid);
        if(timerArray[eventId]) {
            var start = timerArray[eventId];
            var end = new Date();
            var duration = end.getTime() - start.getTime();
            if(duration < 0 || duration > this.dartMaxTimeMilliseconds)
                duration = 0;
            durationArray[eventId] = durationArray[eventId] ? durationArray[eventId] + duration : duration;
            timerArray[eventId] = false;
            return true;
        }
        return false;
    }
    this.processStopTimer = processStopTimer;

    function flushMetCounters(erid) {
        if(this.dartEventBinCollection[erid] && this.getShouldFlush(erid)) {
            var activityUrl = "";
            var counterArray = this.getCounterArray(erid);
            var durationArray = this.getDurationArray(erid);
            var timerArray = this.getTimerArray(erid);
            var counter = 1;
            if(this.isInAllowedTimeframe()) {
                for(var eventId in counterArray) {
                    if(!this.dartGlobalTemplate.isPartOfArrayPrototype(eventId)) {
                        var wasStopped = this.processStopTimer(eventId, erid);
                        var counterValue = counterArray[eventId];
                        if(!durationArray[eventId])
                            durationArray[eventId] = 0;
                        var durationValue = this.roundNumber((durationArray[eventId] ? parseFloat(String(durationArray[eventId] / 1000)) : 0));
                        if(counterValue > 0 || durationValue > 0) {
                            activityUrl += "eid" + counter + "=" + eventId + ";";
                            activityUrl += "ecn" + counter + "=" + counterValue + ";";
                            activityUrl += "etm" + counter + "=" + durationValue + ";";
                        }
                        counterArray[eventId] = counterArray[eventId] - counterValue;
                        durationArray[eventId] = durationArray[eventId] - durationValue * 1000;
                        if(wasStopped) {
                            timerArray[eventId] = new Date();
                        }
                        counter++;
                    }
                }
                this.postData(activityUrl, erid);
            }
        }
    }
    this.flushMetCounters = flushMetCounters;

    function postData(activityUrl, erid) {
        if(activityUrl.length) {
            var timeStamp = new Date();
            var activityArray = this.splitActivity(activityUrl);
            for(var k = 0; k < activityArray.length; k++) {
                var postImage = document.createElement("IMG");
                var singleActivityString = activityArray[k];
                var postUrl = this.getFlushUrl(erid) + "&timestamp=" + timeStamp.getTime() + ";" + singleActivityString;
                postImage.src = postUrl;
            }
        }
    }
    this.postData = postData;

    function splitActivity(activity) {
        var activityArray = new Array();
        for(var key = "etm", postSize = 950, index = 0; activity.length > 0; activity = activity.substr(index)) {
            var copy = activity;
            var startString = copy.substr(0, postSize);
            index = startString.lastIndexOf(key) + key.length;
            startString = copy.substr(0, index);
            copy = copy.substr(index);
            index += copy.indexOf(";")+1;
            activityArray[activityArray.length] = activity.substr(0, index);
        }
        return activityArray;
    }
    this.splitActivity = splitActivity;

    function getCounterArray(erid) {
        var eventBin = this.dartEventBinCollection[erid];
        return eventBin["counter"];
    }
    this.getCounterArray = getCounterArray;

    function getTimerArray(erid) {
        var eventBin = this.dartEventBinCollection[erid];
        return eventBin["timer"];
    }
    this.getTimerArray = getTimerArray;

    function getDurationArray(erid) {
        var eventBin = this.dartEventBinCollection[erid];
        return eventBin["duration"];
    }
    this.getDurationArray = getDurationArray;

    function getNonCumulativeCountersArray(erid) {
        var eventBin = this.dartEventBinCollection[erid];
        return eventBin["nonCumulativeCounters"];
    }
    this.getNonCumulativeCountersArray = getNonCumulativeCountersArray;

    function getFlushUrl(erid) {
        var eventBin = this.dartEventBinCollection[erid];
        return eventBin["flushUrl"];
    }
    this.getFlushUrl = getFlushUrl;

    function getShouldFlush(erid) {
        var eventBin = this.dartEventBinCollection[erid];
        return eventBin["shouldFlush"];
    }
    this.getShouldFlush = getShouldFlush;

    function setMetShouldFlush(erid, flag) {
        var eventBin = this.dartEventBinCollection[erid];
        if(eventBin)
            eventBin["shouldFlush"] = flag;
    }
    this.setMetShouldFlush = setMetShouldFlush;

    function isInAllowedTimeframe() {
        var now = new Date();
        if(now.getTime() - this.dartRegistrationTime.getTime() > this.dartMaxTimeMilliseconds)
            return false;
        return true;
    }
    this.isInAllowedTimeframe = isInAllowedTimeframe;

    function roundNumber(number, X) {
        X = (X ? X : 0);
        return (Math.round(number*Math.pow(10,X))/Math.pow(10,X));
    }
    this.roundNumber = roundNumber;

    function setFlushInterval(erid) {
        for(var k = 0; k < this.dartIntervalArray.length; k++) {
            var timeout = (this.dartIntervalArray[k] * 1000);
            this.dartGlobalTemplate.registerTimeoutHandler(timeout, "flushMetCounters('" + erid + "')", this);
        }
    }
    this.setFlushInterval = setFlushInterval;

}  // end of DARTEventBin_XX




function FullScreenVideoManager_19_09(displayManager, fsvCreativeIdentifier) {
    this.displayManager = displayManager;
    this.globalTemplate = displayManager.globalTemplate;
    this.fsvCreativeIdentifier = fsvCreativeIdentifier;
    this.wmpPlayer = null;
    this.videoDiv = null;
    this.intervalId = null;
    this.isBufferingDone = false;
    this.isWMVStart = false;
    this.shouldTrack = true;
    this.isWideScreen = (screen.width/screen.height)>(4/3);
    this.scrHeight = screen.height;
    this.scrWidth = this.isWideScreen ? ((2/3)*this.scrHeight+(1/2)*screen.width) : screen.width;
    this.btnWidth = this.scrWidth * 0.056;
    this.topBorder = this.scrHeight * .8875;
    this.muteLeft = this.scrWidth * 0.766;
    this.playLeft = this.scrWidth * .825;
    this.pauseLeft = this.scrWidth * .884;
    this.closeLeft = this.scrWidth * .944;


    function registerFSVEventHandlers() {
        this.wmpPlayer = this.globalTemplate.toObject("OBJECT_" + this.fsvCreativeIdentifier);
        this.videoDiv = this.globalTemplate.toObject("DIV_" + this.fsvCreativeIdentifier);

        this.wmpPlayer.attachEvent("PlayStateChange", new Function("newState", "dartFSVManagers['" + this.fsvCreativeIdentifier + "'].onPlayStateChange(newState);"));
        this.wmpPlayer.attachEvent("KeyDown", new Function("keyCode", "shiftState", "dartFSVManagers['" + this.fsvCreativeIdentifier + "'].onKeyDown(keyCode, shiftState);"));
        this.wmpPlayer.attachEvent("MouseDown", new Function("nButton", "shiftState", "fX", "fY", "dartFSVManagers['" + this.fsvCreativeIdentifier + "'].onMouseDown(nButton, shiftState, fX, fY);"));
        this.wmpPlayer.attachEvent("DoubleClick", new Function("nButton", "shiftState", "fX", "fY", "dartFSVManagers['" + this.fsvCreativeIdentifier + "'].onDoubleClick(nButton, shiftState, fX, fY);"));
    }
    this.registerFSVEventHandlers = registerFSVEventHandlers;

    function launchVideo(url, shouldTrack, isMute) {
        this.shouldTrack = shouldTrack;
        this.wmpPlayer.URL = url;
        this.isBufferingDone = false;
        this.isWMVStart = false;
        this.wmpPlayer.controls.play();
        this.videoDiv.style.visibility = "visible";
        this.wmpPlayer.settings.mute = isMute;
        this.intervalId = setInterval('dartFSVManagers["' + this.fsvCreativeIdentifier + '"].monitorPlayer();', 100);
    }
    this.launchVideo = launchVideo;


    function hideVideoPlayer() {
        this.videoDiv.style.visibility = "hidden";
        this.wmpPlayer.controls.stop();
        this.wmpPlayer.fullscreen;
        clearInterval(this.intervalId);
        this.logFSVEvent("Stop", 7);
        this.flushFSVCounters();
    }
    this.hideVideoPlayer = hideVideoPlayer;

    function logFSVEvent(eventType, eventId) {
        if(this.shouldTrack) {
            this.displayManager.logEvent(eventType, eventId, this.displayManager.renderingId);
        }
    }
    this.logFSVEvent = logFSVEvent;


    function flushFSVCounters() {
        if(this.shouldTrack) {
            var shouldFlash = this.displayManager.getShouldFlush(this.displayManager.renderingId);
            this.displayManager.setShouldFlush(this.displayManager.renderingId, true);
            this.displayManager.flushCounters(this.displayManager.renderingId);
            this.displayManager.setShouldFlush(this.displayManager.renderingId, shouldFlash);
        }
    }
    this.flushFSVCounters = flushFSVCounters;

    function isWMV() {
        var regMatch = this.wmpPlayer.URL.toLowerCase().match(/.*\.(wmv|asf)[\s]*$/);
        return regMatch ? true: false;
    }
    this.isWMV = isWMV;

    function playFSV() {
        if(this.isBufferingDone == false) {
            this.logFSVEvent("Count", 5);
            this.hideProgressBar();
        }
        this.logFSVEvent("Start", 7);
        this.wmpPlayer.fullscreen = true;
        this.isBufferingDone = true;
    }
    this.playFSV = playFSV;

    function onPlayStateChange(newState) {
        try {
            if(newState == 3) {   // play
                if(this.isWMV()) {
                    if(this.isWMVStart == false) {
                        this.isWMVStart = true;
                    }
                    else {
                        this.playFSV();
                    }
                }
                else {
                    this.playFSV();
                }
            }
            else if(newState == 2) {  // pause
                this.logFSVEvent("Stop", 7);
            }
        } catch(exception) {}
    }
    this.onPlayStateChange = onPlayStateChange;

    function onKeyDown(nKeyCode, nShiftState) {
        if (nKeyCode == 27) {   // escape
            this.hideVideoPlayer();
        }
    }
    this.onKeyDown = onKeyDown;

    function monitorPlayer() {
        if(this.checkFSVError()) {
            return;
        }

        if(this.wmpPlayer.currentMedia && this.wmpPlayer.controls.currentPosition) {
            if(!this.isBufferingDone && this.wmpPlayer.controls.currentPosition > 0) {
                this.playFSV();
            }
            if(this.isBufferingDone && this.wmpPlayer.controls.currentPosition > 0 && !this.wmpPlayer.fullScreen) {
                this.hideVideoPlayer();
                return;
            }
            var totalLength = this.wmpPlayer.currentMedia.duration;
            var currentPosition = this.wmpPlayer.controls.currentPosition;
            var diff = totalLength - currentPosition;

            if(diff < 0.2) {
                this.logFSVEvent("Count", 6);
                this.hideVideoPlayer();
            }
        }
    }
    this.monitorPlayer = monitorPlayer;

    function onDoubleClick(nButton, nShiftState, fX, fY) {
        this.hideVideoPlayer();
    }
    this.onDoubleClick = onDoubleClick;

    function onMouseDown(nButton, nShiftState, fX, fY) {
        // the value of "1" for nButton is the value for the left mouse click
        if ((nButton == 1) && (fY > this.topBorder)) {
            // if mute button is clicked
            if((fX > this.muteLeft) && (fX < (this.muteLeft+this.btnWidth))) {
                this.wmpPlayer.settings.mute = !(this.wmpPlayer.settings.mute);
            }
            // if play button is clicked
            if ((fX > this.playLeft) && (fX < (this.playLeft+this.btnWidth))) {
                this.wmpPlayer.controls.play();
            }
            // if pause button is clicked
            if ((fX > this.pauseLeft) && (fX < (this.pauseLeft+this.btnWidth))) {
                if(this.wmpPlayer.playState == 2) {
                    this.wmpPlayer.controls.play();
                }
                else {
                    this.wmpPlayer.controls.pause();
                }
            }
            // if close button is clicked
            if ((fX > this.closeLeft) && (fX < (this.closeLeft+this.btnWidth))) {
                this.hideVideoPlayer();
            }
        }
    }
    this.onMouseDown = onMouseDown;

    function checkFSVError() {
        var err = this.wmpPlayer.error;
        if(err.errorCount > 0) {
            this.hideVideoPlayer();
            err.clearErrorQueue();
            this.hideProgressBar();
            return true;
        }
        else {
            return false;
        }
    }
    this.checkFSVError = checkFSVError;

    function hideProgressBar() {
        for(assetName in this.displayManager.assets) {
            if(!this.globalTemplate.isPartOfArrayPrototype(assetName)) {
                var flashObject = this.globalTemplate.toObject("FLASH_" + assetName);
                if(flashObject) {
                    flashObject.SetVariable("_root.g_isVideoBufferComplete", "true");
                }
            }
        }
    }
    this.hideProgressBar = hideProgressBar;

}   // end of FullScreenVideoManager_XX




function MotifCreativeDisplayScheduler_19_09() {
    this.gtVersion = "19_09";
    this.callbackParameters = new Array();

    function getDisplayManager(creative) {
        var manager = new DARTCreativeDisplayManager_19_09(creative);
        dartCreativeDisplayManagers[creative.creativeIdentifier] = manager;
        return manager;
    }
    this.getDisplayManager = getDisplayManager;


    function getFullScreenManager(displayManager) {
        var fsvCreativeIdentifier = "FSV_" + displayManager.globalTemplate.creativeIdentifier;
        var manager = new FullScreenVideoManager_19_09(displayManager, fsvCreativeIdentifier);
        dartFSVManagers[fsvCreativeIdentifier] = manager;
        return manager;
    }
    this.getFullScreenManager = getFullScreenManager;

    function displayFixedFlash(manager, creative, fixedFlash) {
        var globalTemplate = dartGlobalTemplateObjects[creative.creativeIdentifier];
        var flash = "FLASH_" + fixedFlash.variableName;
        if(globalTemplate.toObject(flash) == null) {
            if(this.callbackParameters[flash] == null) {
                this.callbackParameters[flash] = globalTemplate.createFunction("displayFixedFlash", this, arguments);
            }
            window.setTimeout(this.callbackParameters[flash], 100);
            return;
        }
        manager.addEntityProperties(fixedFlash.variableName, fixedFlash.hideDropdowns, fixedFlash.hideIframes, fixedFlash.hideScrollbars, false, false, false);
        manager.fsHook("FLASH_" + fixedFlash.variableName);
        manager.registerUrl(creative.renderingId, fixedFlash.adserverUrl, fixedFlash.startTime);
        manager.scheduleDisplay(fixedFlash.variableName, fixedFlash.startTime, fixedFlash.duration);
    }
    this.displayFixedFlash = displayFixedFlash;

    function displayCreative(creative) {
        var type = creative.type;
        var globalTemplate = dartGlobalTemplateObjects[creative.creativeIdentifier];
        var mgr = getDisplayManager(creative);
        var fsvManager = (creative.isFSV) ? getFullScreenManager(mgr) : null;

        if(creative.isFSV) {
            fsvManager.registerFSVEventHandlers();
        }

        if(type == "FixedFlash" || type == "FixedFlashPopFlash") {
            this.displayFixedFlash(mgr, creative, creative.assets["FixedFlash"]);
        }
        else if(type == "FloatingFlash") {
            mgr.scheduleCallbackOnLoad("displayFloatingFlash()");
        }
        else if(type == "FixedFlashFloatingFlash") {
            this.displayFixedFlash(mgr, creative, creative.assets["FixedFlash"]);
            mgr.doNotAdjustObject(creative.assets["FixedFlash"].variableName, "FLASH_" + creative.assets["FixedFlash"].variableName);
            mgr.scheduleCallbackOnLoad("displayFloatingFlash()");
        }
        else if(type == "ExpandingFlash") {
            var exp = creative.assets["ExpandingFlash"];
            mgr.doNotAdjustObject(exp.variableName, "FLASH_" + exp.variableName);
            mgr.fsHook("FLASH_" + exp.variableName);
            mgr.registerUrl(creative.renderingId, exp.adserverUrl, exp.startTime);
            mgr.addEntityProperties(exp.variableName, exp.hideDropdowns, exp.hideIframes, exp.hideScrollbars, exp.hideObjects, exp.hideApplets, true);
            mgr.scheduleDisplay(exp.variableName, exp.startTime, exp.duration, false);
            mgr.collapseAsset(exp.variableName);
        }
        else if(type == "FloatingFlashReminderFlash") {
            mgr.scheduleCallbackOnLoad('displayFloatingWithReminder()');
        }
        if(mgr.isFlashScriptingSupported())
            mgr.scheduleCallbackOnLoad("triggerPoliteDownload()");
    }
    this.displayCreative = displayCreative;

}  // end of MotifCreativeDisplayScheduler_XX



var dartGlobalTemplateJSLoaded_19_09 = true;
var scheduler = new MotifCreativeDisplayScheduler_19_09();

for(var i = 0; i < dartMotifCreatives.length; i++) {
    var creative = dartMotifCreatives[i];
    if (creative.gtVersion == scheduler.gtVersion)
        scheduler.displayCreative(dartMotifCreatives[i]);
}
