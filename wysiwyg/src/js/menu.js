/**
 * this function create a menu container
 * @return {[div]} return the div will content the buttons
 */
Wysiwyg.prototype._createMenu = function(){
	// create the menu div and set it class
	var menu = $('<div>').addClass('menu');

	// create the toolbar div and add toolbar class to it
	// and append it to menu div
	var toolbar = $('<div>').addClass('toolbar').appendTo(menu);

	// return the menu div
	this._container.append(menu);

	// return the container will content the buttons
	return toolbar;
}

/**
 * this function create the menu buttons and append it to the toolbar
 * @param  {[div]} toolbar the container will content all the buttons
 * @return {[boolean]}         return true if the buttons created succefully
 */
Wysiwyg.prototype._createMenuButtons = function(toolbar){
	// split the string configuration to get the buttons to create
	// this part of code split the buttons by groups
	var btns = this._config.typeList[this._type].split('|');

	// array will content the buttons
	var btn = [];

	// split btns group to get btn
	for(var i=0; i<btns.length; i++)
		btn[i] = btns[i].split(',');

	// create buttons
	for(var i=0; i<btn.length; i++){

		var group = $('<span>').addClass('btns-group');

		for(var j=0; j<btn[i].length; j++){

			// the buttons we want to create
			var b = btn[i][j];

			// get the tool from _config tools
			var tool = this._config.tools[b];

			// this part of code create a select of the font family
			if(b === 'fnt'){
				// call _createFontFamilySelect(), this function create an font-family select and return it
				// after we append it to the toolbar
				_createFontFamilySelect(this).appendTo(toolbar);
			}

			// this part of code create a select for the font size
			else if(b === 'sz'){
				_createFontSizeSelect(this).appendTo(toolbar);
			}

			else if(b === 'al'){
				_createAddLinkButton(this, tool.icon).appendTo(toolbar);
			}

			else if(b === 'fc' || b === 'bc'){
				_createColorPalett(this, tool).appendTo(toolbar);
			}

			// this part create the others buttons
			else{

				// create button for this tool
				$('<span>').addClass('btn fa fa-'+tool.icon)
							.click(this._executeCommand.bind(this, tool.cmd)) // add  event click for this button
							.appendTo(group);
			}
		}

		// this part of code add the group span to the toolbar if it has children, if not do nothing
		// this will work if children().length > 0
		if(group.children().length)
			group.appendTo(toolbar);
	}

	/**
	 * this function create font family select and set the change event for it
	 * @param  {[this]} context the context where the fucntion called in all case it is (this)
	 * @return {[select]} return the select created
	 */
	function _createFontFamilySelect(context){ // get context => this
		// this select will content all the fonts family
		var select = $('<select>').addClass('font-family-select');

		// the fonts family defined in _config which is provided with the API
		var fonts = context._config.fonts;

		// create the options and append it to the select
		for(var i in fonts)
			$('<option>').text(i)
						.val(fonts[i])
						.css('font-family', fonts[i])
						.appendTo(select);

		// add event listener to the select
		// when the select text change execute the command with the selected value
		select.change(function(event){
			context._executeCommand('fontName', event.target.value);
		});

		// return the select created
		return select;
	}

	/**
	 * create font size select and set event change to it
	 * @param  {[this]} context the context where the fucntion called in all case it is (this)
	 * @return {[select]}       return the select created
	 */
	function _createFontSizeSelect(context){
		// this select will content the font size
		var select = $('<select>').addClass('font-size-select');

		// create the options and append it to the select
		for(var i=9; i<=60; i+=5)
			$('<option>').text(i).appendTo(select);

		// set change event to the select
		// in this part of code we execute the command which add size attribute to the selection
		// after we get that selection by the attribute using selector and we change it's font size
		select.change(function(event){
			var value = event.target.value;
			context._executeCommand('fontSize', 7);

			// get the selection by size attribut and change it's font size
			$('[size = 7]').css('font-size', value).removeAttr('size');
		})

		// return the select 
		return select;
	}
	/**
	 * Create add link button and set event click for the valid button
	 * @param  {[this]} context the context where the fucntion called in all case it is (this)
	 * @param  {[string]} icon  font-awesome class name for the tool icon
	 * @return {[label]}        return an label which content all elements created
	 */
	function _createAddLinkButton(context, icon){
		// create the coantainer
		var drop_down = $('<label class="drop-down btns-group">').append('<input type="checkbox"><span class="drop-close"></span>')
					.append($('<span class="btn fa fa-'+icon+'">'));

		// create drop down body
		var ul = $('<ul>').appendTo(drop_down);
		// add input text to the drop down body
		var input = $('<input type="text">').val('http://').appendTo(ul);
		// create validate button
		var validButton = $('<span>').text('add').addClass('btn add-link').appendTo(ul);

		// add event listener to validate button
		validButton.click(function(event){
			// if the input is empty so call unlick commmand
			if(input.val() === '')
				context._executeCommand('unlink');

			// if not create new link
			else
				context._executeCommand('createLink', input.val());
			input.val('http://');
		})

		// return the drop down
		return drop_down;
	}
	/**
	 * this function create the color palett for fontColor and backColor buttons
	 * @param  {[this]} context the context where the fucntion called in all case it is (this)
	 * @param  {[object]} tool  tool object
	 * @return {[label]}        return the drop down created
	 */
	function _createColorPalett(context, tool){
		// create the drop down
		var drop_down = $('<label class="drop-down btns-group colors-palett">').append('<input type="checkbox"><span class="drop-close"></span>');
		// create the button showing in toolbar
		var btn = $('<span class="btn '+tool.cmd+'">').appendTo(drop_down);
		// create the icon and add it to btn
		var icon = $('<i>').addClass('fa fa-'+tool.icon).appendTo(btn);

		// create dorp down body
		var ul = $('<ul>').appendTo(drop_down);

		// get colors to create, this colors is defined in config file
		var colors = context._config.colors;

		for(var i in colors){
			// create an span which will content the color, set it's background to the color
			var c = $('<span>').css('background', '#'+colors[i]).addClass('colors-item').attr('data-color', colors[i]);

			// this code work for the forecolor
			if(tool.cmd === 'foreColor'){
				c.click(function(event){
					// get the color clicked
					var color = '#'+$(event.target).attr('data-color');
					// execute the command and cahnge the color for the selection
					context._executeCommand(tool.cmd, color);
					// change the border-color and color for the forecolor button
					icon.css('border-color', color).css('color', color);
				});
			}
			// this code for backcolor
			else if(tool.cmd === 'backColor'){
				c.click(function(event){
					// get color clicked
					var color = '#'+$(event.target).attr('data-color');
					// execute the command and cahnge the color for the selection
					context._executeCommand(tool.cmd, color);
					// change the background color for the button
					btn.css('background', color);
				});
			}
			// append the span to the ul (drop down body)
			c.appendTo(ul);
		}

		// return the drop down
		return drop_down;
	}
}