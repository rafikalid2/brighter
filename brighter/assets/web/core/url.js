(function(){
	var _anc	= document.createElement('a');
	/** convert to absolute URL */
	$$.plugin(true, {
		// convert to absolute URL
			toAbsURL	: function(url){
				$$.assert(typeof url == 'string', 'Missing URI');
				_anc.setAttribute('href', url);
				return _anc.href;
			}
	});
})();