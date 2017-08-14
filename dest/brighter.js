'use strict';;/**
 * Console logger
 */
(function($){
	$.logger	= {
		debug		: function(){console.debug.apply(console, arguments);},
		info		: function(){console.info.apply(console, arguments);},
		warn		: function(){console.warn.apply(console, arguments);},
		error		: function(){console.error.apply(console, arguments);},
		fatalError	: function(){console.error.apply(console, arguments);}
	};

})(jQuery);;jQuery.createElement	= function(tagName, attributes, children){
	var e = document.createElement(tagName);
	if(attributes){
		for(var i in attributes){
			e.setAttribute(i, attributes[i]);
		}
	}
	if(children){
		if(typeof children == 'string'){
			var txt	= document.createTextNode(children);
			e.appendChild(txt);
		}else if(Array.isArray(children)){
			for(var i = 0; i < children.length; ++i)
				e.appendChild(children[i]);
		}else{
			e.appendChild(children);
		}
	}
	return e;
};;/**
 * Calendar
 */
(function($){
	var _defaultOptions	= {
		min			: 'infinit',
		max			: 'infinit',
		readonly	: false,
		today		: true,
		level		: 'years',
		format		: 'dd/MM/YYYY'
	};

	//i18n
		var i18nToday	= 'today';

	$.fn.calendar	= function(options){console.log('--- calendar')
		return this.each(function(){
			if(!this.firstChild){
				//init options
					var fOptions = {};
					for(var i in _defaultOptions){
						fOptions[i]	= this.getAttribute(i) || this.getAttribute('data-' + i) || options[i] || _defaultOptions[i];
					}
				//create element
					_initBasicCalendar.call(this, fOptions);
			}else{
				$.logger.warn('Calendar: ignore du container is not empty.');
			}
		});
	};

	// create calendar
	function _initBasicCalendar(options){
		var container	= _doc.createDocumentFragment();
		// top
			var header	= $.createElement('div',{
				'class'	: 'nowrap text-center'
			});
			container.appendChild(header);
			// left button
				var leftButton			= $.createElement('span',{
					'class'	: 'btn pull-left'
				},$.createElement('span',{
					'class'	: 'icon-left-open-big'
				}));
				header.appendChild(leftButton);
			// middle button
				var middleButton		= $.createElement('span',{
					'class'	: 'btn'
				});
				header.appendChild(middleButton);
			//right button
				var rightButton			= $.createElement('span',{
					'class'	: 'btn pull-right'
				},$.createElement('span',{
					'class'	: 'icon-right-open-big'
				}));
				header.appendChild(rightButton);
		// middle (content)
			var contentContainer	= $.createElement('div');
			container.appendChild(contentContainer);
		// today button
			if(options.today){
				var todayBtn		= $.createElement('span',{
					'class'	: 'btn block'
				}, i18nToday);
				container.appendChild(todayBtn);
			}
		// add to container
			this.append(container);
	}
})(jQuery);;(function(){
	// change jQuery DOM fx
		
	// init body
		_initDOM($(document.body));
	// init
		function _initDOM($container){
			// calendar
				_initDOMFilter($container, '[data-calendar]:empty', 'calendar');
		}

		function _initDOMFilter($container, selector, jQueryFx){
			try{
				if($container.filter(selector).length)
					$container[jQueryFx]();
				else
					$container.find(selector)[jQueryFx]();
			}catch(e){
				$.logger.fatalError(e);
			}
		}
})();