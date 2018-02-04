/*HM_ScriptDOM.js
* by Peter Belesis. v4.3 020605
* Copyright (c) 2002 Peter Belesis. All Rights Reserved.
* Originally published and documented at http://www.dhtmlab.com/
* Available solely from INT Media Group. Incorporated under exclusive license.
* Contact licensing@internet.com for more information.
*/

HM_IE5M = HM_IE && HM_Mac;
HM_NS6 = (navigator.vendor == ("Netscape6") || navigator.product == ("Gecko"));

if(HM_Konqueror) HM_IE = false;
HM_IE5W = HM_IE && !HM_Mac;
HM_IEpos = HM_IE || HM_Konqueror || (HM_NS6 && parseInt(navigator.productSub)>=20010710);

HM_IECSS = (HM_IE && document.compatMode) ? document.compatMode ==  "CSS1Compat" : false;
HM_IEDTD = (HM_IE && document.doctype) ? document.doctype.name.indexOf(".dtd")!=-1 : HM_IECSS;
HM_IEnoDTD = HM_IE && !HM_IEDTD;

HM_a_Parameters = [
	["MenuWidth",          150,		"number"],
	["FontFamily",         "Arial,sans-serif"],
	["FontSize",           10,		"number"],
	["FontBold",           false,	"boolean"],
	["FontItalic",         false,	"boolean"],
	["FontColor",          "black"],
	["FontColorOver",      "white"],
	["BGColor",            "white"],
	["BGColorOver",        "black"],
	["ItemPadding",        3,		"number"],
	["BorderWidth",        2,		"number"],
	["BorderColor",        "red"],
	["BorderStyle",        "solid"],
	["SeparatorSize",      1,		"number"],
	["SeparatorColor",     "yellow"],
	["ImageSrc",           "HM_More_black_right.gif"],
	["ImageSrcOver",       null],
	["ImageSrcLeft",       "HM_More_black_left.gif"],
	["ImageSrcLeftOver",   null],
	["ImageSize",          5,		"number"],
	["ImageHorizSpace",    0,		"number"],
	["ImageVertSpace",     0,		"number"],
	["KeepHilite",         false,	"boolean"],
	["ClickStart",         false,	"boolean"],
	["ClickKill",          true,	"boolean"],
	["ChildOverlap",       20,		"number"],
	["ChildOffset",        10,		"number"],
	["ChildPerCentOver",   null,	"number"],
	["TopSecondsVisible",  .5,		"number"],
	["ChildSecondsVisible",.3,		"number"],
	["StatusDisplayBuild", 1,		"boolean"],
	["StatusDisplayLink",  1,		"boolean"],
	["UponDisplay",        null,	"delayed"],
	["UponHide",           null,	"delayed"],
	["RightToLeft",        false,	"boolean"],
	["CreateTopOnly",      0,		"boolean"],
	["ShowLinkCursor",     false,	"boolean"],
	["ScrollEnabled",      false,	"boolean"],
	["ScrollBarHeight",    14,      "number"],
	["ScrollBarColor",     "lightgrey"],
	["ScrollImgSrcTop",    "HM_More_black_top.gif"],
	["ScrollImgSrcBot",    "HM_More_black_bot.gif"],
	["ScrollImgWidth",     9,       "number"],
	["ScrollImgHeight",    5,       "number"],
	["ScrollBothBars",     false,   "boolean"],
	["HoverTimeTop",       0,       "number"],
	["HoverTimeTree",      0,       "number"]
]

HM_MenuIDPrefix = "HM_Menu";
HM_ItemIDPrefix = "HM_Item";
HM_ArrayIDPrefix = "HM_Array";

Function.prototype.isFunction = true;
Function.prototype.isString = false;
String.prototype.isFunction = false;
String.prototype.isString = true;
String.prototype.isBoolean = false;
String.prototype.isNumber = false;
Number.prototype.isString = false;
Number.prototype.isFunction = false;
Number.prototype.isBoolean = false;
Number.prototype.isNumber = true;
Boolean.prototype.isString = false;
Boolean.prototype.isFunction = false;
Boolean.prototype.isBoolean = true;
Boolean.prototype.isNumber = false;
Array.prototype.itemValidation = false;
Array.prototype.isArray = true;

if(HM_IE) {
	HM_a_ElementsCreated = [];

	function HM_f_StoreElement(el){
		HM_a_ElementsCreated[HM_a_ElementsCreated.length] = el;
	}
}

function HM_f_AssignParameters(paramarray){
	var ParamName = paramarray[0];
	var DefaultValue = paramarray[1];
	var FullParamName = "HM_" + ParamName;
	
	if (typeof eval("window.HM_PG_" + ParamName) == "undefined") {
		if (typeof eval("window.HM_GL_" + ParamName) == "undefined") {
			eval(FullParamName + "= DefaultValue");
		}
		else {
			eval(FullParamName + "= HM_GL_" + ParamName);
		}
	}
	else {
		eval(FullParamName + "= HM_PG_" + ParamName);
	}

	paramarray[0] = FullParamName;
	paramarray[1] = eval(FullParamName);
}

function HM_f_EvalParameters(valuenew,valueold,valuetype){
	var TestString, ParPosition;

	if(typeof valuenew == "undefined" || valuenew == null || (valuenew.isString && valuenew.length == 0)){
		return valueold;
	}

	if(valuetype != "delayed"){
		while(valuenew.isString) {
			ParPosition = valuenew.indexOf("(");
			if(ParPosition !=-1) {
				TestString = "window." + valuenew.substr(0,ParPosition);
				if (typeof eval(TestString) != "undefined" && eval(TestString).isFunction) {
					valuenew = eval(valuenew);
				}
			}
			else break
		}
	}

	while(valuenew.isFunction) {valuenew = valuenew()}

	switch(valuetype){	
		case "number":
			while (valuenew.isString) {valuenew = eval(valuenew)}
			break;
		case "boolean":
			while (!valuenew.isBoolean) {
				valuenew = (valuenew.isNumber) ? valuenew ? true : false : eval(valuenew);
			}
			break;
	}

	return valuenew;
}

for (i=0;i<HM_a_Parameters.length;i++) {
	HM_f_AssignParameters(HM_a_Parameters[i]);
	eval(HM_a_Parameters[i][0] + "= HM_f_EvalParameters("+ HM_a_Parameters[i][0] +",null,HM_a_Parameters[i][2])")
}

HM_ChildPerCentOver = (isNaN(parseFloat(HM_ChildPerCentOver))) ? null : parseFloat(HM_ChildPerCentOver)/100;

HM_ChildMilliSecondsVisible = HM_ChildSecondsVisible * 1000;

function HM_f_ValidateArray(arrayname){
	var MenuArrayIsValid = false;
	var MenuArrayIsObject = (typeof eval("window." + arrayname) == "object");
	if(MenuArrayIsObject) { 
		var TheMenuArray = eval(arrayname);
		if(TheMenuArray.isArray && TheMenuArray.length > 1) {
			MenuArrayIsValid = true;
			if(!TheMenuArray.itemValidation) {
				while((typeof TheMenuArray[TheMenuArray.length-1] != "object") || (!TheMenuArray[TheMenuArray.length-1].isArray)) {
					TheMenuArray.length--;
				}
				TheMenuArray.itemValidation = true;
			}
		}
	}
	return MenuArrayIsValid;
}

