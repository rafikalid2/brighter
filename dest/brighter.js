'use strict';
;/*! Drum.JS - v0.1dev - 2014-01-09
 * http://mb.aquarius.uberspace.de/drum.js
 *
 * Copyright (c) 2013 Marcel Bretschneider <marcel.bretschneider@gmail.com>;
 * Licensed under the MIT license */

(function($) {
	"use strict";

	var DrumIcon = (function () {
		var svgelem = function (tagName) {
			return document.createElementNS("http://www.w3.org/2000/svg", tagName);
		};
		var svgcanvas = function (width, height) {
			var svg = $(svgelem("svg"));
			$(svg).attr("width", width);
			$(svg).attr("height", height);

			var g = $(svgelem("g"));
			$(svg).append(g);

			return svg;
		};
		var container = function (className) {
			var container = document.createElement("div");
			$(container).attr("class", className);
			var inner = document.createElement("div");
			$(container).append(inner);
			return container;
		};
		var path = function (settings) {
			var p = $(svgelem("path"));
			var styles = {
				"fill" : "none",
				"stroke" : settings.dail_stroke_color,
				"stroke-width" : settings.dail_stroke_width + "px",
				"stroke-linecap" : "butt",
				"stroke-linejoin" : "miter",
				"stroke-opacity": "1"
			};
			var style = "";
			for (var i in styles) {
				$(p).attr(i, styles[i]);
			}
			return p;
		};
		return {
			up : function (settings) {
				var width = settings.dail_w;
				var height = settings.dail_h;

				var svg = svgcanvas(width, height);
				var p = path(settings); 

				$(p).attr("d", "m0," + (height + settings.dail_stroke_width) + "l" + (width/2) + ",-" + height + "l" + (width/2) + "," + height);
				$(svg).find("g").append(p);

				var cont = container("dial up");
				$(cont).find("div").append(svg);
				return cont;
			},
			down : function (settings) {
				var width = settings.dail_w;
				var height = settings.dail_h;

				var svg = svgcanvas(width, height);
				var p = path(settings); 

				$(p).attr("d", "m0,-" + settings.dail_stroke_width + "l" + (width/2) + "," + height + "l" + (width/2) + ",-" + height);
				$(svg).find("g").append(p);

				var cont = container("dial down");
				$(cont).find("div").append(svg);
				return cont;
			}
		};
	})();

	var PanelModel = function (index, data_index, settings) 
	{
		this.index = index;
		this.dataModel = new (function (data, i) {
			this.data = data;
			this.index = i;
			this.getText = function () {
				return this.data[this.index];
			};
		})(settings.data, data_index);

		this.init = function () {
			this.angle = settings.theta * index;
			this.elem = document.createElement('figure');
			$(this.elem).addClass('a' + this.angle*100);
			$(this.elem).css('opacity', '0.5');
			$(this.elem).css(
				settings.transformProp, 
				settings.rotateFn + '(' + -this.angle + 'deg) translateZ(' + settings.radius + 'px)'
			);
			this.setText();
		};
		this.setText = function () {
			$(this.elem).text(this.dataModel.getText());
		};
		this.update = function (data_index) {
			if (this.dataModel.index != data_index) {
				this.dataModel.index = data_index;
				this.setText();
			}
		};
	};

	var Drum = function(element, options, transformProp)
	{
		var HTMLselect = ($(element))[0];
		var obj = this;
		var settings = $.extend({
			panelCount : 16,
			rotateFn : 'rotateX',
			interactive: true,
			dail_w: 20,
			dail_h: 5,
			dail_stroke_color: '#999999',
			dail_stroke_width: 1
		}, options || {});

		settings.transformProp = transformProp;
		settings.rotation = 0;
		settings.distance = 0;
		settings.last_angle = 0;
		settings.theta = 360 / settings.panelCount;

		settings.initselect = HTMLselect.selectedIndex;

		if (settings.transformProp) {
			settings.data = [];
			for (var i=0; i<HTMLselect.children.length; i++) {
				settings.data.push($(HTMLselect.children[i]).text());
			}

			$(element).hide();

			var wrapper = document.createElement( "div" );
			$(wrapper).addClass("drum-wrapper");
			
			if (settings.id)
				$(wrapper).attr('id', settings.id);
			else if (HTMLselect.id)
				$(wrapper).attr('id', 'drum_' + HTMLselect.id);
			else if ($(HTMLselect).attr('name'))
				$(wrapper).attr('id', 'drum_' + $(HTMLselect).attr('name'));

			$(HTMLselect).after(wrapper);

			var inner = document.createElement("div");
			$(inner).addClass("inner");
			$(inner).appendTo(wrapper);

			var container = document.createElement( "div" );
			$(container).addClass("container");		
			$(container).appendTo(inner);

			var drum = document.createElement( "div" );
			$(drum).addClass("drum");
			$(drum).appendTo(container);

			if (settings.interactive === true) {
				var dialUp = DrumIcon.up(settings);
				$(wrapper).append(dialUp);

				var dialDown = DrumIcon.down(settings);
				$(wrapper).append(dialDown);

				$(wrapper).hover(function () {
					$(this).find(".up").show();
					$(this).find(".down").show();
				}, function () {
					$(this).find(".up").hide();
					$(this).find(".down").hide();
				});
			}

			settings.radius = Math.round( ( $(drum).height() / 2 ) / Math.tan( Math.PI / settings.panelCount ) );
			settings.mapping = [];
			var c = 0;
			for (var i=0; i < settings.panelCount; i++) {
				if (settings.data.length == i) break;
				var j = c;
				if (c >= (settings.panelCount / 2)) {
					j = settings.data.length - (settings.panelCount - c);
				}
				c++;

				var panel = new PanelModel(i, j, settings);
				panel.init();
				settings.mapping.push(panel);

				$(drum).append(panel.elem);
			}

			var getNearest = function (deg) {
				deg = deg || settings.rotation;
				var th = (settings.theta / 2);
				var n = 360;
				var angle = ((deg + th) % n + n) % n;
				angle = angle - angle % settings.theta;
				var l = (settings.data.length - 1) * settings.theta;
				if (angle > l) {
					if (deg > 0) return l;
					else return 0;
				}
				return angle;
			};
			var getSelected = function () {
				var nearest = getNearest();
				for (var i in settings.mapping) {
					if (settings.mapping[i].angle == nearest) {
						return settings.mapping[i];
					}
				}
			};
			var update = function (selected) {
				var c, list = [], pc = settings.panelCount, ph = settings.panelCount / 2, l = settings.data.length;
				var i = selected.index; 
				var j = selected.dataModel.index;
				for (var k=j-ph; k<=j+ph-1; k++) {
					c = k;
					if (k < 0) c = l+k;
					if (k > l-1) c = k-l;
					list.push(c);
				}
				var t = list.slice(ph-i); 
				list = t.concat(list.slice(0, pc - t.length));
				for (var i=0; i<settings.mapping.length; i++) {
					settings.mapping[i].update(list[i]);
				}
			};
			var transform = function(fire_event) {
				$(drum).css(settings.transformProp, 'translateZ(-' + settings.radius + 'px) ' + settings.rotateFn + '(' + settings.rotation + 'deg)');

				var selected = getSelected();
				if (selected) {
					var data = selected.dataModel;
					
					var last_index = HTMLselect.selectedIndex;
					HTMLselect.selectedIndex = data.index;

					if (fire_event && last_index != data.index && settings.onChange) 
						settings.onChange(HTMLselect);

					$(selected.elem).css("opacity", 1);
					$("figure:not(.a" + (selected.angle*100) + ", .hidden)", drum).css("opacity", "0.5");
					if (selected.angle != settings.last_angle && [0,90,180,270].indexOf(selected.angle) >= 0) {
						settings.last_angle = selected.angle;
						update(selected);
					}
				}			
			};

			this.setIndex = function (dataindex) {
				var page = Math.floor(dataindex / settings.panelCount);
				var index = dataindex - (page * settings.panelCount);
				var selected = new PanelModel(index, dataindex, settings);
				update(selected);
				settings.rotation = index * settings.theta;
				transform(false);
			};


		} else {
			this.setIndex = function (dataindex) {
				HTMLselect.selectedIndex = dataindex;
			};	
		}

		this.setIndex(settings.initselect);

		/* IE7 getIndex error fix by https://github.com/koas */
		this.getIndex = function () {
			if (settings.transformProp)
				return getSelected().dataModel.index;
			else return HTMLselect.selectedIndex;
		};

		if (settings.transformProp) {
			if (typeof(Hammer) != "undefined") {
				settings.touch = new Hammer(wrapper, {
					prevent_default: true,
					no_mouseevents: true
				});
				
				settings.touch.on("dragstart", function (e) { 
					settings.distance = 0;
				});

				settings.touch.on("drag", function (e) {
					var evt = ["up", "down"];
					if (evt.indexOf(e.gesture.direction)>=0) {
						settings.rotation += Math.round(e.gesture.deltaY - settings.distance) * -1;
						transform(true);
						settings.distance = e.gesture.deltaY;
					}
				});

				settings.touch.on("dragend", function (e) {
					settings.rotation = getNearest();
					transform(true);
				});
			}

			if (settings.interactive) {
				$(dialUp).click(function (e) {
					var deg = settings.rotation + settings.theta + 1;
					settings.rotation = getNearest(deg);
					transform(true);
				});
				$(dialDown).click(function (e) {
					var deg = settings.rotation - settings.theta - 1;
					settings.rotation = getNearest(deg);
					transform(true);
				});
			}
		}
	};

	var methods = {
		getIndex : function () {
			if ($(this).data('drum'))
				return $(this).data('drum').getIndex();
			return false;
		},
		setIndex : function (index) {
			if ($(this).data('drum'))
				$(this).data('drum').setIndex(index);
		},
		init : function (options) {
			var transformProp = false;
			if (!navigator.userAgent.match(/Trident/i) && !navigator.userAgent.match(/MSIE/i)) {
				var prefixes = 'transform WebkitTransform MozTransform OTransform msTransform'.split(' ');
				for(var i = 0; i < prefixes.length; i++) {
					if(document.createElement('div').style[prefixes[i]] !== undefined) {
						transformProp = prefixes[i];
					}
				}
			}
			var element = $(this);
			if (!element.data('drum')) {
				var drum = new Drum(element, options, transformProp);
				element.data('drum', drum);
			}
		}
	};

	$.fn.drum = function(methodOrOptions)
	{
		var _arguments = arguments;
		return this.each(function() {
			if ( methods[methodOrOptions] ) {
				return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( _arguments, 1 ));
			} else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
				return methods.init.apply( this, _arguments );
			} else {
				$.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.drum' );
			}
		});
	};
})(jQuery);;/**
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

})(jQuery);;/**
 * native HTML element builder
 * to be used when creating lot of elements
 * 100 time faster than jQuery alternative
 */
