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
