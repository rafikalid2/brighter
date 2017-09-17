$.fn.wysiwyg = function(options){

	// if the options is empty or undefined, create an empty object
	if(!options)
		options = {};

	// get the wysiwyg type if defined by user, if not set it to basic
	var type = options.type || 'basic';

	// check if the user specified an container, if not throw new Error
	// this => reference the container
	if(!this.length)
		throw new Error('No container specified! could not create wysiwyg');

	// add wysiwyg class to the container
	this.addClass('wysiwyg');

	// create new Wysiwyg object
	var wysi = new Wysiwyg(type);
	console.log(wysi);
	
	// build the wysiwyg, this function take the conatainer
	wysi._build(this);
}


/**
 * this function is to extned two object
 * @param  {[object]} child the object child 
 * @param  {[object]} parent  the object parent to extend
 */
// var extendClass = function(parent, child) {
//     var base = function() {};
//     base.prototype = parent.prototype;
//     child.prototype = new base();
// }