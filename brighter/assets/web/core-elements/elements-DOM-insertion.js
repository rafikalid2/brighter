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

	// append & prepend methods
	function _appendPrepend(addFx){
		return function(arg){
			var element, $$frag;
			// if is a function
				if(typeof arg	== 'function')
					this.each(ele => {
						if('appendChild' in ele){
							element	= arg.call(ele, ele);
							if(!element){}
							if(element.nodeType)
								addFx(ele, element);
							else{
								$$frag	= ( element instanceof $$ ? element : $$(element) ).toFragment;
								addFx(ele, $$frag[0]);
							}
						}
					});
			// insert theme
				else if(arguments.length){
					$$frag	= $$(arguments).toFragment;

					// append clones to all tags
					if(this._all){
						this.each(ele => {
							if('appendChild' in ele)
								addFx(ele, $$frag.clone(true));
						});
					}
					// append to first tag
					else{
						ele	= this.some(e => 'appendChild' in e);
						if(ele)
							addFx(ele, $$frag[0]);
					}
				}
			return this;
		}
	}

	// appendTo & prependTo
	function _appendTo_prependTo(addFx){
		return function(arg){
			var list, $$frag, parent;
			// if is a function
				if(typeof arg	== 'function')
					this.each(ele => {
						parent	= arg.call(ele, ele);
						if(!parent){}
						if('appendChild' in parent)
							addFx(parent, ele);
						else{
							parent	= (parent instanceof $$ ? parent : $$(parent) );
							parent.each(a => { addFx(a, ele); });
						}
					});
			//not function
				else{
					list	= $$(arguments);
					$$frag	= this.toFragment;
					if(list.length){
						// make copies and add to each parent
						if(this._all){
							list.forEach(parent =>{
								if('appendChild' in parent)
									addFx(parent, $$frag.clone(true)[0]);
							});
						}
						// add to first parent
						else{
							parent = list.some(ele => 'appendChild' in ele);
							if(parent)
								addFx(parent, $$frag[0]);
						}
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