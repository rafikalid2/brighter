
$$.plugin(true, {
	/**
	 * serialize JSON, avoid ciclics, serialise errors and other objects
	 */
	toJSON	: function(obj){
		var result;
		if($$.isPlainObj(obj))
			result	= JSON.stringify(obj);//TODO make this better
		else if(obj instanceof FormData){
			//TODO
		}
		else if(obj instanceof HTMLFormElement){
			//TODO
		}
		else if(obj instanceof $$){
			//TODO
		}
		else{
			//TODO
		}
		return result;
	},
	/**
	 * serializer of sepecific object
	 */
	addJsonMapper	: function(){}, // TODO
});