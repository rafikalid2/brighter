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
		return cloner.shallow.copy(obj);
	},
	deepClone: function(obj){
		return cloner.deep.copy(obj);
	}
});