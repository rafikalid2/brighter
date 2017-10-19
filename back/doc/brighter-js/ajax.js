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
		.xhrs				// list of current connections

		.abort()				// abort all current connections
		.abort(xhr => {})		// when a connection is aborted

		.catch((err, xhr) => {})	// add this callback to when error

		.status({
			code : xhr => {}
		}) // execute when this code

		.bind()
		.unbind()

		.urlDecoder(url => url) // optional, decoder to decode URL

		.url(patern, pattern2, ...)	// apply those functions on each URL that matches those patterns
			.status({})
			.catch()
			.abort()


		/**
		 * @param {regex} urlPattern match an url already in progress or in the queu, default to undefined (no waiting, exec request immediately)
		 * @param {int} timeout time to wait after the previous url in queu
		 * @param {int} queuTimeout max time to wait in the queu, default to 0 (wait intil the previous connection ends)
		 * @param {boolean} abortWhenQueuTimeout abort the connection if timeout in queu, default to true
		 */
		.urlQeu(urlPattern, timeout, queuTimeout, abortWhenQueuTimeout)	// if a request is already in progress, wait this timeout, do not use parallel requests
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
		.url // get URL
		.originalURL	// getter, the original URL before redirects

		.urlDecoder(url => url) // optional, decoder to decode URL
		.goToURL(url)	// make redirect to this URL

		/**
		 * @param {regex} urlPattern match an url already in progress or in the queu, default to undefined (no waiting, exec request immediately)
		 * @param {int} timeout time to wait after the previous url in queu
		 * @param {int} queuTimeout max time to wait in the queu, default to 0 (wait intil the previous connection ends)
		 * @param {boolean} abortWhenQueuTimeout abort the connection if timeout in queu, default to true
		 */
		.lazyRequest(urlPattern, timeout, QueuTimeout, abortWhenQueuTimeout)	// if a request is already in progress, wait this timeout, do not use parallel requests

		.cache(false) 				//force de navigator to reload the data from this url, // set or get
		.timeout(int) 				// timeout, get timeout if the arg is undefined
		.timeout(xhr=>{}) 			// on timeout

		.followMetaRedirects(true|false)	// if follow meta and script redirections
		.followMetaRedirects((url, xhr) => {})	// on before following metaredirect, if return is false, == do not follow


		.xhr						// the native XHR

		.abort()// abort sending
		.abort(xhr => {})// when the connection is aborted

		.retry()// retry sending
		.retry(xhr => {})// when retry

		.param('name')			// get param value
		.param('name', value)	// add URL param
		.param({name:value})

		.data(obj || formData || HTMLForm || text) // set or get the data

		.then((data, err)=>{})	// when finish

		.status() 			// get status 200, ...
		.status({
			200 	: fx,
			'40x'	: fx, 	// when the status is 400 - 409
			'3xx'	: fx,	// when status is 300-399
			'300-405' : fx // range
		})

		.readyState()			// get ready state [0, 1, 2, 3, 4]
		.readyState(fx)			// add this fx as callBack when the state change


		.bind('eventName', fx)		// eventName in ['readyState', 'readyStateChange', ]
		.unbind('eventName')		// unbind all events of type eventName
		.unbind('eventName', fx)	// inbind the event from

		.request
		.upload
			.header() // get all header
			.header('name')	// get a header
			.header({key:value}) // set headers
			.header('key', 'value') // set some header

			.removeHeader('header name', 'header2', '...')// remove header

			.converter(data=>{})// optional, fx that will convert data to text, // set or get

			.progress() // progress 0 to 1
			.progress((percent, totalBytes, uploadedBytes){})// set or get, valable aussi on top object
			.progress($$progressBar)// adjust progressbar auto

			.contentType()// get content type
			.contentType('type')// override content type [abbrv like: json, html, text, ...] or complete mimetype

			.charset()			// get charset
			.charset(charset)	// override charset [utf-8, ...]

			.accepts('json', '', ,,,)	// accepted server responses, valable aussi on top object

			.beforeSend(xhr => {})// get or set before send callBack
		.response
		.download
			.progress() // progress 0 to 1
			.progress((percent, totalBytes, downloadedBytes)=>{})// set or get, valbale aussi on top object
			.progress($$progressBar)// adjust progressbar auto


			.loaded(data => data)	// when the data is loaded
			.converter(data => data)	// get or set converter

			.header()		// get all headers
			.header('name')	// get a header

			.header(xhr=>{})// call when headers received (state = 2s)

			.contentType()// get content type	

		// events
			load
			progress
			error
			abort

			timeout
			readyStateChange

			loadend // when the tree events: load, error and abort


// on elements
	$$element.load(url)	// load HTML from this url and place it in each element in the set
	$$form.post(url)	// serialize the first form and post it to this url (use .all. to send all forms in the set)
	$$form.get(url)		// serailize the frist form and send it to this url using GET method (use .all. to send all forms in the set)

	$$form.toObject()	// form to object
	$$form.toFormData()
	$$form.toURLEncoded()
	$$form.toJSON()
	$$form.toXML()