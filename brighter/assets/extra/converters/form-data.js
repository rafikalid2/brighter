
$$.plugin(true, {
	/**
	 * 
	 */
	toFormData	: function(obj){
		if(obj instanceof FormData)					{} // nothing to do
		else if(obj instanceof HTMLFormElement)		obj	= new FormData(obj);
		else if($$.isPlainObj(obj))	{
			//TODO
		}
		else{
			//TODO
		}
	}
});