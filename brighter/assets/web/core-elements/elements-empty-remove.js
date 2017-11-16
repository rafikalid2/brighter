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
	 * .replaceWidth(this => this.fx(), ...)	// append elements based on current ones in the collection
	 * .replaceWidth('div')
	 * .replaceWidth('div#id...')
	 *
	 * .all.replaceWidth		// replace each node with clones
	 */
	replaceWith	: function(target){
		var list	= _getElementsFrom.apply(this, arguments);
		if(list.length){
			// append to fragment
				var frag	= document.createDocumentFragment();
					ele;
				for(var i = 0, c = list.length; i < c; ++i)
					frag.appendChild(list[i]);
			// replace with copies
				if(this._all){
					this.each(node => {
						if(node.parentNode)
							node.parentNode.replaceChild(_cloneHTMLNode(frag, true), node);
					});
				}
			// replace first tag
				else{
					ele	= this[0];
					if(ele && ele.parentNode)
						ele.parentNode.replaceChild(frag, ele);
					// this.firstTag.before(frag).remove();
				}
		}
		return this;
	}, //TODO
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