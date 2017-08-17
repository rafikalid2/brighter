(function($){
	var i18nMessages	= {
		lang			: 'en',

		today			: 'Today',
		months			: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
		monthsAbbr		: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		days			: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		daysAbbr		: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],

		MonthYearFormat	: 'MM yyyy',
		dateFormat		: 'M, dd yyyy',
		fullDateFormat	: 'E M, dd<sup>th</sup> yyyy',
	};

	if(!$._i18nMsg)
		$._i18nMsg	= i18nMessages;
	else
		$.extend($._i18nMsg, i18nMessages);
})(jQuery);