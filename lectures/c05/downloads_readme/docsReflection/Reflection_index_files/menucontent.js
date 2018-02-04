/* ###########################################################################

GLOBAL ASSETS RELEASE v3.3

MENUCONTENT.JS v5.1

BUILD DATE: 20071217

COPYRIGHT SUN MICROSYSTEMS INC. 2007-2008

CONTACT US AT http://www.sun.com/secure/contact/cer.jsp?id=1073e17d-8d6c-43f6-b7e8-cf210cc89ba9 WITH ANY QUESTIONS

########################################################################### */

// translated text
var seeall = "See All";
var processingRequest = "Processing Request";

// set this to the location of your local im directories
var imdir = "/im";

// set this to the location of your local css directories
var cssdir = "/css";

// sub menu width
var mwidth = 150;

// set this to true for languages that read right to left such as hebrew or arabic
var rtl = false;

// copied over from v6.2 of file
var shutoff = {
	global: false, // true disables global menus
	share: false, // true disables share page
	pop: false, // true disables k2
	misc: false
};

// menus are organized using a two number decimel delineated system (1.2)
// the first number indicates which main topic link the menu belongs to.
// the second number indicates the order the sub topic link appears in the menu.
//
// the values for each item are then organized by a | delineated system (Link Name|URL)
// item X.0 MUST alway be the exact name of the main topic link as hardcoded in
// the masthead and must include a link that is the also the same.
//
// if the first main topic link was Products and it's URL was /products/ then then you
// would start the products menu with... 
//
// navmenu['1.0'] = 'Products|/products/';
//
// if the main topic link is not a link to another page, but simply the title of your
// menu (i.e. Select A Topic) then you would set the [X.0] item to "|". this way the
// See All Item is not created at the bottom of the menu. like...
//
// navmenu['1.0'] = '|';


navmenu['1.0'] = 'APIs|http://java.sun.com/reference/api/';
navmenu['1.1'] = 'Java SE|http://java.sun.com/reference/api/';
navmenu['1.2'] = 'Java EE|http://java.sun.com/javaee/reference/';
navmenu['1.3'] = 'Java ME|http://java.sun.com/javame/reference/apis.jsp';
navmenu['1.4'] = 'Solaris|http://developers.sun.com/solaris/reference/docs/';
navmenu['1.5'] = 'Sun Studio Compilers & Tools|http://developers.sun.com/sunstudio/reference/docs/';
navmenu['1.6'] = 'Web Services|http://java.sun.com/webservices/reference/api/';
navmenu['1.7'] = 'Java Card|http://java.sun.com/products/javacard/reference/docs/';

navmenu['2.0'] = 'Downloads|http://developers.sun.com/resources/downloads.html';
navmenu['2.1'] = 'Early Access|http://java.sun.com/downloads/ea/';
navmenu['2.2'] = 'Java SE|http://java.sun.com/javase/downloads/';
navmenu['2.3'] = 'Java EE|http://java.sun.com/javaee/downloads/';
navmenu['2.4'] = 'Java ME|http://java.sun.com/javame/downloads/';
navmenu['2.5'] = 'JavaFX|http://java.sun.com/javafx/downloads/';
navmenu['2.6'] = 'Solaris|http://www.sun.com/software/solaris/get.jsp';
navmenu['2.7'] = 'NetBeans|http://www.netbeans.org/downloads/index.html';
navmenu['2.8'] = 'Sun Studio Compilers & Tools|http://developers.sun.com/sunstudio/downloads/';
navmenu['2.9'] = 'MySQL|http://www.sun.com/software/products/mysql/getit.jsp';
navmenu['2.10'] = 'VirtualBox|http://www.sun.com/software/products/virtualbox/get.jsp';

navmenu['3.0'] = 'Products|http://developers.sun.com/global/mh/products/index.html';
navmenu['3.1'] = 'Java SE|http://java.sun.com/javase/';
navmenu['3.2'] = 'Java EE|http://java.sun.com/javaee/';
navmenu['3.3'] = 'Java ME|http://java.sun.com/javame/';
navmenu['3.4'] = 'JavaFX|http://java.sun.com/javafx/';
navmenu['3.5'] = 'Scripting|http://developers.sun.com/web/scripting/';
navmenu['3.6'] = 'Solaris|http://developers.sun.com/solaris/';
navmenu['3.7'] = 'Sun Studio Compilers & Tools|http://developers.sun.com/sunstudio/';
navmenu['3.8'] = 'NetBeans IDE |http://www.netbeans.org/';
navmenu['3.9'] = 'Open Storage|http://developers.sun.com/openstorage/';
navmenu['3.10'] = 'Mobility|http://developers.sun.com/mobility/';
navmenu['3.11'] = 'MySQL|http://www.sun.com/software/products/mysql/index.jsp';
navmenu['3.12'] = 'Java DB|http://developers.sun.com/javadb/';

