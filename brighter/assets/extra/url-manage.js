/**
 * convert to abs url
 */

$$.plugin(true, {
	// convert to absolute URL
		toAbsURL	: function(url){
			$$.assertArg(typeof url == 'string', 'need string as argument');

			try{
				url	= url.trim();
				if(!/^(?:[\w-]+:\/\/|data:)/.test(url))
					url = $$.baseURL + url;
			}catch(e){
				throw new $$.err.illegalArgument('incorrect URL: ' + url, e.message);
			}
			return url;
		},
		isValidURL	: function(url){
			return (typeof url == 'string') && !/^[\w-]+:\/\/[\w-]+(?:\.[\w-]+)+(?:\:\d+)?\//.test(url);
		}
});

/**
 * base URL
 */
$$.plugin(true, 'baseURL', {
	get	: function(){
		var url	= $$.find('base').attr('href') || document.location.href;
		var reg;
		if(url){
			if(!/^[\w-]+:\/\//.test(url)){
				$$.error('BASE-URL', 'the base URL is not absolute: [' + url + '], http added.');
				url	= 'http://' + url;
			}
			reg	= url.match(/^([\w-]+:\/\/\/?[^\/]+(?:\/.*\/)?)[^\/]*/);
			if(reg)	url	= reg[1];
			else	$$.error('BASE-URL', 'Could not get base url from: ' + url);
		}else{
			$$.error('BASE-URL', 'Could not be found.');
		}
		return url;
	}
});