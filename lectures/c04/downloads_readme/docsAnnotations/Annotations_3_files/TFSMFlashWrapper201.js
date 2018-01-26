if (TFSMFlash_IMAGEALTERNATE){
	var MM_contentVersion = TFSMFlash_VERSION;
	var plugin = (navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"]) ? navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin : 0;
	if ( plugin ) {
		var words = navigator.plugins["Shockwave Flash"].description.split(" ");
		    for (var i = 0; i < words.length; ++i)
		    {
			if (isNaN(parseInt(words[i])))
			continue;
			var MM_PluginVersion = words[i]; 
		    }
		var MM_FlashCanPlay = MM_PluginVersion >= MM_contentVersion;
	}
	else if (navigator.userAgent && navigator.userAgent.indexOf("MSIE")>=0 && (navigator.appVersion.indexOf("Win") != -1)) {
		document.write('<SCR' + 'IPT LANGUAGE=VBScript\> \n');
		document.write('on error resume next \n');
		document.write('MM_FlashCanPlay = ( IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash." & MM_contentVersion)))\n');
		document.write('</SCR' + 'IPT\> \n');
	}
}
if ( MM_FlashCanPlay || ! TFSMFlash_IMAGEALTERNATE ){
document.write('<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="'+TFSMFlash_OASPROTOCOL+'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version='+TFSMFlash_VERSION+',0,0,0" ID="'+TFSMFlash_OASADID+'" '+TFSMFlash_OASDIM+' ALIGN="">');
document.write('<PARAM NAME=movie VALUE="'+TFSMFlash_SWFFILE+'"><PARAM NAME=quality VALUE=high><PARAM NAME="wmode" VALUE="'+TFSMFlash_WMODE+'">'); 
document.write('<EMBED src="'+TFSMFlash_SWFFILE+'" quality=high wmode='+TFSMFlash_WMODE+' swLiveConnect=FALSE '+TFSMFlash_OASDIM+' NAME="'+TFSMFlash_OASADID+'" ALIGN="" TYPE="application/x-shockwave-flash" PLUGINSPAGE="'+TFSMFlash_OASPROTOCOL+'www.macromedia.com/go/getflashplayer">');
document.write('</EMBED></OBJECT>');
} else {
document.write('<a href="'+TFSMFlash_OASCLICK+'" target="'+TFSMFlash_OASTARGET+'"><IMG SRC="'+TFSMFlash_IMAGEALTERNATE+'" '+TFSMFlash_OASDIM+' BORDER=0 alt="'+TFSMFlash_OASALTTEXT+'"></a>');
} 

