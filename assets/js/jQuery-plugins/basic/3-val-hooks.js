(function($){
	$.valHooks.div	= {
		get	: function(ele){
			var tp	= ele.data('br-element');
			if(tp && tp.getValue)
				return tp.getValue();
		},
		set	: function(ele, value){
			var tp	= ele.data('br-element');
			if(tp && tp.setValue){
				tp.setValue(value);
				return true;
			}
		}
	};
})(jQuery);