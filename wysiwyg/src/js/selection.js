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