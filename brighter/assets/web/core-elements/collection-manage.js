

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

	/**
	 * add elements to the collection
	 * push(HTMLElement, ...)
	 * push(ArrayLike, ...)		// brighterObject, jQueryObject, Array, ...	
	 * push(this => this.fx(), ...)	// add new elements to the list based on the current one,
	 * 							example: $$elements.push(ele=> ele.parent(), ele => ele.next('b'))	// add parents and next 'b' to the list
	 */

const _ArrayPrototype	= Array.prototype;

///////////////////
// unshift, push //
///////////////////
['push', 'unshift'].each(function(fx){
	$$.plugin(fx, {
		value	: function(ele){
			// common usecases fast add
			var lst;
			if(ele && arguments.length == 1){
				// HTML or SVG Element
				if(ele.nodeType){
					if(!this.has(ele)) _ArrayPrototype[fx].call(this, ele);
					return this;
				}
				// brighter or array like
				else if('length' in ele){
					if(ele.length)
						lst	= _ArrayPrototype.filter.call(ele, e => e.nodeType && !this.has(e));
					else return this;
				}
			}
			// all args add
			if(!lst)
				lst	= _argsToBrighterList.call(this, arguments).filter(e => !this.has(e));
			if(lst.length)
				_ArrayPrototype[fx].apply(this, lst);
			return this;
		}
	});
});

////////////
// others //
////////////
$$.plugin({
	/**
	 * concat(HTMLElemnt, ArrayLike, this => this.fx())
	 */
		concat	: function(){
			var lst	= _argsToBrighterList.call(this, arguments)
				// filter already existing elements
				.filter(ele => !this.has(ele));
			lst		= _ArrayPrototype.concat.call(this, lst);
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
					tobeAdded = _ArrayPrototype.push.apply(tobeAdded, arguments);
					tobeAdded.splice(0,2);
					tobeAdded	= _argsToBrighterList.call(this,tobeAdded);
					// filter already existing elements
						tobeAdded	= tobeAdded.filter(ele => !this.has(ele));
				}
			// other args
				tobeAdded.splice(0, 0, strt, nbrRemove);
			// returned array
				var lst= _ArrayPrototype.splice.apply(this, tobeAdded);
				lst.__proto__ = $$prototype;
				return lst;
		},
	// each tag (tag only, exclude attributeNode, commentNode, textNode, ...)
		eachTag		: function(callBack){
			return this.each(ele => ele && ele.nodeType == 1 && callBack.call(ele, ele, i) === false);
		},
	/**
	 * map tags
	 * this is equivalent to Array.prototype.map, the difference is that this function returns
	 * "undefined" for non tag values
	 */
		mapTags		: function(callBack){
			return this.map(ele => (ele.nodeType == 1 ? callBack.call(ele, ele) : undefined))
		},
	/**
	 * $$map is similar to map, the difference is that $$map returns a $$Object ($$Object is a set and contains only HTMLElements)
	 */
		$$map		: function(callBack){
			var lst	= [], r, i, c;
			this.each(ele => {
				r	= callBack.call(ele, ele);
				if(Array.isArray(r)){
					for(i=0, c = r.length; i < c; ++i)
						if(r[i] && r[i].nodeType && lst.indexOf(r[i]) == -1)
							lst.push(r[i]);
				}else{
					if(r && r.nodeType && lst.indexOf(r) == -1)
						lst.push(r);
				}
			});
			lst.__proto__	= $$prototype;
			return lst;
		},
	/**
	 * every: check if all tags got the expression true
	 */
		everyTag	: function(checkFx){
			return this.every(ele => (ele.nodeType == 1 ? checkFx.call(ele, ele) : true));
		},
	/**
	 * check if at least one tag maches the condition
	 */
	 	someTag		: function(checkFx){
	 		return this.some(ele => (ele.nodeType == 1 ? checkFx.call(ele, ele) : false));
	 	}
});


///////////
// alias //
///////////
$$.plugin({
	add	: $$prototype.push
});