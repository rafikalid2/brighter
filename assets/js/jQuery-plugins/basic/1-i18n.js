(function($){
	$.i18n	= {
		get			: _getMessage,
		getLanguage	: _getLanguage
	};

	function _getMessage(key, params){
		var value;
		if($._i18nMsg){
			value	= $._i18nMsg[key];
			if(value && params)
				value = _replaceParams(value, params);
		}
		return value;
	}

	function _replaceParams(value, replaces){
		if(Array.isArray(value)){
			for(var i = 0; i < value.length; ++i)
				value[i]	= _replaceParams(value[i], params);
		}else if(replaces && (typeof value == 'string')){
			value = value.replace(/\$([a-zA-Z1-9_]+)/g, function(a,b){
				if(replaces.hasOwnProperty(b))
					return replaces[b];
				else
					return a;
			});
		}

		return value;
	}

	function _getLanguage(){
		return $._i18nMsg && $._i18nMsg.lang;
	}
})(jQuery);