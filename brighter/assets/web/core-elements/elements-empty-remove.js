$$.plugin({
	/**
	 * empty each element
	 */
	empty		: function(filter){
		( filter ? this.filter(filter) : this ).each(node => {
			while(node.firstChild)
				node.removeChild(node.firstChild);
		});
		return this;
	},
	/**
	 * remove all elements from the DOM and destroy theme
	 */
	remove		: function(filter){
		( filter ? this.filter(filter) : this ).each(node => node.remove());
		return this;
	},
	/**
	 * detach all elements from the DOM
	 */
	detach		: function(filter){
		( filter ? this.filter(filter) : this ).each(node => node.remove());
		return this;
	},
	/**
	 * .replaceWidth(HTMLElement, ...)
	 * .replaceWidth(ArryLike, ...)
	 * .replaceWidth(this => this.fx())	// append elements based on current ones in the collection
	 * .replaceWidth('div')
	 * .replaceWidth('div#id...')
	 *
	 * .all.replaceWidth		// replace each node with clones
	 */
	replaceWith	: function(target){
		var $$frag;
		// function
		if(typeof arg	== 'function')
			this.each(ele => {
				if('appendChild' in ele){
					element	= arg.call(ele, ele);
					if(!element){}
					if(element.nodeType)
						addFx(ele, element);
					else{
						element	= ( element instanceof $$ ? element : $$(element) );
						element.each(a => { addFx(ele, a); });
					}
				}
			});
		// not function
		else{
			$$frag	= $$(arguments).toFragment;
			// replace with copies
				if(this._all){
					this.each(node => {
						if(node.parentNode)
							node.parentNode.replaceChild($$frag.clone(true)[0], node);
					});
				}
			// replace first tag
				else{
					ele	= this[0];
					if(ele && ele.parentNode)
						ele.parentNode.replaceChild($$frag[0], ele);
				}
		}
		return this;
	},
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