'use strict';
;// week of year
	if(!Date.prototype.hasOwnProperty('getWeekOfYear'))
		Date.prototype.getWeekofYear = function(){
			var d		= new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
			var dayNum	= d.getUTCDay() || 7;
			d.setUTCDate(d.getUTCDate() + 4 - dayNum);
			var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
			return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
		};

// week of month
	if(!Date.prototype.hasOwnProperty('getWeekOfMonth'))
		Date.prototype.getWeekOfMonth	= function(){
			var d	= new Date(this.getFullYear(), this.getMonth(), 1);
			return (d.getDay() + this.getDate()) / 7;
		};

// day of year
	if(!Date.prototype.hasOwnProperty('getDayOfYear'))
		Date.prototype.getDayOfYear	= function(){
			var d	= new Date(this.getFullYear(), 0, 0);
			return Math.floor((this - d) / 86400000);
		};

// now
	if(!Date.now)
		Date.now	= function(){
			return new Date().getTime();
		};;/*! Drum.JS - v0.1dev - 2014-01-09
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
		setTimeout(function(){
			this.parent().find('.drum-wrapper')
				.each(function(){
					var $this	= $(this);
					var width	= $this.find('figure:first').width();
					if(width)
						$this.width(width + 10);
				});
		}.bind(this), 0);
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

})(jQuery);;(function($){
	$.i18n	= {
		get			: _getMessage,
		getLanguage	: _getLanguage
	};

	function _getMessage(key, params){
		var value;
		if($._i18nMsg){
			value	= $._i18nMsg[key];
			if(value && params)
				value = _replaceParams(value, params);
		}
		return value;
	}

	function _replaceParams(value, replaces){
		if(Array.isArray(value)){
			for(var i = 0; i < value.length; ++i)
				value[i]	= _replaceParams(value[i], params);
		}else if(replaces && (typeof value == 'string')){
			value = value.replace(/\$([a-zA-Z1-9_]+)/g, function(a,b){
				if(replaces.hasOwnProperty(b))
					return replaces[b];
				else
					return a;
			});
		}

		return value;
	}

	function _getLanguage(){
		return $._i18nMsg && $._i18nMsg.lang;
	}
})(jQuery);;/*
	By Osvaldas Valutis, www.osvaldas.info
	Available for use under the MIT License
*/

