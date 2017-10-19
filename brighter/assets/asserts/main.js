/**
 * $$.assert(condition : boolean)
 * $$.assert(condition : boolean, errorMessage : string)
 * $$.assert(condition : boolean, errorMessage : Error)
 * $$.assert(condition : boolean, errorMessageType : string, errorMessage : string)
 */

$$.plugin(true, 'assert', {
	value	: function(condition, a, b){
		var type;
		if(!condition){
			if(a && (typeof a != 'string'))
				throw a;
			else{
				if(b === undefined){
					type	= a; // type
					a		= b; // message
				}
				throw type && $$.err[type] ? new $$.err[type](a) : new Error(a);
			}
		}
	}
});