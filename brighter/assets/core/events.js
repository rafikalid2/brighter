/**
 * events
 */
	if(HTMLElement.prototype.addEventListener){
		// bind
			$$prototype.bind	= $$.prototype.on	=  function(eventName, listener){
				return this.eachTag(ele => {ele.addEventListener(eventName, listener, false)});
			};
		// unbind
			$$prototype.unbind	= $$.prototype.off	=  function(eventName, listener){
				return this.eachTag(ele => {ele.removeEventListener(eventName, listener, false)});
			};
	}else{
		// bind
			$$prototype.bind	= $$.prototype.on	=  function(eventName, listener){
				return this.eachTag(ele => {ele.attachEvent(eventName, listener)});
			};
		// unbind
			$$prototype.bind	= $$.prototype.off	=  function(eventName, listener){
				return this.eachTag(ele => {ele.detachEvent(eventName, listener)});
			};
	}

// trigger event


// wrappers
