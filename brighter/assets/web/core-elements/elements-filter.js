$$.plugin({
	/**
	 * filter(selector, selector2, ...)		// filter thos elements
	 * filter(function, fx2, ...)		// use this fx
	 * filter(HTMLElement)	// remove this HTML element from list
	 * filter([HTMLElement])// remove all those HTML Elements (Array or Array like)
	 * filter($$Object)		// remove all elements in this list in the collection
	 * filter(HTMLElement, ...)
	 * 
	 * not.filter			// inverse the result of the filter
	 */
		filter		: function(){
			var result;
			if(arguments.length){
				// compile filter arguments
				var cmple	= Array.prototype.map.call(arguments, function(arg){
					var filterFx;
					// filter function
						// function
						if(typeof arg == 'function')
							filterFx	= arg;
						// selector
						else if(typeof arg == 'string')
							filterFx	= (ele => (ele.nodeType == 1 && _ElementMatches(ele, arg)));
						// element
						else if(arg.nodeType)
							filterFx	= (ele => ele == arg);
						// brighter object or Array or Array like object
						else if('indexOf' in arg)
							filterFx	= (ele =>  arg.indexOf(ele) > -1);
						// jquery
						else if('index' in arg)
							filterFx	= (ele =>  arg.index(ele) > -1);
						else
							throw new $$.err.illegalArgument('insupported arguments: ', arg);
					return filterFx;
				});
				// filter function
					var filterFunc	= (ele => {
						return cmple.some(fx	=> fx(ele));
					});
				// apply filter fx
				result	= Array.prototype.filter.call(this, this._not ? (ele => !filterFunc(ele)) : filterFunc);
			} else {
				result	= this.slice(0); // returns copy
			}
			result.__proto__	= $$prototype;
			return result;
		},
	/**
	 * eq(index) get element from position
	 * not.eq(index) get all elements excluding the element in index
	 */
		eq			: function(index){
			var result;
			if(!this.length)
				result	= [];
			else if(this._not){
				result	= result.slice(0);
				result.splice(index, 1);
			}else
		 		result	= [this[index < 0 ? this.length + index : index]];
			result.__proto__ = $$prototype;
			return result;
	 	},

	//first tag
		getFirstTag	: function(){
			for(var i = 0, c = this.length; i<c; ++i){
				if(this[i].nodeType == 1)
					return this[i];
			}
			return undefined;
		},
	// last tag
		getLastTag	: function(){
			for(var i = this.length - 1; i>=0; --i){
				if(this[i].nodeType == 1)
					return this[i];
			}
			return undefined;
		},
	/**
	 * .has(selector)		: select elements that has somme childs
	 * .has(ArrayLike)		: Array, $$Object, HTMLElements or even jQuery object
	 * .has()
	 * .not.has	: inverse of has
	 */
		has			: function(selector){
			return this.filter(ele => ele.find(selector).length);
		},
	/**
	 * .first()		: first element
	 * .first(ele => boolean) returns the first element that matches condition or undifined
	 * .not.first()	: remove first element
	 */
		first		: function(condition){
			var result;
			// if function
				if(typeof condition == 'function'){
					for(var i = 0, c = this.length; i < c; ++i){
						if(condition(this[i])){
							if(this._not){
								result	= this.slice(0);
								result.splice(i, 1);
							}else{
								result	= this.eq(i);
							}
							break;
						}
					}
					// if condition is not meat, first will be undefined
				}
			// else
				else{
					result	= this._not ? this.slice(1) : this.eq(0);
				}
			return result || $$.emptyList;
		},
	/**
	 * .last()		: last element
	 * .last(ele => condition) // returns last element matches condition or undefined
	 * .not.last	: remove the last element
	 */
		last		: function(condition){
			var result;
			// if function
				if(typeof condition == 'function'){
					for(var i = this.length - 1; i >= 0; --i){
						if(condition(this[i])){
							if(this._not){
								result	= this.slice(0);
								result.splice(i, 1);
							}else{
								result	= this.eq(i);
							}
							break;
						}
					}
				}
			// else
				else{
					result	= this._not ? this.slice(0, -2) : this.eq(-1);
				}
			return result;
		}
});

/**
 * filter only tags
 * .tags	: keep only tags
 * .not.tags: filter tags
 */
	$$.plugin('tags',{
		get	: function(){
			return this.filter(ele => ele.nodeType == 1);// here, "not" is checked inside "filter"
		}
	});
/**
 * .fistTag			: first tag
 * .not.firstTag	: remove the first tag
 */
	$$.plugin('firstTag',{
		get: function(){ return this.first(ele => ele.nodeType == 1); }
	});
/**
 * .lastTag		: last tag
 * .not.lastTag	: remove the last tag
 */
	$$.plugin('lastTag',{
		get: function(){ return this.last(ele => ele.nodeType == 1); }
	});


/**
 * visible		// filter visible items
 * not.visible	// filter hidden items
 */
 	$$.plugin('visible',{
		get: function(){
			return (filterCondition => this.filter(this._not ? (ele => !filterCondition(ele)) : filterCondition))
					(ele => !!( ele.offsetWidth || ele.offsetHeight || ele.getClientRects().length ));
		}
	});