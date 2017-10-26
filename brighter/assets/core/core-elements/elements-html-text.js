$$.plugin({
	/**
	 *  html()					: get the HTML of the first element
	 *  .all.html()				: get the HTML of all elements inside a list
	 *  html('text')			: set the HTML of the first element
	 *  all.html('text')		: set the HTML of all elements
	 */
	html		: function(html){
		return _elementsAttr.call(this, 'innerHTML', html);
	},
	/**
	 *  outerHTML()				: get the outerHTML of the first element
	 *  .all.outerHTML()		: get the outerHTML of all elements inside a list
	 *  outerHTML('text')		: set the outerHTML of the first element
	 *  all.outerHTML('text')	: set the outerHTML of all elements
	 */
	outerHTML	: function(html){
		return _elementsAttr.call(this, 'outerHTML', html);
	},
	/**
	 *  text()					: get the text of the first element
	 *  .all.text()				: get the text of all elements inside a list
	 *  text('text')			: set the text of the first element
	 *  all.text('text')		: set the text of all elements
	 */
	text		: function(text){
		return _elementsAttr.call(this, 'text', text);
	},
});

