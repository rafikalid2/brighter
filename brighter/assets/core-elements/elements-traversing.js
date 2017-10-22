$$.plugin({
	/**
	 * immediately following subling elements in the DOM
	 * .next(filterSelector)
	 * .next(filterFunction)
	 * .next(HTMLElement)				// return this element if is the next element
	 * .next(ArrayLikeOfHTMLElements)	// return elements that are next
	 * 
	 * .not.next(selector)			// inverse the meaning of the selector (coded inside the "filter" function)
	 * .all.next					// get all next elements
	 * .not.all.next, all.not.next
	 */
	next		: _sibling('nextSibling'),
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
	nextUntil	: _siblingUntil('nextSibling'), //TODO
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
	prev		: _sibling('previousSibling'), //TODO
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
	prevUntil	: _siblingUntil('previousSibling'), //TODO
	/**
	 * get siblings elements
	 * siblings(selector)
	 * siblings(function)
	 * siblings(HTMLElement)
	 * siblings(ArrayLikeOfHTMLElements)	// $$Object, jQueryObject, list, ...
	 *
	 * .all.siblings		// include current element
	 */
	siblings	: function(selector){
		return this.tags.$$map(ele => {
			return ele.parentNode && ele.parentNode.firstChild;
		}).next(selector);
	}, //TODO
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
	siblingsUntil	: function(selector){
		return this
				.prevUntil(selector) // previous elements
				.push(
					this.nextUntil(selector) // next elements
				);
	}, //TODO
	/**
	 * .find(selector)		: select elements that has somme childs
	 * .find(ArrayLike)		: Array, $$Object, HTMLElements or even jQuery object
	 * .all.find			: equivalent to findAll
	 */
	find		: function(selector){
		//TODO validate the selector
	}, //TODO
	/**
	 * findAll
	 * .findAll(selector)		: select elements that has somme childs
	 * .findAll(ArrayLike)		: Array, $$Object, HTMLElements or even jQuery object
	 */
	findAll		: function(selector){
		//TODO validate the selector
	} //TODO
});

/**
 * next	: nextSibling
 * prev	: previousSibling
 */
function _sibling(attr){
	return function(selector){
		var result, elements;
		// get data
			if(this._all)
				result	= this.tags.$$map(ele => {
					elements	= [];
					while(ele = ele[attr])
						elements.push(ele);
					return elements;
				});
			else
				resut	=  this.tags.$$map(ele => {
					return ele[attr];
				});
		// filter
			if(selector)
				result	= result.filter(selector);
		return result;
	};
}

/**
 * sibling until
 */
function _siblingUntil(attr){
	return function(selector){
		var result,
			elements,
			includeTargetElement	= this._all,
			returnsAfterTarget		= this._not; // return elements after targetElement instead of before it
		// if no selector, just execute "next"
			if(!selector)
				result	= this[attr	=== 'nextSibling' ? 'next' : 'prev']();
		// else
			else{
				result	= this.tags.$$map(
					returnsAfterTarget ?
					(ele => {
						elements	= [];
						// escape unwanted elements
							while((ele = ele[attr]) && !_extendedMatches(ele, selector)){}
						// if include the target element
							if(includeTargetElement && ele)
								elements.push(ele);
						// got other elements
							if(ele){
								ele = ele[attr];
								while(ele = ele[attr])
									elements.push(ele);
							}
						return elements;
					})
					:(ele => {
						elements	= [];
						while((ele = ele[attr]) && !_extendedMatches(ele, selector))
							elements.push(ele);
						// if include target element
						if(includeTargetElement && ele)
							elements.push(ele);
						return elements;
					})
				);
			}
		return result;
	}
}