navmenu['4.0'] = 'Support|http://developers.sun.com/services/';
navmenu['4.1'] = 'Big Admin|http://www.sun.com/bigadmin/home/?intcmp=1394';
navmenu['4.2'] = 'Developer Services|http://developers.sun.com/services/';
navmenu['4.3'] = 'Forums|http://forum.java.sun.com/index.jspa';
navmenu['4.4'] = 'Globalization|http://developers.sun.com/global/';

navmenu['5.0'] = 'Training|http://www.sun.com/training/?intcmp=1394';
navmenu['5.1'] = 'Certification|http://www.sun.com/training/certification/index.xml?intcmp=1394';
navmenu['5.2'] = 'Developer Training|http://www.sun.com/training/catalog/developer.xml?intcmp=1394';

navmenu['6.0'] = 'Participate|http://developers.sun.com/global/mh/participate/index.html';
navmenu['6.1'] = 'Forums|http://forum.java.sun.com/index.jspa';
navmenu['6.2'] = 'Blogs|http://blogs.sun.com/';
navmenu['6.3'] = 'SDN Share|http://developers.sun.com/sdnshare/';
navmenu['6.4'] = 'Wikis|http://wikis.sun.com/';
navmenu['6.5'] = 'Java User Groups|http://java.sun.com/community/usergroups/';
navmenu['6.6'] = 'Newsletters|http://developers.sun.com/newsletters/index.html';
navmenu['6.7'] = 'Events|http://developers.sun.com/events/';



// oldmenu is an array used when changes to the A2 masthead HTML is made. since pages can
// exist that do not have the most current masthead HTML, but still link to the latest js 
// we can use this old menu information to allow the menucode.js script to insert legacy
// menu content for legacy masthead links.
//
// oldmenu items should be numbered as they once were when they were navmenu items.
// the only thing that changes is the array name. if you are using site specific
// links and you know that all changes to the masthead have been made to all of your
// pages you do not need to keep legacy menus in the oldmenu array.

oldmenu['6.0'] = 'Research|http://research.sun.com/';
oldmenu['6.1'] = 'Projects|http://research.sun.com/projects/';
oldmenu['6.2'] = 'Events|http://research.sun.com/events/';
oldmenu['6.3'] = 'Lab Downloads|http://research.sun.com/download/';

// these arrays control the flyout menus for the A1 component. there are three
// arrays that control these menus.
//
// a1menuwrap -> defines html code that makes the menu box, this should NOT be altered
//
// a1hrefs -> this array uses a value (e.g. 'javamenu') to identify it's contents. this value
//            is also used by the a1menus array and can be any value you want it to be, it just
//            needs to be unique for each menu. the value of this variable is an array. it should
//            contain the text of the link that you wish the menu to be attached to (e.g. new Array('Java');)
//            although 'Java' is only one value, an array is used in case there are other languages
//            pointing to this one file. in that case you could use something like
//            "new Array('Communities','Comunidades');" so the menu will attach to either of those links.
//
// a1menus -> this array defines the menu width and menu content. in the a1menus['javamenu'] variable
//            the first value of it's array is 180, which sets the width of the menu, the second value
//            is the menus content. each line return of this value must end with \ in order for you to use
//            multiple lines to define this value.


a1hrefs['sunmenu'] = new Array('Sun');
a1menus['sunmenu'] = new Array(350,'\
<div class="a1-2colwrap">\
<div class="a1-2colul">\
<ul class="bluearrows">\
<li><a href="http://www.sun.com/">Sun.com</a></li>\
<li><a href="http://www.sun.com/aboutsun/">About Sun</a></li>\
<li><a href="http://www.sun.com/download/">Downloads</a></li>\
<li><a href="http://www.sun.com/products/">Products</a></li>\
</ul>\
<ul class="bluearrows">\
<li><a href="http://www.sun.com/servicessolutions/">Solutions</a></li>\
<li><a href="http://sunsolve.sun.com/pub-cgi/show.pl?target=tous">Support</a></li>\
<li><a href="http://www.sun.com/training/">Training</a><p></p></li>\
</ul>\
</div>\
</div>\
<br class="clear">\
');

