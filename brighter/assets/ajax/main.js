/**
 * pourvoir grouper les appel ajax
 * se rappler de tous les appel ajax, voir par groupe
 */

(function(){
	// Consts
		const MIMETYPE_MAP = {
			json		: 'application/json',
			xml			: 'application/xml',
			urlEncoded	: 'application/x-www-form-urlencoded',
			text		: 'text/plain',
			multipart	: ''
		};
	// interface
		$$.plugin(true,{
			// pricipal calls
				get			: _makeAjax('GET'),
				post		: _makeAjax('POST'),
				delete		: _makeAjax('DELETE'),
				head		: _makeAjax('HEAD'),
			// specified calls
				getJSON		: _makeAjax('GET', options => {options.contentType = 'json'}),
				getXML		: _makeAjax('GET', options => {options.contentType = 'xml'}),
			// GET once
			// get url only once, and store parsed response in the cache
				getOnce		: _makeAjax('GET', options => {options.once = true}),
				getJSONOnce	: _makeAjax('GET', options => {options.once = true; options.contentType = 'json'}),
				getXMLOnce	: _makeAjax('GET', options => {options.once = true; options.contentType = 'xml'})
		});
	// ajax wrapper
		function _makeAjax(type, otherOp){
			return (options => {
				return new _XHR(type, options, otherOp);
			});
		}
	// xhr Object
		function _XHR(type, options, otherOp){
			try{
				// prepare options
					options	= _prepareOptions(options);
				// type
					options.type	= type;
				// other operations
					if(otherOp)
						otherOp(options);
				// save options
					this._options	= options;
				// start XHR
					this._startTimeout	= setTimeout(() => {
						this._startTimeout	= null;
						try{
							_xhrSend.call(this, resolve.bind(this), reject.bind(this));
						}catch(e){
							reject.call(this);
						}
					}, 0);
					_prepareXHR.call(this);
			}catch(e){
				reject.call(this, e);
			}
		};
	// prepare options
		function _prepareOptions(options){
			$$.assert(options != undefined, $$.err.missedArgument, 'need arguments');

			var tmpVar, i;
			// URL
				if(typeof options == 'string'){
					tmpVar	= options;
					options	= {};
				} else if(options instanceof URL || options instanceof HTMLAnchorElement){
					tmpVar	= args.href;
					options	= {};
				} else if($$.isPlainObj(options)){
					tmpVar	= options.url;
					if(typeof tmpVar != 'string') // URL or HTMLAnchorElement
						tmpVar	= tmpVar.href;
				} else {
					throw new $$.illegalArgument('incorrect argument: ', options);
				}
				// finalise url
					tmpVar 		= $$.toAbsURL(tmpVar);
					options.url	= new URL(tmpVar);
			// request headers
			// capitalize all header kies
				if(options.headers){
					tmpVar	= options.headers;
					options.headers	= {};
					for(i in tmpVar)
						options.headers[$$.capitalize(i)]	= tmpVar[i];
					// charset
						if(options.headers['Content-Type'])
							_optionsSplitConentTypeAndCharset(options, options.headers['Content-Type']);
				}
				else
					options.headers	= {};
			// dataType
				if(options.dataType)
					_optionsSplitConentTypeAndCharset(options, options.dataType);
			// end
				return options;
		}
	// split content type and charset
		_optionsSplitConentTypeAndCharset(options, contentType){
			contentType			= contentType.match(/^([^;]+)(?:;\s*charset\s*=(.*)$)?/i);
			options.dataType	= contentType[1].trim();
			options.dataCharset	= contentType[2].trim();
		}
	// reject & resolve
		function resolve(){}
		function reject(){}
	// finalize request preparation end send
		function _xhrSend(resolve, reject){
			var options	= this._options;
			var i, tmpVar;
			// prepare options

			// make XHR
				var xhr		= new XMLHttpRequest();
				this._xhr	= xhr;
			// timeout
				if(options.timeout){
					$$.assert(isFinite(options.timeout) && options.timeout >= 0, $$.err.illegalArgument, 'incorrect timeout');
					xhr.timeout	= options.timeout;
				}
			// data
				// var data	= options.data;
				// if(data instanceof HTMLFormElement)
				// 	data	= new formData(data);
			// headers
				
				// content type
					
				// prepare post
				
			// init data
				tmpVar	= 
			// on ready state change
				xhr.onreadystatechange = (event => {
					this._readyState	= event.readySate;
					//TODO trigger onreadyStateChange
					//Done
				});

			xhr.open(options.type, options.url.href, true);
			xhr.send(options.data || null);
		}
	// convert data to mimetype
		function _toMimeType(value){
			return MIMETYPE_MAP[value.toLowerCase()] || value;
		}
	// prepare post request
		function _preparePost(options){
			var options	= this;_options,
				dataType= options.dataType,
				data	= options.data,
				tmpVar;
			// find form if the given data is a selector
				if(typeof data == 'string'){
					try{
						data	= $$.find(data);
					}catch(e){} // not a selector
				}
			// if data is a Brighter object, give the native form
				if(data instanceof $$){
					data	= data.firstTag(ele => ele instanceof HTMLFormElement);
					if(!data)
						throw $$.err.illegalArgument('selected element is not a form');
				}
			// content type
				tmpVar	= options.headers;
				// Guess the data type
					if(!dataType){
						if(typeof data == 'string'){
							// url encoded
								if(/^[^&]+=[^&]*(?:&[^&]+=[^&]*)*$/.test(data))
									dataType = 'urlEncoded';
							//JSON
								else if(
									( () => { try{ JSON.parse(data); return true; }catch(e){ return false } })()
								)
									dataType = 'json';
							// text
								else
									datatype = 'text';
						}
						else if(data instanceof FormData)
							dataType = ''; // will be 
						else if(data instanceof HTMLFormElement)
						else if($$.isPlainObj(options.data)) // JSON
							dataType = 'json';
						else if(typeof data	= )
					}
				// convert datatype to mimetype
					datatype	= _toMimeType(dataType);
				// gess datatype
					else{
						
					}
				  ?  : () ? 'application/json' : 'application/x-www-form-urlencoded');
				// charset
					options.headers['Content-Type']	= dataType + '; charset=' + (options.dataCharset || 'UTF-8');
			// data
				tmpVar	= options.data;
				if(typeof )
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
					else if(typeof tmeout == 'number')
						this._options.timeout	= tmeout;
					else if(!tmeout)
						result	= this._options.timeout;
				// else
					else
						throw new $$.err.illegalArgument('incorrect timeout');
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
				// abort process
					if(!arg){
						// not starting yeat
							if(this._startTimeout){
								clearTimeout(this._startTimeout);
								this._startTimeout	= null;
								//TODO trigger abort event
							}
						// XHR en cours
							if(this.xhr){
								this.xhr.abort();
							}
						//TODO remvoe from global ajax
					}
				// add abort event
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
				var result	= this;
				if(arg)
					this._options.data	= arg;
				else result	= this._options.data;
				return result;
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
				requestHeader	: function(a, b){
					var result	= this;
					var headers	= this._options.headers;
					// get headers
						if(!a)
							result	= headers;
						else if(typeof a == 'string' && !b)
							result	= headers[$$.capitalize(a)];
					// set headers
						else{
							((addHeader) => {
								if(typeof a == 'string')
									addHeader(a, b);
								else{
									for(var i in a)
										addHeader(i, a[i]);
								}
							})
							// fx to add each header
							((key, value) => {
								key	= $$.capitalize(key);
								if(key	== 'Content-Type')
									_optionsSplitConentTypeAndCharset(this._options, value);
								else
									headers[key]	= value;
							});
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
				dataType		: function(type){
					if(type){ _optionsSplitConentTypeAndCharset(this._options, type); return this; }
					else{ return this.options.dataType; }
				},
			// get/set request charset
				dataCharset			: function(charset){
					if(charset){ this.dataCharset	= charset; return this; }
					else return this.dataCharset;
				},
			// get/set response contentType
				contentType		: function(){},
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
		dataType	: '',
		dataCharset	: '',

		then		: fx, // when finish
		status : {},

		request	: {
			headers
		}
	})

})();