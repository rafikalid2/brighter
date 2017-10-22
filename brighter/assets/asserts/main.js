/**
 * $$.assert(condition : boolean)
 * $$.assert(condition : boolean, errorMessage : string)
 * $$.assert(condition : boolean, errorMessage : Error)
 * $$.assert(condition : boolean, errorMessageType : string, errorMessage : string)
 */

$$.plugin(true, 'assert', {
	value	: function(condition, a){
		var type;
		if(!condition){
			if(typeof a == 'function')
				throw new a(Array.prototype.slice.call(arguments, 2));
			else
				throw new Error(a || 'Assertion Fails');
		}
	}
});