/**
 * pourvoir grouper les appel ajax
 * se rappler de tous les appel ajax, voir par groupe
 */

(function(){
	// pricipal calls
		$$.get		= _makeAjax('GET');
		$$.post		= _makeAjax('POST');
		$$.delete	= _makeAjax('DELETE');
		$$.head		= _makeAjax('HEAD');
	// ajax wrapper
		function _makeAjax(type){
			return (options => {
				// prepare options
					options	= _prepareOptions(options);
				// type
					options.type	= type;
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
			// make XHR
				var xhr		= new XMLHttpRequest();
				this._xhr	= xhr;
			// 
			// on ready state change
				xhr.onreadystatechange = (event => {
					this._readyState	= event.readySate;
					//TODO trigger onreadyStateChange
				});
			// make call
				setTimeout(()=>{
					xhr.open(options.type, options.url.href, true);
					xhr.send(options.data);
				}, 0);
		};
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
					else if(typeof tmeout == 'number')
						this._options.timeout	= tmeout;
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
				else throw new $$.err.illegalArgument('Needs boolean or function')
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
		 * .data(obj || formData || HTMLForm || text)
		 */
			data		: function(arg){
				//TODO add assets
				var result	= this;
				if(arg) this._options.data	= arg;
				else result	= this._options.data;
				return result;
			},
		/**
		 * then
		 */
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
						$$.assert(this.xhr.readyState == 0, 'illegalState', 'Could not add a header when the request is in progress or done.');
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
				$$.assert(this.xhr.readyState == 0, 'illegalState', 'Could not add a header when the request is in progress or done.');
				for(var i=0, c = arguments.length; i < c; ++i)
					delete this.headers[arguments[i]];
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