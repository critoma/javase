var e9Manager;
var e9;

if (e9 !== undefined) 
 {
   if (e9.displayAdFlag !== undefined)
    {
      if (e9.displayAdFlag === true)
	 e9.displayAd();
    }
   else 
      e9Manager.displayAdFromE9(e9); 
 } 
else 
 {
   e9Manager.fetchAds();
 }



