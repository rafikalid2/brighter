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
		// is deep
			if(typeof obj == 'boolean'){
				deep	= obj;
				obj	= arguments[1];
			}else{
				deep	= false;
			}
		// clone
			return cloner[deep ? 'deep' : 'shallow'].copy(obj);
	}
});