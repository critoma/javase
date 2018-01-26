/*HM_Loader.js
* by Peter Belesis. v4.3 020610
* Copyright (c) 2002 Peter Belesis. All Rights Reserved.
*/

   HM_DOM = (document.getElementById) ? true : false;
   HM_NS4 = (document.layers) ? true : false;
    HM_IE = (document.all) ? true : false;
   HM_IE4 = HM_IE && !HM_DOM;
   HM_Mac = (navigator.appVersion.indexOf("Mac") != -1);
  HM_IE4M = HM_IE4 && HM_Mac;
 HM_Opera = (navigator.userAgent.indexOf("Opera")!=-1);
 HM_Konqueror = (navigator.userAgent.indexOf("Konqueror")!=-1);

HM_IsMenu = !HM_Opera && !HM_IE4M && (HM_DOM || HM_NS4 || HM_IE4 || HM_Konqueror);

HM_BrowserString = HM_NS4 ? "NS4" : HM_DOM ? "DOM" : "IE4";

if(window.event + "" == "undefined") event = null;
function HM_f_PopUp(){return false};
function HM_f_PopDown(){return false};
popUp = HM_f_PopUp;
popDown = HM_f_PopDown;


HM_GL_MenuWidth          = 160;
HM_GL_FontFamily         = "Arial,sans-serif";
HM_GL_FontSize           = 10;
HM_GL_FontBold           = true;
HM_GL_FontItalic         = false;
HM_GL_FontColor          = "black";
HM_GL_FontColorOver      = "white";
HM_GL_BGColor            = "white";
HM_GL_BGColorOver        = "666666";
HM_GL_ItemPadding        = 3;

HM_GL_BorderWidth        = 1;
HM_GL_BorderColor        = "black";
HM_GL_BorderStyle        = "solid";
HM_GL_SeparatorSize      = 1;
HM_GL_SeparatorColor     = "black";

HM_GL_ImageSrc = "/img/HM_More_white_right.gif";

HM_GL_ImageSrcOver = "/img/HM_More_red_right.gif";

HM_GL_ImageSize          = 5;
HM_GL_ImageHorizSpace    = 0;
HM_GL_ImageVertSpace     = 2;

HM_GL_KeepHilite         = false;
HM_GL_ClickStart         = false;
HM_GL_ClickKill          = 0;
HM_GL_ChildOverlap       = 40;
HM_GL_ChildOffset        = 10;
HM_GL_ChildPerCentOver   = null;
HM_GL_TopSecondsVisible  = .5;
HM_GL_ChildSecondsVisible = .3;
HM_GL_StatusDisplayBuild = 0;
HM_GL_StatusDisplayLink  = 1;
HM_GL_UponDisplay        = null;
HM_GL_UponHide           = null;

HM_GL_RightToLeft      = false;
HM_GL_CreateTopOnly      = HM_NS4 ? true : false;
HM_GL_ShowLinkCursor     = true;

HM_GL_ScrollEnabled = false;
HM_GL_ScrollBarHeight = 14;
HM_GL_ScrollBarColor = "lightgrey";
HM_GL_ScrollImgSrcTop = "/img/HM_More_black_top.gif";
HM_GL_ScrollImgSrcBot = "/img/HM_More_black_bot.gif";
HM_GL_ScrollImgWidth = 9;
HM_GL_ScrollImgHeight = 5;
HM_GL_ScrollBothBars = false;

HM_GL_HoverTimeTop  = 0;
HM_GL_HoverTimeTree = 0;



// KEVIN

function HM_GetElementLeft(e)
{
	if(HM_NS4)
	{
		return e.target.x
	}
	else
	{
		if(HM_NS6)
		{
			var element = e.target;			
		}
		else
		{
			var element = event.srcElement;
		}
		var xPos = element.offsetLeft;
    	var ParentEl = element.offsetParent;
    	while (ParentEl != null) {
        	xPos += ParentEl.offsetLeft;
        	ParentEl = ParentEl.offsetParent;
    	}
    	return xPos;
	}
}



if(HM_IsMenu) {
	document.write("<SCR" + "IPT LANGUAGE='JavaScript1.2' SRC='/img/HM_Arrays.js' TYPE='text/javascript'><\/SCR" + "IPT>");
	document.write("<SCR" + "IPT LANGUAGE='JavaScript1.2' SRC='/img/HM_Script"+ HM_BrowserString +".js' TYPE='text/javascript'><\/SCR" + "IPT>");
}


//end
