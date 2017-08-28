Wysiwyg.prototype._menu = function(){
	var toolbar = this._drawMenu();
	this._drawBtn(toolbar);
}


Wysiwyg.prototype._drawMenu = function(){
	// create the menu div and set it class
	var menu = $('<div>').addClass('menu');

	// create the toolbar div and add toolbar class to it
	// and append it to menu div
	var toolbar = $('<div>').addClass('toolbar').appendTo(menu);

	// return the menu div
	this._base.append(menu);

	return toolbar;
}
Wysiwyg.prototype._drawBtn = function(toolbar){
	// split the tool bar config to get the btns group
	var btns = this.typeList[this._type].split('!');
	// array will content the buttons
	var btn = [];

	// split btns group to get btn
	for(var i=0; i<btns.length; i++)
		btn[i] = btns[i].split('|');

	// draw buttons
	for(var i=0; i<btn.length; i++){

		if(btn[i].length === 1 && this.tools[btn[i][0]].src){
			var tool = this.tools[btn[i][0]];
			var fonts = Object.keys(this[tool.src]);
			var values = Object.values(this[tool.src]);
			var select = $('<select>');
			for(var j in fonts){
				select.append(
					$('<option>').text(fonts[j])
					.val(values[j])
				);
			}

			select.change(this._executeCommand.bind(this, tool.cmd, select.val()));

			toolbar.append(select);
		}
		else{
			// create the group buttons span
			var btns_group = $('<span>').addClass('btns-group');

			// create each one btn and append it to the btns_group
			for(var j=0; j<btn[i].length; j++){

				var tool = this.tools[btn[i][j]];
				var self = this;

				// create the button
				var b = $('<span>').addClass('btn fa fa-'+tool.icon);

				// if the btn command is a function execute this part of code
				if(typeof tool.cmd === 'function')
					b.click(tool.cmd);
				// this part will execute if the command is not a function, it is just a string cmd
				else
					b.click(this._executeCommand.bind(this, tool.cmd));
				
				// append the button to the group buttons
				b.appendTo(btns_group);
			}
			// append the group buttons to the toolbar
			toolbar.append(btns_group);
		}
	}
	var self = this;
	toolbar.append(
			$('<span class="btn">').text('tab')
									.click(function(){
										var tab = createTab(4,4);
										self._executeCommand('insertHTML', tab);
									})
	);
}

function createTab(line, col){
	var tab = '<table>';

	for(var i=0; i<line; i++){
		tab += '<tr>';

		for(var j=0; j<col; j++){
			tab += '<td></td>';
		}
		tab += '</tr>'
	}

	tab += '</table>';

	return tab;
}