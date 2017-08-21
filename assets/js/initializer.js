(function(){
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
				_initDOMFilter($container, '[data-type="basic-calendar"]:empty', 'calendar');
			// date picker
				_initDOMFilter($container, 'input[type="date"]', 'datePicker');
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