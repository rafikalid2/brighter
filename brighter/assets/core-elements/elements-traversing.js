$$.plugin({
	/**
	 * immediately following subling elements in the DOM
	 * .next(filterSelector)
	 * .next(filterFunction)
	 * .next(HTMLElement)				// return this element if is the next element
	 * .next(ArrayLikeOfHTMLElements)	// return elements that are next
	 * 
	 * .not.next(selector)			// inverse the meaning of the selector
	 * .all.next					// get all next elements
	 * .not.all.next, all.not.next
	 */
	next		: function(selector){}, //TODO
	/**
	 * get next elements until somme selected one
	 * nextUntil(selector)
	 * nextUntil(function)	// until this function returns false
	 * nextUntil(HTMLElement)
	 * nextUntil(ArrayLikeOfHTMLElements)	// $$Object, jQueryObject, list, ...
	 *
	 * .all.nextUntil		// include selected element
	 *
	 * .not.nextUntil		// get elements others than selected ones (after selected ones)
	 * .not.all.nextUntil
	 */
	nextUntil	: function(selector){}, //TODO
	/**
	 * immediately prev elements in the DOM
	 * .prev(filterSelector)
	 * .prev(filterFunction)
	 * .prev(HTMLElement)				// return this element if is the prev element
	 * .prev(ArrayLikeOfHTMLElements)	// return elements that are prev
	 * .not.prev(selector)			// inverse the meaning of the selector
	 * .all.prev					// get all prev elements
	 * .not.all.prev, all.not.prev
	 */
	prev		: function(selector){}, //TODO
	/**
	 * get next elements until somme selected one
	 * prevUntil(selector)
	 * prevUntil(function)	// until this function returns false
	 * prevUntil(HTMLElement)
	 * prevUntil(ArrayLikeOfHTMLElements)	// $$Object, jQueryObject, list, ...
	 *
	 * .all.prevUntil		// include selected element
	 *
	 * .not.prevUntil		// get elements others than selected ones (before selected ones)
	 */
	prevUntil	: function(selector){}, //TODO
	/**
	 * get siblings elements
	 * siblings(selector)
	 * siblings(function)
	 * siblings(HTMLElement)
	 * siblings(ArrayLikeOfHTMLElements)	// $$Object, jQueryObject, list, ...
	 *
	 * .all.siblings		// include current element
	 */
	siblings	: function(selector){}, //TODO
	/**
	 * get siblings elements until somme selected one in each direction
	 * siblingsUntil(selector)
	 * siblingsUntil(function)		// until this function returns false in the two directions
	 * siblingsUntil(HTMLElement)
	 * siblingsUntil(ArrayLikeOfHTMLElements)	// $$Object, jQueryObject, list, ...
	 *
	 * .all.siblingsUntil		// include selected element
	 *
	 * .not.siblingsUntil		// get elements others than selected ones and the current element
	 */
	siblingsUntil	: function(selector){}, //TODO
	/**
	 * .find(selector)		: select elements that has somme childs
	 * .find(ArrayLike)		: Array, $$Object, HTMLElements or even jQuery object
	 * .all.find			: equivalent to findAll
	 */
	find		: function(selector){}, //TODO
	/**
	 * findAll
	 * .findAll(selector)		: select elements that has somme childs
	 * .findAll(ArrayLike)		: Array, $$Object, HTMLElements or even jQuery object
	 */
	findAll		: function(selector){} //TODO
});