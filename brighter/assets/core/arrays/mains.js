/**
 * Arrays utils
 * add: pull(obj, ...)
 */

	var $$Arrays = ArrayUtils.prototype;
	/**
	 * create new Array or transforme an existing one
	 */
		$$.array	= ArrayUtils;
	 	function ArrayUtils(array){
	 		if(!array)
				array	= [];
			array.__proto__	= $$Arrays;
	 	}

 	classExtend(Array, ArrayUtils);// make array utils as a subclass

(function(){
	const _ArrayPrototype	= Array.prototype;
/////////////
// methods //
/////////////
	(obj => {
		for(var i in obj)
			Object.defineProperty($$Arrays, i, {
				value	: obj[i]
			});
	})({
		// dupplicate array
		duplicate	: function(){return this.slice(0);},
		// find first occurrence that matches a condition, or undefined
		first		: function(condition){
			return condition ? _ArrayPrototype.find.call(this, condition) : this[0];
		},
		// find the last element that matches a condition, or undefined
		last		: function(condition){
			if(condition)
				for(var i = this.length - 1 ; i >= 0; --i){
					if(condition.call(this[i], this[i], i))
						return this[i];
				}
			else return this[this.length - 1];
		},
		// contains: has(ele1, ele2, ...)
		contains	: function(){
			for(var i = 0, c = arguments.length ; i < c; ++i){
				if(this.indexOf(arguments[i]) == -1)
					return false;
			}
			return true;
		},
		// forEach
		each		:  function(callBack){
			for(var i=0, c = this.length; i < c; ++i){
				if(callBack.call(this[i], this[i], i) === false)
					break;
			}
			return this;
		},
		// remove all items
		clear		: function(){
			this.splice(0);
			return this;
		},
		/////////////
		// filters //
		/////////////
		/**
		 * eq(index) get element from position
		 * not.eq(index) get all elements excluding the element in index
		 */
		eq			: function(index){
			var result;
			if(!this.length)
				result	= [];
			else if(this._not)
				result	= this.slice(0).splice(index, 1);
			else
		 		result	= [this[index < 0 ? this.length + index : index]];
			result.__proto__ = this.__proto__;
			return result;
	 	}
	});

//////////////
// wrappers //
//////////////
	['push', 'unshift', 'reverse', 'sort']
		.forEach(function(ele){
			Object.defineProperty($$Arrays, ele, {
				value	: function(){
					_ArrayPrototype[ele].apply(this, arguments);
					return this;
				}
			});
		});
	['concat', 'slice', 'splice', 'filter', 'map']
		.forEach(function(ele){
			Object.defineProperty($$Arrays, ele, {
				value	: function(){
					var lst			= _ArrayPrototype[ele].apply(this, arguments);
					lst.__proto__	= this.__proto__;
					return lst;
				}
			});
		});

///////////////
// operators //
///////////////
	(obj => {
		for(var i in obj)
			Object.defineProperty($$Arrays, i, {
				get		: obj[i]
			});
	})({
		// reverse the meaning of the successive fx
		not		: function(){
			_definedOpProp(this, '_not', !this._not);
			return this;
		},
		// or.findAll(selector1, selector2, ...)	: use the first selector that matches only
		or		: function(){
			_definedOpProp(this, '_orV', true);
			return this;
		},
		// read the current value of "or", and set it to false
		_or		: function(){
			var result	= this._orV;
			_definedOpProp(this, '_orV', false);
			return result;
		}
	});
	function _definedOpProp(obj, prop, value){
		Object.defineProperty(obj, prop,{
			value		: value,
			writable	: true,
			enumerable	: false
		});
	}

///////////
// alias //
///////////
	Object.defineProperties($$Arrays, {
		forEach	: $$Arrays.each,
		add		: $$Arrays.push
	});


})();