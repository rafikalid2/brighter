/**
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
})(jQuery);