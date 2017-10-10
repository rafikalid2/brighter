/**
 * Arrays utils
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

	Object.defineProperties($$Arrays, {
		// dupplicate array
			duplicate	: {
				value : function(){
					return this.slice(0);
				}
			},
		// find first occurrence that matches a condition, or undefined
			first		: {
				value: function(condition){
					for(var i=0, c = this.length; i < c; ++i)
						if(condition.call(this[i], this[i], i))
							return this[i];
				}
			},
		// find the last element that matches a condition, or undefined
			last		: {
				value: function(condition){
					for(var i = this.length - 1 ; i >= 0; --i)
						if(condition.call(this[i], this[i], i))
							return this[i];
				}
			},
		// contains
			has	: {
				value	: function(){
					for(var i = 0, c = arguments.length ; i < c; ++i){
						if(this.indexOf(arguments[i]) == -1)
							return false;
					}
					return true;
				}
			},
		// forEach
			forEach	: _arrayUtilEach,
			each	: _arrayUtilEach
	});


// wrappers
	['push', 'unshift', 'reverse', 'sort']
		.each(function(ele){
			Object.defineProperty($$Arrays[ele], ele, {
				value	: function(){
					Array.prototype[ele].apply(this, arguments);
					return this;
				}
			});
		});
// wrappers 2
	['concat', 'slice', 'splice', 'filter', 'map']
		.each(function(ele){
			Object.defineProperty($$Arrays[ele], ele, {
				value	: function(){
					var lst			= Array.prototype[ele].apply(this, arguments);
					lst.__proto__	= $$Arrays;
					return lst;
				}
			});
		});
// forEach
// break when callBack returns false
	function _arrayUtilEach(callBack){
		for(var i=0, c = this.length; i < c; ++i){
			if(callBack.call(this[i], this[i], i) === false)
				break;
		}
	}
	


//
//contains a set of utils for arrays

/*
removeAll(obj)	: remove all ocurrences of "ob" in the array
 */