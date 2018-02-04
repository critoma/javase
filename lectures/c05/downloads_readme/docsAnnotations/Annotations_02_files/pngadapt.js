<!--
/* 
Browser sniffer. Written by PerlScriptsJavaScripts.com
Copyright http://www.perlscriptsjavascripts.com 
Free and commercial Perl and JavaScripts     
*/

v3 = 0; op = 0; ie4  = 0; ie5 = 0; nn4 = 0; nn6 = 0; isMac = 0; aol = 0;

if(document.images){
    if(navigator.userAgent.indexOf("Opera") != -1){
        op = 1;
    } else {
        if(navigator.userAgent.indexOf("AOL") != -1){
            aol = 1;
        } else {
            ie4 = (document.all && !document.getElementById);
            nn4 = (document.layers);
            ie5 = (document.all && document.getElementById);
            nn6 = (document.addEventListener);
        }
    }
} else {
    v3 = 1;	
}

if(navigator.userAgent.indexOf("Mac") != -1){
    isMac = 1;
}

// -->



function correctPNG() // correctly handle PNG transparency in Win IE 5.5 & 6.
{
   var arVersion = navigator.appVersion.split("MSIE")
   var version = parseFloat(arVersion[1])
   if ((version >= 5.5) && (document.body.filters)) 
   {
      for(var i=0; i<document.images.length; i++)
      {
         var img = document.images[i]
         var imgName = img.src.toUpperCase()
         if (imgName.substring(imgName.length-3, imgName.length) == "PNG")
         {
            var imgID = (img.id) ? "id='" + img.id + "' " : ""
            var imgClass = (img.className) ? "class='" + img.className + "' " : ""
            var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' "
            var imgStyle = "display:inline-block;" + img.style.cssText 
            if (img.align == "left") imgStyle = "float:left;" + imgStyle
            if (img.align == "right") imgStyle = "float:right;" + imgStyle
            if (img.parentElement.href) imgStyle = "cursor:hand;" + imgStyle
            var strNewHTML = "<span " + imgID + imgClass + imgTitle
            + " style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";"
            + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"
            + "(src=\'" + img.src + "\', sizingMethod='image');\"></span>" 
            img.outerHTML = strNewHTML
            i = i-1
         }
      }
   }    
}

if(ie5){ // do this
    window.attachEvent("onload", correctPNG);
} 

