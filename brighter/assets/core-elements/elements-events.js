/**
 * events
 */
(function(){
	var plugins	= {};
	if(HTMLElement.prototype.addEventListener){
		// bind
			plugins.bind	= plugins.on	=  function(eventName, listener){
				return this.eachTag(ele => {ele.addEventListener(eventName, listener, false)});
			};
		// unbind
			plugins.unbind	= plugins.off	=  function(eventName, listener){
				return this.eachTag(ele => {ele.removeEventListener(eventName, listener, false)});
			};
	}else{
		// bind
			plugins.bind	= plugins.on	=  function(eventName, listener){
				return this.eachTag(ele => {ele.attachEvent(eventName, listener)});
			};
		// unbind
			plugins.bind	= plugins.off	=  function(eventName, listener){
				return this.eachTag(ele => {ele.detachEvent(eventName, listener)});
			};
	}
	
	// add to brighter
		$$.plugin(plugins);
})();