if(!window.HM_a_TreesToBuild) {
	HM_a_TreesToBuild = [];
	for(i=1; i<100; i++){
		if(HM_f_ValidateArray(HM_ArrayIDPrefix + i)) HM_a_TreesToBuild[HM_a_TreesToBuild.length] = i;
	}
}

HM_CurrentArray = null;
HM_CurrentTree  = null;
HM_CurrentMenu  = null;
HM_CurrentItem  = null;
HM_a_TopMenus = [];
HM_AreLoaded = false;
HM_AreCreated = false;
HM_BeingCreated = false;
HM_UserOverMenu = false;
HM_HideAllTimer = null;
HM_TotalTrees = 0; 
HM_ZIndex = 5000;
HM_ScrollTimer = null;
HM_UseMouseEnter = false;

HM_Canvas = null;

function HM_f_StartIt() {
	if(HM_AreCreated) return;
	if((typeof(document.body) == "undefined") || (document.body == null)) return;
	HM_UseMouseEnter = (typeof(document.body.onmouseenter) != "undefined")
	if(HM_IE || HM_Konqueror) HM_Canvas = HM_IECSS ? document.documentElement : document.body;
	HM_AreLoaded = true;
	if (HM_ClickKill) {
		HM_f_OtherMouseDown = (document.onmousedown) ? document.onmousedown :  new Function;
    	document.onmousedown = function(){HM_f_PageClick();HM_f_OtherMouseDown()}
    }
	else {
		HM_TopMilliSecondsVisible = HM_TopSecondsVisible * 1000;
	}
    HM_f_MakeTrees();
	HM_f_OtherOnLoad();
}

function HM_f_MakeTrees(){
    HM_BeingCreated = true;
	var TreeParams = null;
	var TreeHasChildren = false;
	var ItemArray = null;

	for(var t=0; t<HM_a_TreesToBuild.length; t++) {
		if(!HM_f_ValidateArray(HM_ArrayIDPrefix + HM_a_TreesToBuild[t])) continue;
		HM_CurrentArray = eval(HM_ArrayIDPrefix + HM_a_TreesToBuild[t]);

		TreeParams = HM_CurrentArray[0];
		TreeHasChildren = false;

		for(var i=1; i<HM_CurrentArray.length; i++) {
			ItemArray = HM_CurrentArray[i];
			if(ItemArray[ItemArray.length-1]) {TreeHasChildren = true; break}
		}
		HM_CurrentTree = {
			MenuWidth        : MenuWidth = HM_f_EvalParameters(TreeParams[0],HM_MenuWidth,"number"),
			MenuLeft         : MenuLeft = HM_f_EvalParameters(TreeParams[1],null,"delayed"),
			MenuTop          : MenuTop = HM_f_EvalParameters(TreeParams[2],null,"delayed"),
			ItemWidth        : MenuWidth - (HM_BorderWidth*2),
			FontColor        : HM_f_EvalParameters(TreeParams[3],HM_FontColor),
			FontColorOver    : HM_f_EvalParameters(TreeParams[4],HM_FontColorOver),
			BGColor          : HM_f_EvalParameters(TreeParams[5],HM_BGColor),
			BGColorOver      : HM_f_EvalParameters(TreeParams[6],HM_BGColorOver),
			BorderColor      : HM_f_EvalParameters(TreeParams[7],HM_BorderColor),
			SeparatorColor   : HM_f_EvalParameters(TreeParams[8],HM_SeparatorColor),
			TopIsPermanent   : ((MenuLeft == null) || (MenuTop == null)) ? false : HM_f_EvalParameters(TreeParams[9],false,"boolean"),
			TopIsHorizontal  : TopIsHorizontal = HM_f_EvalParameters(TreeParams[10],false,"boolean"),
			TreeIsHorizontal : TreeHasChildren ? HM_f_EvalParameters(TreeParams[11],false,"boolean") : false,
			PositionUnder    : (!TopIsHorizontal || !TreeHasChildren) ? false : HM_f_EvalParameters(TreeParams[12],false,"boolean"),
			TopImageShow     : TreeHasChildren ? HM_f_EvalParameters(TreeParams[13],true,"boolean")  : false,
			TreeImageShow    : TreeHasChildren ? HM_f_EvalParameters(TreeParams[14],true,"boolean")  : false,
			UponDisplay      : HM_f_EvalParameters(TreeParams[15],HM_UponDisplay,"delayed"),
			UponHide         : HM_f_EvalParameters(TreeParams[16],HM_UponHide,"delayed"),
			RightToLeft      : HM_f_EvalParameters(TreeParams[17],HM_RightToLeft,"boolean"),
			ClickStart		 : HM_f_EvalParameters(TreeParams[18],HM_ClickStart,"boolean"),
			TopIsVariableWidth  : HM_f_EvalParameters(TreeParams[19],false,"boolean"),
			TreeIsVariableWidth  : HM_f_EvalParameters(TreeParams[20],false,"boolean")
		}

		HM_CurrentMenu = null;
		HM_f_MakeMenu(HM_a_TreesToBuild[t]);
		HM_a_TopMenus[HM_TotalTrees] = HM_CurrentTree.treeParent;
		HM_TotalTrees++;
		if(HM_CurrentTree.TopIsPermanent){
			with(HM_CurrentTree.treeParent) {
				HM_CurrentTree.treeParent.xPos = eval(HM_CurrentTree.MenuLeft);
				HM_CurrentTree.treeParent.yPos = eval(HM_CurrentTree.MenuTop);
				moveTo(HM_CurrentTree.treeParent.xPos,HM_CurrentTree.treeParent.yPos);
				style.zIndex = HM_ZIndex;
			}
			if(HM_IE5M) setTimeout(HM_CurrentTree.treeParent.id + ".fixSize(true)",10);	
			else HM_CurrentTree.treeParent.style.visibility = "visible";
		}
    }

	if(HM_StatusDisplayBuild) status = HM_TotalTrees + " Hierarchical Menu Trees Created";
    HM_AreCreated = true;
    HM_BeingCreated = false;
}

function HM_f_SetItemProperties(itemidsuffix) {
	this.tree        = HM_CurrentTree;
	this.index       = HM_CurrentMenu.itemCount - 1;
	this.isLastItem  = (HM_CurrentMenu.itemCount == HM_CurrentMenu.maxItems);
	this.array		 = HM_CurrentMenu.array[HM_CurrentMenu.itemCount];
	this.dispText    = this.array[0];
	this.linkText    = this.array[1];
	this.permHilite  = HM_f_EvalParameters(this.array[3],false,"boolean");
	this.hasRollover = (!this.permHilite && HM_f_EvalParameters(this.array[2],true,"boolean"));
	this.hasMore	 = HM_f_EvalParameters(this.array[4],false,"boolean") && HM_f_ValidateArray(HM_ArrayIDPrefix + itemidsuffix);
	this.childID	 = this.hasMore ? (HM_MenuIDPrefix + itemidsuffix) : null;
	this.child		 = null;

	if(HM_UseMouseEnter){
	 	this.onmouseenter  = HM_f_ItemOver;
		this.onmouseleave  = HM_f_ItemOut;
	}
	else {
	 	this.onmouseover = HM_f_ItemOver;
		this.onmouseout  = HM_f_ItemOut;
	}

	this.setItemStyle = HM_f_SetItemStyle;
	this.hoverChild   = HM_f_HoverChild;
	this.hoverTime = (this.menu == this.tree.startChild) ? HM_HoverTimeTop : HM_HoverTimeTree;

	this.showChild   = HM_f_ShowChild;
	this.displayChild = HM_f_DisplayChild;
	this.ClickStart = this.hasMore && this.tree.ClickStart && (this.tree.TopIsPermanent && (this.tree.treeParent==this.menu));
	if(this.ClickStart) {
		this.linkText = "";
		this.onclick = this.hoverChild;
	}
	this.ChildOverlap = null;
}

