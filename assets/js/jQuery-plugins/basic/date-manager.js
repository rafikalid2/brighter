(function($){

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
})(jQuery);