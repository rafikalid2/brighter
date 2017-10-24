/**
 * capitalise strings
 */
$$.plugin(true, {
	capitalize	: function(str){
		return str.replace(/\w+/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	}
})