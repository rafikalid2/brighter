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
