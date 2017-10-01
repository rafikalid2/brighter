var _errors	= [
	'illegalArgument'
]


// generique error funtion
	var _generiqueErrorFx	= classExtend(Error, function(message){
		Error.call(this.constructor.name + ': ' + message);
		this._$$args	= arguments; // sotre arguments because could contains more information
	});

// create errors
	for(var i = 0, c = _errors; i < c; ++i)
		$$.errors[_errors[i]]	= _generiqueErrorFx;