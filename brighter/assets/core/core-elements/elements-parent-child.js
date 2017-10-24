/**
 * all those function will return a new collection
 * all elements other then tag ones will be filtered
 *
 * parent()			// get the emediate parent
 * parent(3)		// get the third parent
 * parent(selector)	// get the first parent that matches this selector
 * .all.parent		// get all parents until document.body or document.head, but not document.body and document.head
 */
(function(){
	$$.plugin({
		// get a new collection with parents of current elements
		parent				: function(){ return _getParent.call('parent'); },
		// get a new collection with offsetParents of current elments
		offsetParent		: function(){ return _getParent.call('offsetParent'); },

		/**
		 * get all parents until the selected one
		 * .parentsUntil(selector)
		 * .parentsUntil(function)	// stop when returns false
		 * .parentsUntil(HTMLElement)
		 * .parentsUntil(ArrayLike)
		 *
		 * .all.parentsUntil		// include the selected parent
		 * .not.parentsUntil	// get other parents
		 */
		parentsUntil		: function(){}, //TODO
		offsetParentsUntil	: function(){}, //TODO

		// get a new collection mapping current elements with theres children
		children			: function(filter){ return _getChildren.call(this, 'children', filter); },
		// get all child nodes (including text and comment nodes)
		childNodes			: _childNodes,
		contents			: _childNodes // alias
	});

	// child nodes
		function _childNodes(filter){ return _getChildren.call(this, 'childNodes', filter); }
	// select parents
		function _getParent(parentType){
			var collection		= [], parent;
			this.eachTag(ele=>{
				parent	= ele[parentType];
				if(parent && collection.indexOf(parent) == -1)
					collection.push(parent);
			});
			collection.__proto__	= $$prototype; // set as brighter element
			return collection;
		}
	// get children or childNodes
		function _getChildren(childType, filter){
			// get elements
				var collection		= [], children, child, i, c;
				this.eachTag(ele=>{
					children	= ele[childType];
					if(children){
						c= children.length
						for(i=0; i<c; ++i){
							child	= children.item(i);
							if(collection.indexOf(child) == -1)
								collection.push(child);
						}
					}
				});
			// set as brighter object
				collection.__proto__	= $$prototype;
			// filter by the selector
				if(filter)
					collection	= collection.filter(filter);
			return collection;
		}
})();