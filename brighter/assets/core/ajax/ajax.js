
const AJAX_REF	= Symbol('ajax Reference');

$$[AJAX_REF]	= {}; // store ajax data

$$.plugin(true, {
	ajax	: {
		// on added, make changes on request
		onAdd	: function(cb){
			if(cb){
				$$.assertFunction(cb);
				$$[AJAX_REF].onAdd	= cb;
				return this;
			}
			return $$[AJAX_REF].onAdd;
		},
		// Abort all requests
		abortAll: function(){},
		// abort requests
		abort	: function(groups){
			if(typeof groups == 'function') $$.ajax.on('abort', groups);
			else $$.ajax.trigger('abort', groups);
		},
	}
});

(function(){
	var _ajax	= {};
	// add methodes
	(m => {
		for(var i in m)
			Object.defineProperty(_ajax, )
	})
	Object.defineProperties(_ajax, {
		// 
		onAdd	: {
			value	: function(cb){}
		}
	});


	// add interface
	$$.plugin(true, {
		ajax	: _ajax
	});
})();