function HM_f_MakeElement(menuid) {
	var MenuObject;
	MenuObject = document.createElement("DIV");

	if(HM_IE)HM_f_StoreElement(MenuObject);

	var MenuWidth = (HM_IEnoDTD ? HM_CurrentTree.MenuWidth : HM_CurrentTree.ItemWidth) + "px";

	with(MenuObject){
		id = menuid;
		with(style) {
			position = "absolute";
			visibility = "hidden";
			left = "-500px";
			top = "-2000px";
			width = MenuWidth;
		}
	}
	document.body.appendChild(MenuObject);

	if(HM_ScrollEnabled){
		MenuObject.scrollParent = MenuObject.appendChild(document.createElement("DIV"));
		with(MenuObject.scrollParent.style) {
			position = "absolute";
			top = "0px";
			width = MenuWidth;
		}
		MenuObject.scrollParent.top = 0;
		if(typeof document.onmousewheel != "undefined") MenuObject.onmousewheel = HM_f_DoWheelScroll;
	}
	else {
		MenuObject.scrollParent = MenuObject;
	}
	return MenuObject;
}

function HM_f_MakeMenu(menucount) {
	if(!HM_f_ValidateArray(HM_ArrayIDPrefix + menucount)) return false;
	HM_CurrentArray = eval(HM_ArrayIDPrefix + menucount);

	NewMenu = document.getElementById(HM_MenuIDPrefix + menucount);
	if(!NewMenu){
		NewMenu = HM_f_MakeElement(HM_MenuIDPrefix + menucount);
		if(HM_CurrentMenu) {
			NewMenu.parentMenu = HM_CurrentMenu;
			NewMenu.parentItem = HM_CurrentMenu.itemElement;
			NewMenu.parentItem.child = NewMenu;
			NewMenu.hasParent = true;
			NewMenu.isHorizontal = HM_CurrentTree.TreeIsHorizontal;
			NewMenu.showImage = HM_CurrentTree.TreeImageShow;
		}
		else {
			NewMenu.isHorizontal = HM_CurrentTree.TopIsHorizontal;
			NewMenu.showImage = HM_CurrentTree.TopImageShow;
			HM_CurrentTree.treeParent = HM_CurrentTree.startChild = NewMenu;
		}

		HM_CurrentMenu = NewMenu;
		HM_CurrentMenu.array = HM_CurrentArray;
		HM_CurrentMenu.tree  = HM_CurrentTree;
		HM_CurrentMenu.itemCount = 0;
		HM_CurrentMenu.maxItems = HM_CurrentMenu.array.length - 1;
		HM_CurrentMenu.IsVariableWidth = ((HM_CurrentMenu.hasParent && HM_CurrentTree.TreeIsVariableWidth) || (!HM_CurrentMenu.hasParent && HM_CurrentTree.TopIsVariableWidth));
		HM_CurrentMenu.showIt = HM_f_ShowIt;
		HM_CurrentMenu.count = menucount;
		HM_CurrentMenu.keepInWindow = HM_f_KeepInWindow;

		if(HM_UseMouseEnter){
		 	HM_CurrentMenu.onmouseenter = HM_f_MenuOver;
			HM_CurrentMenu.onmouseleave = HM_f_MenuOut;
		}
		else {
		 	HM_CurrentMenu.onmouseover = HM_f_MenuOver;
			HM_CurrentMenu.onmouseout = HM_f_MenuOut;
		}
    
	    HM_CurrentMenu.hideTree = HM_f_HideTree
	    HM_CurrentMenu.hideParents = HM_f_HideParents;
	    HM_CurrentMenu.hideChildren = HM_f_HideChildren;
	    HM_CurrentMenu.hideTop = HM_f_HideTop;
	    HM_CurrentMenu.hideSelf = HM_f_HideSelf;
	    HM_CurrentMenu.hasChildVisible = false;
	    HM_CurrentMenu.isOn = false;
	    HM_CurrentMenu.hideTimer = null;
	    HM_CurrentMenu.currentItem = null;
		HM_CurrentMenu.setMenuStyle = HM_f_SetMenuStyle;
		HM_CurrentMenu.sizeFixed = false;
		HM_CurrentMenu.fixSize = HM_f_FixSize;
		HM_CurrentMenu.scrollbarsCreated = false;
		HM_CurrentMenu.enableScrolling = HM_f_EnableScrolling;
		HM_CurrentMenu.createScrollbars = HM_f_CreateScrollbars;
		HM_CurrentMenu.startScroll = HM_f_StartScroll;
		HM_CurrentMenu.checkScroll = HM_f_CheckScroll;
		HM_CurrentMenu.scrollbarsVisible = false;

		if(HM_IE) HM_CurrentMenu.onselectstart = HM_f_CancelSelect;
	    HM_CurrentMenu.moveTo = HM_f_MoveTo;
		HM_CurrentMenu.setMenuStyle();

		if(HM_IE5M && HM_ScrollEnabled && !HM_CurrentMenu.isHorizontal && !(HM_CurrentTree.PositionUnder && HM_CurrentMenu.parentMenu == HM_CurrentTree.treeParent) && !(HM_CurrentTree.TopIsPermanent && HM_CurrentMenu == HM_CurrentTree.treeParent)) {
			HM_CurrentMenu.createScrollbars();
		}
	}

	while (HM_CurrentMenu.itemCount < HM_CurrentMenu.maxItems) {
		HM_CurrentMenu.itemCount++;
		HM_CurrentMenu.itemElement = document.getElementById(HM_ItemIDPrefix + menucount + "_" + HM_CurrentMenu.itemCount);
		if(!HM_CurrentMenu.itemElement){
			if(HM_StatusDisplayBuild) status = "Creating Hierarchical Menus: " + menucount + " / " + HM_CurrentMenu.itemCount;
			HM_CurrentMenu.itemElement = HM_f_MakeItemElement(menucount);
		}
		if(HM_CurrentMenu.itemElement.hasMore && (!HM_CreateTopOnly || HM_AreCreated && HM_CreateTopOnly)) {
		    MenuCreated = HM_f_MakeMenu(menucount + "_" + HM_CurrentMenu.itemCount);
    	    if(MenuCreated) {
				HM_CurrentMenu = HM_CurrentMenu.parentMenu;
			}
		}
    }
	if(!HM_IE5M)HM_CurrentMenu.fixSize();
	return HM_CurrentMenu;
}

function HM_f_SetMenuStyle(){
	with(this.style) {
		borderWidth = HM_BorderWidth + "px";
		borderColor = HM_CurrentTree.BorderColor;
		borderStyle = HM_BorderStyle;
		overflow    = "hidden";
		cursor      = "default";
	}
}

