(function(){
	  /////////////////////////////////////
	 // 		params & consts			//
	/////////////////////////////////////
	const OPTIONS_REF	= Symbol('option refrence');

	  /////////////////////////////////////
	 // 		Core methods			//
	/////////////////////////////////////
	class XHR extends Promise{
		// promise
			then(cb){ var a = super.then(cb); a[OPTIONS_REF]= this[OPTIONS_REF]; return a;}
			catch(cb){ var a = super.catch(cb); a[OPTIONS_REF]= this[OPTIONS_REF]; return a;}
			finally(cb){ var a = super.finally(cb); a[OPTIONS_REF]= this[OPTIONS_REF]; return a;}
		// options
			/** URI */
			url(url, decode){
				if(url){
					try{
						$$.assert(this.status == -1, 'Could not change URI. Request in progress');
						url	= new URL(
							$$.toAbsURL(typeof url == 'string' ? url : url.href || url.url || url.uri || '')
						);
						this[OPTIONS_REF].url	= url;
						if(decode !== false)
							_decodeInnerURL(this); // decode inner URL
					}catch(err){
						this.abort(err);
						throw err;
					}
					return this;
				} else {
					return this[OPTIONS_REF].url;
				}
			}
			/** modify native xhr */
			xhr(cb){
				$$.assertFunction(cb);
				this[OPTIONS_REF].xhrCb	= cb;
				return this;
			}
			/** urlDecoder */
			urlDecoder(cb){
				if(cb){
					this[OPTIONS_REF].urlDecoder	= cb;
					_decodeInnerURL(this); // decode inner URL
					return this;
				} else {
					return this[OPTIONS_REF].urlDecoder || $$.ajax.urlDecoder();
				}
			}
			/**
			 * timeout in the lazy mode or timeout callBack
			 * Example: lazyTimeout(3000)
			 * Example: lazyTimeout(xhr => {})
			 */
			lazyTimeout(ms){
				if(arguments.length === 0) return this[OPTIONS_REF].lazyTimeout;
				else if(typeof ms == 'function') this.on('lazyTimeout', ms);
				else if(typeof ms == 'number') this[OPTIONS_REF].lazyTimeout = ms;
				else throw new Error('Uncorrect lazyTimeout argument');
				return this;
			}
			/**
			 * .param()					// get all GET params
			 * .param('name')			// get param value
			 * .param('name', value)	// set URL param
			 * .param('name', [value])	// set URL multiple params
			 * .param({name:value})		// set those params
			 */
			param(a, b){
				var url		= this[OPTIONS_REF].url,
				searchParams= url.searchParams,
				result		= this,
				ele,
				key;

				// .param('name'), .param('name', value), .param('name', [value])
				if(typeof a == 'string'){
					if(b)	_addParams(a, b);
					else{
						result	= searchParams.getAll(a);
						if(result.length <= 1)
							result	= result[0];
					}
				}
				// .param()
				else if(!a){
					result	= {};
					searchParams.forEach((vlue, key) => {
						ele	= result[key];
						if(ele){
							if(Array.isArray(ele)) ele.push(vlue);
							else result[key]	= [ele, vlue];
						}else{
							result[key]	= vlue;
						}
					});
				}
				// .param({name:value})
				else if($$.isPlainObj(a)){
					url.search	= ''; // remove all entries
					for(key in a)
						_addParams(key, a[key]);
				}
				else throw new Error('Uncorrect parameter: ' + a);

				return result;

				function _addParams(){
					var i, c;
					if(Array.isArray(b)){
						for(i = 0, c = b.length; i < c; ++i)
							searchParams.set(a, b[i]);
					}
					else
						searchParams.set(a, b);
				}
			}
			/** */
	}
	  /////////////////////////////////////
	 // 		  copy params			//
	/////////////////////////////////////
	[
		/** 
		 * Execute request only once
		 * Example: once(true)
		 */
		'once',
		/** 
		 * Waiting before sending request
		 * Example: wait(2000) // waiting 2s
		 */
		'wait',
		/**
		 * Group ajax calls, could be called only once
		 * Example: groupBy(group1.subGroup group2.subGroup2)
		 */
		'groupBy',
		/**
		 * Add this request to a serial queu
		 * Example: lazy('myGroup')
		 */
		'lazy',
		/**
		 * POST Data
		 */
		'data',
		/** */
		'dataType',
		/** */
		'dataCharset',
		'accepts',
		/** force de navigator to reload the data from this url */
		'cache'
	].forEach(function(fx){
		XHR.prototype[fx] = function(param){
			if(arguments.length){
				this[OPTIONS_REF][fx] = param;
				return this;
			} else {
				return this[OPTIONS_REF][fx];
			}
		};
	});
	  /////////////////////////////////////
	 // 	Add event manager			//
	/////////////////////////////////////
	$$.addEventManager(XHR.prototype);

	  /////////////////////////////////////
	 // 	Interface methods			//
	/////////////////////////////////////
	$$.plugin(true, {
		// pricipal calls
			get			: _makeAjax('GET'),
			post		: _makeAjax('POST'),
			delete		: _makeAjax('DELETE'),
			head		: _makeAjax('HEAD'),
		// specified calls
			getJSON		: _makeAjax('GET', params => {params.contentType = 'json'}),
			getXML		: _makeAjax('GET', params => {params.contentType = 'xml'}),
		// GET once
		// get url only once, and store parsed response in the cache
			getOnce		: _makeAjax('GET', params => {params.once = true}),
			getJSONOnce	: _makeAjax('GET', params => {params.once = true; params.contentType = 'json'}),
			getXMLOnce	: _makeAjax('GET', params => {params.once = true; params.contentType = 'xml'})
	});

	function _makeAjax(type, optionsCb){
		return function(options){
			var i;
			// finalize options
			if(!options)	options	= {};
			if(optionsCb)	optionsCb(options);
			// execute request
			p = new XHR((resolve, reject) => {
				// if has Error
					if(this.err) reject(this.err);
			});
			p[OPTIONS_REF]	= {};
			// add missing options
			try{
				for( i in options ){
					if(Reflect.hasOwnProperty(p, i))
						p[i](options[i]);
					else throw new Error('Unknown option: ' + i);
				}
			} catch(err) {
				p.err = err;
			}
			return p;
		};
	}
	

	  /////////////////////////////////////
	 // 		Private methods			//
	/////////////////////////////////////
	function _decodeInnerURL(xhr){
		var decoder, url, i, len;
		decoder	= xhr.urlDecoder();
		if(decoder)
			try{
				url	= xhr.url().href;
				if(typeof decoder == 'function')
					xhr.url( decoder(url), false );
				else if(Array.isArray(decoder)){
					for(i=0, len = decoder.length; i<len; ++i){
						if(decoder[i].regex.test(url)){
							xhr.url( decoder[i].decoder(url), false );
							break;
						}
					}
				}
				else throw 'Uncorrect decoder';
			}catch(err){
				throw new Error('URL Decoder Fails: ' + (err.message || err));
			}
	}






// end.
});