$$.plugin({
	/**
	 * empty each element
	 */
	empty		: function(filter){}, //TODO
	/**
	 * remove all elements from the DOM and destroy theme
	 */
	remove		: function(filter){}, //TODO
	/**
	 * detach all elements from the DOM
	 */
	detach		: function(filter){}, //TODO
	/**
	 * replace first tag element with given tags
	 * all.replaceWidth	: replace all elements with clones of given tags
	 */
	replaceWith	: function(target){}, //TODO
	/**
	 * remove parents and append elements to perents of parents
	 */
	unwrap		: function(filter){}, //TODO
	/**
	 * wrap first tag with given parent
	 * wrap('div')	// create div and wrap each tag with it
	 * wrap('div#id.cl1.cl2[attr1=value1][att2=value2]')
	 */
	wrap		: function(parent){}, //TODO
	wrapInner	: function(parent){} //TODO
});