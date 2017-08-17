/**
 * Calendar
 */
(function($){
	var ANIMATION_DURATION	= 300; //ms
	var LEVELS				= ['year', 'month', 'day', 'time'];


	var _defaultOptions	= {
		value		: '',
		min			: Infinity,
		max			: Infinity,
		readonly	: false,
		today		: true,
		level		: 'year',
		format		: $.i18n.get('dateFormat')
	};

	//basic calendar
		var YEAR_ROW_COUNT			= 4; // count of years in the year panel
		var YEAR_PER_ROW			= 4;
		var CURRENT_YEAR_POSITION	= Math.round(YEAR_ROW_COUNT * YEAR_PER_ROW / 2);

	//i18n
		var i18nToday		= $.i18n.get('today');
		var i18nMonths		= $.i18n.get('months'); // ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		var i18nMonthsAbbr	= $.i18n.get('monthsAbbr'); // ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

		var i18nDaysOfWeek	= $.i18n.get('daysAbbr'); // ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		var i18nDaysFull	= $.i18n.get('days'); // ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


		var i18nMonthYearFormat		= $.i18n.get('MonthYearFormat'); // 'MM yyyy';
		var i18nMonthYearDayFormat	= $.i18n.get('dateFormat'); // M, dd yyyy

	$.fn.calendar	= function(options){
		if(!options)
			options	= {};
		return this
				.empty()
				.addClass('calendar')
				.each(function(){
					//init options
						var fOptions = {};
						for(var i in _defaultOptions){
							fOptions[i]	= this.getAttribute(i) || this.getAttribute('data-' + i) || options[i] || _defaultOptions[i];
						}
					// init value
						try{
							if(fOptions.value && !(fOptions.value instanceof Date)){
								if(fOptions.value.match(/^[0-9]+$/))
									fOptions.value	= new Date(parseInt(fOptions.value));
								else{
									if(fOptions.value.startsWith('T'))
										fOptions.value	= '2017-01-01' + fOptions.value;
									fOptions.value		= new Date(fOptions.value);
								}
							}
						}catch(e){
							$.logger.error(e);
						}
					//create element
						new BasicCalendar(this, fOptions);
				});
	};

/////////////////////////////// basic calendar ///////////////////////////////
	function BasicCalendar(container, options){
		this.options	= options;
		this.value		= options.value;
		this.container	= container;

		//date
			var currentDate = new Date(options.value && options.value.getTime() || undefined);
		// format
			this._initFormat();
		// init calendard
			this._init();
		// current lavel
			var level;
			if(options.level){
				if(this._format.hasOwnProperty(options.level))
					level	= options.level;
				else
					$.logger.warn('CALENDAR: incorrect level: ', options.level, ', format is: ', options.format);
			}
			if(!level){
				for(var i=0; i< LEVELS.length; ++i){
					if(this._format.hasOwnProperty(LEVELS[i])){
						level	= LEVELS[i];
						break;
					}
				}
				if(!level)
					throw new Error('Calendar: Could not get a correct level');
			}
			this._level	= level;
		// add fragment
			this.contentDiv.appendChild(this._createFragment(currentDate));
	}

	$.extend(BasicCalendar.prototype,{
		getValue		: _basicCalendarGetValue,
		select			: _basicCalendarSelect,

		_init			: _initBasicCalendar,
		_initFormat		: _basicCalendarInitFormat,

		_setTitle		: _basicCalendarSetTitle,

		_createFragment	: _basicCalendarCreateFragment,

		_animSlide		: _basicCalendarAnimSlide,
		_animFade		: _basicCalendarAnimFade,

		_goUp			: _basicCalendarGoUp,

		_createYears	: _basicCalendarCreateYears,
		_createMonths	: _basicCalendarCreateMonths,
		_createDays		: _basicCalendarCreateDays,
		_createTimer	: _basicCalendarCreateTimer,

		_slideBtns		: _basicCalendarSlideBtnsVisiblity
	});

	// create calendar
	function _initBasicCalendar(){
		var self		= this;
		var options		= this.options;
		var container	= document.createDocumentFragment();
		// head
			var headerBuilder	= $.createElement('div').attr('class','nowrap text-center clearfix');
			container.append(headerBuilder.get());

			// left button
				var leftButton	= $.createElement('span')
					.attr('class', 'btn pull-left')
					.append(
						$.createElement('span')
							.attr('class', 'icon-left-open-big')
							.get()
					)
					.click(function(){
						self._animSlide(-1);
					})
					.get();
					this._leftButton	= leftButton;
				headerBuilder.append(leftButton);

			// middle button
				var middleButton		= $.createElement('span')
						.attr('class','btn')
						.click(function(){
							self._goUp();
						})
						.get();
				headerBuilder.append(middleButton);
				this._titleBtn	= middleButton;
			//right button
				var rightButton			= $.createElement('span')
					.attr('class','btn pull-right')
					.append(
						$.createElement('span')
							.attr('class', 'icon-right-open-big')
							.get()
					)
					.click(function(){
						self._animSlide(1);
					})
					.get();
				this._rightButton	= rightButton;
				headerBuilder.append(rightButton);
		// middle (content)
			var contentDiv	= $.createElement('div').attr('class', 'calendar-content').get();
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

	function _basicCalendarInitFormat(){
		var format		= {};
		this._format	= format;
		var optFormat	= this.options.format;

		[
			['year',	/y+/i],
			['month',	/m+/i],
			['day',		/d+/i],
			['hour',	/h+/i],
			['minute',	/i+/],
			['second',	/s+/],
			['ms',		/S+/]
		].forEach(function(ele){
			var a = optFormat.match(ele[1]);
			if(a && a.length)
				format[ele[0]]	= a[0];
		});
		if(format.hour || format.minute || format.second || format.ms)
			format.time	= true;
	}

	function _basicCalendarSetTitle(title){
		this._titleBtn.style.display	= title ? '' : 'none';
		if(title)
			this._titleBtn.innerText	= title;
	}

	function _basicCalendarCreateYears(currentDate){
		var self		= this;
		var startYear	= currentDate.getFullYear() - CURRENT_YEAR_POSITION;
		// slide btns
			this._slideBtns(true);
		var fragment	= document.createElement('div');
		var currentYear	= startYear;
		var selectedYear= this.value && this.value.getFullYear();
		for(var i = 0; i < YEAR_ROW_COUNT; ++i){
			var row	= $.createElement('div');
			for(var j =0; j < YEAR_PER_ROW; ++j){
				_addYear(row, currentYear);
				++currentYear;
			}
			fragment.appendChild(row.get());
		}
		this._setTitle(startYear + ' - ' + (currentYear - 1));
		return fragment;

		function _addYear(row, currentYear){
			row.append(
				$.createElement('span')
					.attr('class', selectedYear == currentYear ? 'btn selected': 'btn')
					.text(currentYear)
					.click(function(){
						currentDate.setFullYear(currentYear);
						self.select('year', currentDate);
					})
					.get()
			);
		}
	}

	function _basicCalendarCreateMonths(currentDate){
		var self	= this;
		// slide btns
			this._slideBtns(true);
		var container	= $.createElement('div')
				.attr('class', 'calendar-months');
		var currentMonth	= this.value && this.value.getMonth();
		i18nMonths.forEach(function(i18nMonth, i){
			container.append(
				$.createElement('span')
					.attr('class', currentMonth === i ? 'btn selected' : 'btn')
					.text(i18nMonth)
					.click(function(){
						currentDate.setMonth(i);
						self.select('month', currentDate);
					})
					.get()
			);
		});
		this._setTitle(this._format.year && currentDate.getFullYear());
		return container.get();
	}

	function _basicCalendarCreateDays(visibleDate){
		var self	= this;
		var year	= visibleDate.getFullYear();
		var month	= visibleDate.getMonth();
		// slide btns
			this._slideBtns(true);
			this._setTitle($.dateFormat(visibleDate, i18nMonthYearFormat));
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
		// selected Date
			var selectedYear;
			var selectedMonth;
			var selectedDay;
			var selectedDate	= this.value;
			if(selectedDate){
				selectedYear	= selectedDate.getFullYear();
				selectedMonth	= selectedDate.getMonth();
				selectedDay		= selectedDate.getDate();
			}
		// add dates
			var currentDate	= new Date(year, month, 1);
		// get next month
			var nextMonth	= currentDate.getMonth() + 1;
			if(nextMonth == 12)
				nextMonth = 0;
		// start date of week
			var currentDay	= currentDate.getDay();
			if(currentDay > 0)
				currentDate.setDate(-currentDay + 1);
		//show dates
			while(currentDate.getMonth() != nextMonth){
				var row 	= $.createElement('div').attr('class', 'nowrap');
				for(var i = 0; i < 7; ++i)
					_addDay(row);
				container.append(row.get());
			}
		// add each day
			function _addDay(row){
				var cDate		= currentDate.getDate();
				var currentM	= currentDate.getMonth();
				var currentY	= currentDate.getFullYear();
				var dayBuilder	= $.createElement('span')
						.attr('class', (
							selectedYear === currentY
							&& selectedMonth === currentM
							&& selectedDay === cDate
						) ? 'btn selected' : 'btn')
						.attr('data-value', cDate)
						.click(function(){
							visibleDate.setDate(cDate);
							visibleDate.setMonth(currentM);
							visibleDate.setFullYear(currentY);
							self.select('day', visibleDate);
						})
						.text(cDate);
				if(currentM != month)
					dayBuilder.addClass('obsolete');
				row.append(dayBuilder.get());
				currentDate.setDate(cDate + 1);
			}
		// end
			return container.get();
	}

	function _basicCalendarCreateTimer(currentDate){
		// slide btns
			this._slideBtns(false);
			this._setTitle($.dateFormat(currentDate, i18nMonthYearDayFormat));
		var container	= $.createElement('form').attr('class', 'calendar-timer drum-inline-block');
		//var timerBuilder= $.createElement('div').attr('class', 'tmer-vp');
		var format	= this._format;
		// append hours
			var hSelect;
			if(format.hour){
				var hoursHolderLength	= format.hour.length;
				hSelect					= $.createElement('select').get();
					if(format.hour.charAt(0) == 'H'){ // 0 - 24
						_basicCalendarCreateTimerAddToSelect(hSelect, null, hoursHolderLength, 0, 23, 0);
					}else{ // 0 - 12
						// 12 AM (minuit)
							_basicCalendarCreateTimerAddOptionToSelect(hSelect, 'AM ', hoursHolderLength, 0, 12);
						_basicCalendarCreateTimerAddToSelect(hSelect, 'AM ', hoursHolderLength, 1, 11, 1);
						// 12 PM (midi)
							_basicCalendarCreateTimerAddOptionToSelect(hSelect, 'PM ', hoursHolderLength, 12, 12);
						_basicCalendarCreateTimerAddToSelect(hSelect, 'PM ', hoursHolderLength, 13, 23, 1);
					}
				container.append(hSelect);
			}
		// append minutes
			var mSelect;
			if(format.minute){
				var holerLength	= format.minute.length;
				mSelect			= $.createElement('select').get();
				_basicCalendarCreateTimerAddToSelect(mSelect, null, holerLength, 0, 59, 0);
				container.append(mSelect);
			}
		// append seconds
			var sSelect;
			if(format.second){
				var holerLength	= format.second.length;
				sSelect			= $.createElement('select').get();
				_basicCalendarCreateTimerAddToSelect(sSelect, null, holerLength, 0, 59, 0);
				container.append(sSelect);
			}
		// add miliseconds
			var msSelect;
			if(format.ms){
				var holerLength	= format.ms.length;
				msSelect		= $.createElement('select').get();
				var vMax		= holerLength == 1 ? 9 : ( holerLength == 2 ? 99 : 999);
				_basicCalendarCreateTimerAddToSelect(msSelect, null, holerLength, 0, vMax, 0);
				container.append(msSelect);
			}
		//add line
			container.append($.createElement('div').attr('class', 'calendar-timer-lne').get());

		// get container
			container	= container.get();
		//enable effect
			setTimeout(function(){
				var self	= this;
				// add semicolones
					$('select', container)
						.slice(1)
							.before(':');
				// values
					var value	= this.value;
					if(value){
						hSelect && $(hSelect)
							.drum({onChange : function(selectedOption){
								currentDate.setHours(selectedOption.value);
								self.select('time', currentDate);
							}})
							.drum('setIndex', value.getHours());
						mSelect && $(mSelect)
							.drum({onChange : function(selectedOption){
								currentDate.setMinutes(selectedOption.value);
								self.select('time', currentDate);
							}})
							.drum('setIndex', value.getMinutes());
						sSelect && $(sSelect)
							.drum({onChange : function(selectedOption){
								currentDate.setSeconds(selectedOption.value);
								self.select('time', currentDate);
							}})
							.drum('setIndex', value.getSeconds());
						msSelect&& $(msSelect)
							.drum({onChange : function(selectedOption){
								currentDate.setMilliseconds(selectedOption.value);
								self.select('time', currentDate);
							}})
							.drum('setIndex', value.getMilliseconds());
					}
			}.bind(this), 0);
		return container;
	}

	function _basicCalendarCreateTimerAddToSelect(selectEle, prefix, zeroPadding, vMin, vMax, tMin){
		for(var i = vMin; i <= vMax; ++i){
			//zero padding
				var tminText	= tMin.toString();
				if(tminText.length < zeroPadding){
					for(var j = tminText.length; j < zeroPadding; ++j)
						tminText = '0' + tminText;
				}
			// add prefix
				if(prefix)
					tminText = prefix + tminText;
			// create option
				$.createElement('option')
					.attr('value', i)
					.text(tminText)
					.appendTo(selectEle);
				tMin++;
		}
	}
	function _basicCalendarCreateTimerAddOptionToSelect(selectEle, prefix, zeroPadding, value, text){
		//zero padding
			var tminText	= text.toString();
			if(tminText.length < zeroPadding){
				for(var i = tminText.length; i < zeroPadding; ++i)
					tminText = '0' + tminText;
			}
		// add prefix
			if(prefix)
				tminText = prefix + tminText;
		// create option
			$.createElement('option')
				.attr('value', value)
				.text(tminText)
				.appendTo(selectEle);
	}

	function _basicCalendarSlideBtnsVisiblity(state){
		var st	= state ? '' : 'none';
		this._leftButton.style.display	= st;
		this._rightButton.style.display	= st;
	}

	function _basicCalendarGetValue(format){
		var value;
		if(this.value){}
		return value;
	}

	function _basicCalendarCreateFragment(currentDate, goNext){
		var container;
		var level	= this._level;
		if(level == 'year'){
			if(goNext)
				currentDate.setFullYear(currentDate.getFullYear() + goNext * CURRENT_YEAR_POSITION * 2);
			container = this._createYears(currentDate);
		}
		else if(level == 'month'){
			if(goNext)
				currentDate.setFullYear(currentDate.getFullYear() + goNext);
			container = this._createMonths(currentDate);
		}
		else if(level == 'day'){
			if(goNext)
				currentDate.setMonth(currentDate.getMonth() + goNext);
			container	= this._createDays(currentDate);
		}
		else{
			container	= this._createTimer(currentDate);
		}
		this._currentDate	= currentDate;
		return container;
	}

	function _basicCalendarAnimSlide(goNext){
		var container	= this._createFragment(this._currentDate, goNext);
		var $contentDiv	= $(this.contentDiv);

		var $currentContainer= $contentDiv.children();

		var margLeft	= (-$currentContainer.width()) + 'px';
		var $calendar	= $(this.container).addClass('anim');// there is an animation
		if(goNext == -1){
			$contentDiv.prepend(container);
			$(container)
				.css('margin-left', margLeft)
				.animate({'margin-left': 0}, ANIMATION_DURATION, function(){
					$currentContainer.remove();
					$calendar.removeClass('anim');
				});
		}
		else{
			$contentDiv.append(container);
			$currentContainer
				.animate({'margin-left': margLeft}, ANIMATION_DURATION, function(){
					$currentContainer.remove();
					$calendar.removeClass('anim');
				});
		}
	}
	function _basicCalendarAnimFade(goIn){
		var container	= this._createFragment(this._currentDate);
		var $contentDiv	= $(this.contentDiv);
		var $currentContainer= $contentDiv.children();
		$contentDiv.append(container);
		var $container	= $(container);

		var $calendar	= $(this.container).addClass('anim');// there is an animation

		if(goIn){
			$contentDiv
				.onCSSAnimationEnd(function(){
					$contentDiv.removeClass('anim-goIn');
					$currentContainer.remove();
					$calendar.removeClass('anim');
				})
				.addClass('anim-goIn');
		}else{
			$contentDiv
				.onCSSAnimationEnd(function(){
					$contentDiv.removeClass('anim-goOut');
					$currentContainer.remove();
					$calendar.removeClass('anim');
				})
				.addClass('anim-goOut');
		}
	}
	function _basicCalendarGoUp(){
		var levelIndex	= LEVELS.indexOf(this._level) - 1;
		if(levelIndex >= 0){
			var level	= LEVELS[levelIndex];
			if(this._format.hasOwnProperty(level)){
				this._level	= level;
				this._animFade();
			}
		}
	}

	/**
	 * @param  {Date | number} value
	 */
	function _basicCalendarSelect(level, date){
		var isEnd	= true;
		//save value
			this._currentDate	= date;
		var levelIndex	= LEVELS.indexOf(this._level) + 1;
		if(levelIndex < LEVELS.length){
			var level	= LEVELS[levelIndex];console.log('---level: ', level);
			if(this._format.hasOwnProperty(level)){
				this._level	= level;
				this._animFade(true);
			}
		}

		if(isEnd){
			console.log('--- click: ', levelIndex, '----', this._format );
			this.value	= date;
		}
		return isEnd;
	}

})(jQuery);