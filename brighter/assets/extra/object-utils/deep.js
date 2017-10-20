/**
 * do deep operations on object
 * @param {PlainObject, Array} [ob]
 * @param {Function} [operation]
 * @param {options} [options]
 *        {String, List<String>, function}	options.childNode	// get the child node, default to all attributes
 */

$$.obj.deep	= function(obj, operation, options){
	// control
		$$.assert(Array.isArray(obj) || $$.isPlainObj(obj), $$.err.illegalArgument, 'Needs plain object or array');

};

function _ObjDeepOperation(obj, operation, options){
	
}

/*
$$.obj.deep(obj, path, fxWathToDo)		// do this fx on each attribute
$$.obj.deep(obj, path, fxWathToDo, childAttr)		// do this fx, next is in "childAttr"
$$.obj.deep(obj, path, fxWathToDo, [childAttr, ..])		// do this fx on each attribute
$$.obj.deep(obj, path, fxWathToDo, fx)		// do this fx: get child attr




// in code:



 */