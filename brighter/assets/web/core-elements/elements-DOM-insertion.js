(function(){
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
		append		: _appendPrepend((parent, ele) => parent.appendChild(ele)),
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
		appendTo	: _appendTo_prependTo((parent, ele) => parent.appendChild(ele)),
		/**
		 *
		 * all.prepend		// clone and insert copie to each element
		 */
		prepend		: _appendPrepend(_prepend),
		/**
		 *
		 * all.prependTo	// prepend clones
		 */
		prependTo	: _appendTo_prependTo(_prepend),
		/**
		 * .before(elementToInsert)
		 * .all.before		// insert clone before each element in the collection
		 */
		before		: _appendPrepend((targetElement, ele) => targetElement.insertAdjacentElement('beforebegin', ele)),
		/**
		 *
		 * after(elementsToInsert)
		 * .all.after		// insert clone before each element in the collection
		 */
		after		: _appendPrepend((targetElement, ele) => targetElement.insertAdjacentElement('afterend', ele)),
		/**
		 * insert after or before selected item
		 * insertBefore(HTMLElement)
		 * insertBefore(ArrayLike)
		 *
		 * all.insertAfter		// insert clones after
		 */
		insertAfter	: _appendTo_prependTo((targetElement, ele) => targetElement.insertAdjacentElement('afterend', ele)),
		/**
		 *
		 * all.insertBefore		// insert clones before
		 */
		insertBefore: _appendTo_prependTo((targetElement, ele) => targetElement.insertAdjacentElement('beforebegin', ele)),
		/**
		 * up element in the parent children list
		 */
		// up			: function(n){}, //TODO
		/**
		 * down element in the parent children list
		 */
		// down		: function(n){}, //TODO
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
					throw new $$.err.illegalArgument(ele);
			}
		}
		return result;
	}

	// append & prepend methods
	function _appendPrepend(addFx){
		return function(){
			// get elements
				var list	= _getElementsFrom.apply(this, arguments),
					c		= list.length,
					i, ele;
			// insert theme
				if(c){
					// append clones to all tags
					if(this._all){
						this.each(ele => {
							if('appendChild' in ele){
								for(i = 0; i < c; ++i)
									addFx(ele, _cloneHTMLNode(list[i], true));
							}
						});
					}
					// append to first tag
					else{
						ele	= this.some(e => 'appendChild' in e);
						if(ele){
							for(i = 0; i < c; ++i)
								addFx(ele, list[i]);
						}
					}
				}
			return this;
		}
	}

	// appendTo & prependTo
	function _appendTo_prependTo(addFx){
		return function(){
			var list	= _argsToBrighterList.call(this, arguments),
				parent;

			if(list.length){
				// make copies and add to each parent
				if(this._all){
					list.forEach(parent =>{
						if('appendChild' in parent)
							this.each(ele => addFx(parent, _cloneHTMLNode(ele, true)));
					});
				}
				// add to first parent
				else{
					parent = list.some(ele => 'appendChild' in ele);
					if(parent)
						this.each(ele => addFx(parent, ele));
				}
			}
			return this;
		}
	}
	/**
	 * prepend
	 */
 	function _prepend(parent, child){
		if(parent.firstChild)
			parent.insertBefore(child, parent.firstChild);
		else
			parent.appendChild(child);
 	}
})();