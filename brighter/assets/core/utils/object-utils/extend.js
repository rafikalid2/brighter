/**
 * $$.extend(parentFx, childFx)	// make prototype chain between two functions
 *
 * $$.extend(targetObj, src1, ....)
 * $$.extend(booleanDeep, targetObj, src1, ...)
 */

$$.plugin(true, {
	extend	: function(arg){
		var arg	= arguments[0],
			result;
		// prototype chain
		if(typeof arg == 'function')
			result	= classExtend.apply(this, arguments);
		// object extend
		else
			result	= _objExtend.apply(this, arguments);
		return result;
	},
	marge		: function(){
		return cloner.shallow.merge.apply(cloner.shallow, arguments);
	},
	deepMerge	: function(){
		return cloner.deep.merge.apply(cloner.deep, arguments);
	}
});

/**
 * this function simulate inheritance by linking prototypes
 */
function classExtend(parent, child){
	function surrogate(){
		this.constructor	= parent;
	}
	surrogate.prototype	= parent.prototype;

	var oldPrototype	= child.prototype;
	child.prototype		= new surrogate();
	if(oldPrototype){
		_objExtend(child.prototype, oldPrototype);
	}
	return child;
}

/**
 * extends objects
 */
function _objExtend(target){
	var deep;
	var args	= arguments;
	var initClonner;
	// is deep
		if(typeof target == 'boolean'){
			deep	= target;
			target	= arguments[1];
			args	= Array.prototype.slice.call(arguments, 1);
		}else{
			deep	= false;
		}
	// 
	// 
		initClonner	= cloner[deep ? 'deep' : 'shallow'];
		target	= initClonner.merge.apply(initClonner, args);
	
	// array
		// if(Array.isArray(target)){
		// 	for(i = argStrt; i < argLen; ++i){
		// 		arg	= arguments[i];
		// 		$$.assert(Array.isArray(arg), 'could not extend an array by an object.');
		// 		// deep copy
		// 		if(deep){
		// 			for(j=0, c = arg.length; j < c; ++j)
		// 				target.push( arg[j] && typeof arg[j] == 'object' ? $$.clone(arg[j]) : arg[j] );
		// 		}
		// 		// normal copy
		// 		else
		// 			Array.prototype.push.apply(target, arguments[i]);
		// 	}
		// }
	return target;
}