function HM_f_MakeItemElement(menucount) {
	var ItemElement = document.createElement("DIV");

	if(HM_IE)HM_f_StoreElement(ItemElement);

	ItemElement.id = HM_ItemIDPrefix + menucount + "_" + HM_CurrentMenu.itemCount;
	ItemElement.style.position = "absolute";
	ItemElement.style.visibility = "inherit";
	HM_CurrentMenu.scrollParent.appendChild(ItemElement);
	ItemElement.menu = HM_CurrentMenu;
	ItemElement.setItemProperties = HM_f_SetItemProperties;
	ItemElement.setItemProperties(menucount + "_" + HM_CurrentMenu.itemCount);
	ItemElement.siblingBelow = ItemElement.previousSibling;
	if(ItemElement.linkText && !ItemElement.ClickStart) {
		ItemElement.onclick = HM_f_LinkIt;
		if(HM_ShowLinkCursor)ItemElement.style.cursor = HM_NS6 || HM_Konqueror ? "pointer" : "hand";
	}
	var FullPadding  = (HM_ItemPadding*2) + HM_ImageSize + HM_ImageHorizSpace;

	ItemElement.hasImage = (ItemElement.hasMore && HM_CurrentMenu.showImage);
    if(ItemElement.hasImage) {
		var ImageElement = document.createElement("IMG");

		if(HM_IE)HM_f_StoreElement(ImageElement);

		ItemElement.imageSrc = HM_CurrentTree.RightToLeft ? HM_ImageSrcLeft : HM_ImageSrc;
		ItemElement.hasImageRollover = ((!HM_CurrentTree.RightToLeft && HM_ImageSrcOver) || (HM_CurrentTree.RightToLeft && HM_ImageSrcLeftOver));
		if(ItemElement.hasImageRollover) {
			ItemElement.imageSrcOver = HM_CurrentTree.RightToLeft ? HM_ImageSrcLeftOver : HM_ImageSrcOver;
			if(ItemElement.permHilite) ItemElement.imageSrc = ItemElement.imageSrcOver;
		}

		with(ImageElement){
			src = ItemElement.imageSrc;
			removeAttribute("height");
			hspace = (!HM_CurrentTree.RightToLeft && HM_IE5W) ? HM_ItemPadding : 0;
			vspace = 0;
			width = HM_ImageSize;
			with(style) {
				position = "absolute";
				top = (HM_ItemPadding + HM_ImageVertSpace) + "px";

				if(HM_CurrentTree.RightToLeft) {
					left = (HM_ItemPadding + HM_ImageHorizSpace) + "px";
				}
			}
		}
		ItemElement.imgLyr = ImageElement;
	}
	ItemElement.innerHTML = ItemElement.dispText;
	if(ImageElement) ItemElement.insertBefore(ImageElement,ItemElement.firstChild);
	ItemElement.setItemStyle();
	return ItemElement;
}

function HM_f_SetItemStyle() {
	with(this.style){
		backgroundColor = (this.permHilite) ? HM_CurrentTree.BGColorOver : HM_CurrentTree.BGColor;
		color = (this.permHilite) ? HM_CurrentTree.FontColorOver : HM_CurrentTree.FontColor;
		padding = HM_ItemPadding +"px";
		font = ((HM_FontBold) ? "bold " : "normal ") + HM_FontSize + "pt " + HM_FontFamily;
		fontStyle = (HM_FontItalic) ? "italic" : "normal";
		if(HM_IE) overflow = "hidden";

		if((this.menu.showImage && (!this.menu.IsVariableWidth || (this.menu.IsVariableWidth && this.tree.RightToLeft && !this.menu.isHorizontal))) || (this.menu.IsVariableWidth && this.imgLyr)) {

			var FullPadding  = (HM_ItemPadding*2) + HM_ImageSize + HM_ImageHorizSpace;
			if (HM_CurrentTree.RightToLeft) paddingLeft = FullPadding + "px";
			else paddingRight = FullPadding + "px";
		}
		if(!this.isLastItem) {
			var SeparatorString = HM_SeparatorSize + "px solid " + this.tree.SeparatorColor;
			if (this.menu.isHorizontal) borderRight = SeparatorString;
			else borderBottom = SeparatorString;
		}

		if(this.menu.isHorizontal){
			top = "0px";
			if(!this.menu.IsVariableWidth) {
				if(HM_IEnoDTD){
					if(this.isLastItem) width = (HM_CurrentTree.MenuWidth - HM_BorderWidth - HM_SeparatorSize) + "px";
					else width = (HM_CurrentTree.MenuWidth - HM_BorderWidth) + "px";
					left = (this.index * (HM_CurrentTree.MenuWidth - HM_BorderWidth)) + "px";
				}
				else {
					width = (HM_CurrentTree.MenuWidth - HM_BorderWidth - parseInt(paddingLeft) - parseInt(paddingRight) - HM_SeparatorSize) + "px";
					left = ((this.index * parseInt(width)) + ((HM_SeparatorSize * this.index)))  + ((parseInt(paddingLeft) + parseInt(paddingRight)) * this.index) + "px";
				}
				var LeftAndWidth = parseInt(left) + parseInt(width);
				this.menu.style.width = LeftAndWidth + (HM_IEnoDTD ? (HM_BorderWidth * 2) : (parseInt(paddingLeft) + parseInt(paddingRight))) + "px"
			}
		}
		else {
			left = "0px";
			if(!this.menu.IsVariableWidth) {
				if(HM_IEnoDTD) width = HM_CurrentTree.ItemWidth + "px";
				else width = (HM_CurrentTree.ItemWidth - (parseInt(paddingLeft) + parseInt(paddingRight))) + "px";
			}

		}
	}
}