;( function( $, window, document, undefined )
{
	var s = document.body || document.documentElement, s = s.style, prefixAnimation = '', prefixTransition = '';

	if( s.WebkitAnimation == '' )	prefixAnimation	 = '-webkit-';
	if( s.MozAnimation == '' )		prefixAnimation	 = '-moz-';
	if( s.OAnimation == '' )		prefixAnimation	 = '-o-';

	if( s.WebkitTransition == '' )	prefixTransition = '-webkit-';
	if( s.MozTransition == '' )		prefixTransition = '-moz-';
	if( s.OTransition == '' )		prefixTransition = '-o-';

	$.fn.extend(
	{
		onCSSAnimationEnd: function( callback )
		{
			var $this = $( this ).eq( 0 );
			$this.one( 'webkitAnimationEnd mozAnimationEnd oAnimationEnd oanimationend animationend', callback );
			return this;
		},
		onCSSTransitionEnd: function( callback )
		{
			var $this = $( this ).eq( 0 );
			$this.one( 'webkitTransitionEnd mozTransitionEnd oTransitionEnd otransitionend transitionend', callback );
			return this;
		}
	});
})( jQuery, window, document );;/**
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
		// insertBefore : function(element){
		// 	this.ele.insertBefore(element);
		// 	return this;
		// },
		css		: function(key, value){
			this.ele.style[key]	= value;
			return this;
		},
		build	: function(){
			return this.ele;
		},
		get		: function(){
			return this.ele;
		},

		click	: function(callBack){
			return this.on('click', callBack);
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

})(jQuery);;(function($){

	$.dateFormat	= function(date, format){
		return format.replace(/([\\adehimstwyz]+)/ig, function(a, b){
			if(_replacer[b])
				a	= _replacer[b](date);
			return a;
		});
	};

	// var i18nToday		= $.i18n.get('today');
	var i18nMonths		= $.i18n.get('months'); // ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var i18nMonthsAbbr	= $.i18n.get('monthsAbbr'); // ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	var i18nDaysOfWeek	= $.i18n.get('daysAbbr'); // ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	var i18nDaysFull	= $.i18n.get('days'); // ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	var _replacer	= {
		y		: _yy,
		yy		: _yy,
		yyyy	: function(date){return date.getFullYear();},

		m		: function(date){return date.getMonth()},
		mm		: function(date){return _addZero(date.getMonth())},
		M		: function(date){return i18nMonthsAbbr[date.getMonth()]},
		MM		: function(date){return i18nMonths[date.getMonth()]},

		W		: function(date){return date.getWeekOfYear();},
		WW		: function(date){return _addZero(date.getWeekOfYear());},

		w		: function(date){return date.getWeekOfMonth();},
		ww		: function(date){return _addZero(date.getWeekOfMonth());},

		D		: function(date){return date.getDayOfYear();},
		DD		: function(date){return _addZero(date.getDayOfYear());},
		d		: function(date){return date.getDate();},
		dd		: function(date){return _addZero(date.getDate());},
		th		: function(date){
						var dt	= date.getDate();
						return dt == 1 ? 'st' : ( dt == 2 ? 'nd' : 'th');
					},

		e		: function(date){return date.getDay()},
		ee		: function(date){return _addZero(date.getDay());},
		E		: function(date){return i18nDaysOfWeek[date.getDay()];},
		EE		: function(date){return i18nDaysFull[date.getDay()];},

		a		: function(date){return date.getHours() > 11 ? 'pm' : 'am'},
		A		: function(date){return date.getHours() > 11 ? 'PM' : 'AM'},

		H		: function(date){return date.getHours();},
		HH		: function(date){return _addZero(date.getHours());},
		h		: function(date){return _get12Hours(date);},
		hh		: function(date){return _addZero(_get12Hours(date));},

		i		: function(date){return date.getMinutes();},
		ii		: function(date){return _addZero(date.getMinutes());},
		s		: function(date){return date.getSeconds();},
		ss		: function(date){return _addZero(date.getSeconds());},
		S		: function(date){return date.getMilliseconds().toString().substr(0,1);},
		SS		: function(date){return date.getMilliseconds().toString().substr(0,2);},
		SSS		: function(date){return date.getMilliseconds();},

		z		: function(date){
			var z	= date.getTimezoneOffset() / 60;
			return z ? 'UTC' + (z > 0 ? '+' + z : z) : 'UTC';
		}
	};

	function _get12Hours(date){
		var a= date.getHours();
		if(a == 0)
			a = 12;
		else if(a > 12)
			a -= 12;
		return a;
	}

	function _yy(date){
		var y	= date.getFullYear().toString();
		return y.substring(y.length - 2);
	}

	function _addZero(value){
		return value < 10 ? '0' + value : value;
	}
})(jQuery);;/**
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
		if(format.minute || format.second || format.ms)
			format.time	= true;
	}

	function _basicCalendarSetTitle(title){
		this._titleBtn.style.display	= title ? '' : 'none';
		if(title)
			this._titleBtn.innerText	= title;
	}

	function _basicCalendarCreateYears(currentDate){
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
						self.select('year', currentYear);
					})
					.get()
			);
		}
	}

	function _basicCalendarCreateMonths(){
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
						if(this.value){
							this.value.setMonth(i);
							self.select('month', this.value);
						}else{
							self.select('month', i);
						}
					})
					.get()
			);
		});
		this._setTitle(this.value && this.value.getFullYear());
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
				$('select', container)
					.drum({
						//onChange : function(selectedOption){}
					})
				// add semicolones
					.slice(1)
						.before(':');
				// values
					var value	= this.value;
					if(value){
						hSelect && $(hSelect).drum('setIndex', value.getHours());
						mSelect && $(mSelect).drum('setIndex', value.getMinutes());
						sSelect && $(sSelect).drum('setIndex', value.getSeconds());
						msSelect&& $(msSelect).drum('setIndex', value.getMilliseconds());
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
	function _basicCalendarSelect(level, value){

	}

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