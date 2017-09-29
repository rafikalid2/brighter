$$.plugin({
	// filter
		filter		: function(filterArg){
			var filtered;
			// function
			if(typeof filterArg == 'function')
				filtered	= Array.prototype.filter.call(this, filterArg);
			// selector
			else if(typeof filterArg == 'string')
				filtered	= Array.prototype.filter.call(this, ele => (ele.nodeType == 1 && _ElementMatches(ele, filterArg)));
			// incorrect argument
			else
				throw new Error('incorrect argument');
			filtered.__proto__	= $$prototype;
			return filtered;
		},
	// not
		not			: function(filterArg){
			var filtered		= Array.prototype.filter.call(this, ele => (ele.nodeType != 1 || !_ElementMatches(ele, filterArg)));
			filtered.__proto__	= $$prototype;
			return filtered;
		},
	// get element from position
		eq			: function(index){
	 		var result	= this.length? [this[index < 0 ? this.length + index : index]] : [];
			result.__proto__ = $$prototype;
			return result;
	 	},
	// first
		first		: function(){ return this.eq(0); },
	// last
		last		: function(){ return this.eq(-1); },
	//first tag
		getFirstTag	: function(){
			var i, c = this.length;
			for(i=0; i<c; ++i){
				if(this[i].nodeType == 1)
					return this[i];
			}
			return undefined;
		},
		firstTag	: function(){
			var ele			= this.getFirstTag();
			ele				= ele ? [ele] : [];
			ele.__proto__	= $$prototype;
			return ele;
		},
	// last tag
		getLastTag	: function(){
			var i;
			for(i = this.length - 1; i>=0; --i){
				if(this[i].nodeType == 1)
					return this[i];
			}
			return undefined;
		},
		lastTag		: function(){
			var ele			= this.getLastTag();
			ele				= ele ? [ele] : [];
			ele.__proto__	= $$prototype;
			return ele;
		}
});