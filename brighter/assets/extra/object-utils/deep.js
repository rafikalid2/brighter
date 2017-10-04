/**
 * do deep operations on object
 */

$$.obj.deep

/*
$$.obj.deep(fx)		// do this fx on each attribute

$$.obj.deep(pathFx, fx)	// pathFx: fx that return obj to iterat with, default is the current obj, fx is the operation
	example:
		$$.obj.deep((ele, next) => {for(var i in ele.items) next(ele.items[i]}, ele => {
 			....
 		});


 */