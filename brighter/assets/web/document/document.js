Object.defineProperty($$.doc, 'isVisible', {
	get : function(){
		return (document.visibilityState||document.webkitVisibilityState||document.mozVisibilityState) == 'visible';
	}
})