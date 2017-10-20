/**
 * pourvoir grouper les appel ajax
 * se rappler de tous les appel ajax, voir par groupe
 */

(function(){
	// pricipal calls
		$$.get			= _makeAjax('GET');
		$$.post			= _makeAjax('POST');
		$$.delete		= _makeAjax('DELETE');
		$$.head			= _makeAjax('HEAD');
	// specified calls
		$$.getJSON		= _makeAjax('GET', options => {options.contentType = 'json'});
		$$.getXML		= _makeAjax('GET', options => {options.contentType = 'xml'});
	// GET once
	// get url only once, and store parsed response in the cache
		$$.getOnce		= _makeAjax('GET', options => {options.once = true});
		$$.getJSONOnce	= _makeAjax('GET', options => {options.once = true; options.contentType = 'json'});
		$$.getXMLOnce	= _makeAjax('GET', options => {options.once = true; options.contentType = 'xml'});
	// ajax wrapper
		function _makeAjax(type, otherOp){
			return (options => {
				// prepare options
					options	= _prepareOptions(options);
				// type
					options.type	= type;
				// other operations
					if(otherOp)
						otherOp(options);
				return new _XHR(options);
			})
		}
	// prepare options
		function _prepareOptions(options){
			var url;
			// if URL
				if(typeof options == 'string'){
					url		= options;
					options	= {};
				}
			// else if is URL or HTMLAnchorElement
				else if(options.href){
					url		= options.href;
					options	= {}
				}
			// ajax custom options
				else if(options.url){
					url		= options.url;
				}
			// invalid options
				else
					throw $$.err.illegalArgument('invalid URL');
			// convert URL to absolute URL
				url = $$.toAbsURL(url);
				options.url	= new URL(url);
			// request headers
				if(!options.headers)
					options.headers	= {};
			// end
				return options;
		}
	// xhr Object
		function _XHR(options){
			// save options
				this._options	= options;
			// prepare XHR
				_prepareXHR.call(this);
		};
	// prepare xhr
		function _prepareXHR(){
			var options	= this._options;
			// make XHR
				var xhr		= new XMLHttpRequest();
				this._xhr	= xhr;
			// on ready state change
				xhr.onreadystatechange = (event => {
					this._readyState	= event.readySate;
					//TODO trigger onreadyStateChange
					//Done
				});
			// make call
				setTimeout(_xhrSend.bind(this), 0);
		}
	// finalize request preparation end send
		function _xhrSend(){
			var xhr	= this._xhr;
			// timeout
				if(options.timeout)
					xhr.timeout	= options.timeout;
			// data
				var data	= options.data;

			xhr.open(options.type, options.url.href, true);
			xhr.send(data);
		}
	/////
	// ADD METHODS
	/////
	_extendNative(_XHR.prototype, {
		// URL redirect
			gotoURL		: function(url){
				//TODO
				return this;
			},
		// URL decoder
			urlDecoder	: function(decoder){
				//TODO
				return this;
			},
		// lazy request
			lazyRequest : function(urlPattern, timeout, QueuTimeout, abortWhenQueuTimeout){
				//TODO
				return this;
			},
		// cache
			cache		: function(state){this._options.cache	= state; return this; },
		// timeout
			timeout		: function(tmeout){
				var result	= this;
				// callBack
					if(typeof tmeout == 'function'){
						//TODO add event
					}
				// timeout
					else if(typeof tmeout == 'number'){
						this._options.timeout	= tmeout;
						this.xhr.timeout		= tmeout;
					}
					else if(!tmeout)
						result	= this._options.timeout;
				// else
					else
						throw new $$.err.illegalArgument('timeout: need function or number');
				return result;
			},
		// followMetaRedirects
			followMetaRedirects	: function(arg){
				if(!arg)
					return this._options.followMetaRedirects;
				else if(typeof arg == 'boolean')
					this._options.followMetaRedirects	= arg;
				else if(typeof arg == 'function'){
					//TODO add event
				}
				else throw new $$.err.illegalArgument('Needs boolean or function');
				return this;
			},
		/**
		 * abort()				// abort connection		
		 * abort(xhr => {})		// add an onAbort event listener
		 */
			abort		: function(arg){
				if(!arg)
					this.xhr.abort();
				else{
					//TODO add event
				}
			},
		/**
		 * 
		 * retry()				// retry connection
		 * retry(xhr => {})		// add retry event listener
		 */
			retry		: function(arg){
				//TODO
				return this;
			},
		/**
		 * .param()					// get all GET params
		 * .param('name')			// get param value
		 * .param('name', value)	// set URL param
		 * .param('name', [value])	// set URL multiple params
		 * .param({name:value})		// set those params
		 */
			param		: function(a, b){
				var url				= this._options.url,
					searchParams	= url.searchParams,
					result			= this,
					key,
					ele;
				// .param('name'), .param('name', value), .param('name', [value])
					if(typeof a == 'string'){
						if(b)	_addParams(a, b);
						else	result	= searchParams.get(a);
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
				// else
					throw new $$.err.illegalArgument('first argument: ', a);
				// end
					return result;
				// add params
					function _addParams(){
						var i, c;
						if(Array.isArray(b)){
							for(i = 0, c = b.length; i < c; ++i)
								searchParams.set(a, b[i]);
						}
						else
							searchParams.set(a, b);
					}
			},
		/**
		 * .data(obj || formData || HTMLForm || text || form-selector)
		 */
			data		: function(arg){
				//TODO add assets
				var result	= this;
				if(arg){
					// assert accepted data (serializable data), depends on used serialization
					// $$.assert($$.isPlainObj(arg) || $$.isForm(arg), $$.err.illegalArgument,'Incorrect data')
					this._options.data	= arg;
				}
				else result	= this._options.data;
				return result;
			},
		/**
		 * then
		 */
			// then()
		 	then		: function(callBack){
		 		//TODO asset callBack is function
		 		if(callBack)
		 			this._options.then	= callBack;
		 		else
		 			return this._options.then;
		 		return this;
		 	},
		/**
		 * .readyState()			// get ready state [0, 1, 2, 3, 4]
		 * .readyState(fx)			// add this fx as callBack when the state change
		 */
			readyState	: function(callBack){
				var result	= this;
				if(!callBack)
					result	= this._readyState;
				if(typeof callBack == 'function'){
					//add event
				}
				else
					throw new $$.err.illegalArgument('readyState: needs function');
				return result;
			},
		/**
		 * .bind('eventName', fx)		// eventName in ['readyState', 'readyStateChange', ]
		 */
			bind	: function(){
				//TODO
				return this;
			},
		/**
		 * .unbind()				// unbind all event listeners
		 * .unbind('eventName')		// unbind all event listeners of type eventName
		 * .unbind('eventName', fx)	// unbind the listener
		 */
			unbind	: function(){
				//TODO
				return this;
			},
		/**
		 * .header() 				// get all request header
		 * .header('name')			// get a request header
		 * .header('key', 'value')	// set request some header
		 * .header({key:value}) 	// override all headers
		 */
				header	: function(a, b){
					var result	= this;
					var headers	= this._options.headers;
					// get headers
						if(!a)
							result	= headers;
						else if(typeof a == 'string' && !b)
							result	= headers[a];
					// set headers
						else{
							this.assertNew(); // assert request not yeat in progress
							if(typeof a == 'string')
								headers[a]	= b;
							else{
								for(var i in a)
									headers[i]	= a[i];
							}
						}
					return result;
				},
			/**
			 * .removeHeader('header name', 'header2', '...')// remove header
			 */
				removeHeader	: function(){
					this.assertNew(); // assert request not yeat in progress
					for(var i=0, c = arguments.length; i < c; ++i)
						delete this.headers[arguments[i]];
				},
			// get/set request contentType
				dataType		: function(){},
			// get/set response contentType
				contentType		: function(){},
			// get/set request charset
				charset			: function(){},
			// get/set response charset
				responseCharset	: function(){},
			// get/set Accepted 
			// accepts()	// get accepted mimetypes
			// accepts('json', ...)	// set accepted mimetypes
				accepts			: function(){}

		// progress
			//.progress() // progress 0 to 1
			//.progress((percent, totalBytes, downloadedBytes)=>{})// set or get, valbale aussi on top object
			//.progress($$progressBar)// adjust progressbar auto
			uploadProgress	: function(){},
			downloadProgress: function(){},

		// serializers
			//serialize request data
			//serializer()			// get serializer
			//serializer(data=>{})	// set serializer
			serializer		: function(converter){
				this.assertNew();
				//TODO
				return this;
			},
			// deserialize response data
			// deserialize((xhr, data) => data)
			// deserialize({
			// 		mimeType	: (data => data)
			// })
			deserializer	: function(converter){
				//TODO
				return this;
			},
		// operations
			//beforeSend() get
			//beforeSend(xhr =>{})
				beforeSend	: function(){}
		// assert new Request (readystate == XMLHttpRequest.UNSENT)
			assertNew	: function(){
				$$.assert(this.xhr.readyState == 0, $$.err.illegalState, 'Request is in progress');
			}
	});

	// URL
		Object.defineProperty(_XHR.prototype, 'url', {
			get	: function(){ return this._xhr.responseURL || this._options.url.href; }
		});
	// original URL
		Object.defineProperty(_XHR.prototype, 'originalURL', {
			get	: function(){ return this._options.url.href; }
		});


	
		
	// parse result

	$$.get({
		type		: 'GET',
		url			: '',
		urlDecoder	: fx,
		lazyRequest	: {
			pattern : '/-d/' or [/-/, ...],
			pause	: 0, // waiting time after last connection
			timeout : 0, // queu waiting timeout
			abortWhenTimeout: true | false // if true, abort the call, else make it, default to true
		},

		headers	: {}, // request headers

		cache		: true|false,
		timeout		: 0,

		followMetaRedirects : true|false, // default to true
		data		: '',
		then		: fx, // when finish
		status : {},

		request	: {
			headers
		}
	})

})();