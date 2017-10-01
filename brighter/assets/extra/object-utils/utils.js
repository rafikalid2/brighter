/**
 * does the target object is empty
 */
$$.obj.isEmpty	= function(obj){
	for(var i in obj)
		return true;
	return false;
};

/**
 * check if an element is a plain object, create with {} or new Object
 */
$$.obj.isPlain	= function(obj){}; //TODO
