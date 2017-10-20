/////
// Root functions
/////
$$.plugin(true, {
	/**
	 * $$.isForm(obj)
	 */
	// is form
		isForm	: function(obj){
			return true;
			//TODO
			// var cnd = (obj instanceof FormData)
			// 		|| (obj instanceof HTMLFormElement)
			// 		|| ( (obj instanceof $$) && obj._all ? obj[0] instanceof HTMLFormElement )

			// return this._not
		}
});
