/**
 * defined properties inside an object
 *
 * $$.obj.define(obj, propertyName, propertyValue);
 * $$.obj.define(obj, {propertyName: propertyValue});
 */



$$.obj.define	= function(obj, arg1, arg2){
	assert(obj).exists('define: need the first argument');
	assert(arg1, 'Error with 2 argument')
		.exists()
		.or(
			a => a.isPlainObject(),
			a => a.isString()
					.and(arg2, 'Error with the 3 argument')
					.isPlainObject()
		);

	$$objDefine(obj, arg1, arg2);
};

function $$objDefine(obj, arg1, arg2){
	if(typeof arg1 == 'string')
		Object.defineProperty(obj, arg1, {
			value	: arg2
		});
	else{
		for(var i in arg1){
			Object.defineProperty(obj, i, {
				value	: arg1[i]
			});
		}
	}
}