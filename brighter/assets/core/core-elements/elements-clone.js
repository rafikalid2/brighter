$$.plugin({
	/**
	 * .clone()		clone object deeply and with data events
	 * .clone(boolean) // all options to this boolean value
	 * .clone({
	 * 		events	: boolean, // default true
	 * 		data	: true, false, 'deep', // default true
	 * })
	 */
	clone	: function(options){
		this.map(ele => _cloneHTMLNode(ele, options));
	}
});

/**
 * clonse HTML element
 * options	: boolean all options to true or false
 * options {
 * 		events	: true|false
 * 		data	: true|false|'deep'
 * }
 */
function _cloneHTMLNode(element, options){
	// clone node deeply
		element	= element.cloneNode(true);
	//TODO clone events and data
	// return
		return element;
}