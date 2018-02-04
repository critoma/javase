var tf_e9AdChoice = (function() {
  var tf_e9AdChoice =
   {
     adChoiceIconHeight		:	15,
     adChoiceIconCollapsedWidth	:	19,
     adChoiceIconExpandedWidth	:	77,
     adChoiceIconZIndex		:	2147483638,
 
     expand:
       function(imgObj,adWidth,xShift)
        {
          var			width = 0;
          var			p = this;
	  if ( xShift != 0)
             width = adWidth - p.adChoiceIconExpandedWidth;
 
          imgObj.parentNode.style.cssText +=';left:' + width + 'px;width:'+p.adChoiceIconExpandedWidth+'px';
          var dom = imgObj.parentNode.getElementsByTagName('img');
          dom[1].style.cssText +=';display:block;';
          imgObj.style.cssText +=';display:none;';
        },

     collapsed:
       function(imgObj,adWidth,xShift)
        {
          var			width = 0;
          var			p = this;
          if ( xShift != 0 )
	     width = adWidth - p.adChoiceIconCollapsedWidth;
 
          imgObj.parentNode.parentNode.style.cssText +=';left:' + width + 'px;width:'+p.adChoiceIconCollapsedWidth+'px';
          var dom = imgObj.parentNode.parentNode.getElementsByTagName('img');
          dom[0].style.cssText +=';display:block;';
          imgObj.style.cssText +=';display:none;';
        },

     showAdChoiceIcon:
       function(adChoiceObj)
        {
          var             	p = this;
	  var			xShift = 0;
	  var			yShift = 0;
	  var			collapsedImage = "";
	  var			expandedImage = "";

          if (adChoiceObj.adChoiceIconVisibility == "false")
	     return;
 
	  if (adChoiceObj.adChoiceIconPos == 'ur')
	     xShift = adChoiceObj.adWidth - p.adChoiceIconCollapsedWidth ;
          else if (adChoiceObj.adChoiceIconPos == 'll')
             yShift = adChoiceObj.adHeight - p.adChoiceIconHeight;
          else if (adChoiceObj.adChoiceIconPos == 'lr')
           {
             xShift = adChoiceObj.adWidth - p.adChoiceIconCollapsedWidth;
             yShift = adChoiceObj.adHeight - p.adChoiceIconHeight;
           }
 
	  collapsedImage = adChoiceObj.adChoiceIconDir + "ad_choices_i_" + adChoiceObj.adChoiceIconPos.toUpperCase() + ".png";
	  expandedImage = adChoiceObj.adChoiceIconDir + "ad_choices_" + adChoiceObj.adChoiceIconPos.toUpperCase() + ".png";
 
          var dyDiv = document.createElement('div');
          dyDiv.style.cssText   =    "text-align:left;height:" + p.adChoiceIconHeight + "px;left:" + xShift + "px;" +
				     "overflow:hidden;position:absolute;top:" + yShift + "px;width:" + p.adChoiceIconCollapsedWidth +"px;" +
				     "z-index:" + p.adChoiceIconZIndex;
 
	  dyDiv.innerHTML 	=    "<img style='margin:0;position:absolute;left:0px; display:block;' width='" + p.adChoiceIconCollapsedWidth + "px'" + 
				     " height='" + p.adChoiceIconHeight + "px' border='0' src= " + collapsedImage +
				     " onmouseover= 'tf_e9AdChoice.expand(this," + adChoiceObj.adWidth + "," + xShift +");'>" + 
				     "<a href=" + adChoiceObj.adChoiceOptOutPage + " target='_blank'>"  + 
   				       "<img style='margin:0;position:absolute;display:none;' width='" + p.adChoiceIconExpandedWidth+"px' " + 
				       " height='"+p.adChoiceIconHeight+"px' border='0' src="+ expandedImage +
				       " onmouseout='tf_e9AdChoice.collapsed(this,"+adChoiceObj.adWidth+"," + xShift +");'>" +
				     "</a>";
	  var adChoiceObjDivId = document.getElementById(adChoiceObj.adChoiceDivId);
 
          if (adChoiceObjDivId)
           {
	     adChoiceObjDivId.style.cssText += ";position:relative; width:" + adChoiceObj.adWidth + "px;";
	     adChoiceObjDivId.appendChild(dyDiv);

             if (typeof(tf_adChoiceMoveOut) == "function")
                tf_adChoiceMoveOut(adChoiceObj.rnd,adChoiceObj.adChoiceDivId);
           }
	}
     };
 
  return tf_e9AdChoice;
})();
