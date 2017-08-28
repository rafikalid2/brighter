Wysiwyg.prototype._zoneText = function(){
	this._drawZoneText();
};

Wysiwyg.prototype._drawZoneText = function(){
	// create the editable div, where the use can write
	var zoneText = $('<div>').attr({
		contenteditable: 'true',
		class: 'zonetext'
	});

	this._base.append(zoneText);
}