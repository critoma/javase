//<![CDATA[

// For each menu you create, you must create a matching "FSMenu" JavaScript object to represent
// it and manage its behaviour. You don't have to edit this script at all if you don't want to;
// these comments are just here for completeness. Also, feel free to paste this script into the
// external .JS file to make including it in your pages easier!

// Here's a menu object to control the above list of menu data:
var listMenu = new FSMenu('listMenu', true, 'display', 'block', 'none');

// The parameters of the FSMenu object are:
//  1) Its own name in quotes.
//  2) Whether this is a nested list menu or not (in this case, true means yes).
//  3) The CSS property name to change when menus are shown and hidden.
//  4) The visible value of that CSS property.
//  5) The hidden value of that CSS property.
//
// Next, here's some optional settings for delays and highlighting:
//  * showDelay is the time (in milliseconds) to display a new child menu.
//    Remember that 1000 milliseconds = 1 second.
//  * switchDelay is the time to switch from one child menu to another child menu.
//    Set this higher and point at 2 neighbouring items to see what it does.
//  * hideDelay is the time it takes for a menu to hide after mouseout.
//    Set this to a negative number to disable hiding entirely.
//  * cssLitClass is the CSS classname applied to parent items of active menus.
//  * showOnClick will, suprisingly, set the menus to show on click. Pick one of 3 values:
//    0 = all mouseover, 1 = first level click, sublevels mouseover, 2 = all click.
//  * hideOnClick hides all visible menus when one is clicked (defaults to true).
//  * animInSpeed and animOutSpeed set the animation speed. Set to a number
//    between 0 and 1 where higher = faster. Setting both to 1 disables animation.

//listMenu.showDelay = 0;
//listMenu.switchDelay = 125;
//listMenu.hideDelay = 500;
//listMenu.cssLitClass = 'highlighted';
//listMenu.showOnClick = 0;
//listMenu.hideOnClick = true;
//listMenu.animInSpeed = 0.2;
//listMenu.animOutSpeed = 0.2;


// Now the fun part... animation! This script supports animation plugins you
// can add to each menu object you create. I have provided 3 to get you started.
// To enable animation, add one or more functions to the menuObject.animations
// array; available animations are:
//  * FSMenu.animSwipeDown is a "swipe" animation that sweeps the menu down.
//  * FSMenu.animFade is an alpha fading animation using tranparency.
//  * FSMenu.animClipDown is a "blind" animation similar to 'Swipe'.
// They are listed inside the "fsmenu.js" file for you to modify and extend :).

// I'm applying two at once to listMenu. Delete this to disable!
listMenu.animations[listMenu.animations.length] = FSMenu.animFade;
listMenu.animations[listMenu.animations.length] = FSMenu.animSwipeDown;
//listMenu.animations[listMenu.animations.length] = FSMenu.animClipDown;


// Finally, on page load you have to activate the menu by calling its 'activateMenu()' method.
// I've provided an "addEvent" method that lets you easily run page events across browsers.
// You pass the activateMenu() function two parameters:
//  (1) The ID of the outermost <ul> list tag containing your menu data.
//  (2) A node containing your submenu popout arrow indicator.
// If none of that made sense, just cut and paste this next bit for each menu you create.

var arrow = null;
if (document.createElement && document.documentElement)
{
 arrow = document.createElement('span');
 arrow.appendChild(document.createTextNode('>'));
 // Feel free to replace the above two lines with these for a small arrow image...
 //arrow = document.createElement('img');
 //arrow.src = 'arrow.gif';
 //arrow.style.borderWidth = '0';
 arrow.className = 'subind';
}
addEvent(window, 'load', new Function('listMenu.activateMenu("listMenuRoot", arrow)'));


// You may wish to leave your menu as a visible list initially, then apply its style
// dynamically on activation for better accessibility. Screenreaders and older browsers will
// then see all your menu data, but there will be a 'flicker' of the raw list before the
// page has completely loaded. If you want to do this, remove the CLASS="..." attribute from
// the above outermost UL tag, and uncomment this line:
//addEvent(window, 'load', new Function('getRef("listMenuRoot").className="menulist"'));


// To create more menus, duplicate this section and make sure you rename your
// menu object to something different; also, activate another <ul> list with a
// different ID, of course :). You can hae as many menus as you want on a page.

//]]>
