/**
 * convert to abs url
 */

$$.plugin(true, {
	// convert to absolute URL
		toAbsURL	: function(url){
			try{
				url	= url.trim();
				if(!/^(?:[\w-]+:\/\/|data:)/.test(url))
					url = $$.baseURL + url;
			}catch(e){
				throw new $$.err.illegalArgument('incorrect URL: ' + url, e.message);
			}
		}
});

/**
 * base URL
 */
$$.plugin(true, 'baseURL', {
	get	: function(){
		//TODO
		return 'http://';
		// var baseURL	= $$.find('base').property('href');
	}
});