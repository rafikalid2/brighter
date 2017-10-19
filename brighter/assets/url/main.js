/**
 * $$.url(url, params)
 * 			.toString()											// return compiled URL as string
 * 			.param()											// get all params as object
 * 			.param('key')										// get this param or undefined
 * 			.param('key', value)								// add/replace this param
 * 			.param({key:value})									// add/replace those params
 * 			.protocol()											// get protocol
 * 			.protocol(proto)									// replace protocol
 * 			.host()												// get host (www.example.com)
 * 			.host(host)											// replace host
 * 			.hash()												// get hash part
 * 			.hash(hash)											// set hash part
 * 			.hash({key:value})									// set hash part like URL params
 * 			.pathname()											// get path name
 * 			.pathname('path/to/x')								// set path starting from current folder
 * 			.pathname('/path/to/x')								// set path starting from root
 * 			.pathname('/{var1}/to/{var2}',{var1:, var2:})		// set path starting by current folder
 * 			.port()												// get port
 * 			.port(portValue)									// set port
 *
 * 			.password()
 *    		.username()
 * 
 * 			.search												// get Search value (?param1=vvv&param2=zzz)
 * 			.base												// get base url
 * 			
 * 		examples:
 * 			$$.url('http://example.com/{var1}/folder?c=2', {param1: value1, var1: 'hello'}).toString()		// http://example.com/hello/folder?c=2
 */
(function(){
	$$.url	= function(url, params){
		return new $$URL(url, params);
	};

	function $$URL(url, params){
		// replace vars inside the path
			if(params)
				pathVars(url, params);

		$$objDefine(this, '_url', new URL(url || $$.baseURL()));
	}

	/**
	 * get base url
	 */
	$$.plugin(true, 'baseURL', {
		get	: function(){
			return $$.url($$.find('base').attr('href') || document.location.href).base;
		}
	});

	// replace vars inside the path
		function pathVars(path, params){
			url.replace(/{[^}]+}/g, function(p){
				if(params[p] === undefined)
					throw new $$.err.missedArgument('could not found the argument "' + p + '"" inside the given list');
				return params[p];
			});
		}
})();