function HM_f_FixSize(makevis){
	var Items = this.scrollParent.childNodes;
	var ItemCount = Items.length;
	var TempItem;

	if(this.isHorizontal) {
		if(this.IsVariableWidth) {
		    for(i=0; i<ItemCount; i++) {
		        TempItem = Items[i];
				TempItem.realWidth = HM_IE ? TempItem.scrollWidth : TempItem.offsetWidth;
				if(HM_IE5M) TempItem.realWidth += (parseInt(TempItem.style.paddingLeft) + parseInt(TempItem.style.paddingRight))
				if(HM_IEnoDTD){
					if(TempItem.isLastItem) TempItem.style.width = (TempItem.realWidth) + "px";
					else TempItem.style.width = (TempItem.realWidth + HM_SeparatorSize) + "px";
					TempItem.style.left = (TempItem.index ? parseInt(TempItem.siblingBelow.style.left) + parseInt(TempItem.siblingBelow.style.width) : 0) + "px";
				}
				else { 
					if(TempItem.hasImage && !HM_CurrentTree.RightToLeft) {
						if(!HM_IECSS) TempItem.realWidth += HM_ItemPadding;
					}
					TempItem.realWidth -= (parseInt(TempItem.style.paddingLeft) + parseInt(TempItem.style.paddingRight));
 					if(!HM_IECSS && !HM_IE5M && !TempItem.isLastItem)  TempItem.realWidth -= HM_SeparatorSize;
					TempItem.allowableWidth = TempItem.tree.ItemWidth - (parseInt(TempItem.style.paddingLeft) + parseInt(TempItem.style.paddingRight));
					TempItem.style.width = Math.min(TempItem.allowableWidth,TempItem.realWidth) + "px";
					TempItem.style.left = (TempItem.index ? (parseInt(TempItem.siblingBelow.style.left) + TempItem.siblingBelow.offsetWidth) : 0) + "px";
				}
				if(TempItem.isLastItem) {
					LeftAndWidth = parseInt(TempItem.style.left) + parseInt(TempItem.style.width);
					this.style.width = this.scrollParent.style.width = LeftAndWidth + (HM_IEnoDTD ? (HM_BorderWidth * 2) : (parseInt(TempItem.style.paddingLeft) + parseInt(TempItem.style.paddingRight))) + "px";
				}
			}
		}

		var MaxItemHeight = 0;
	    for(i=0; i<ItemCount; i++) {
	        TempItem = Items[i];
		    if(TempItem.index) {
				var SiblingHeight = TempItem.siblingBelow.offsetHeight - (HM_IEnoDTD ? 0 : (HM_ItemPadding * 2));
				MaxItemHeight = Math.max(MaxItemHeight,SiblingHeight);
			}
	       	else {
				MaxItemHeight = TempItem.offsetHeight - (HM_IEnoDTD ? 0 : (HM_ItemPadding * 2));
			}
		}
	    for(i=0; i<ItemCount; i++) {
	        TempItem = Items[i];
			TempItem.style.height = MaxItemHeight +"px";
			if(TempItem.imgLyr) {
				if(this.tree.RightToLeft){
					TempItem.imgLyr.style.left = (HM_ItemPadding + HM_ImageHorizSpace) + "px";
				}
				else {
					TempItem.imgLyr.style.left = (TempItem.offsetWidth - ((TempItem.isLastItem ? 0 : HM_SeparatorSize) + (HM_IEnoDTD ? HM_IE5M ? HM_ItemPadding : HM_ItemPadding * 2 : HM_IECSS ? HM_ItemPadding * 2 : HM_ItemPadding) + HM_ImageHorizSpace + HM_ImageSize)) + "px";
				}
			}
		}
		this.style.height = this.scrollParent.style.height = MaxItemHeight + (HM_IEnoDTD ? HM_BorderWidth * 2 : (HM_ItemPadding * 2)) + "px";
	}
	else {
		if(this.IsVariableWidth) {
			var MaxItemWidth = 0;
	    	for(i=0; i<ItemCount; i++) {
	        	TempItem = Items[i];
				TempItem.realWidth = HM_IE ? TempItem.scrollWidth : TempItem.offsetWidth;
				if(HM_IE5M) TempItem.realWidth += (parseInt(TempItem.style.paddingLeft) + parseInt(TempItem.style.paddingRight))
				if(!HM_IEnoDTD)	{
					TempItem.realWidth -= ((parseInt(TempItem.style.paddingRight) + parseInt(TempItem.style.paddingLeft)))
				}
				MaxItemWidth = i ? Math.max(MaxItemWidth,TempItem.realWidth) : TempItem.realWidth;
				if(MaxItemWidth==TempItem.realWidth) TempWidest = TempItem;
			}
	    	for(i=0; i<ItemCount; i++) {
				Items[i].style.width = (TempWidest.realWidth + (HM_IEnoDTD ? 0 : (0))) + "px";

				if(!HM_IEnoDTD) {
					Items[i].style.paddingLeft = TempWidest.style.paddingLeft;
					Items[i].style.paddingRight = TempWidest.style.paddingRight;
				}
			}
			this.style.width = this.scrollParent.style.width = (Items[0].offsetWidth +  (HM_IEnoDTD ? HM_BorderWidth * 2 : 0)) + "px";
		}
	    for(i=0; i<ItemCount; i++) {
	        var TempItem = Items[i];
		    if (TempItem.index) {
				var SiblingHeight =(TempItem.siblingBelow.offsetHeight);
				TempItem.style.top = parseInt(TempItem.siblingBelow.style.top) + SiblingHeight + "px";
			}
			else TempItem.style.top = "0px";

			if(TempItem.imgLyr) {
				if(this.tree.RightToLeft){
					TempItem.imgLyr.style.left = (HM_ItemPadding + HM_ImageHorizSpace) + "px";
				}
				else {
					TempItem.imgLyr.style.left = (TempItem.offsetWidth - ((HM_IEnoDTD ? HM_IE5M ? HM_ItemPadding : HM_ItemPadding*2 :  HM_IECSS ? HM_ItemPadding * 2 : HM_ItemPadding) + HM_ImageHorizSpace + HM_ImageSize)) + "px";
				}
			}
		}
		this.style.height = this.scrollParent.style.height = parseInt(TempItem.style.top) + (HM_IE5W ? TempItem.scrollHeight : TempItem.offsetHeight) + (HM_IEnoDTD ? (HM_BorderWidth * 2) : 0) + "px";
	}
	this.origHeight = this.style.height;
	this.sizeFixed = true;
	if(makevis)this.style.visibility = "visible";
}

function HM_f_PopUp(menuname,e){
	if(!HM_NS6) e = event;
    if (!HM_AreLoaded) return;
	menuname = menuname.replace("elMenu",HM_MenuIDPrefix);
	var TempMenu = document.getElementById(menuname);
	if(!TempMenu)return;
	HM_CurrentMenu = TempMenu;
	if (HM_CurrentMenu.tree.ClickStart) {
		var ClickElement = (HM_NS6) ? e.target : e.srcElement;
		if(HM_NS6) {
			while(ClickElement.tagName==null){
				ClickElement = ClickElement.parentNode;
			}
		}
		ClickElement.onclick = HM_f_PopMenu;
    }
	else HM_f_PopMenu(e);
}

function HM_f_PopMenu(e){
	if(HM_IE) e = event;
    if (!HM_AreLoaded || !HM_AreCreated) return true;
    if (HM_CurrentMenu.tree.ClickStart && e.type != "click") return true;
	var mouse_x_position, mouse_y_position;
    HM_f_HideAll();
    HM_CurrentMenu.hasParent = false;
	HM_CurrentMenu.tree.startChild = HM_CurrentMenu;
	HM_CurrentMenu.mouseX = mouse_x_position = (HM_NS6) ? e.pageX : (e.clientX + HM_Canvas.scrollLeft);
	HM_CurrentMenu.mouseY = mouse_y_position = (HM_NS6) ? e.pageY : (e.clientY + HM_Canvas.scrollTop);




//	KEVIN
	window.theEvent = e;




	HM_CurrentMenu.xIntended = HM_CurrentMenu.xPos = (HM_CurrentMenu.tree.MenuLeft!=null) ? eval(HM_CurrentMenu.tree.MenuLeft) : mouse_x_position;
	HM_CurrentMenu.yIntended = HM_CurrentMenu.yPos = (HM_CurrentMenu.tree.MenuTop!=null)  ? eval(HM_CurrentMenu.tree.MenuTop)  : mouse_y_position;
	if(HM_IE5M && !HM_CurrentMenu.sizeFixed) HM_CurrentMenu.fixSize(false);
	if(HM_CurrentMenu.scrollbarsCreated) {
		HM_CurrentMenu.style.height = HM_CurrentMenu.origHeight;
		HM_CurrentMenu.checkScroll();
	}

	HM_CurrentMenu.keepInWindow();
    HM_CurrentMenu.moveTo(HM_CurrentMenu.xPos,HM_CurrentMenu.yPos);
    HM_CurrentMenu.isOn = true;
	if(HM_IE5M) {
		setTimeout(HM_CurrentMenu.id+".showIt(true)",10);
	}
	else {
		HM_CurrentMenu.showIt(true);
	}

    return false;
}

