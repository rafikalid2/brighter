/**
 * get/set elements value
 * 		get input.value
 * 		or use a hooks
 */
(function(){
	$$.plugin({
		/**
		 * value()					: get value of the first tag
		 * value(value)				: set value of the first tag
		 * .all.value()				: get values of all tags withing a list
		 * .all.value(value)		: set all tags values
		 */
		value			: _value,
		value			: _value // alias

		//TODO
		//defaultValue

		/**
		 * valueResolver()				: get the value resolver of the first tag
		 * valueResolver(resolver)		: set tht value resolver of the first tag
		 * all.valueResolver()			: get all value resolvers withing a list
		 * all.valueResolver(resolver)	: set the value resolver of all selected elements
		 */
		valueResolver	: _valueResolver
	});

	// get/set value
		function _value(value){
			var result;
			// set value
			if(value){}
			// get value
			else{}
			return result;
		}
	// set/get value resolver
		function _valueResolver(resolver){}
})();
