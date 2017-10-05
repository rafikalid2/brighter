/**
 * do deep operations on object
 */

$$.obj.deep	= function(obj, path, fxWathToDo, childAttr){
	// control
		$$.assert(obj).typeof('plainObject', 'array');
};

function _ObjDeepOperation(obj, pathArray, fxWathToDo, childAttr);

/*
$$.obj.deep(obj, path, fxWathToDo)		// do this fx on each attribute
$$.obj.deep(obj, path, fxWathToDo, childAttr)		// do this fx, next is in "childAttr"
$$.obj.deep(obj, path, fxWathToDo, [childAttr, ..])		// do this fx on each attribute
$$.obj.deep(obj, path, fxWathToDo, fx)		// do this fx: get child attr




// in code:



 */