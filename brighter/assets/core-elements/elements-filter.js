$$.plugin({
	/**
	 * filter(selector)		// filter thos elements
	 * filter(function)		// use this fx
	 * filter(HTMLElement)	// remove this HTML element from list
	 * filter([HTMLElement])// remove all those HTML Elements (Array or Array like)
	 * filter($$Object)		// remove all elements in this list in the collection
	 * filter(HTMLElement, ...)
	 * 
	 * not.filter			// inverse the result of the filter
	 */
		filter		: function(filterArg){
			// filter function
				var filterFx;
				// function
				if(typeof filterArg == 'function')
					filterFx	= filterArg;
				// selector
				else if(typeof filterArg == 'string')
					filterFx	= (ele => (ele.nodeType == 1 && _ElementMatches(ele, filterArg)));
				// brighter object or Array or Array like object
				else{
					filterArg	= _argsToBrighterList.call(this, arguments);
					if(filterArg.length)
						filterFx	= (ele => filterArg.indexOf(ele) > -1);
					else
						throw new $$.errors.illegalArgument('insupported arguments: ', arguments);
				}
			// apply filter fx
				if(filterFx)
					filterArg	=  Array.prototype.filter.call(this, this._not ? (ele => !filterFx(ele)) : filterFx);
				else
					filterArg	= this.slice(0);
				filterArg.__proto__	= $$prototype;
			return filterArg;
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
 * .first		: first element
 * .not.first	: remove first element
 */
	$$.plugin('first', {
		get	: function(){
			return this._not ? this.slice(1) : this.eq(0);
		}
	});
/**
 * .last		: last element
 * .not.last	: remove the last element
 */
	$$.plugin('last', {
		get	: function(){
			return this._not ? this.slice(0, -1) : this.eq(-1);
		}
	});
/**
 * .fistTag			: first tag
 * .not.firstTag	: remove the first tag
 */
	$$.plugin('firstTag',{
		get: function(){
			var result;
			// all except first tag
			if(this._not){
				result	= this.slice(0);// copie
				for(var i = 0, c = result.length; i<c; ++i){
					if(result[i].nodeType == 1){
						result.splice(i, 1);
						break;
					}
				}
			}
			// first tag
			else{
				result	= this.getFirstTag();
				result	= result ? [result] : [];
			}
			result.__proto__	= $$prototype;
			return result;
		}
	});
/**
 * .lastTag		: last tag
 * .not.lastTag	: remove the last tag
 */
	$$.plugin('lastTag',{
		get: function(){
			var result;
			// not last tag
				if(this._not){
					result	= this.slice(0);
					for(var i = result.length - 1; i >= 0; --i){
						if(result[i].nodeType == 1){
							result.splice(i, 1);
							break;
						}
					}
				}
			// last tag
				else{
					result	= this.getLastTag();
					result	= result ? [result] : [];
				}
			result.__proto__	= $$prototype;
			return result;
		}
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