function HM_f_MenuOver() {
	if(!this.tree.startChild){this.tree.startChild = this}
	if(this.tree.startChild == this) HM_f_HideAll(this)
    this.isOn = true;
    HM_UserOverMenu = true;
    HM_CurrentMenu = this;
    if (this.hideTimer) clearTimeout(this.hideTimer);
}

function HM_f_MenuOut() {
	if(HM_IE && event.srcElement.contains(event.toElement)) return;
    this.isOn = false;
    HM_UserOverMenu = false;
    if(HM_StatusDisplayLink) status = "";

	var Items = this.scrollParent.childNodes;
	var ItemCount = Items.length;
	var TempItem;
	for(var i=0;i<ItemCount;i++){
		TempItem = Items[i];
		clearTimeout(TempItem.childTimer);
		TempItem.childTimer = null;
	}
	if(!HM_ClickKill) {
		clearTimeout(HM_HideAllTimer);
		HM_HideAllTimer = null;
		HM_HideAllTimer = setTimeout("HM_CurrentMenu.hideTree()",HM_ChildMilliSecondsVisible); 
	}
}

function HM_f_ShowChild(){
	if(!this.child) {
	   	HM_CurrentTree = this.tree;
	   	HM_CurrentMenu = this.menu;
	   	HM_CurrentItem = this;
	   	HM_CurrentMenu.itemElement = this;
	   	this.child = HM_f_MakeMenu(this.menu.count + "_"+(this.index+1));
	   	this.tree.treeParent = this.menu;
	   	this.tree.startChild = this.menu;
	}
	
    if(HM_IE5M && !this.child.sizeFixed) this.child.fixSize(false);
	if(this.menu.style.visibility == "hidden") return;
    if (this.tree.PositionUnder && (this.menu == this.tree.treeParent)) {
    	this.child.xPos = parseInt(this.menu.style.left) + parseInt(this.style.left);
    	this.child.yPos = parseInt(this.menu.style.top)  + this.menu.offsetHeight - (HM_BorderWidth);
    }
    else {
    	if(this.ChildOverlap==null) {
    		this.DistanceToRightEdge = parseInt(this.style.width);
    		if(!HM_IEnoDTD) this.DistanceToRightEdge += (parseInt(this.style.paddingLeft)+parseInt(this.style.paddingRight)) + ((this.menu.isHorizontal && !this.isLastItem) ? HM_SeparatorSize : 0); 
    		if (!this.menu.isHorizontal || (this.menu.isHorizontal && this.isLastItem)) this.DistanceToRightEdge += HM_BorderWidth;
    		this.DistanceToLeftEdge = (!this.menu.isHorizontal || (this.menu.isHorizontal && this.index==0)) ? HM_BorderWidth : HM_SeparatorSize;
    		this.ChildOverlap = (parseInt((HM_ChildPerCentOver != null) ? (HM_ChildPerCentOver  * this.DistanceToRightEdge) : HM_ChildOverlap));
    	}
    	if(HM_IE5M) {
    		this.oL = parseInt(this.menu.style.left) - HM_ItemPadding;
    		this.oL += this.offsetLeft;
    		this.oT = parseInt(this.menu.style.top) - HM_ItemPadding;
    		this.oT += this.offsetTop;
			if(HM_ScrollEnabled) {
				this.oT += this.menu.scrollParent.top;
				if(HM_ScrollBothBars && this.menu.scrollbarsVisible) this.oT += HM_ScrollBarHeight;
			}
		}
    	else {
    		this.oL = (HM_IEpos) ? parseInt(this.menu.style.left) + HM_BorderWidth : 0;
    		this.oL += this.offsetLeft;
    		this.oT = (HM_IEpos) ? parseInt(this.menu.style.top) : -HM_BorderWidth;
    		this.oT += this.offsetTop;
			if(HM_ScrollEnabled && HM_IEpos) {
				this.oT += this.menu.scrollParent.top;
				if(HM_ScrollBothBars && this.menu.scrollbarsVisible) this.oT += HM_ScrollBarHeight;
			}

		}
    	if(this.tree.RightToLeft) {
    		this.child.xPos = ((this.oL - this.DistanceToLeftEdge) + this.ChildOverlap) - this.child.offsetWidth;
    	}
    	else {		
    		this.child.xPos = (this.oL + this.DistanceToRightEdge) - this.ChildOverlap;
    	}
    	this.child.yPos = this.oT + HM_ChildOffset + HM_BorderWidth;
    }

	if(!this.tree.PositionUnder || this.menu!=this.tree.treeParent) {
		if(this.child.scrollbarsCreated) {
			this.child.style.height = this.child.origHeight;
		}
		this.child.keepInWindow();
	}	
    this.child.moveTo(this.child.xPos,this.child.yPos);

	if(HM_IE5M) {
		setTimeout(this.id+".displayChild()",10);
	}
	else {
		this.displayChild();
	}
}

function HM_f_DisplayChild(){
	this.menu.hasChildVisible = true;
	this.menu.visibleChild = this.child;
	this.child.showIt(true);
}

function HM_f_ItemOver(){
	var ItemMenu = this.menu;

    if (HM_KeepHilite) {
        if (ItemMenu.currentItem && ItemMenu.currentItem != this && ItemMenu.currentItem.hasRollover) {
			with(ItemMenu.currentItem.style){
				backgroundColor = this.tree.BGColor;
            	color = this.tree.FontColor
			}
			if(ItemMenu.currentItem.hasImageRollover)ItemMenu.currentItem.imgLyr.src = ItemMenu.currentItem.imageSrc;
        }
		if(ItemMenu != this.tree.startChild){
			var ParentMenu = ItemMenu.parentMenu;
        	if (ParentMenu.currentItem && ParentMenu.currentItem.hasRollover) {
				with(ParentMenu.currentItem.style){
					backgroundColor = this.tree.BGColor;
	            	color = this.tree.FontColor
				}
				if(ParentMenu.currentItem.hasImageRollover)ParentMenu.currentItem.imgLyr.src = ParentMenu.currentItem.imageSrc;
			}
			var ParentItem = ItemMenu.parentItem;
			if(ParentItem.hasRollover) {
	    		ParentItem.style.backgroundColor = this.tree.BGColorOver;
	    		ParentItem.style.color = this.tree.FontColorOver;
				if(ParentItem.hasImageRollover)ParentItem.imgLyr.src = ParentItem.imageSrcOver;
			}
			ParentMenu.currentItem = ParentItem;
        }
	}
	if(this.hasRollover) {
	    this.style.backgroundColor = this.tree.BGColorOver;
	    this.style.color = this.tree.FontColorOver;
		if(this.hasImageRollover)this.imgLyr.src = this.imageSrcOver;
	}

    if(HM_StatusDisplayLink) status = this.linkText;
    this.menu.currentItem = this;
	
	var Items = ItemMenu.scrollParent.childNodes;
	var ItemCount = Items.length;
	var TempItem;
	for(var i=0;i<ItemCount;i++){
		TempItem = Items[i];
		clearTimeout(TempItem.childTimer);
		TempItem.childTimer = null;
	}
	
	this.childTimer = setTimeout("document.getElementById('" + this.id + "').hoverChild(true)",this.hoverTime);
}

function HM_f_HoverChild(onover){
	if (this.menu.hasChildVisible) {
		if(this.menu.visibleChild == this.child && this.menu.visibleChild.hasChildVisible) this.menu.visibleChild.hideChildren(this);
		else this.menu.hideChildren(this);
    }

	if ((this.ClickStart && (onover!=true)) || (this.hasMore && !this.ClickStart)) this.showChild();
}

