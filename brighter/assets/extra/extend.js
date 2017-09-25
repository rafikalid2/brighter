
// make it public
// [target] $$.extend(target, obj1, ...)
// [target] $$.extend([deep], target, obj1, ...)
	$$.plugin({
		extend	: _extend
	}, true);
/**
 * this function will copy all elemetns content into the first element
 * this function is designed to be faster on arrays, normale on objects
 */
function _extend(){
	if(arguments.length < 2)
		throw new Error('this function needs at least 2 arguments');
	// args
		var deep			= false,
			target			= arguments[0],
			argLength		= arguments.length,
			i				= 1,
			obj, key;
		if(typeof target == 'boolean'){
			isDeep	= target;
			i	= 2;
			target	= arguments[1];
		}
	// control
		if(!target)
			throw new Error('Extend: incorrect target');
	// copy: deep == true
		if(deep){
			for( ; i<argLength; ++i){
				// deep == true
				if(deep){}
				// deep == false
				else
				if((obj = arguments[i]) != null){
					for(key in obj){

					}
				}
			}
		}
	// copy: deep == false
		else{
			// is Array: this code is faster than the normal one
				if(Array.isArray(target)){
					for( ; i<argLength; ++i){
						if((obj = arguments[i]) != null){
							// is array too
								if(Array.isArray(obj))
									target.push.apply(target, obj);
								else
									for(key in obj) target[key] = obj[key];
						}
					}
				}
			// sample object
				else{
					for( ; i<argLength; ++i){
						if((obj = arguments[i]) != null)
							for(key in obj) target[key] = obj[key];
					}
				}
		}

	return target;
}


function _extendObject(target, source){
	for(var i in source){
		if(source.hasOwnProperty(i))
			target[i]	= source[i];
	}
}