(function($){
	$.createElement	= function(tagName){
		return new DOMElementBuilder(tagName);
	};

	function DOMElementBuilder(tagName){
		this.ele	= document.createElement(tagName);
		return this;
	}

	$.extend(DOMElementBuilder.prototype, {
		attr	: function(attrName, attrValue){
			this.ele.setAttribute(attrName, attrValue);
			return this;
		},
		addClass: function(className){
			this.ele.classList.add(className);
			return this;
		},
		removeClass: function(className){
			this.ele.classList.remove(className);
			return this;
		},
		appendText: function(value){
			var txt	= document.createTextNode(value);
			this.ele.appendChild(txt);
			return this;
		},
		append	: function(child){
			this.ele.appendChild(child);
			return this;
		},
		appendTo: function(parent){
			parent.appendChild(this.ele);
			return this;
		},
		insertBefore : function(element){
			this.ele.insertBefore(element);
			return this;
		},
		css		: function(key, value){
			this.ele.style[key]	= value;
			return this;
		},
		build	: function(){
			return this.ele;
		},
		get		: function(){
			return this.ele;
		}
	});

	// navigator compatible functions
		var hasDivCreator	= typeof HTMLDivElement != 'undefined'; // juste pour  s'assurer :D
		// text
			DOMElementBuilder.prototype.text	=
				hasDivCreator
				&& HTMLDivElement.prototype.hasOwnProperty('innerText') ?
					function(value){this.ele.innerText	= value; return this;}
					: function(value){this.ele.innerHTML	= value; return this;};

		// add event listener
			DOMElementBuilder.prototype.on = 
				hasDivCreator
				&& HTMLDivElement.prototype.addEventListener ?
					function(type, listener){this.ele.addEventListener(type, listener, false); return this;}
					: function(type, listener){this.ele.attachEvent(type, listener); return this;};

})(jQuery);;/**
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
		// format
			this._initFormat();
		// init calendard
			this._init();
		// add years
			// this._createYears(currentDate.getFullYear() - CURRENT_YEAR_POSITION);
			// var fragment = this._createMonths();
			// var fragment	= this._createDays(2017, 7);
			this._createTimer(this.contentDiv);
			// this.contentDiv.appendChild(fragment);
	}

	$.extend(BasicCalendar.prototype,{
		_init			: _initBasicCalendar,
		_initFormat		: _basicCalendarInitFormat,

		_setTitle		: _basicCalendarSetTitle,

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

	function _basicCalendarCreateTimer(parentContainer){
		var container	= $.createElement('form').attr('class', 'calendar-timer drum-inline-block');
		//var timerBuilder= $.createElement('div').attr('class', 'tmer-vp');
		var format	= this._format;
		// append hours
			if(format.hour){
				var hoursHolderLength	= format.hour.length;
				var selectEle			= $.createElement('select').get();
					if(format.hour.charAt(0) == 'H'){ // 0 - 24
						_basicCalendarCreateTimerAddToSelect(selectEle, null, hoursHolderLength, 0, 23, 0);
					}else{ // 0 - 12
						// 12 AM (minuit)
							_basicCalendarCreateTimerAddOptionToSelect(selectEle, 'AM ', hoursHolderLength, 0, 12);
						_basicCalendarCreateTimerAddToSelect(selectEle, 'AM ', hoursHolderLength, 1, 11, 1);
						// 12 PM (midi)
							_basicCalendarCreateTimerAddOptionToSelect(selectEle, 'PM ', hoursHolderLength, 12, 12);
						_basicCalendarCreateTimerAddToSelect(selectEle, 'PM ', hoursHolderLength, 13, 23, 1);
					}
				container.append(selectEle);
			}
		// append minutes
			if(format.minute){
				var holerLength	= format.minute.length;
				var selectEle			= $.createElement('select').get();
				_basicCalendarCreateTimerAddToSelect(selectEle, null, holerLength, 0, 59, 0);
				container.append(selectEle);
			}
		// append seconds
			if(format.second){
				var holerLength	= format.second.length;
				var selectEle	= $.createElement('select').get();
				_basicCalendarCreateTimerAddToSelect(selectEle, null, holerLength, 0, 59, 0);
				container.append(selectEle);
			}
		// add miliseconds
			if(format.ms){
				var holerLength	= format.ms.length;
				var selectEle	= $.createElement('select').get();
				var vMax		= holerLength == 1 ? 9 : ( holerLength == 2 ? 99 : 999);
				_basicCalendarCreateTimerAddToSelect(selectEle, null, holerLength, 0, vMax, 0);
				container.append(selectEle);
			}
			
			// container.appendText(':');
			// container.append(_basicCalendarCreateTimerCreateSelect(0,59)); // mins
			// container.appendText(':');
			// container.append(_basicCalendarCreateTimerCreateSelect(0,59)); // secondes
		//add line
			container.append($.createElement('div').attr('class', 'calendar-timer-lne').get());
		// add to parent
			parentContainer.appendChild(container.get());

		//enable effect
			$('select', parentContainer).drum({
				//onChange : function(selectedOption){}
			});
		// init drum size
			setTimeout(function(){
				$(parentContainer).find('.drum-wrapper')
					.each(function(){
						var $this	= $(this);
						var width	= $this.find('figure:first').width();
						if(width)
							$this.width(width + 10);
					});
			},0);
			
		// hours
		// 	var hours = new TimerGroup(0, 11, 2);
		// 	timerBuilder.append(hours.getContainer());

		// container.append(timerBuilder.get());
		// return container.get();
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

})(jQuery);;(function(){
	//	init Hammer
		// if(typeof Hammer != 'undefined')
		// 	Hammer.plugins.fakeMultitouch();
		// else
		// 	$.logger.warn('Hammer lib is not detected.');
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