function HM_f_ItemOut() {
	if(this.hasRollover){
		with(this.style) {
			backgroundColor = this.tree.BGColor;
        	color = this.tree.FontColor
		}
		if(this.hasImageRollover)this.imgLyr.src = this.imageSrc;
    }
}

function HM_f_MoveTo(xPos,yPos) {
	this.style.left = xPos + "px";
	this.style.top = yPos + "px";
}

function HM_f_ShowIt(on) {
	if (!(this.tree.TopIsPermanent && (this.tree.treeParent==this))) {
		if(!this.hasParent || (this.hasParent && this.tree.TopIsPermanent && (this.tree.treeParent==this.parentMenu))) {
			var IsVisible = (this.style.visibility == "visible");
			if ((on && !IsVisible) || (!on && IsVisible))
				eval(on ? this.tree.UponDisplay : this.tree.UponHide)
		}
		if (on) this.style.zIndex = ++HM_ZIndex;
		this.style.visibility = (on) ? "visible" : "hidden";
	}
    if (HM_KeepHilite && this.currentItem && this.currentItem.hasRollover) {
		with(this.currentItem.style){
			backgroundColor = this.tree.BGColor;
			color = this.tree.FontColor;
		}
		if(this.currentItem.hasImageRollover)this.currentItem.imgLyr.src = this.currentItem.imageSrc;
    }
    this.currentItem = null;
}

function HM_f_KeepInWindow() {
    var ExtraSpace     = 10;
	var WindowLeftEdge = (HM_IE) ? HM_Canvas.scrollLeft   : window.pageXOffset;
	var WindowTopEdge  = (HM_IE) ? HM_Canvas.scrollTop    : window.pageYOffset;
	var WindowWidth    = (HM_IE) ? HM_Canvas.clientWidth  : window.innerWidth;
	var WindowHeight   = (HM_IE) ? HM_Canvas.clientHeight : window.innerHeight;

	var WindowRightEdge  = (WindowLeftEdge + WindowWidth) - ExtraSpace;
	var WindowBottomEdge = (WindowTopEdge + WindowHeight) - ExtraSpace;
	var MenuLeftEdge = this.xPos;
	var MenuRightEdge = MenuLeftEdge + this.offsetWidth;
	var MenuBottomEdge = this.yPos + parseInt(this.origHeight);
	if (this.hasParent) {
		var ParentLeftEdge = this.parentItem.oL;
	}
	if (MenuRightEdge > WindowRightEdge) {
		if (this.hasParent) {
			this.xPos = ((ParentLeftEdge - this.parentItem.DistanceToLeftEdge) + this.parentItem.ChildOverlap) - this.offsetWidth;
		}
		else {
			dif = MenuRightEdge - WindowRightEdge;
			this.xPos -= dif;
		}
		this.xPos = Math.max(5,this.xPos);
	}

	if (MenuBottomEdge > WindowBottomEdge) {
		dif = MenuBottomEdge - WindowBottomEdge;
		this.yPos -= dif;
	}

	if (MenuLeftEdge < WindowLeftEdge) {
		if (this.hasParent) {
			this.xPos = (ParentLeftEdge + this.parentItem.DistanceToRightEdge) - this.parentItem.ChildOverlap;
			MenuRightEdge = this.xPos + this.offsetWidth;
			if(MenuRightEdge > WindowRightEdge) this.xPos -= (MenuRightEdge - WindowRightEdge);
		}
		else {this.xPos = 5}
	}
	if(HM_ScrollEnabled) {
		if(this.yPos < WindowTopEdge) {
			this.enableScrolling(WindowTopEdge);
		}
		else if(this.scrollbarsCreated){
			if(!HM_IE5W){
				if(parseInt(this.origHeight) < WindowHeight)this.style.height = this.origHeight
			}
			this.checkScroll();
		}
	}
}

function HM_f_LinkIt() {
    if (this.linkText.indexOf("javascript:")!=-1) eval(this.linkText)
    else {
		HM_f_HideAll();
		location.href = this.linkText;
	}
}

function HM_f_PopDown(menuname){
    if (!HM_AreLoaded || !HM_AreCreated) return;
	menuname = menuname.replace("elMenu",HM_MenuIDPrefix);
    var MenuToHide = document.getElementById(menuname);
	if(!MenuToHide)return;
    MenuToHide.isOn = false;
    if (!HM_ClickKill) MenuToHide.hideTop();
}

function HM_f_HideAll(callingmenu) {
	for(var i=0; i<HM_TotalTrees; i++) {
        var TopMenu = HM_a_TopMenus[i].tree.startChild;
		if(TopMenu == callingmenu)continue;
        TopMenu.isOn = false;
        if (TopMenu.hasChildVisible) TopMenu.hideChildren();
        TopMenu.showIt(false);
    }    
}

function HM_f_HideTree() { 
    HM_HideAllTimer = null;
    if (HM_UserOverMenu) return;
    if (this.hasChildVisible) this.hideChildren();
    this.hideParents();
}

function HM_f_HideTop() {
	TopMenuToHide = this;
    (HM_ClickKill) ? TopMenuToHide.hideSelf() : (this.hideTimer = setTimeout("TopMenuToHide.hideSelf()",HM_TopMilliSecondsVisible));
}

function HM_f_HideSelf() {
    this.hideTimer = null;
    if (!this.isOn && !HM_UserOverMenu) this.showIt(false);
}

function HM_f_HideParents() {
    var TempMenu = this;
    while(TempMenu.hasParent) {
        TempMenu.showIt(false);
        TempMenu.parentMenu.isOn = false;        
        TempMenu = TempMenu.parentMenu;
    }
    TempMenu.hideTop();
}

function HM_f_HideChildren(callingitem,forced) {
    var TempMenu = this.visibleChild;
    while(TempMenu.hasChildVisible) {
        TempMenu.visibleChild.showIt(false);
        TempMenu.hasChildVisible = false;
        TempMenu = TempMenu.visibleChild;
    }
	if(forced || ((callingitem && (!callingitem.hasMore || this.visibleChild != callingitem.child)) || (!callingitem && !this.isOn))) {
        this.visibleChild.showIt(false);
        this.hasChildVisible = false;
    }
}

function HM_f_CancelSelect(){return false}

function HM_f_PageClick() {
    if (!HM_UserOverMenu && HM_CurrentMenu!=null && !HM_CurrentMenu.isOn) HM_f_HideAll();
}

popUp = HM_f_PopUp;
popDown = HM_f_PopDown;

