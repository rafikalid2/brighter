/**
 * $$.assert(condition : boolean)
 * $$.assert(condition : boolean, errorMessage : string)
 * $$.assert(condition : boolean, errorMessage : Error)
 * $$.assert(condition : boolean, errorMessageType : string, errorMessage : string)
 */

$$.plugin(true, {
	// general purpose assert
		assert	: function(condition, a){
			var type;
			if(!condition){
				if(typeof a == 'function')
					a();
				else
					throw new Error(a || 'Assertion Fails');
			}
		},
	// argument assert
		assertArg: function(condition, msg, argValue){
			if(!condition)
				throw new $$.err.illegalArgument(msg, argValue);
		},
	// assert function
		assertFunction(arg, msg){
			if(typeof arg != 'function')
				throw new $$.err.illegalArgument(msg || 'the argument must be a function!');
		}
})