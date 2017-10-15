// main assert
	$$.plugin(true, 'assert', {
		value	: _$$Assert
	});

	function _$$Assert(expression){}

//
// $$.assert(obj).not.null();
// $$.assert(path).match(/^(?:\w+\.)+\w+$/);
// 
// $$.assert(obj).exists(errMsg)
//
// $$.assert(eventName, 'Error with eventName').isString().match(/^(?:(?:[\w-]+\.)*[\w-]+\s*)+$/);
// $$.assert(listener, 'Error with listener').isFunction();
// 
// 
// conditions
// .whenExists. 	// when the variable !=undefined and !=null, do what is next, example: $$.assert(eventName, 'Error with eventName').whenExists.match(/^(?:(?:[\w-]+\.)*[\w-]+\s*)+$/);
// 
// 		.typeof(...)	// accepted types



/*
assert(arg1)
		.exists('define: need the seconde argument')
		.when
			.not.isPlainObject()
		.then
			.isString()
			.and(arg2)
			.isPlainObject();


assert(arg1)
		.exists('define: need the seconde argument')
		.or(
			a => a.isPlainObject(),
			a => a.isString()
				.and(arg2)
				.isPlainObject()
		);
			
 */