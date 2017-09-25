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

	// add wrappers
		var mouseWrappers	= ['click', 'contextmenu', 'dblclick', 'hover', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'mouseup'];
		var otherWrappers	= ['blur', 'change', 'error', 'focus', 'focusin', 'focusout', 'load', 'resize', 'scroll', 'select', 'submit', 'unload'];
		var keyboardEvents	= ['keydown', 'keypress', 'keyup'];
		$$.plugin({
			click	: function(callBack){
				// add new listener
					if(callBack && (typeof callBack == 'function'))
						this.on('click', callBack);
				// trigger event
					else
						_triggerMouseEvent.call(this, 'click')
			}
		});

	// mouse events
		function _triggerMouseEvent(eventName, otherOptions){
			var event;
			try{
				var event = new MouseEvent(eventName, _extend({ view: window, cancelable: true, bubbles: true }, otherOptions));
			}catch(e){
				event = document.createEvent('MouseEvents');
				event.initMouseEvent(eventName, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			}
			this.eachTag(element => {
				element.dispatchEvent(event);
			});
		}
	// keybord event
		function _triggerKeyboardEvent(eventName, character, otherOptions){
			var event;
			try{
				event	= new KeyboardEvent(eventName, { view: window, cancelable: true, bubbles: true, key: character, char: character});
			}catch(e){
				event = document.createEvent('KeyboardEvent');
				(event.initKeyboardEvent || event.initKeyEvent)(eventName, true, true, window, 0, 0, 0, 0, 0, character.charCodeAt(0));
			}
		}
})();