/**
* not supported by jQuery
*	- upload and download progress
*	- upload files
*	- 
**/
// GET
	$$.get(url)
	$$.post(url)
	$$.head(url)
	$$.delete(url)
		.cache(false) //force de navigator to reload the data from this url, // set or get

		.param('name')			// get param value
		.param('name', value)	// add URL param
		.param({name:value})

		.data(obj || formData || HTMLForm || text) // set or get the data

		

		.request
			.converter(data=>{})// optional, fx that will convert data to text, // set or get
			.uploadProgress((percent, totalBytes, uploadedBytes){})// set or get, valable aussi on top object
			.contentType('type')// optional, the content type, it will be guessed from data if not present, // set or get
			.accepts('', '', ,,,)	// accepted server responses, valable aussi on top object
		.response
			.downloadProgress((percent, totalBytes, downloadedBytes)=>{})// set or get, valbale aussi on top object
			.converter(data=>{})// optional, fx that will convert data to text, // set or get
		

// commons


		.converter(fx)
		.converter({})


		.headers({})	// set headers
		.removeHeader('header name')// remove header

		.onBeforeSend(()=>{})// will be executed before sending the request
		.onReadyStateChange()// like the native one

		.status({
			statusCode	: ()=>{}
		})
		.onComplete((err, resp)=>{})
		.offline(()=>{}) // if no connection to the server
		.catch(err => {})// catch error

		.timeout(int) // timeout, get timeout if the arg is undefined

		.url()// set or get the URL


		.abort()// abort sending
		.retry()// retry sending