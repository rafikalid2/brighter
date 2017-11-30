
(function(){
	const TITLE_LENGTH	= 20; // visible size of the title
	const TITLE_INTERVAL= 500;

	////////////////////////////////
	// is the document is visible //
	////////////////////////////////
	Object.defineProperty($$.doc, 'isVisible', {
		get : function(){
			return (document.visibilityState||document.webkitVisibilityState||document.mozVisibilityState) == 'visible';
		}
	});


	/**
	 * set/get document title
	 * add animation if the document title is long
	 */
	var _currentTitle;
	var _titleInterval;
	var _titleStart;
	Object.defineProperty($$.doc, 'title', {
		value : function(title){
			if(title){
				_currentTitle	= title;
				// animation
				if(_titleInterval) clearInterval(_titleInterval);
				// set value
				if(title.length < TITLE_LENGTH)
					document.title	= title;
				else{
					_titleStart	= 0;
					_titleInterval	= setInterval(() => {
						document.title = title.substr(_titleStart, TITLE_LENGTH);
						++_titleStart
						if(_titleStart > title.length)
							_titleStart	= 0;
					}, TITLE_INTERVAL);
				}
			} else {
				return document.title;
			}
		}
	});

	
})();
