var _errors	= {
	illegalArgument	: 'Illegal arguments error',
	missedArgument	: 'Missed arguments'
};


// generique error funtion
	var _generiqueErrorFx	= classExtend(Error, function(message){
		Error.call(this.constructor.name + ': ' + _errors[]);
		this._$$args	= arguments; // sotre arguments because could contains more information
	});

// create errors
	for(var i in _errors)
		_createErrorObj(i, _errors[i]);

	function _createErrorObj(errorName, errMessage){
		$$.errors[errorName]	= classExtend(Error, function(message){
			Error.call(errMessage + (typeof message == 'string' ? ': ' + message : ''));
			this._$$args	= arguments; // sotre arguments because could contains more information
		});
	}