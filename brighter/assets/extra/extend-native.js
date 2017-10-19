/**
 * extend object by using Object.defineProperty
 */

$$.plugin(true, {
	extendNative	: function(target, src){
		//TODO add asserts
		// extends
			return _extendNative(target, src);
	}
});

function _extendNative(target, src){
	var i;
	for(i in src)
		Object.defineProperty(target, i, {
			value	: src[i]
		});
	return target;
}