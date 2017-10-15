/**
 * pourvoir grouper les appel ajax
 * se rappler de tous les appel ajax, voir par groupe
 *
 *
 
 *
 * $$.get(url)
 * $$.post(url)
 * $$.head(url)
 * $$.delete(url)
 * 		.param('name', value)	// add URL param
 * 		.param({name:value})
 *
 * 
 * $$.get(baseUrl, GetData)
 * $$.post(baseURL, GetData, PostData)
 *
 *
 * 		.then((data, err)=>{})
 * 		.downloadProgress(fx)	// get progress or add listener to onuploadprogress
 * 		.uploadProgress(fx)		// get progress or add listener to onuploadprogress
 * 		.status(fx) 			// get status, add fx to status change
 *
 * 		.request
 * 			.header // get all header, get a header, set all headers, set a header
 * 			.dataType
 * 			.upoadProgress
 * 			.and. // go back to root object
 * 		.response
 * 			.dataType
 * 			.header
 * 			.downloadProgress
 * 			.and. // go back to root object
 */