(function(){
	/**
	 * do deep operations on object
	 * @param {PlainObject, Array} [ob]
	 * @param {Function} [operation]
	 * @param {options} [options]
	 *        {String, List<String>, function}	options.childNode	// get the child node, default to all attributes
	 */
	$$.plugin(true, {
		deepOperation	: function(obj, operation, options){
			$$.assert(obj && (typeof obj == 'object'), 'Needs plain object or array');
			$$.assertFunction(operation, '2nd arg must be a callBack');

			if(!options)
				options	= {};

			//Depth-First algorithm
			// simulates operations for walking through tree using iteration
				var parentElement	= {
					node	: obj,
					next	: null
				};

				var children, i, len;
				var current	= parentElement,
					last	= current;
				var child, childNode;
				var avoidCycle	= new Set();

				while (current) {
					children = options.childNode ?  current.node[options.childNode] : Object.keys(current.node);
						for (i = 0, len = children.length; i < len; i++) {
							childNode	= children[i];
							if(avoidCycle.has(childNode)){} // cycle
							else {
								avoidCycle.add(childNode); // avoid cyclic

								child 		= {
									next	: null,
									node	: childNode;
								};
								//place new item at the tail of the list
								last.next	= child;
								last 		= child;

								// exec operation
									try{
										operation.call(childNode, childNode);
									}catch(e){
										$$.uncaughtError(e);
									}
							}
						}
					//removes this item from the linked list
					current = current.next;
				}
			return this;
		}
	});
})();