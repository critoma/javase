/* ************************************************* */
/* Div Effects by Ryan Scherf                        */
/* ************************************************* */
/* This script applies different decorations to      */
/* elements with html attributes of:                 */
/*		closable="true"                              */
/*		collapsible="true"                           */
/*                                                   */
/*	Notes:                                           */
/*		Tested on IE6, IE7, FF and Win Opera 9.      */
/* ************************************************* */

var expImg = "/icom_includes/footers/img/expand.gif";
var conImg = "/icom_includes/footers/img/contract.gif";

/* Apply all decorator items to elements on the page */
function applyDecorators()
{	
	applyCollapsibleIcons();
	applyClosableIcons();
}

/* Get a collection of elements by attribute */
function getElementsByAttribute(oElm, strTagName, strAttributeName, strAttributeValue)
{
    var arrElements = (strTagName == "*" && document.all)? document.all : oElm.getElementsByTagName(strTagName);
    var arrReturnElements = new Array();
    var oAttributeValue = (typeof strAttributeValue != "undefined")? new RegExp("(^|\\s)" + strAttributeValue + "(\\s|$)") : null;
    var oCurrent;
    var oAttribute;
    for(var i=0; i<arrElements.length; i++){
        oCurrent = arrElements[i];
        oAttribute = oCurrent.getAttribute(strAttributeName);
        if(typeof oAttribute == "string" && oAttribute.length > 0){
            if(typeof strAttributeValue == "undefined" || (oAttributeValue && oAttributeValue.test(oAttribute))){
                arrReturnElements.push(oCurrent);
            }
        }
    }
    return arrReturnElements;
}

/* Get a collection of elements by classname */
function getElementsByClassName(oElm, strTagName, strClassName){
    var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
    var arrReturnElements = new Array();
    strClassName = strClassName.replace(/\-/g, "\\-");
    var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
    var oElement;
    for(var i=0; i<arrElements.length; i++){
        oElement = arrElements[i];      
        if(oRegExp.test(oElement.className)){
            arrReturnElements.push(oElement);
        }   
    }
    return (arrReturnElements)
}

/* Create a collapsible div wrapper transparent to user */
function applyCollapsibleWrapper()
{
	var oCollapsible = getElementsByAttribute(document, "div", "collapsible", "true");
	
	var n;
	
	for(var i = 0; i < oCollapsible.length; i++)
	{
		n = oCollapsible[i].childNodes[0];
		
		// FF DOM impl fix - get first node that isn't whitespace
		while(n.nodeType != 1)
			n = n.nextSibling;
		
		var header = oCollapsible[i].removeChild(n);
		var hTag = header.tagName.toLowerCase();
		
		var oldHTML = oCollapsible[i].innerHTML;
		
		oCollapsible[i].innerHTML = '<' + hTag + ' style="cursor:pointer;" class="' + header.className + '" onmouseover="changeFade(this, 1);" onmouseout="changeFade(this, 0);">' + header.innerHTML + '</' + hTag + '>';
		oCollapsible[i].innerHTML += '<div class="collapseWrap" style="display:none; margin-top: -10px; clear: left;">' + oldHTML + '</div>';
		
	}
}

/* Apply the [x] to the upper right corner of the content element */
function applyClosableIcons() 
{
	//var closableDivs = new Array();
	var closableDivs = getElementsByAttribute(document, "div", "closable", "true");
	var iconDiv;
	
	var mouseOverDisplay = "Close this item";
	
	for(var i = 0; i < closableDivs.length; i++)
	{
		iconDiv = '<div class="floatingIcon"><a href="javascript://" title="' + mouseOverDisplay + '" onclick="closeDivById(\'' + closableDivs[i].id + '\');"><img src="/icom_includes/footers/img/contract.gif" alt="' + mouseOverDisplay + '" title="' + mouseOverDisplay + '" /></a></div>'
		closableDivs[i].innerHTML = iconDiv + closableDivs[i].innerHTML;
	}
}

/* Apply the up and down arrows for collapsible content elements */
function applyCollapsibleIcons()
{
	applyCollapsibleWrapper();
	
	//var closableDivs = new Array();
	var collapseDivs = getElementsByAttribute(document, "div", "collapsible", "true");
	var iconDiv;
	var collapseImg = conImg;	// relative to html file
	
	var mouseOverDisplay = "Expand/Contract this item";
	
	for(var i = 0; i < collapseDivs.length; i++)
	{	
		if(getElementsByClassName(collapseDivs[i], "div", "collapseWrap")[0].style.display == "none") collapseImg = expImg;
		else collapseImg = conImg;
			
		iconDiv = '<div class="floatingIcon"><a href="javascript://" title="' + mouseOverDisplay + '" onclick="toggleDiv(this.parentNode.parentNode);"><img src="' + collapseImg + '" alt="' + mouseOverDisplay + '" title="' + mouseOverDisplay + '" /></a></div>'
		collapseDivs[i].innerHTML = iconDiv + collapseDivs[i].innerHTML;
	}
}

/* Toggle div visibility by finding parentNode's */
function toggleDiv(elm)
{	

	var insideDiv = getElementsByClassName(elm, "div", "collapseWrap")[0];
	var collapseIcon = elm.getElementsByTagName("img");
	
	var oIcon = getCollapseIcon(collapseIcon);
	
	if (insideDiv.style.display == "" || insideDiv.style.display == "block")
	{
		//insideDiv.style.display = "none";
		Effect.BlindUp(insideDiv, {duration: 0.3} );
		oIcon.src = expImg;
	}
	else
	{
		//insideDiv.style.display = "block";
		Effect.BlindDown(insideDiv, {duration: 0.3} );
		oIcon.src = conImg;
	}
}

/* change fade of image if hovering h5 */
function changeFade(elm, state)
{
	var collapseIcon = elm.parentNode.getElementsByTagName("img");
	var oIcon = getCollapseIcon(collapseIcon);
	(state == 0) ? oIcon.className = "" : oIcon.className = "fade";
}

/* Return the correct icon we want to fade/toggle */
function getCollapseIcon(imgList)
{
	var cIcon = imgList[0];
	
	// in case the close/collapse are both present
	if(imgList.length == 2) cIcon = imgList[1];
	
	return cIcon;
}

/* Toggle div visibility via checkbox by Id */
function toggleDivById(id)
{
	var divObj = document.getElementById(id);
	if (divObj) (divObj.style.display == "" || divObj.style.display == "block") ? Effect.DropOut(divObj) : Effect.Appear(divObj,{duration: 0.3});
}

/* Close a div by Id */
function closeDivById(id)
{
	Effect.DropOut(id);
	//document.getElementById(id).style.display = "none";
}
