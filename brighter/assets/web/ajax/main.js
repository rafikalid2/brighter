(function(){
	  /////////////////////////////////////
	 // 		params & consts			//
	/////////////////////////////////////
	const	OPTIONS_REF			= Symbol('option refrence'),
			PRIVATE_REF			= Symbol('private refrence'),
			SUPPORTED_METHODES	= ['GET', 'POST', 'PUT', 'DELETE', 'HEAD'];

	  /////////////////////////////////////
	 // 		Core methods			//
	/////////////////////////////////////
	class XHR extends Promise{
		// force then, catch and finally to returns promises
			static get [Symbol.species](){ return Promise; }
		// constructor
			constructor(url, type){
				// promise
				super((resolve, reject) => {
					// store options
					this[OPTIONS_REF] = {type: type, url: new URL($$.toAbsURL(url))};
					this[PRIVATE_REF] = {resolve: resolve, reject: reject};
				});
			}
		// reject & resolve
			resolve(value){ this[PRIVATE_REF].resolve(value); }
			reject(err){ this[PRIVATE_REF].reject(err); }
		// asserts
			get assertUnsent(){ if(this[OPTIONS_REF].xhr) throw new Error('Request already in progress'); return true; }
		/** wait before processing the request */
		
	}
	  /////////////////////////////////////
	 // 	  reject & resolve			//
	/////////////////////////////////////

	  /////////////////////////////////////
	 // 		  copy params			//
	/////////////////////////////////////
	[
		/** execute the request only once, and keep the result for future use */
		['once', (status, obj) => typeof status == 'boolean', 'Needs boolean']
		/** delay before sending the request */
		['wait', tme => !isNaN(tme) && tme >= 0, 'Needs int'],
		/** add this request to queu */
		['lazy', grpName => typeof grpName == 'string', 'Needs string'],
		/** timeout to wait in the lazy mode */
		['lazyTimeout', tme => !isNaN(tme) && tme >= 0, 'Needs int'],
		/** post data */
		['data', (data, obj) => obj.type() === 'POST', 'POST Only'],
		['dataType', (data, obj) => obj.type() === 'POST', 'POST Only'],
		['dataCharset', (data, obj) => obj.type() === 'POST', 'POST Only'],
		['accepts', data => typeof data == 'string', 'Needs string'],
		/** cache */
		['cache', data => typeof data == 'boolean', 'Needs boolean'],
		/** serializer */
		['serializer', () => true],
	].forEach(function(ele){
		var fx	= ele[0];
		XHR.prototype[fx] = function(param){
			try{
				if(arguments.length === 0)
					return this[OPTIONS_REF][fx];
				else {
					this.assertUnsent();
					if(!ele[1](param)) throw new Error(ele[2] || 'Illegal argument');
					this[OPTIONS_REF][fx]	= param;
				}
			} catch(err){
				this.reject(err);
			}
		};
	});

	// type
		XHR.prototype.type = function(method){
			if(arguments.length === 0) return this[OPTIONS_REF].type;
			else{
				this.assertUnsent();
				method = method.toUpperCase();
				$$.assert(SUPPORTED_METHODES.indexOf(method) != -1, 'Unsupported method: ' + method);
				this[OPTIONS_REF].type	= method;
			}
		};
	  /////////////////////////////////////
	 // 	copy params or fx			//
	/////////////////////////////////////
		lazyTimeout
		urlDecoder

		param

	  /////////////////////////////////////
	 // 			GETTERS				//
	/////////////////////////////////////
		type // post, get, ...
	  /////////////////////////////////////
	 // 	Add event manager			//
	/////////////////////////////////////
	$$.addEventManager(XHR.prototype);

	  /////////////////////////////////////
	 // 	Interface methods			//
	/////////////////////////////////////
	$$.plugin(true, {
		// pricipal calls
			get			: (url => new XHR(url, 'GET')),
			post		: (url => new XHR(url, 'POST')),
			put			: (url => new XHR(url, 'PUT')),
			delete		: (url => new XHR(url, 'DELETE')),
			head		: (url => new XHR(url, 'HEAD')),
		// specified calls
			getJSON		: (url => new XHR(url, 'GET').responseType('json')),
			getXML		: (url => new XHR(url, 'GET').responseType('xml')),
		// GET once
		// get url only once, and store parsed response in the cache
			getOnce		: (url => new XHR(url, 'GET').once(true)),
			getJSONOnce	: (url => new XHR(url, 'GET').once(true).responseType('json')),
			getXMLOnce	: (url => new XHR(url, 'GET').once(true).responseType('xml')),
	});