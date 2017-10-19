
$$.plugin(true, {
	/**
	 * check if an element is a plain object, create with {} or new Object
	 */
	isPlainObj	: function(obj){
		return obj
			&& !Array.isArray(obj)
			&& obj.__proto__ == Object.prototype;
	},
	/**
	 * is empty
	 */
	isEmpty		: function(obj){
		if(Array.isArray(obj))
			return obj.length == 0;
		else{
			for(var i in obj)
				return false;
			return true;
		}
	}
});