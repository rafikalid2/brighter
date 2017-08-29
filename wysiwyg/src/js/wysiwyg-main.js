function Wysiwyg(type){
	// this div will content all the elements
	this._container = $('<div>').addClass('wysi');

	// type of the wysiwyg
	this._type = type;
}

Wysiwyg.prototype._build = function(context){
	// create the menu container
	var toolbar = this._createMenu();

	// create the menu buttons
	this._createMenuButtons(toolbar);

	// create the zone text
	var editor = this._createEditor();

	// append the container to the context DOM
	context.append(this._container);

	this._uploadPic(editor);
}

/**
 * execute a commande passed by param
 * @param  {[string]} command command to execute
 * @param  {[]} option options specify for this command 
 * @return {[bool]}    return true if the command executed succefully and false if not
 */
Wysiwyg.prototype._executeCommand = function (command, option){
	try{
		document.execCommand(command, false, option);
		return true;
	}catch(x){
		console.error(x);
	}
	return false;
}