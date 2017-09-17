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

	$(editor).click(this._selection.bind(this, toolbar));
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
Wysiwyg.prototype._config = {

	tools : {
				b: {
					cmd: 'bold',
					icon: 'bold'
				},
				i : {
					cmd: 'italic',
					icon: 'italic'
				},
				u: {
					cmd: 'underline',
					icon: 'underline'
				},
				abc: {
					cmd: 'strikeThrough',
					icon: 'strikethrough'
				},


				l: {
					cmd: 'justifyLeft',
					icon: 'align-left'
				},
				c: {
					cmd: 'justifyCenter',
					icon: 'align-center'
				},
				r: {
					cmd: 'justifyRight',
					icon: 'align-right'
				},
				j: {
					cmd: 'justifyFull',
					icon: 'align-justify'
				},


				ic: {
					cmd: 'subScript',
					icon: 'subscript'
				},
				ex: {
					cmd: 'superScript',
					icon: 'superscript'
				},

				al: { // add link
					cmd: 'createLink',
					icon: 'link'
				},
				rl: { // remove link
					cmd: 'unlink',
					icon: 'chain-broken'
				},


				undo: {
					cmd: 'undo',
					icon: 'undo'
				},
				redo: {
					cmd: 'redo',
					icon: 'repeat'
				},


				ulst: {
					cmd: 'insertUnorderedList',
					icon: 'list-ul'
				},
				olst: {
					cmd: 'insertOrderedList',
					icon: 'list-ol'
				},

				fnt: {
					cmd: 'fontName'
				},
				sz: {
					cmd: 'fontSize'
				},

				indent: {
					cmd: 'indent',
					icon: 'indent'
				},
				outdent: {
					cmd: 'outdent',
					icon: 'outdent'
				},

				img: {
					cmd: 'insertImage',
					icon: 'photo'
				},

				fc: { // font color
					cmd: 'foreColor',
					icon: 'font'
				},
				bc: { // back color
					cmd: 'backColor',
					icon: 'font'
				}
	},

	fonts: 	{
		'Arial':'arial, helvetica, sans-serif',
		'Arial Black':'arial black, avant garde',
		'Andale Mono':'andale mono, times',
		'Book Antiqua':'book antiqua, palatino',
		'Comic Sans MS':'comic sans ms, sans-serif',
		'Courier New':'courier new, courier',
		'Georgia':'georgia, palatino',
		'Helvetica':'helvetica',
		'Impact':'impact, chicago',
		'Symbol':'symbol',
		'Tahoma':'tahoma, arial, helvetica, sans-serif',
		'Terminal':'terminal, monaco',
		'Times New Roman':'times new roman, times',
		'Trebuchet MS':'trebuchet ms, geneva',
		'Verdana':'verdana, geneva',
		'Webdings':'webdings',
		'Wingdings':'wingdings, zapf dingbats'
	},
	
	typeList: {
		basic: 'undo,redo|fnt|sz|b,i,u,abc|fc|bc|l,c,r,j',
		full: 'undo,redo|fnt|sz|b,i,u,abc|fc|bc|l,c,r,j|al,rl|ic,ex|ulst,olst|indent,outdent|img'
	},

	colors: ['000','930','330','030','036','000080','339','333','800000','f60','808000','008000','008080','00f','669','808080','f00','f90','9c0','396','3cc','36f','800080','999','f0f','fc0','0f0','0ff','0cf','936','f9c','fc9','ff9','cfc','cff','9cf','c9f','795548','8ba1d4','fff']
};

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
Wysiwyg.prototype._uploadPic = function(editor){

	editor.on('dragenter', function (e){
	    $(this).addClass('active');
	});
	editor.on('dragleave', function(e){
		$(this).removeClass('active');
	});

	var context = this;

	editor.on('drop', function(e){
		// get files selected (draged)
	   	var files = e.originalEvent.dataTransfer.files;

	   	// focus in the editor
	   	$(this).trigger('focus');

	   	// handle files
	   	_handleFiles(this, context, files);

	   	if(editor.hasClass('error'))
	   		setTimeout(function(){
	   			editor.removeClass('error');
	   		},2000);

	   	// remove active calss of editor
	    $(this).removeClass('active');
	});

	// stop brwser to open the file whene it is droping outside the editor
	$(document).on('dragenter', function (e){
	    e.stopPropagation();
	    e.preventDefault();
	});
	$(document).on('dragover', function (e){
	  	e.stopPropagation();
	  	e.preventDefault();
	});
	$(document).on('drop', function(e){
		e.stopPropagation();
		e.preventDefault();
	});

	/**
	 * handle the files selectioned,
	 * this function take the context and files array
	 * @param  {[this]} context 
	 * @param  {[array]} files array of files selected
	 */
	function _handleFiles(editor, context, files){
		// loop for the files
		for(var i=0; i<files.length; i++){

			// check file if it is an image
			if(!files[i].type.match(/.(jpg|jpeg|png|gif)$/)){
		      $(editor).addClass('error');
		      //console.error('File selected is not an image');
		      continue;
		    }
		    
			var reader = new FileReader();
 			
 			reader.onload = function (event) {
		    	context._executeCommand('insertImage', event.target.result);
		    }

            // Read in the image file as a data URL.
            reader.readAsDataURL(files[i]);
		}
	}
}
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
				_createOtherButtons(this, tool).appendTo(group);
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
		var select = $('<select>').addClass('font-family-select').attr('id', 'font-family-select');

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
		var select = $('<select>').addClass('font-size-select').attr('id', 'font-size-select');

		// create the options and append it to the select
		for(var i=9; i<=60; i+=5)
			$('<option>').text(i).appendTo(select);

		// set change event to the select
		// in this part of code we execute the command which add size attribute to the selection
		// after we get that selection by the attribute using selector and we change it's font size
		select.change(function(event){
			var value = event.target.value;
			//execute this line to add size 7 to the selection
			context._executeCommand('fontSize', 7);

			// get the selection by size attribut and change it's font size
			$('[size = 7]').css('font-size', value+'px').removeAttr('size');
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

	function _createOtherButtons(context, tool){

		return $('<span>').addClass('btn fa fa-'+tool.icon).attr('id', tool.cmd)
					.click(function(){ // add  event click for this button
						// execute the command
						var res = context._executeCommand(tool.cmd);
						console.log(res);
						if( res && (tool.cmd ===  'bold' || tool.cmd === 'italic' || tool.cmd === 'underline' || tool.cmd === 'strikeThrough')){
							var bt = $(this);

							if(bt.hasClass('active'))
								bt.removeClass('active');
							else
								bt.addClass('active');
						}
					})
					.appendTo(group);
	}
}
Wysiwyg.prototype._selection = function(toolbar){
	try{

		// remove .active class for all buttons
		toolbar.find('.active').removeClass('active');

		var style = window.getComputedStyle(document.getSelection().anchorNode.parentNode);

		// //font family
		// 	var a = style.fontFamily;
		// 	$('#font-family-select').val(a);
		// 	console.log(a);
		//	$tools.find('.fnt').text(style.fontFamily.split(',')[0].trim());
		// //font size
		// 	$tools.find('.sze').text(style.fontSize.replace('px',' '));
		//bold
			if(style.fontWeight == 'bold' || style.fontWeight == 700)
				toolbar.find('#bold').addClass('active');
		//italic
			if(style.fontStyle == 'italic')
				toolbar.find('#italic').addClass('active');
		//underline
			var _textDecoration = style.webkitTextDecorationsInEffect || style.textDecoration;
			if(_textDecoration.indexOf('underline')>-1)
				toolbar.find('#underline').addClass('active');
		//line-through
			if(_textDecoration.indexOf('line-through')>-1)
				toolbar.find('#strikeThrough').addClass('active');
		//text align
			a= style.textAlign.replace('-moz-','');
			toolbar.find(
				a == 'center'? '#justifyCenter'
				:(
					a=='right'?'#justifyRight'
					:(
						a=='justify'?'#justifyFull'
						:'#justifyLeft'
					)
				)
			).addClass('active');
		//sub
			if(style.top && style.top.startsWith('-'))
				toolbar.find('#subScript').addClass('active');
		//sup
			else if(style.bottom && style.bottom.startsWith('-'))
				toolbar.find('#superScript').addClass('active');
	}catch(err){
		console.error(err);
	}
}
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