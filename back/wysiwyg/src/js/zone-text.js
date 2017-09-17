Wysiwyg.prototype._createEditor = function(){
	// create the editable div, where the use can write
	var editor = $('<div>').attr({
		contenteditable: 'true',
		class: 'editor',
		id: 'editor'
	});

	this._container.append(editor);

	return editor;
}