var _errors	= {
	illegalArgument	: 'Illegal Arguments',
	missedArgument	: 'Missed Arguments',
	illegalState	: 'Illegal State'
};

// create errors
	for(var i in _errors)
		_createErrorObj(i, _errors[i]);

	function _createErrorObj(errorName, errMessage){
		$$.err[errorName]	= classExtend(Error, function(message){
			Error.call(errMessage + (typeof message == 'string' ? ': ' + message : ''));
			this.args	= arguments; // sotre arguments because could contains more information
		});
	}