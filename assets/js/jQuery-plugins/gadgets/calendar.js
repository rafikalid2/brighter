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

	//basic calendar
		var YEAR_ROW_COUNT			= 4; // count of years in the year panel
		var YEAR_PER_ROW			= 4;
		var CURRENT_YEAR_POSITION	= Math.round(YEAR_ROW_COUNT * YEAR_PER_ROW / 2);

	//i18n
		var i18nToday		= 'Today';
		var i18nMonths		= ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		var i18nMonthsAbbr	= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

		var i18nDaysOfWeek	= ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		var i18nDaysFull	= ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


	$.fn.calendar	= function(options){
		return this.empty().each(function(){
			//init options
				var fOptions = {};
				for(var i in _defaultOptions){
					fOptions[i]	= this.getAttribute(i) || this.getAttribute('data-' + i) || options[i] || _defaultOptions[i];
				}
			//create element
				new BasicCalendar(this, fOptions);
		});
	};

/////////////////////////////// basic calendar ///////////////////////////////
	function BasicCalendar(container, options){
		this.options	= options;
		this.container	= container;

		//date
			var currentDate = new Date();
		// init calendard
			this._init();
		// add years
			// this._createYears(currentDate.getFullYear() - CURRENT_YEAR_POSITION);
			// var fragment = this._createMonths();
			// var fragment	= this._createDays(2017, 7);
			var fragment	= this._createTimer();
			this.contentDiv.appendChild(fragment);
	}

	$.extend(BasicCalendar.prototype,{
		_init		: _initBasicCalendar,

		_setTitle	: _basicCalendarSetTitle,

		_createYears	: _basicCalendarCreateYears,
		_createMonths	: _basicCalendarCreateMonths,
		_createDays		: _basicCalendarCreateDays,
		_createTimer	: _basicCalendarCreateTimer
	});

	// create calendar
	function _initBasicCalendar(){
		var options	= this.options;
		var container	= document.createDocumentFragment();
		// head
			var headerBuilder	= $.createElement('div').attr('class','nowrap text-center clearfix');
			container.append(headerBuilder.get());

			// left button
				var leftButtonBuilder	= $.createElement('span')
					.attr('class', 'btn pull-left')
					.append(
						$.createElement('span')
							.attr('class', 'icon-left-open-big')
							.get()
					);
				headerBuilder.append(leftButtonBuilder.get());

			// middle button
				var middleButton		= $.createElement('span').attr('class','btn');
				headerBuilder.append(middleButton.get());
				this._titleBtn	= middleButton;
			//right button
				var rightButton			= $.createElement('span')
					.attr('class','btn pull-right')
					.append(
						$.createElement('span')
							.attr('class', 'icon-right-open-big')
							.get()
					);
				headerBuilder.append(rightButton.get());
		// middle (content)
			var contentDiv	= $.createElement('div').attr('class', 'nowrap').get();
			container.appendChild(contentDiv);
			this.contentDiv	= contentDiv;

		// today button
			if(options.today){
				container.append(
					$.createElement('span')
						.attr('class', 'btn block')
						.text(i18nToday)
						.get()
				);
			}
		// add to container
			this.container.append(container);
	}

	function _basicCalendarSetTitle(title){
		this._titleBtn.innerText(title);
	}

	function _basicCalendarCreateYears(startYear){
		var fragment	= document.createDocumentFragment();
		var currentYear	= startYear;
		for(var i = 0; i < YEAR_ROW_COUNT; ++i){
			var row	= $.createElement('div');
			for(var j =0; j < YEAR_PER_ROW; ++j){
				row.append(
					$.createElement('span')
						.attr('class', 'btn')
						.text(currentYear++)
						.get()
				);
			}
			fragment.appendChild(row.get());
		}
		return fragment;
	}

	function _basicCalendarCreateMonths(){
		var container	= $.createElement('div')
				.attr('class', 'calendar-months');
		for(var i=0; i < i18nMonths.length; ++i){
			container.append(
				$.createElement('span')
					.attr('class', 'btn')
					.text(i18nMonths[i])
					.get()
			);
		}
		return container.get();
	}

	function _basicCalendarCreateDays(year, month){
		var container	= $.createElement('div').attr('class', 'calendar-days');
		//add day header
			var headerRow = $.createElement('div').attr('class', 'nowrap');
			for(var i = 0; i < i18nDaysOfWeek.length; ++i){
				headerRow.append(
					$.createElement('b')
						.text(i18nDaysOfWeek[i])
						.get()
				);
			}
			container.append(headerRow.get());
		// add dates
			var currentDate	= new Date(year, month, 1);
		// get next month
			var nextMonth	= currentDate.getMonth() + 1;
			if(nextMonth == 12)
				nextMonth = 0;
		// start date of week
			if(currentDate.getDay() > 0)
				currentDate.setDate(-currentDate.getDay());
		//show dates
			while(currentDate.getMonth() != nextMonth){
				var row 	= $.createElement('div').attr('class', 'nowrap');
				for(var i = 0; i < 7; ++i){
					var cDate	= currentDate.getDate();
					var dayBuilder	= $.createElement('span')
							.attr('class', 'btn')
							.text(cDate);
					if(currentDate.getMonth() != month)
						dayBuilder.addClass('disabled');
					row.append(dayBuilder.get());
					currentDate.setDate(cDate + 1);
				}
				container.append(row.get());
			}
		// end
			return container.get();
	}

	function _basicCalendarCreateTimer(){
		var container	= $.createElement('form').attr('class', 'calendar-timer drum-inline-block');
		//var timerBuilder= $.createElement('div').attr('class', 'tmer-vp');
		
			container.append(_basicCalendarCreateTimerAddSelect(0,23)); // hours
			container.appendText(':');
			container.append(_basicCalendarCreateTimerAddSelect(0,59)); // mins
			container.appendText(':');
			container.append(_basicCalendarCreateTimerAddSelect(0,59)); // secondes

			// $(container).children().drum({
			// 	//onChange : function(selectedOption){}
			// });
		// hours
		// 	var hours = new TimerGroup(0, 11, 2);
		// 	timerBuilder.append(hours.getContainer());

		// container.append(timerBuilder.get());
		return container.get();
	}

	function _basicCalendarCreateTimerAddSelect(min, max){
		var selectElement	= $.createElement('select').get();
		for(var i = min; i <= max; ++i){
			$.createElement('option')
				.attr('value', i)
				.text(i)
				.appendTo(selectElement);
		}
		return selectElement;
	}

	// // timer
	// 	function TimerGroup(start, end, countNbrs){
	// 		var container	= $.createElement('div').attr('class', 'tmer-c').get(0);
	// 		this.container	= container;
	// 		var parts		= [];
	// 		this.parts		= parts;
	// 		for(var i = start; i< end; ++i){
	// 			parts.push(
	// 				$.createElement('div')
	// 					.attr('class', 'tmer-v')
	// 					.text(i)
	// 					// .css('transform', 'rotateX(-45deg) translateZ(63px)')
	// 					.appendTo(container)
	// 					.get()
	// 			);
	// 		}
	// 		this.setSelectedItem(0);
	// 	}
	// 	var TIMER_DEG_FRAC		= 10;
	// 	var TIMER_TRRANSLATE_BY	= 30;
	// 	$.extend(TimerGroup.prototype,{
	// 		getContainer	: function(){return this.container;},
	// 		setSelectedItem	: function(index){

	// 		}
	// 	});

})(jQuery);