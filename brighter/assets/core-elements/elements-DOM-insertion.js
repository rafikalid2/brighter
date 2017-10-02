$$.plugin({
	/**
	 * .append(HTMLElement, ...)
	 * .append(ArryLike, ...)
	 * .append(this => this.fx(), ...)	// append elements based on current ones in the collection
	 * .append('div')
	 * .append('div#id...')
	 *
	 * .all.append		// append clones to each element
	 */
	append		: function(){
		// get elements
			var list	= _getElementsFrom.apply(this, arguments),
				i,
				c		= list.length;
		// insert theme
			if(c){
				// append clones to all tags
				if(this._all){
					this.eachTag(ele => {
						for(i = 0; i < c; ++i)
							ele.appendChild(_cloneHTMLNode(list[i], true));
					});
				}
				// append to first tag
				else{
					ele	= this.getFirstTag();
					if(ele){
						for(i = 0; i < c; ++i)
							ele.appendChild(list[i]);
					}
				}
			}
		return this;
	},
	/**
	 * appendTo(HTMLElement,...)
	 * // for those, the first tag will be selected
	 * appendTo($$Element)
	 * appendTo(jQueryElement)
	 * appendTo(ArrayLike)
	 * appendTo(selector)
	 *
	 * all.appendTo(...)		// append clones to each element
	 */
	appendTo	: function(){
		var list	= _argsToBrighterList.call(this, arguments);
		var parent;
		if(list.length){
			// make copies and add to each parent
			if(this._all){
				$$prototype.eachTag.call(list, parent => {
					this.each(ele => {
						parent.appendChild(_cloneHTMLNode(ele, true));
					});
				});
			}
			// add to first parent
			else{
				parent = $$prototype.getFirstTag.call(list);
				if(parent){
					this.each(ele => {
						parent.appendChild(ele);
					});
				}
			}
		}
		return this;
	}, //TODO
	/**
	 *
	 * all.prepend		// clone and insert copie to each element
	 */
	prepend		: function(){
		// get elements
			var list	= _getElementsFrom.apply(this, arguments),
				i,
				c		= list.length;
		// insert theme
			if(c){
				// append clones to all tags
				if(this._all){
					this.eachTag(ele => {
						for(i = 0; i < c; ++i)
							ele.appendChild(_cloneHTMLNode(list[i], true));
					});
				}
				// append to first tag
				else{
					ele	= this.getFirstTag();
					if(ele){
						for(i = 0; i < c; ++i)
							ele.appendChild(list[i]);
					}
				}
			}
		return this;
	}, //TODO
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


/**
 * get elements from expressions
 * ._getElementsFrom(HTMLElement, ...)
 * ._getElementsFrom(ArryLike, ...)
 * ._getElementsFrom(this => this.fx(), ...)	// elements based on current ones in the collection
 * ._getElementsFrom('div')
 * ._getElementsFrom('div#id...')
 */
function _getElementsFrom(){
	var result	= [], ele, rs;
	for(var i = 0, c = arguments.length; i < c; ++i){
		ele	= arguments[i];
		if(ele){
			if(typeof ele == 'string') // create element
				result.push(_createElement(ele));
			else if(typeof ele == 'function'){
				rs	= _argsToBrighterList(ele(this));
				if(rs.length)
					Array.prototype.push.apply(result, rs);
			}
			else if(ele.nodeType)
				result.push(ele);
			else if(ele.hasOwnProperty('length')){
				rs	= _argsToBrighterList(ele);
				if(rs.length)
					Array.prototype.push.apply(result, rs);
			}
			else
				throw new $$.errors.illegalArgument(ele);
		}
	}
	return result;
}


/**
 * append, prepend
 */