/**
 * use a proxy to all allow to call apis
 *
 * $$.newService('serviceName', obj)	// add this obj as a service
 * $$.newService({
 * 		url			: '...',	// absolute, relative or URL object
 * 		type		: 'GET|POST|DELETE|PUT', // get is the default
 * 		methodes	: {	// optional
 * 			methodName	: {
 * 				url	: '/to/{var1}/jjj/{var2}',
 * 				dataType: 'JSON|multipart',
 * 			}
 * 		}
 * })
 */