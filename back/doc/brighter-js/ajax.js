/**
* not supported by jQuery
*	- upload and download progress
*	- upload files
*	- 
**/
// GET
	$$.get(url)
		.cache(false) //force de navigator to reload the data from this url, // set or get

//POST
	$$.post(url)
		.data(obj || formData || HTMLForm || text) // set or get the data

		.dataConverter(data=>{})// optional, fx that will convert data to text, // set or get

		.uploadProgress((percent, totalBytes, uploadedBytes){})// set or get
		// .dataType('type')//optional, data type header, [json, form] will be converted to mime-type equivalent
		.contentType('type')// optional, the content type, it will be guessed from data if not present, // set or get

// commons
		.query(queryParams) // params to be encoded in URL// set or get
		.downloadProgress((percent, totalBytes, downloadedBytes)=>{})// set or get

		.accepts('', '', ,,,)	// accepted server responses


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