function HM_f_ResizeHandler(){
	var mouse_x_position, mouse_y_position;
	for(var i=0; i<HM_TotalTrees; i++) {
        var TopMenu = HM_a_TopMenus[i].tree.startChild;
		if(TopMenu.style.visibility == "visible") {
			TopMenu.oldLeft = TopMenu.xPos;
			TopMenu.oldTop = TopMenu.yPos;
			mouse_x_position = TopMenu.mouseX;
			mouse_y_position = TopMenu.mouseY;
			TopMenu.xPos = eval(TopMenu.tree.MenuLeft);
			TopMenu.yPos = eval(TopMenu.tree.MenuTop);
			if(TopMenu.xPos == null) TopMenu.xPos = TopMenu.xIntended;
			if(TopMenu.yPos == null) TopMenu.yPos = TopMenu.yIntended;
			if(!TopMenu.tree.TopIsPermanent) {
				if(TopMenu.scrollbarsCreated)TopMenu.checkScroll();
				TopMenu.style.height = TopMenu.scrollParent.style.height;
				TopMenu.keepInWindow();
			}

			TopMenu.moveTo(TopMenu.xPos,TopMenu.yPos);
			var TempMenu = TopMenu;
		    while(TempMenu.hasChildVisible) {
				TempParent = TempMenu;
				TempMenu = TempMenu.visibleChild;
				TempItem = TempMenu.parentItem;
				TempItem.showChild();
		    }
		}
    }
	HM_f_OtherResize();
}

HM_f_OtherResize = (window.onresize) ? window.onresize :  new Function;
window.onresize = HM_f_ResizeHandler;

HM_f_OtherOnLoad = (window.onload) ? window.onload :  new Function;
window.onload = function(){setTimeout("HM_f_StartIt()",10)};

if(HM_IE) {
	HM_f_OtherOnUnload = (window.onunload) ? window.onunload :  new Function;
	window.onunload = function(){
		HM_CurrentMenu = null;
		HM_CurrentItem = null;
		if(HM_CurrentTree != null) {
			HM_CurrentTree.treeParent = null;
			HM_CurrentTree.startChild = null;
		}
		var Eclength = HM_a_ElementsCreated.length;
		for(var i=Eclength-1; i>=0; i--){
			TempElement = HM_a_ElementsCreated[i];
			TempElement.parentMenu = null;
			TempElement.parentItem = null;
			TempElement.itemElement = null;
			TempElement.currentItem = null;
			TempElement.child = null;
			TempElement.siblingBelow = null;
			TempElement.imgLyr = null;
			TempElement.scrollParent = null;
			TempElement.scrollbarTop = null;
			TempElement.scrollbarBot = null;
		}
		TempElement = null;
	
		for(var i=0; i<HM_TotalTrees; i++) {
			HM_a_TopMenus[i].tree.startChild = null;
			HM_a_TopMenus[i].tree.treeParent = null;
		}

		HM_f_OtherOnUnload();
	}
}

function HM_f_EnableScrolling(topedge){
	this.yPos = (topedge + 10);
	var WindowHeight = (HM_IE) ? HM_Canvas.clientHeight : window.innerHeight;
	this.style.height = (Math.max(WindowHeight,30) - 20) + "px";
	if(!this.scrollbarsCreated) this.createScrollbars();
	this.checkScroll();
}

function HM_f_CreateScrollbars(){
	var TopScrollElement = document.createElement("DIV");
	with(TopScrollElement.style){
		position = "absolute";
		top = "0px";
		width = (parseInt(this.style.width) - (HM_IEnoDTD ? (HM_BorderWidth * 2) : 0)) + "px";
		height = (HM_ScrollBarHeight - (HM_IEnoDTD ? 0 : HM_BorderWidth)) + "px";
		visibility = "hidden";
		backgroundColor = HM_ScrollBarColor;
		textAlign = "center";
		zIndex = 10000;
	}

	ImageElement = document.createElement("IMG");
	with(ImageElement.style){
		position = "absolute";
		top = (((HM_ScrollBarHeight - (!HM_IE5W ? HM_BorderWidth : 0)) - HM_ScrollImgHeight)/2) + "px";
		visibility = "inherit";
		left = ((parseInt(TopScrollElement.style.width) - HM_ScrollImgWidth)/2)+"px";
	}
	TopScrollElement.appendChild(ImageElement);
	BottomScrollElement = TopScrollElement.cloneNode(true);
	BottomScrollElement.firstChild.src = HM_ScrollImgSrcBot;
	TopScrollElement.firstChild.src = HM_ScrollImgSrcTop;
	var BorderString = (HM_BorderWidth + "px " + this.tree.BorderColor + " " + HM_BorderStyle);
	TopScrollElement.style.borderBottom = BorderString;
	BottomScrollElement.style.borderTop = BorderString;
	this.appendChild(TopScrollElement);
	this.appendChild(BottomScrollElement);
	this.scrollbarTop = TopScrollElement;
	this.scrollbarTop.onmousedown = function(){HM_CurrentMenu.startScroll(true)};
	this.scrollbarBot = BottomScrollElement;
	this.scrollbarBot.onmousedown = function(){HM_CurrentMenu.startScroll(false)};
	this.scrollbarsCreated = true;
}

function HM_f_StartScroll(up){
	HM_f_StopScroll();
    if (this.hasChildVisible) this.hideChildren(false,true);
	HM_ScrollTimer = setInterval("HM_f_DoScroll(" + up + ",10)",20);
	document.onmouseup = HM_f_StopScroll;
	return false;
}

function HM_f_StopScroll(){
	clearInterval(HM_ScrollTimer);
	HM_ScrollTimer = null;
}

function HM_f_DoScroll(up,incr){
	var ScrollEl = HM_CurrentMenu.scrollParent;
	if(up){
		ScrollEl.top += incr;
	}
	else{
		ScrollEl.top -= incr;
	}
	HM_CurrentMenu.checkScroll();
}

function HM_f_CheckScroll(){
	var ScrollEl = this.scrollParent;
	var MenuHeight = parseInt(this.style.height);
	var ScrollHeight = parseInt(ScrollEl.style.height);
	var HeightDiff = MenuHeight - ScrollHeight;
	var ScrollTopOffset = HM_ScrollBothBars ? HM_ScrollBarHeight : 0;

	if(!HeightDiff){
		this.scrollbarBot.style.visibility = "hidden";
		this.scrollbarTop.style.visibility = "hidden";
		this.scrollbarsVisible = false;
		ScrollEl.top = 0;
		ScrollEl.style.top = ScrollEl.top +  "px";
		return;
	}
	if(HM_ScrollBothBars) HeightDiff -= (ScrollTopOffset*2);
	if(ScrollEl.top <= (HeightDiff)) {
		ScrollEl.top = HeightDiff;
		HM_f_StopScroll();
		if(!HM_ScrollBothBars) this.scrollbarBot.style.visibility = "hidden";
	}
	else {
		this.scrollbarBot.style.visibility = "inherit";
		this.scrollbarBot.style.top = (MenuHeight - (HM_IEnoDTD ? (HM_BorderWidth * 2) : 0) - HM_ScrollBarHeight) + "px";
		if(HM_ScrollBothBars){
			this.scrollbarTop.style.visibility = "inherit";
			this.scrollbarsVisible = true;
		}
	}
	if(ScrollEl.top >= 0) {
		ScrollEl.top = 0;
		HM_f_StopScroll();
		if(!HM_ScrollBothBars)this.scrollbarTop.style.visibility = "hidden";
	}
	else {
		this.scrollbarTop.style.visibility = "inherit";
		if(HM_ScrollBothBars){
			this.scrollbarBot.style.visibility = "inherit";
			this.scrollbarsVisible = true;
		}
	}
	ScrollEl.style.top = (ScrollEl.top + ScrollTopOffset) + "px";
}

function HM_f_DoWheelScroll(){
	if(!this.scrollbarsCreated) return;
	var ScrollUp = (event.wheelDelta == 120);
	HM_f_DoScroll(ScrollUp,this.currentItem.offsetHeight);
	return false;
}

//end
