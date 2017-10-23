
$$.plugin(true, {
	/**
	 * serialize XML, avoid ciclics, serialise errors and other objects
	 */
	toXML	: function(obj){
		var result;
		//TODO
		// if($$.isPlainObj(obj))
		// 	result	= JSON.stringify(obj);//TODO make this better
		// else if(obj instanceof FormData){
		// 	//TODO
		// }
		// else if(obj instanceof HTMLFormElement){
		// 	//TODO
		// }
		// else if(obj instanceof $$){
		// 	//TODO
		// }
		// else{
		// 	//TODO
		// }
		return result;
	},
});