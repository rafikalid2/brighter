
$$.plugin(true, {
	/**
	 * {key:value, key2: value2} => key=value&key2=value2
	 * form						 => form url encoded
	 * 
	 */
	toURLEncoded	: function(obj){
		var str = [];
		var i, k;
		// plain object
			if($$.isPlainObj(obj)){
				for(i in obj){
					k	= encodeURIComponent(i);
					if(Array.isArray(obj[i]))
						obj[i].forEach(u => { str.push( k + '=' + encodeURIComponent(u) ) });
					else
						str.push( k + '=' + encodeURIComponent(obj[i]) );
				}
			}
		// form
			else if(obj instanceof HTMLFormElement)
				$$(obj).formControls.each(ele => {
					str.push(encodeURIComponent(ele.name) + '=' + encodeURIComponent($$(ele).value()));
				});
		return str.join('&');
	}
});