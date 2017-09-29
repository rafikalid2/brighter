

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
	// add element to collection
		push	: _collectionManagerPush,
		add		: _collectionManagerPush,
	// unshift
		unshift : function(){
			// control
				var list = _argsToBrighterList(arguments);
			// unshift
				Array.prototype.unshift.apply(this, list);
			return this;
		},
	// concat
		concat	: function(){
			var lst	= this.concat(_argsToBrighterList(arguments));
			lst.__proto__ = $$prototype;
			return lst;
		},
	//slice
		slice	: function(){
			var lst	= Array.prototype.slice.apply(this, arguments);
			lst.__proto__ = $$prototype;
			return lst;
		},
	// splice
		splice	: function(strt, nbrRemove){
			// elements to be added
				var tobeAdded	= [];
				if(arguments.length > 2){
					tobeAdded = Array.prototype.push.apply(tobeAdded, arguments);
					tobeAdded.splice(0,2);
					tobeAdded	= _argsToBrighterList(tobeAdded);
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
			this.map(ele => (ele.nodeType == 1 ? callBack(ele) : undefined))
		}
});
// add element to collection
	function _collectionManagerPush(){
		// control
			var list = _argsToBrighterList(arguments);
		// add to list
			Array.prototype.push.apply(this, list);
		return this;
	}

// forEach
	function _collectionManagerEach(callBack){
		var i, c= this.length;
		for(i=0; i<c ; ++i){
			if(callBack(this[i], i) === false)
				break;
		}
		return this;
	}