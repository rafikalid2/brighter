
// make it public
	$$.extend	= extend;
/**
 * this function will copy all elemetns content into the first element
 */
function extend(baseObj){
	// if(arguments.length < 2)
	// 	throw new Error('this function needs at least 2 arguments');
	throw new Error('not yeat implemented!')
}


function _extendObject(target, source){
	for(var i in source){
		if(source.hasOwnProperty(i))
			target[i]	= source[i];
	}
}