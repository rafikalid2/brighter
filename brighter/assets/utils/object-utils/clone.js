/**
 * clone an object (will have the same prototype)
 * clone(obj)			// clone object or array
 * clone(true, obj)		// clone deeeply the object
 */

// $$.plugin(true, 'clone', function(obj, deep){});

// function _objClone(obj, deep){
	
// }

$$.plugin(true, {
	clone	: function(obj){
		var deep;
		var args	= arguments;
		// is deep
			if(typeof obj == 'boolean'){
				deep	= obj;
				obj	= arguments[1];
				args	= Array.prototype.slice.call(arguments, 1);
			}else{
				deep	= false;
			}
		// clone
			cloner[deep ? 'deep' : 'shallow'].copy(object);
	}
});