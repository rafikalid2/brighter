

// fonction hiritees et utiliser directement depuis la class Array
	// Array.prototype.every((ele, index) => true || false)		returns true if all elements passed the test
	// Array.prototype.some((ele, index) => true || false)		returns true if at least one element passes the test 
	// 
	// Array.prototype.map(ele => {return img})
	// Array.prototype.reduce()
	// Array.prototype.reduceRight()
	// 
	// Array.prototype.pop
	// Array.prototype.shift

$$.plugin({
	/**
	 * add elements to the collection
	 * push(HTMLElement, ...)
	 * push(ArrayLike, ...)		// brighterObject, jQueryObject, Array, ...	
	 * push(this => this.fx(), ...)	// add new elements to the list based on the current one,
	 * 							example: $$elements.push(ele=> ele.parent(), ele => ele.next('b'))	// add parents and next 'b' to the list
	 */
		push	: _collectionManagerPush,
		add		: _collectionManagerPush,
	/**
	 * unshift(HTMLElemnt, ArrayLike, this => this.fx())
	 */
		unshift : function(){
			// control
				var list = _argsToBrighterList.call(this, arguments);
			// filter already existing elements
				list	= list.filter(ele => this.indexOf(ele) == -1);
			// unshift
				if(list.length)
					Array.prototype.unshift.apply(this, list);
			return this;
		},
	/**
	 * concat(HTMLElemnt, ArrayLike, this => this.fx())
	 */
		concat	: function(){
			var lst	= _argsToBrighterList.call(this, arguments);
			// filter already existing elements
				lst	= lst.filter(ele => this.indexOf(ele) == -1);
			lst		= this.concat(lst);
			lst.__proto__ = $$prototype;
			return lst;
		},
	//slice
		slice	: function(){
			var lst	= Array.prototype.slice.apply(this, arguments);
			lst.__proto__ = $$prototype;
			return lst;
		},
	/**
	 * splice(index, elementToRemove)
	 * splice(index, elementToRemove, HTMLElement, ArrayLike, this => this.fx())
	 */
		splice	: function(strt, nbrRemove){
			// elements to be added
				var tobeAdded	= [];
				if(arguments.length > 2){
					tobeAdded = Array.prototype.push.apply(tobeAdded, arguments);
					tobeAdded.splice(0,2);
					tobeAdded	= _argsToBrighterList.call(this,tobeAdded);
					// filter already existing elements
						tobeAdded	= tobeAdded.filter(ele => this.indexOf(ele) == -1);
				}
			// other args
				tobeAdded.splice(0, 0, strt, nbrRemove);
			// returned array
				var lst= Array.prototype.splice.apply(this, tobeAdded);
				lst.__proto__ = $$prototype;
				return lst;
		},

	// duplicate collection
		duplicate	: function(){
			return this.slice(0);
		},
	// iterations
		forEach		: _collectionManagerEach,
		each		: _collectionManagerEach,
	// each tag (tag only, exclude attributeNode, commentNode, textNode, ...)
		eachTag		: function(callBack){
			var i, c= this.length, ele;
			for(i=0; i<c; ++i){
				ele	= this[i];
				if(
					ele
					&& ele.nodeType == 1
					&& callBack(ele, i) === false
				)
					break;
			}
			return this;
		},
	// sort
		sort		: function(){
			Array.prototype.sort.apply(this, arguments);
			return this;
		},
	// reverse
		reverse		: function(){
			Array.prototype.reverse.apply(this, arguments);
			return this;
		},
	/**
	 * map tags
	 * this is equivalent to Array.prototype.map, the difference is that this function returns
	 * "undefined" for non tag values
	 */
		mapTags		: function(callBack){
			return this.map(ele => (ele.nodeType == 1 ? callBack(ele) : undefined))
		},
	/**
	 * every: check if all tags got the expression true
	 */
		everyTag	: function(checkFx){
			return this.every(ele => (ele.nodeType == 1 ? checkFx(ele) : true));
		},
	/**
	 * check if at least one tag maches the condition
	 */
	 	someTag		: function(checkFx){
	 		return this.some(ele => (ele.nodeType == 1 ? checkFx(ele): false));
	 	}
});
// add element to collection
	function _collectionManagerPush(){
		// control
			var list = _argsToBrighterList.call(this, arguments);
		// filter already existing elements
			list	= list.filter(ele => this.indexOf(ele) == -1);
		// add to list
			if(list.length)
				Array.prototype.push.apply(this, list);
		return this;
	}

// forEach
	function _collectionManagerEach(callBack){
		for(var i = 0, c = this.length; i < c ; ++i){
			if(callBack(this[i], i) === false)
				break;
		}
		return this;
	}