a1hrefs['javamenu'] = new Array('Java');
a1menus['javamenu'] = new Array(450,'\
<div class="a1-2colwrap">\
<div class="a1-2colul">\
<ul class="bluearrows">\
<li><a href="http://java.com/download/">Java for your computer</a><p>Stay up to date with the latest versions of Java for your desktop computer.</p></li>\
<li><a href="http://www.sun.com/software/opensource/java/">Free and Open Source Java</a><p>Get your own copy of the underlying software code for the Java language.</p></li>\
<li><a href="http://java.sun.com/javase/downloads/">Download the latest JDK</a><p>The basic developer kit for Java developers.</p></li>\
<li><a href="http://java.sun.com/javaee/downloads/">Download the Java EE SDK</a><p>The SDK supports Java SE 6 and the latest Java EE 5 technologies.</p></li>\
<li><a href="http://www.netbeans.org/downloads/index.html">Download NetBeans IDE</a><p>Get the award-winning, open-source tool suite for developing Java applications.</p></li>\
<li><a href="http://java.sun.com/">Java Developer Resources</a><p>Visit java.sun.com for everything you need to know about the Java technology.</p></li>\
</ul>\
<ul class="bluearrows">\
<li><a href="http://developers.sun.com/prodtech/javatools/">Java Developer Tools</a><p>See and download all software tools available from Sun.</p></li>\
<li><a href="http://java.sun.com/javase/">Java Standard Edition</a><p>For developing and deploying Java applications for the desktop, servers, embedded, and real-time environments.</p></li>\
<li><a href="http://java.sun.com/javaee/">Java Enterprise Edition</a><p>For enterprise, server-side Java applications.</p></li>\
<li><a href="http://java.sun.com/javame/">Java Micro Edition</a><p>For Java applications running on mobile devices.</p></li>\
<li><a href="http://java.sun.com/learning/training/">Java Training</a><p>Sharpen your Java skills with courses from the source.</p></li>\
<li><a href="http://developers.sun.com/services/">Java Support</a><p>Get dedicated help from Sun including technical assistance, product support, and support for deployed Java applications.</p></li>\
</ul>\
</div>\
</div>\
<br class="clear">\
');


a1hrefs['solarismenu'] = new Array('Solaris');
a1menus['solarismenu'] = new Array(280,'\
<ul class="bluearrows">\
<li><a href="http://www.opensolaris.com/get/">OpenSolaris</a><p>Download, develop and collaborate with OpenSolaris</p></li>\
<li><a href="http://www.sun.com/software/solaris/get.jsp">Solaris</a><p>Download the most advanced operating system in the world</p></li>\
<li><a href="http://developers.sun.com/sunstudio/">Sun Studio</a><p>Optimizing compilers and tools for C/C++/Fortran application development</p></li>\
<li><a href="http://developers.sun.com/solaris/">Solaris Developer Center</a><p>Explore the resources and community available to the Solaris developer.</p></li>\
<li><a href="http://developers.sun.com/services/">Sun Developer Services</a><p>Get technical assistance, product support, training, and other services from the source.</p></li>\
<li><a href="http://www.sun.com/bigadmin/home/index.html">BigAdmin</a><p>A community site with Solaris system administration information, hardware compatibility, a script library, and other resources for administrators of Sun products.</p></li>\
</ul>\
');

a1hrefs['communitiesmenu'] = new Array('Communities');
a1menus['communitiesmenu'] = new Array(450,'\
<div class="a1-2colwrap">\
<div class="a1-2colul">\
<ul class="bluearrows">\
<li><a href="https://openjdk.dev.java.net/">OpenJDK</a><p>The place to collaborate on the open-source JDK, an implementation of the Java Platform, Standard Edition specification.</p></li>\
<li><a href="http://community.java.net/mobileandembedded/">Mobile &amp; Embedded </a><p>The Mobile & Embedded Community enables and empowers developers to collaborate and innovate, driving the evolution and adoption of the Java(TM) Platform, Micro Edition (Java ME) for mobile and embedded devices.</p></li>\
<li><a href="http://glassfish.dev.java.net/">GlassFish</a><p>The GlassFish community is building free, open source, production-quality, enterprise software.</p> </li>\
<li><a href="http://netbeans.org">NetBeans</a><p>You have the opportunity to submit bugs and feature requests in IssueZilla, submit news for the NetBeans Community, and contribute code or even create a project of your own. Welcome to the team!</p></li>\
<li><a href="http://www.sun.com/software/opensource/opensolaris.jsp">OpenSolaris</a><p>The OpenSolaris source code is already cutting edge, but innovation happens everywhere, so we welcome your involvement.</p></li>\
<li><a href="http://www.opensparc.net/">OpenSPARC</a><p>OpenSPARC.net is the genesis of a vision to create a larger community where open conversations and collaborative development projects spawn dramatic innovations around chip design.</p></li>\
</ul>\
<ul class="bluearrows">\
<li><a href="http://developers.sun.com/openstorage/">Open Storage</a><p>The OpenSolaris storage community is your gateway to data management related communities and projects - file sharing, file systems, volume managers, data services, storage drivers, and much more.</p></li>\
<li><a href="https://openjfx.dev.java.net/">OpenJFX</a><p>Project OpenJFX is a community for sharing early versions of the JavaFX Script language and for collaborating on its development.</p></li>\
<li><a href="http://java.net/">java.net</a><p>A gathering place for Java technology enthusiasts and existing communities across industries, platforms, and interest groups.</p></li>\
<li><a href="http://developers.sun.com/learning/academic/">Sun Student Developers</a><p>The SDN Academic Developer Program offers you ready access to tools, resources, and student communities.</p></li>\
<li><a href="http://jcp.org/">Java Community Process</a><p>The JCP gives you a chance to both have your own work become an official component of the Java platform, and to offer suggestions for improving and growing the technology.</p></li>\
</ul>\
</div>\
</div>\
<br class="clear">\
');

