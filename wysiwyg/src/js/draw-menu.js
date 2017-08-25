function _drawMenu(options){
	var container = options.menubtn;
	var toolbar = options.toolbarbtn;
	console.log(toolbar);
	for(var i in toolbar){
		var btn = $('<span>').text(toolbar[i]).addClass('btn-'+toolbar[i]).appendTo(container);
	}
}