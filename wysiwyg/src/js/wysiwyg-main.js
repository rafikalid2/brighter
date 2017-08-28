function Wysiwyg(type){
	// this div will content all the elements
	this._base = $('<div>').addClass('wysi');
	// type of the wysiwyg
	this._type = type;
}

Wysiwyg.prototype._build = function(container){
	// create the menu and all elements
	this._menu();
	// create the zone text
	this._zoneText();

	// add the _base to the container
	container.append(this._base);
}
/**
 * execute a commande passed by param
 * @param  {[string]} command command to execute
 * @param  {[]} option options specify for this command 
 * @return {[bool]}    return true if the command executed succefully and false if not
 */
Wysiwyg.prototype._executeCommand = function (command, option, event){

	if(command === 'fontName' || command === 'fontSize')
		option = event.target.value;
	try{
		document.execCommand(command, false, option);
		return true;
	}catch(x){
		console.error(x);
	}
	return false;
}