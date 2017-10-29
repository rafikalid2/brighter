/**
 * support sending logs to server
 * $$.log('group', 'message', ...)
 */

//TODO complette this
$$.plugin(true, {
	log				: function(){ console.debug.apply(console, arguments) },
	debug			: function(){ console.debug.apply(console, arguments) },
	warn			: function(){ console.warn.apply(console, arguments) },
	info			: function(){ console.info.apply(console, arguments) },
	error			: function(){ console.error.apply(console, arguments) },
	fatalError		: function(){ console.error.apply(console, arguments) },
	uncaughtError	: function(){ console.error.apply(console, arguments) }
});