a1hrefs['accountmenu'] = new Array('My SDN Account');
a1menus['accountmenu'] = new Array(160,'\
<ul class="bluearrows">\
<li><a href="https://reg.sun.com/updateaccount?program=sdn&goto=http://developers.sun.com">Update My Profile</a></li>\
</ul>\
');

a1hrefs['joinmenu'] = new Array('Join SDN');
a1menus['joinmenu'] = new Array(160,'\
<ul class="bluearrows">\
<li><a href="https://reg.sun.com/register?program=sdn">Join SDN Now</a></li>\
<li><a href="http://developers.sun.com/user_registration/whyregister.jsp">Why Join</a><p>Becoming an Sun Developer Network (SDN) member makes you part of a vibrant worldwide community of developers, and gives you access to cool stuff and exclusive offers.</p></li>\
</ul>\
');

// ############################################################################
// BEGIN "SHARE THIS PAGE" STUFF
// To turn off share page functionality for all pages linking to this file, comment out this entire section
// To turn it off for an individual page, use <meta name="share-this-page" content="no"> in the <head> (case insensitive)

function getSafelyEncodedString(s) {
	// xss paranoia
	s = encodeURIComponent(s);
	s = s.replace(/"/,"&quot;");
	s = s.replace(/</,"&lt;");
	s = s.replace(/>/,"&gt;");
	return s;
}

var share_url = getSafelyEncodedString(location.href);
var share_title = getSafelyEncodedString(document.title);

var shareThisPage = '\
<div class="sharepagew1">\
<table summary="layout" cellpadding="0" cellspacing="0"><tr>\
<td id="share-technorati"><a href="http://www.technorati.com/search/'+share_url+'" class="sharelink technorati" title="See who links to this page on Technorati"></a></td>\
<td id="share-delicious"><a href="http://del.icio.us/post?v=4;url='+share_url+';title='+share_title+'" class="sharelink delicious" title="Bookmark this page in del.icio.us"></a></td>\
<td id="share-digg"><a href="http://digg.com/submit?phase=2&amp;url='+share_url+'&amp;title='+share_title+'" class="sharelink digg" title="Submit this page to Digg"></a></td>\
<td id="share-slashdot"><a href="http://slashdot.org/bookmark.pl?title='+share_title+'&amp;url='+share_url+'" class="sharelink slashdot" title="Submit this page to Slashdot"></a></td>\
';

var links = document.getElementsByTagName('link');
var feed_url = null;
var feed_title = null;
var numFeeds = 0;
for (var a=0; a<links.length; a++) {
	if (''+links[a].rel.toLowerCase() == 'alternate') {
		numFeeds++;
		if (!feed_url) {
			feed_url = links[a].href;
			feed_title = links[a].title;
		}
	}
}
if (numFeeds > 1) {
	shareThisPage += '<td id="share-multiple-feeds"><a href="#" title="Show available feeds"></a></td>';
} else if (numFeeds == 1) {
	shareThisPage += '<td id="share-feed"><a href="'+feed_url+'" class="sharelink feed" title="'+feed_title+'"></a></td>';
} else {
	shareThisPage += '<td id="share-blank"> </td>';
}

shareThisPage += '</tr></table></div>';

// Turn off share page widget for all pages linking to this file by commenting out the "sharetxt" var

var sharetxt = [
'Sun Web Page: ',
'Check out this page on sun.com: ',
'Email this page to a friend',
'See who links to this page on Technorati',
'Bookmark this page in del.icio.us',
'Submit this page to Digg',
'Submit this page to Slashdot',
'Show available feeds'
]


// END "SHARE THIS PAGE" STUFF
// ############################################################################
