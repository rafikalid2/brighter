Wysiwyg.prototype.tools = {
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
		cmd: 'link',
		icon: 'chain'
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
		src : 'fonts',
		cmd: 'fontName'
	},
	sz: {
		src : 'size',
		cmd: 'fontSize'
	}

};

// fonts-familly
Wysiwyg.prototype.fonts={'Andale Mono':'andale mono, times','Arial':'arial, helvetica, sans-serif','Arial Black':'arial black, avant garde','Book Antiqua':'book antiqua, palatino','Comic Sans MS':'comic sans ms, sans-serif','Courier New':'courier new, courier','Georgia':'georgia, palatino','Helvetica':'helvetica','Impact':'impact, chicago','Symbol':'symbol','Tahoma':'tahoma, arial, helvetica, sans-serif','Terminal':'terminal, monaco','Times New Roman':'times new roman, times','Trebuchet MS':'trebuchet ms, geneva','Verdana':'verdana, geneva','Webdings':'webdings','Wingdings':'wingdings, zapf dingbats'};
// characters
Wysiwyg.prototype.chars='@€ÁáÂâÆæÅåÃãä¸¢©®™¤°÷×↔⊕⊗↵⇐⇑⇒⇓⇔∀∃∈∉∋√≤≥∧∨∩∪∠√∏∑∫∴⊄⊆⊇⊥‰≈←↑→↓±ÉÊÈÐðË€¥£ƒ½¼¾¿«»≡≠¯µØ¶ßŠš§Þþ¨℘;ℜℵ∂∅∇◊♠♣♥♦ΑαΒβΓγΔδΕεΖζΗðΘθϑΙιΚκΛλΜμΝνΞξΟοΠπϖΡρΣσςΤτΥυϒΦφΧχΨψΩ';
// colors
Wysiwyg.prototype.colors=['000','030','060','090','0C0','0F0','300','330','360','390','3C0','3F0','600','630','660','690','6C0','6F0','003','033','063','093','0C3','0F3','303','333','363','393','3C3','3F3','603','633','663','693','6C3','6F3','006','036','066','096','0C6','0F6','306','336','366','396','3C6','3F6','606','636','666','696','6C6','6F6','009','039','069','099','0C9','0F9','309','339','369','399','3C9','3F9','609','639','669','699','6C9','6F9','00C','03C','06C','09C','0CC','0FC','30C','33C','36C','39C','3CC','3FC','60C','63C','66C','69C','6CC','6FC','00F','03F','06F','09F','0CF','0FF','30F','33F','36F','39F','3CF','3FF','60F','63F','66F','69F','6CF','6FF','900','930','960','990','9C0','9F0','C00','C30','C60','C90','CC0','CF0','F00','F30','F60','F90','FC0','FF0','903','933','963','993','9C3','9F3','C03','C33','C63','C93','CC3','CF3','F03','F33','F63','F93','FC3','FF3','906','936','966','996','9C6','9F6','C06','C36','C66','C96','CC6','CF6','F06','F36','F66','F96','FC6','FF6','909','939','969','999','9C9','9F9','C09','C39','C69','C99','CC9','CF9','F09','F39','F69','F99','FC9','FF9','90C','93C','96C','99C','9CC','9FC','C0C','C3C','C6C','C9C','CCC','CFC','F0C','F3C','F6C','F9C','FCC','FFC','90F','93F','96F','99F','9CF','9FF','C0F','C3F','C6F','C9F','CCF','CFF','F0F','F3F','F6F','F9F','FCF','FFF'];

Wysiwyg.prototype.size = {1:1,2:2,3:3,4:4,5:5,6:6,7:7};

Wysiwyg.prototype.typeList = {
	'basic': 'undo|redo!fnt!sz!b|i|u|abc!l|c|r|j',
	'full': 'undo|redo!fnt!sz!b|i|u|abc!l|c|r|j!al!ic|ex!ulst|olst'
}		

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