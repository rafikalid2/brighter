/**
* this is a "div" based wysiwyg
* this creates wysiwyg for first item only
**/
(function(){
/**
* Global vars
**/
	var emoPath=resources + 'images/e/';
	var barreOutils={
		b		:'Bold',
		i		:'Italic',
		u		:'Underline',
		abc		:'StrikeThrough',
		
		l		:'JustifyLeft',
		c		:'JustifyCenter',
		r		:'JustifyRight',
		j		:'JustifyFull',
		
		ic		:'subscript',
		ex		:'superscript',
		
		rdl		:'Unlink',//remove link
		
		annuler	:'Undo',
		repeter	:'Redo',
		
		lst		:'insertUnorderedList',
		ls2		:'insertOrderedList'
	};
	var btnIcons = {
		a		:'font',
		bg		:'brush',

		emo		:'smile',
		csp		:'language',

		b		:'bold',
		i		:'italic',
		u		:'underline',
		abc		:'strike',
		
		l		:'align-left',
		c		:'align-center',
		r		:'align-right',
		j		:'align-justify',
		
		ic		:'subscript',
		ex		:'superscript',
		
		rdl		:'unlink',//remove link
		
		annuler	:'ccw-1',
		repeter	:'cw',
		
		lst		:'list-bullet',
		ls2		:'list-numbered'
	};
	/**
	* les emoticons et leurs correspondances images
	**/
		var em={
			':)'	:1,
			';)'	:10,
			':('	:53,
			'x('	:35,
			':d'	:14,
			':D'	:14,
			':p'	:69,
			':P'	:69,
			'^_^'	:2,
			':\'('	:68,
			'8)'	:63,
			'(.v.)'	:65,//alien
			'(.V.)'	:65,
			'*_*'	:52,
			'<3'	:77,
			'</3'	:78,
			'O.o'	:56,
			'>:)'	:37//evil
		};
	/**
	* tools
	**/
		var defaultTools='b|i|u|abc!l|c|r|j!a|bg!csp|emo!ic|ex';//|emo
		var tools={
			full : 'fs!annuler|repeter!b|i|u|abc!l|c|r|j!a|bg!csp|emo!ic|ex'
		}
		var fonts={'Andale Mono':'andale mono, times','Arial':'arial, helvetica, sans-serif','Arial Black':'arial black, avant garde','Book Antiqua':'book antiqua, palatino','Comic Sans MS':'comic sans ms, sans-serif','Courier New':'courier new, courier','Georgia':'georgia, palatino','Helvetica':'helvetica','Impact':'impact, chicago','Symbol':'symbol','Tahoma':'tahoma, arial, helvetica, sans-serif','Terminal':'terminal, monaco','Times New Roman':'times new roman, times','Trebuchet MS':'trebuchet ms, geneva','Verdana':'verdana, geneva','Webdings':'webdings','Wingdings':'wingdings, zapf dingbats'};
		var chars='@€ÁáÂâÆæÅåÃãä¸¢©®™¤°÷×↔⊕⊗↵⇐⇑⇒⇓⇔∀∃∈∉∋√≤≥∧∨∩∪∠√∏∑∫∴⊄⊆⊇⊥‰≈←↑→↓±ÉÊÈÐðË€¥£ƒ½¼¾¿«»≡≠¯µØ¶ßŠš§Þþ¨℘;ℜℵ∂∅∇◊♠♣♥♦ΑαΒβΓγΔδΕεΖζΗðΘθϑΙιΚκΛλΜμΝνΞξΟοΠπϖΡρΣσςΤτΥυϒΦφΧχΨψΩ';
		var colors=['000','030','060','090','0C0','0F0','300','330','360','390','3C0','3F0','600','630','660','690','6C0','6F0','003','033','063','093','0C3','0F3','303','333','363','393','3C3','3F3','603','633','663','693','6C3','6F3','006','036','066','096','0C6','0F6','306','336','366','396','3C6','3F6','606','636','666','696','6C6','6F6','009','039','069','099','0C9','0F9','309','339','369','399','3C9','3F9','609','639','669','699','6C9','6F9','00C','03C','06C','09C','0CC','0FC','30C','33C','36C','39C','3CC','3FC','60C','63C','66C','69C','6CC','6FC','00F','03F','06F','09F','0CF','0FF','30F','33F','36F','39F','3CF','3FF','60F','63F','66F','69F','6CF','6FF','900','930','960','990','9C0','9F0','C00','C30','C60','C90','CC0','CF0','F00','F30','F60','F90','FC0','FF0','903','933','963','993','9C3','9F3','C03','C33','C63','C93','CC3','CF3','F03','F33','F63','F93','FC3','FF3','906','936','966','996','9C6','9F6','C06','C36','C66','C96','CC6','CF6','F06','F36','F66','F96','FC6','FF6','909','939','969','999','9C9','9F9','C09','C39','C69','C99','CC9','CF9','F09','F39','F69','F99','FC9','FF9','90C','93C','96C','99C','9CC','9FC','C0C','C3C','C6C','C9C','CCC','CFC','F0C','F3C','F6C','F9C','FCC','FFC','90F','93F','96F','99F','9CF','9FF','C0F','C3F','C6F','C9F','CCF','CFF','F0F','F3F','F6F','F9F','FCF','FFF'];//les couleurs
		var basicColors=['000','CCC','F00','0F0','00F','0FF','FF0','F0F','FFF'];//les couleurs de base
		var defaultColor = {
			a : '#000000',//font color
			bg: '#ffffff'//font background color
		}
		var _emoticonCount = 94;
/**
* execute commande
**/
	function _executeCommand(command, option){
		try{
			document.execCommand(command, false, option);
			return true;
		}catch(x){
			console.error(x);
		}
		return false;
	}
/**
* insert HTML
**/
	function _insertHTML($element){
		var doc=document;
		var rng=doc.getSelection();
		var strtOffset=rng.focusOffset;
		var anchorNode=rng.anchorNode;
		var $anchorNode=$(rng.anchorNode);
		if($anchorNode.hasClass('wysiwyg-editor')){
			$element.prependTo(anchorNode);
		}
		else{
			var txt=anchorNode.wholeText;
			$element.insertBefore($anchorNode);
			if(txt){
				$element.before(document.createTextNode(txt.substr(0,strtOffset)));
				$anchorNode.after(document.createTextNode(txt.substr(strtOffset)));
			}
			$anchorNode.remove();
		}
	}

/**
* Add wysiwyg plugin to jQuery
**/
$.fn.tirra=function(options){
	if(!options)
		options={};

	/**
	* root div
	**/
		var $baseDiv=this.eq(0);
		if(!$baseDiv)
			throw new Error('jQuery collection is empty! could not create wysiwyg');
		var $editorDiv;
	/**
	* create the editor
	**/
		if($baseDiv.hasClass('wysiwyg'))
			$editorDiv = $baseDiv.find('>.wysiwyg-editor');
		else{
			try{
				$baseDiv
					.addClass('wysiwyg clearfix')
					.contextmenu(function(event){
						event.stopPropagation();
						return false;
					});
				/**
				* Editor div
				**/
				var $editorDiv=$('<div class="wysiwyg-editor select">')
									.attr({
										contenteditable : true
									})
									.bind(_md, function(event){event.stopPropagation();})
									.click(_getComputedStyle);
				/**
				* default contextMenu
				**/
					$editorDiv.contextmenu(function(event){
						event.stopPropagation();
						return true;
					});
				if(options.height)
					$editorDiv.height(options.height);

				/**
				* content
				**/
					if('text' in options)
						$editorDiv.text(options.text);
					else if('html' in options){
						setContent(options.html);
					}
					else
						setContent($baseDiv.html() || '');
				/**
				* events::keypress
				**/
					$editorDiv
						.bind('keypress', _kpress)
						.keydown(_keydown)
						.keyup(_arrowInterceptor);
						// .focus(function(){
						// 	$editorDiv
								
						// })
						// .blur(function(){
						// 	$editorDiv
						// 		.unbind('keypress', _kpress)
						// 		.unbind('keydown', _keydown)
						// 		.unbind('keyup', _arrowInterceptor);
						// });
				/**
				* append editor
				**/
					$editorDiv.appendTo($baseDiv);
				/**
				* buttons
				**/
					if(options.compact)
						setCompact();
					else
						showButtons();
				/**
				* focus
				**/
					if(options.focus){
						//focus
							$editorDiv.focus();
					}
				/**
				* if the text is empty or untitled it selects all the text
				**/
					var txt = $editorDiv.text();
					if (txt == lg.empty || txt == lg.noTitle) {
						_executeCommand('selectAll', null);
					}

			}catch(err){
				logger.error(this,err);
			}
		}
	/**
	* Set html content
	* this uses jQuery plugin "insert" whitch is secured from injections
	**/
		function setContent(html){
			$editorDiv
				.empty()
				.insert(html)
			// change imoticons from span to images
				.find('span[class^="emo-"]').each(function(){
					try{
						var _q=this.className.match(/emo-([0-9]+)/)[1];
						$('<img>')
							.attr({
								'data-emo'	: _q,
								src			: emoPath+_q+'.png'
							})
							.insertAfter(this);
						$(this).remove();
					}catch(e){
						logger.error(this,e);
					}
				});
			// supprimer les span.style.align=inilial
				$editorDiv.find('span').each(function(){
					if(this.style.textAlign == 'initial')
						this.style.textAlign = '';
				});
		}
	/**
	* show in compact mode (minimal buttons (emoticons and button to switch view))
	**/
		function setCompact(){
			$baseDiv.find('>.wysiwyg-full').hide();
			var $compactDiv = $baseDiv.find('>.wysiwyg-compact').show();
			/**
			* create buttons if not exist
			**/
			if(!$compactDiv.length){
				$compactDiv= $('<div class="wysiwyg-compact btn-group btn-group-xs pull-left mt5">');
				//switch to full mode
					$('<div class="btn btn-default icon-fontsize">')
						.appendTo($compactDiv)
						.click(showButtons);
				//emoticon
					var $emoBtnContainer = $('<div class="btn-group btn-group-xs dropup">');
					var $emoBtn = $('<span class="btn btn-default dropdown-toggle icon-smile" data-toggle="dropdown">');
					$emoBtn.appendTo($emoBtnContainer);
					var $emoMenu = $('<ul class="dropdown-menu">');
					$emoBtn.click(function(){
						_addEmoticons($emoMenu);
						$emoBtn.unbind('click');
					});
					$emoMenu.appendTo($emoBtnContainer);
					$emoBtnContainer.appendTo($compactDiv);
				//append
					$compactDiv.insertAfter($editorDiv);
			}
		}
	/**
	* show required buttons
	**/
		function showButtons(){
			$baseDiv.find('>.wysiwyg-compact').hide();
			if(!$baseDiv.find('>.wysiwyg-full').show().length){
				/**
				* create required buttons
				**/
				var dvs=(options.tools && tools[options.tools] || defaultTools).split('@');//!adl|rdl
				for(var i in dvs){
					//create toolbar
						var $toolbar = $('<div class="btn-toolbar wysiwyg-full">');
					//create groupes
						var line = dvs[i].split('!');
						for(var j in line){
							//create group
								var $group = $('<div class="btn-group btn-group-xs">').appendTo($toolbar);
							//create buttons
								$.each(line[j].split('|'), function(ig, tmpKey){
									//fontSize
										if(tmpKey=='fs'){
											//font
												var $fontBtnContainer = $('<div class="btn-group dropup">');
												var $fontBtn = $('<span class="btn btn-xs btn-default dropdown-toggle" data-toggle="dropdown">')
															.text(' ');
												var $fontText = $('<span class="fnt">').text('Verdana ').prependTo($fontBtn);
												$('<u class="caret">').appendTo($fontBtn);
												$fontBtn.appendTo($fontBtnContainer);
												var $fontMenu = $('<ul class="dropdown-menu">');
												for(var i in fonts)
													(function (i) {
														$('<li>')
															.css('font-family',fonts[i])
															.text(i)
															.click(function(){
																$fontText.text(i);
																_executeCommand('fontname',fonts[i]);
																$editorDiv.focus();
															})
															.appendTo($fontMenu);
													})(i);
												$fontMenu.appendTo($fontBtnContainer);
												$fontBtnContainer.appendTo($group);
											//size
												var $sizeBtnContainer = $('<div class="btn-group dropup">');
												var $sizeBtn = $('<span class="btn btn-xs btn-default dropdown-toggle" data-toggle="dropdown">')
															.text(' ');
												var $sizeText = $('<span class="sze">').text('12 ').prependTo($sizeBtn);
												$('<u class="caret">').appendTo($sizeBtn);
												$sizeBtn.appendTo($sizeBtnContainer);
												var $sizeMenu = $('<ul class="dropdown-menu">');
												for(var i=8;i<=40;i++)
													(function (i) {
														$('<li>')
															.css('font-size',i)
															.text(i)
															.click(function(){
																$sizeText.text(i);
																_executeCommand('fontSize', 2);
																$editorDiv.focus();
																// normally we have to check that the selection is in the editor of this button and not other selection
																// but this problem happens for the other buttons so it doesn't have to be checked here if solved for all
																if (!window.getSelection().toString().length)
																	$editorDiv
																		.on('keyup.size', function(e) {
																			//maybe setting a timeout here to let the font be built correctly would be better would be better
																			if (e.which !== 0 &&
																				!e.ctrlKey && !e.metaKey && !e.altKey) {
																					$(this)
																						.find('font[size=2]')
																						.removeAttr('size')
																						.css("font-size",i);
																					//.size is maid to avoid unbinding the arrowinterceptor
																					// need to do it separately not with above
																					$(this).off('keyup.size');
																			}
																		});
																else
																	$editorDiv
																		.find('font[size=2]')
																		.removeAttr('size')
																		.css("font-size",i);
															})
															.appendTo($sizeMenu);
													})(i);
												$sizeMenu.appendTo($sizeBtnContainer);
												$sizeBtnContainer.appendTo($group);
										}
									//font color & font background color
										else if(tmpKey=='a' || tmpKey=='bg'){
											var $aContainer = $('<div class="btn-group btn-group-xs dropup">');
											var $aIcon= $('<span class="btn-brdr">')
															.addClass('icon-' + btnIcons[tmpKey])
															.css('border-bottom-color', defaultColor[tmpKey])
															.attr('data-color', defaultColor[tmpKey]);
											var $aBtn = $('<span class="btn btn-default">')
															.click(function(){
																var color = $aIcon.attr('data-color');
																if(tmpKey == 'a')//font color
																	_executeCommand('ForeColor', color);
																else{//background color
																	if(!_executeCommand('HiliteColor', color))
																		_executeCommand('BackColor', color);
																}
																$editorDiv.focus();
															})
															.appendTo($aContainer);
											$aIcon.appendTo($aBtn);

											var $aPalette = $('<div class="dropdown-menu">');
											var $aArrow = $('<span class="btn btn-default arrow dropdown-toggle" data-toggle="dropdown">')
															.appendTo($aContainer)
															.click(function(){
																_addColorPalette($aPalette, $aIcon, tmpKey);
																$aArrow.unbind('click');
															});
											$('<span class="caret">').appendTo($aArrow);
											$aPalette.appendTo($aContainer);
											$aContainer.appendTo($group);
										}
									//les emoticons & les carac speciaux
										else if(tmpKey == 'emo' || tmpKey == 'csp'){
											var $emoBtnContainer = $('<div class="btn-group dropup">');
											var $emoBtn = $('<span class="btn btn-xs btn-default dropdown-toggle" data-toggle="dropdown">');
											//icon
												$('<span>')
															.addClass('icon-' + btnIcons[tmpKey])
															.appendTo($emoBtn);
											$emoBtn.appendTo($emoBtnContainer);
											var $emoMenu = $('<ul class="dropdown-menu">');
											$emoBtn.click(function(){
												if(tmpKey == 'emo')
													_addEmoticons($emoMenu);
												else
													_addSpecialChars($emoMenu);
												$emoBtn.unbind('click');
											});
											$emoMenu.appendTo($emoBtnContainer);
											$emoBtnContainer.appendTo($group);
										}
									//autres boutons
										else{
											var $btn = $('<span class="btn btn-default">')
															.addClass('b'+tmpKey)
															.addClass('icon-' + btnIcons[tmpKey])
															.appendTo($group);
											//commande
												if(barreOutils[tmpKey])
													$btn.click(function(){
														if(tmpKey != 'annuler' && tmpKey != 'repeter'){
															if(
																tmpKey == 'l'
																|| tmpKey == 'c'
																|| tmpKey == 'r'
																|| tmpKey == 'j'
															) {
																$btn.parent().find('.active').removeClass('active');
																$btn.addClass('active');
															}
															else if (tmpKey == 'b'
																|| tmpKey == 'i'
																|| tmpKey == 'u'
																|| tmpKey == 'abc') {
																if ($btn.hasClass('active'))
																	$btn.removeClass('active');
																else
																	$btn.addClass('active');
															}
															else if (tmpKey == 'ic' || tmpKey == 'ex') {
																if ($btn.hasClass('active')) {
																	// I don't know why need to be executed twice to cancel
																	_executeCommand(barreOutils[tmpKey],null);
																	$btn.removeClass('active');
																}
																else {
																	$btn.parent().find('.active').removeClass('active');
																	$btn.addClass('active');
																}
															}
														}
														_executeCommand(barreOutils[tmpKey],null);
														$editorDiv.focus();
													});
												else console.error('<!> unknow commande: '+tmpKey)
										}
								});
						}
					//add toolbar
						$toolbar.insertAfter($editorDiv);
						_getComputedStyle();
				}
			}
		}
	/**
	* add color palette
	**/
		function _addColorPalette($dv, $btn, option){
			var _currentColor = $btn.attr('data-color');
			/**
			* choose a color
			**/
			function _chooseColor(){
				var color = _currentColor.charAt(0)
							+ _currentColor.charAt(1) + _currentColor.charAt(1)
							+ _currentColor.charAt(2) + _currentColor.charAt(2)
							+ _currentColor.charAt(3) + _currentColor.charAt(3);
				//btn border
					$btn
						.attr('data-color', color)
						.css('border-bottom-color', color);
				//apply
					if(option == 'a')//font color
						_executeCommand('ForeColor', color);
					else{//background color
						if(!_executeCommand('HiliteColor', color))
							_executeCommand('BackColor', color);
					}
					$editorDiv.focus();
			}
			//preview
				var $preview = $('<span class="dspCell">')
								.css('background', _currentColor)
								.click(_chooseColor);
			//les couleurs principales
				var $basicColors = $('<div class="dspTble palette basic-colors">');
				for(var i in basicColors)
					(function(color){
						$('<span class="dspCell">')
							.css('background','#'+color)
							.bind(_mo, function(){
								_currentColor = '#' + color;
								$preview.css('background', _currentColor);
							})
							.click(_chooseColor)
							.appendTo($basicColors);
					})(basicColors[i]);
				$preview.appendTo($basicColors);
			//les autres couleurs
				var $generalColors = $('<div class="dspTble palette">');
				var c=0;
				var $tmpSp=null;
				for(var i in colors)
					(function (color){
						if(!c)
							$tmpSp=$('<span class="dspRow">');
						$('<span class="dspCell">')
							.css('background','#'+color)
							.bind(_mo, function(){
								_currentColor = '#' + color;
								$preview.css('background', _currentColor);
							})
							.click(_chooseColor)
							.appendTo($tmpSp);
						++c;
						if(c>17){
							$tmpSp.appendTo($generalColors);
							c=0;
						}
					})(colors[i]);
				$generalColors.appendTo($dv);
				$basicColors.appendTo($dv);
		}
	/**
	* add emoticons
	**/
		function _addEmoticons($dv){
			$dv.addClass('mn-box')
			for(var i=1; i<_emoticonCount; i++)
				(function (i) {
					$('<img>')
						.attr({
							src	: emoPath + i + '.png'
						})
						.appendTo(
							$('<li>')
								.click(function(){
									_insertHTML(
										$('<img>')
											.attr({
												src			: emoPath + i + '.png',
												'data-emo'	: i
											})
									);
									$editorDiv.focus();
								})
								.appendTo($dv)
						);
				})(i);
		}
	/**
	* add special chars
	**/
		function _addSpecialChars($dv){
			$dv.addClass('mn-box')
			for(var i=1; i<chars.length; i++)
				(function (i, char) {
					$('<li class="bx">')
						.text(char)
						.click(function(){
							_insertHTML(
								$(document.createTextNode(char))
							);
							$editorDiv.focus();
						})
						.appendTo($dv);
				})(i, chars.charAt(i));
		}
	/**
	* on key press
	**/
		function _keydown(event){
			return options.keydown && options.keydown(event,$editorDiv);
		}
		function _kpress(event){
			try{
				//changement de contenu
				var c = event.which || event.keyCode;
				if(c==32 || c==13){//espace ou retour en ligne
					var _selection = document.getSelection();
					var anchorNode = _selection.anchorNode;
					var $anchorNode=$(anchorNode);
					//si un deja un lien; ne rien faire
					if($anchorNode.parents('a').length){}

					//ajouter ici un traitement pour les codes source
					else{ //text normale
						//get last word
					    	var _nodeValue = anchorNode.nodeValue;//wholeText
					    	if(!_nodeValue)
					    		return true;
					    	var _cursorOffset = _selection.baseOffset || _selection.focusOffset;
					    	if(_cursorOffset == 0)
					    		return true;
				    		_lastWord = _nodeValue.substr(0, _cursorOffset);
				    		var _gtlst = _lastWord.match(/[^\s]+$/);
				    		if(!_gtlst || !_gtlst.length)
				    			return true;
				    		var _spaceLastIndex = _lastWord.length - _gtlst[0].length;
							_lastWord = _gtlst[0];
					    	var textBefore	= _nodeValue.substr(0, _spaceLastIndex);
					    	var textAfter	= _nodeValue.substr(_cursorOffset);
					    //if is an emoticon
					    	if(_lastWord in em){
					    		var s = em[_lastWord];
					    		var $img = $('<img>')
									.attr({
										'data-emo'	: s,
										src			: emoPath + s + '.png'
									});
								$img.insertBefore($anchorNode);
								if(textBefore)
									$img.before(document.createTextNode(textBefore));
								if(textAfter)
									$anchorNode.after(document.createTextNode(textAfter));
								$anchorNode.remove();
					    	}
					    //if is a link
					    	else{
					    		if(_lastWord.match(/^(https?|ftp|file):\/\/.+$/i)){
					    			var $a = $('<a>')
										.attr('href',_lastWord)
										.text(_lastWord)
										.insertBefore($anchorNode);
									if(textBefore)
										$a.before(document.createTextNode(textBefore));
									if(textAfter)
										$anchorNode.after(document.createTextNode(textAfter));
									$anchorNode.remove();
					    		}
					    	}
					}
				}
				if(options.keypress && !options.keypress(event,$editorDiv)){
					return false;
				}
				return true;
			}catch(x){
				console.error(x)
			}
		}
	/**
	* get computed styles & activate related buttons
	**/
		function _arrowInterceptor(event){
			var c = event.keyCode;
			if(c<=40 && c>=37)
				_getComputedStyle();
			if(options.keyup)
				options.keyup(event, $editorDiv);
		}
		function _getComputedStyle(){
			try{
				var style = window.getComputedStyle(document.getSelection().anchorNode.parentNode);
				var $tools = $baseDiv.find('.wysiwyg-full');
				if(!$tools.length)
					return false;
				$tools.find('.active').removeClass('active');
				//font family
					var a = style.fontFamily;
					var idx = a.indexOf(',');
					if(idx > -1)
						a = a.substr(0, idx).trim();
					$tools.find('.fnt').text(style.fontFamily.split(',')[0].trim());
				//font size
					$tools.find('.sze').text(style.fontSize.replace('px',' '));
				//bold
					if(style.fontWeight == 'bold' || style.fontWeight == 700)
						$tools.find('.bb').addClass('active');
				//italic
					if(style.fontStyle == 'italic')
						$tools.find('.bi').addClass('active');
				//underline
					var _textDecoration = style.webkitTextDecorationsInEffect || style.textDecoration;
					if(_textDecoration.indexOf('underline')>-1)
						$tools.find('.bu').addClass('active');
				//line-through
					if(_textDecoration.indexOf('line-through')>-1)
						$tools.find('.babc').addClass('active');
				//text align
					a= style.textAlign.replace('-moz-','');
					$tools.find(
						a == 'center'? '.bc'
						:(
							a=='right'?'.br'
							:(
								a=='justify'?'.bj'
								:'.bl'
							)
						)
					).addClass('active');
				//sub
					if(style.top && style.top.startsWith('-'))
						$tools.find('.bex').addClass('active');
				//sup
					else if(style.bottom && style.bottom.startsWith('-'))
						$tools.find('.bic').addClass('active');
			}catch(err){
				console.error(err);
			}
		}
	/**
	* returned object
	**/
		return {
			direction : function(){
				return $editorDiv.attr('dir') || $body.attr('dir') || 'ltr';
			},
			get:function(){
				var $body=$editorDiv.clone();
				//restituler les emoticon
					$body.find('img[data-emo]').each(function(){
						var $this=$(this);
						$('<span>')
							.addClass('emo-'+$this.attr('data-emo'))
							.insertBefore($this);
						$this.remove();

					});
				return $body;
			},
			text : function(){
				return $editorDiv.text();
			},
			html : function(){
				return this.get().html();
			},
			empty: function(){
				$editorDiv.empty();
			}
		};
};
})();