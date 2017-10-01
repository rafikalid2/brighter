$$.plugin({
	/**
	 * .append(HTMLElement, ...)
	 * .append(ArryLike, ...)
	 * .append(selector, ...)
	 * .append(this => this.fx(), ...)
	 *
	 * .all.append		// append clones to each element
	 */
	append		: function(arg){}, //TODO
	/**
	 * appendTo(HTMLElement)
	 * // for those, the first tag will be selected
	 * appendTo($$Element)
	 * appendTo(jQueryElement)
	 * appendTo(ArrayLike)
	 *
	 * all.appendTo		// append clones to each element
	 */
	appendTo	: function(parent){}, //TODO
	/**
	 *
	 * all.prepend		// clone and insert copie to each element
	 */
	prepend		: function(){}, //TODO
	/**
	 *
	 * all.prependTo	// prepend clones
	 */
	prependTo	: function(){}, //TODO
	/**
	 * .before(elementToInsert)
	 * .all.before		// insert clone before each element in the collection
	 */
	before		: function(){}, //TODO
	/**
	 *
	 * after(elementsToInsert)
	 * .all.after		// insert clone before each element in the collection
	 */
	after		: function(){}, //TODO
	/**
	 * insert after or before selected item
	 * insertBefore(HTMLElement)
	 * insertBefore(ArrayLike)
	 *
	 * all.insertAfter		// insert clones after
	 */
	insertAfter	: function(){}, //TODO
	/**
	 *
	 * all.insertBefore		// insert clones before
	 */
	insertBefore: function(){}, //TODO
	/**
	 * up element in the parent children list
	 */
	up			: function(n){}, //TODO
	/**
	 * down element in the parent children list
	 */
	down		: function(n){}, //TODO
	/**
	 * detach the elements from the DOM
	 */
	detach		: function(n){}, //TODO
	
});