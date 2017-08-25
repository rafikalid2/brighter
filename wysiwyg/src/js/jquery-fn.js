$.fn.wysiwyg = function(options = {}){

	var width = options.width || '100%';

	// add wysiwyg class to the container
	this.addClass('wysiwyg');

	this.css('width', width+'px');

	// create the menu div and set it menu class
	var menu = $('<div>').addClass('menu');

	// create the toolbar div and add toolbar class to it
	// and append it to menu div
	var toolbar = $('<div>').addClass('toolbar').appendTo(menu);

	// create the menu btn container and add class to it
	// and append it to menu div
	var menubtn = $('<div>').addClass('menubtn').appendTo(menu);

	// create the editable div, where the use can write
	var zonetext = $('<div>').attr({
		contenteditable: 'true',
		class: 'zonetext'
	});


	_drawMenu({menubtn, toolbarbtn});


	// append the menu and zonetext to the DOM
	this.append([menu, zonetext]);


}

/**
 * this function is to extned two object
 * @param  {[object]} child the object child 
 * @param  {[object]} parent  the object parent to extend
 */
var extendClass = function(parent, child) {
    var base = function() {};
    base.prototype = parent.prototype;
    child.prototype = new base();
}