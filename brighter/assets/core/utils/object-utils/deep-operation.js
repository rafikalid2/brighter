/**
 * do deep operations on object
 * @param {PlainObject, Array} [ob]
 * @param {Function} [operation]
 * @param {options} [options]
 *        {String, List<String>, function}	options.childNode	// get the child node, default to all attributes
 */
$$.plugin(true, {
	deepOperation	: function(obj, operation, options){
		$$.assert(obj && (typeof obj == 'object'), 'Needs plain object or array');
		$$.assertFunction(operation, '2nd arg must be a callBack');
	}
});
$$.obj.deep	= function(obj, operation, options){
	// control
		$$.assertArg(Array.isArray(obj) || $$.isPlainObj(obj), 'Needs plain object or array');

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