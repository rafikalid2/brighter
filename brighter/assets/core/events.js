/**
 * events
 */
	if(HTMLElement.prototype.addEventListener){
		// bind
			$$prototype.bind	= $$.prototype.on	=  function(eventName, listener){
				return this
					.filter(ele => (ele.nodeType != 8 && ele.nodeType != 3)) // filter textNode and commentNode
					.each(ele => {ele.addEventListener(eventName, listener, false)});
			};
		// unbind
			$$prototype.unbind	= $$.prototype.off	=  function(eventName, listener){
				return this
					.filter(ele=> (ele.nodeType != 8 && ele.nodeType != 3)) // filter textNode and commentNode
					.each(ele => {ele.removeEventListener(eventName, listener, false)});
			};
	}else{
		// bind
			$$prototype.bind	= $$.prototype.on	=  function(eventName, listener){
				return this
					.filter(ele=> (ele.nodeType != 8 && ele.nodeType != 3)) // filter textNode and commentNode
					.each(ele => {ele.attachEvent(eventName, listener)});
			};
		// unbind
			$$prototype.bind	= $$.prototype.off	=  function(eventName, listener){
				return this
					.filter(ele=> (ele.nodeType != 8 && ele.nodeType != 3)) // filter textNode and commentNode
					.each(ele => {ele.detachEvent(eventName, listener)});
			};
	}

// trigger event


// wrappers
