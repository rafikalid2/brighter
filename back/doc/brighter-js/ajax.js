/**
* not supported by jQuery
*	- upload and download progress
*	- upload files
*	- 
*	$$.get('http...').then((resp, error)=>{})
*	$$.get('http...')
*		.response
*			.progress()
*		.then((resp, error)=>{})
*	$$.post(url).data(form).then({})
* 
**/
// ajax commons	
	$$.ajax
		.xhrs						// list of current connections
		// 
			.onAdd(xhr => {})		// callBack when a new request is added
			.onAdd()				// get callBack
		// abort
			.abortAll()				// abort all current connections
			.abort('a.b b.c')		// abort those groups
			.abort(xhr => {})		// when a connection is aborted
		// on Error
			.catch(xhr => {})
		// timeout
			timeout()				// get default timeout
			timeout(int)			// set default timeout
			timeout(xhr => {})		// when an xhr get in timeout
		// Done
			done(xhr => {})			// callBack when a request ends
		// meta redirect
			.followMetaRedirects(true|false)	// set default value
			.followMetaRedirects()				// get default value
			.onMetaRedirects((url, xhr) => {})	// default "on before following metaredirect", if return is false, == do not follow
			.onMetaRedirects()					// get default callback
		// URL
			.urlDecoder() 			// get default URL decoder
			.urlDecoder(false) 		// desable url decoder (default)
			.urlDecoder(url => url) // set default URL decoder
			.urlDecoder([
				{regex: /^/i, decoder: function(url){}}
			])
		// events
			.bind('event', listener)
			.unbind()					// unbind all events
	// events
		requestAdded	// when a new connection requested
		requestFinish	// when a request finished
		error			// when a request is on error
		abort

		allFinished		// when all request are finished
		firstRequested	// when the queu is empty, and a request is added
// methods
	$$.get(url)
	$$.post(url)
	$$.head(url)
	$$.delete(url)
		// promise functions
			.then(resp => {}, err => {})
			.catch(err => {})
			.finally(() => {})
		// before send
			.xhr(this => {}) // callBack before start native request
			.wait(int)				// time to wait in miliseconds before sending this request, default to 0
		// groupBy
			.group					// get the current group
			.groupBy('group1.subGroup group2.subGroup2') // group ajax calls, could be called only once
		/**
		 * @param {string} group	 make a group
		 * @param {int} queuTimeout max time to wait in the queu, default to 0 c (wait intil the previous connection ends)
		 * @param {boolean} abortWhenQueuTimeout abort the connection if timeout in queu, default to true
		 * @param {int} timeout time to wait after the previous url in queu
		 */
			.isLazy								// is the request in the lazy
			.lazy('groupName')
			.lazyTimeout(int)					// timeout to wait in the lazy mode
			.lazyTimeout(xhr => true | false)	//when lazy timeout, does proceed with the request or abort it
		// URL
			.urlDecoder(false)		// disable url decoder for this request
			.urlDecoder(url => url) // optional, decoder to decode URL
			.urlDecoder([
				{regex: /^/i, decoder: function(url){}}
			])
			.param()				// get all GET params as object
			.param('name')			// get GET param value
			.param('name', value)	// set URL GET param
			.param({name:value, att2 : ['value1', 'value2']})
		// data
			.data(obj || formData || HTMLForm || HTMLInput || text) // set or get the data
			.dataType()				// get the dataType
			.dataType(mimetype)		// set the data type
			.dataCharset()			// get data charset
			.dataCharset(charset)	// set data charset
		// response
			.accepts()					// get accepted data request as array
			.accepts('json', '', ,,,)	// accepted server responses, valable aussi on top object
		// headers
			.header()				// get all headers as object
			.header('headerName')	// get headerName
			.header('headerName', str || array[str]) // set header value or values
			.removeAllHeaders()			// remove all headers
			.removeHeader('headerName')	// remove headerName
			.removeHeader(['headerName1', 'headerName2', ...])	// remove those headers
			.removeHeader('headerName', 'headerValue' | ['headerValues'])	// remove headerName that has this value
			.removeHeader({
				header1: value1,
				header2: [v1, v2, ...]
			})	// remove headerName

			.responseHeaders		// get all response headers
		// progress
			.uploadProgress()		// get the upload progress
			.uploadProgress(cb)		// add listener to on upload progress
			.downloadProgress()		// get the download progress
			.downloadProgress(cb)	// add listener to on donwload progress
		// redirects
			.redirectTo(url)	// make redirect to this URL, throws error if request ends
			.followMetaRedirects(true|false)	// if follow meta and script redirections, default to false
			.onMetaRedirects((url, xhr) => {})	// on before following metaredirect, if return is false, == do not follow
		// GETTERS
			.url 			// get URL
			.originalURL	// getter, the ori ginal URL before redirects
			.xhr			// get the native XHR
		// options
			.cache(false) 		//force de navigator to reload the data from this url, // set or get
		// timeout
			.timeout()			// get global timeout
			.timeout(int) 		// set global timeout
			.timeout(err => {}) // on timeout (global, queu or xhr timeout)

			.xhrTimeout()		// get xhr timeout
			.xhrTimeout(int)	// set timeout to XHR
		// state
			.abort()// abort sending
			.abort(xhr => {})// when the connection is aborted

			.reply()	// reply request, returns new request
		// status
			.status() 			// get status 200, ...
			.status({
				200 		: (resp, xhr) => {},
				'40x'		: (resp, xhr) => {}, 	// when the status is 400 - 409
				'3xx'		: (resp, xhr) => {},	// when status is 300-399
				'300-405'	: (resp, xhr) => {} // range
			})
		// ready state
			.state						// current state: [lazy, unsent, opened, headerReceived, timeout, xhrTimeout, lazyTimeout]
			.readyState()				// get ready state [-1: lazyState, 0, 1, 2, 3, 4]
			.readyState(fx)				// add this fx as callBack when the state change

		// events
		/**
		 * 0 : xhrUnsent
		 * 1 : xhrOpened
		 * 2 : xhrHeadersReceived
		 * 3 : xhrLoading
		 * 4 : xhrDone
		 *
		 * metaRedirect
		 * 
		 * uploadProgress 
		 * downloadProgress 
		 * error 
		 * abort
 
		 * timeout
		 * readyStateChange
		 * 
		 * done
		 */
			.on('eventName', fx)		// eventName in ['readyState', 'readyStateChange', ]
			.off('eventName')			// unbind all events of type eventName
			.off('eventName', fx)		// inbind the event from
		// serializer/ deseralizer
			.serializer()				// get the used serializer
			.serializer(data => data)	// set the serializer for this request
			.serializer({				// add serializer manager for this request
				dataMimeType : (data => data)
			})

			.deserializer()				// get the used deserializer
			.deserializer(data => data)	// set the used deserializer
			.deserializer({				// add deserializer manager for this request
				responseMimeType : (data => data)
			})



			

		// events
			


// on elements
	$$element.load(url)	// load HTML from this url and place it in each element in the set
	$$form.post(url)	// serialize the first form and post it to this url (use .all. to send all forms in the set)
	$$form.get(url)		// serailize the frist form and send it to this url using GET method (use .all. to send all forms in the set)

	$$form.toObject()	// form to object
	$$form.toFormData()
	$$form.toURLEncoded()
	$$form.toJSON()
	$$form.toXML()