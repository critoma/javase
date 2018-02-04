function openPopup(url,name,width,height,resizable,scrollbars,menubar,toolbar,location,directories,status) {	
	popup = window.open(url, name, 'width=' + width + ',height=' + height + ',resizable=' + resizable + ',scrollbars=' + scrollbars
	+ ',menubar=' + menubar + ',toolbar=' + toolbar + ',location=' + location + ',directories=' + directories + ',status=' + status
	);
//popup.moveTo(((screen.availWidth-340)/2),((screen.availHeight-360)/2));
	popup.focus();
}