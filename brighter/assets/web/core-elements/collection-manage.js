

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
['push', 'unshift'].forEach(function(fx){
	var pushFx	= _ArrayPrototype[fx];
	$$.plugin(fx, {
		value	: function(ele){
			var ele, i, c, j, cj;
			for(i = 0, c = arguments.length; i < c ; ++i){
				ele = arguments[i];
				if(!ele){}
				else if(typeof ele == 'string'){ // create element
					ele	= _createElements(ele);
					pushFx.apply(this, ele);
				} else if(ele.nodeType){		// html or svg element
					if(this.indexOf(ele) == -1)
						pushFx.call(this, ele);
				} else if(
					(ele instanceof $$)
					|| ele instanceof NodeList	// from querySelector
				){
					ele = _ArrayPrototype.filter.call(ele, a => this.indexOf(a) == -1);
					if(ele.length)
						pushFx.apply(this, ele);
				}
				else if(ele.length) // jQuery, array
					this[fx].apply(this, ele);
			}
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
		concat	: function(){ return this.duplicate().add(arguments); },
	/**
	 * splice(index, elementToRemove)
	 * splice(index, elementToRemove, HTMLElement, ArrayLike, this => this.fx())
	 */
		splice	: function(strt, nbrRemove){
			// elements to be added
				var tobeAdded;
				if(arguments.length > 2){
					tobeAdded	= $$(arguments)
					// filter already existing elements
						.filter(ele => this.indexOf(ele) == -1);
				}else{
					tobeAdded	= [];
				}
			// other args
				_ArrayPrototype.splice.call(tobeAdded, 0, 0, strt, nbrRemove);
			// returned array
				var lst = _ArrayPrototype.splice.apply(this, tobeAdded);
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