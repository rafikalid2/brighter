
(function(){
	// params
		var LISTNER_ATTR_NAME	= '_eventListeners';
	// add wrappers
		var mouseWrappers	= ['click', 'contextmenu', 'dblclick', 'hover', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'mouseup'];
		var otherWrappers	= [ 'change', 'error', 'focusin', 'focusout', 'load', 'resize', 'unload'];
		var keyboardEvents	= ['keydown', 'keypress', 'keyup'];
		var specialWrappers	= ['blur', 'focus', 'submit'];

	// add event manager
		$$.addEventManager($$prototype, {
			// indicate that events are on inner objects and not on this
			items	: function(ele){ return ele.children()},
			//wrappers
			on	: {
				wrapper	: function(element, eventName, eventListener, options){
					element.addEventListener(eventName, eventListener, false);
				}
			},
			off	: {
				wrapper	: function(element, eventName, eventListener, options){
					element.removeEventListener(eventName, eventListener, false);
				}
			},
			trigger	: {
				wrapper	: function(element, eventNameOrEvent, extratParams){
					if(typeof eventNameOrEvent == 'string'){
						if(mouseWrappers.indexOf(eventNameOrEvent) != -1)
							_triggerMouseEvent(element, eventNameOrEvent, extratParams);
						else if(otherWrappers.indexOf(eventNameOrEvent) != -1)
							_triggerEvent(element, eventNameOrEvent, extratParams);
						else if(keyboardEvents.indexOf(eventNameOrEvent) != -1)
							_triggerKeyboardEvent(element, eventNameOrEvent, extratParams);
						else if(specialWrappers.indexOf(eventNameOrEvent) != -1)
							_triggerSpecialEvent(element, eventNameOrEvent);
						else // custom event
							_triggerCustomEvent(element, eventNameOrEvent, extratParams);
					}
				}
			}
		});

	// alias
		$$.plugin({
			bind	: $$prototype.on,
			unbind	: $$prototype.off
		});

	/**
	 * events
	 * .bind(eventName, eventListner)
	 * .bind('click', listener)
	 * .bind('click focus', listener)
	 * .bind('click.grpName focus.groupF1', listener)
	 * .bind('click.grp1.grp2', listener)
	 * .bind('click.grp1 click.grp2')	// multiple groups
	 *
	 * 
	 * .unbind()							// unbind all avents
	 * .unbind(eventName)					// unbind all listeners on this event
	 * .unbind(eventName, eventListener)	// unbind this listner on this event
	 */

	/**
	 * remove listener
	 * .unbind()					// remove all events listeners
	 * .unbind('click')				// remove all events on click
	 * .unbind('click.grp1.grp2')	// remove all events on this group and subgoups
	 * .unbind('click', listener)	// remove this listener on click and subgroups
	 * .unbind('click.grp', listener)// remove this listener on click.grp and subgroups
	 * .unbind('click focus ...')	// we can add multiple events 
	 * .unbind('click.grp1 click.grp2')// multiple groups too
	 */
	// function _unbindEventFrom_ (obj, rootObj, listener){
	//  	// remove all ocurrence of this object
	//  		if(eventListener)
	//  			$$Arrays.removeAll.call(rootObj.listeners, listener);
	//  		else
	//  			rootObj.listeners.forEach(lst => obj.removeEventListener())
	//  	// use recursive fx
	//  		for(var i in rootObj.items)
	//  			_unbindEventFrom_(obj, rootObj.items[i], listener);
	//  	//TODO change recursive function
	// }

	
	/**
	 * apply mouse events
	 * examples:
	 * 			$$(...).click()				// trigger click event
	 * 			$$(...).click({options})	// trigger click event with those options
	 * 			$$(...).click(callBack)		// set callBack as event listener
	 */
	// 
	/**
	 * apply keybord events
	 * examples:
	 * 			$$(...).keydown()			// trigger this event
	 * 			$$(...).keydown({options})	// trigger this event with those options
	 * 			$$(...).keydown('a');		// trigger like char 'a' is pressed
	 * 			$$(...).keydown('a', {options});		// trigger like char 'a' is pressed
	 * 			$$(...).keydown(callBack)	// add this callBack as a listener
	 */

	/**
	 * special wrappers
	 * examples
	 * 		$$(...).focus()	// focus the first tag on the list
	 * 		$$(...).focus(callBack)// set callBack as a listener
	 */

	 /**
	  * other events
	  */
		[mouseWrappers, keyboardEvents, specialWrappers, otherWrappers]
			.forEach(arr => {
				arr.forEach(function(eventName){
					$$.plugin(eventName, {
						value	: function(arg){
							// add new listener
								if(arg && (typeof arg == 'function'))
									this.on(eventName, arg);
							// trigger event
								else
									this.trigger(eventName, arg);
						}
					});
				});
			});

	/**
	 * very special event: scroll
	 * 		$(...).scroll(callBack, options)						: listener onscroll
	 *   	$(...).scroll(y, optionalBooleanAnimate)				: equivalent to $(...).scrollTop(y)
	 *    	$(...).scroll(x, y, optionalBooleanAnimate)				: scroll to (x, y)
	 *     	$(...).scroll({top: y, left: x}, optionalBooleanAnimate)	: scroll to (x, y)
	 */
		$$.plugin('scroll', {
			value	: function(){
				//TODO
				throw new Error('no implemented!');
			}
		});
	/**
	 * select
	 * 		$$(form-control).select()			// select input, text-area
	 * 		$$(form-control).select(callBack)	// add as callback on input, text-area select
	 *
	 * 		$$(htmlElement).select()			// select text inside div or any other html tag or node
	 * 		$$(htmlElement).all.select()		// select text inside div or any other html tag or node
	 * 		$$(htmlElement).select(callBack)	// add callBack "onSelect"
	 */
		$$.plugin('select', {
			value	: function(){
				//TODO
				throw new Error('no implemented!');
			}
		});

	// mouse events
		function _triggerMouseEvent(element, eventName, otherOptions){
			var event;
			try{
				var event = new MouseEvent(eventName, _extend({ view: window, cancelable: true, bubbles: true }, otherOptions));
			}catch(e){
				event = document.createEvent('MouseEvents');
				event.initMouseEvent(eventName, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			}
			element.dispatchEvent(event);
		}
	// keybord event
		function _triggerKeyboardEvent(eventName, arg2, arg3){
			var event, opts;
			try{
				// prepare options
					opts	= { view: window, cancelable: true, bubbles: true};
					if(typeof arg2 == 'string'){
						opts.key	= arg2;
						opts.char	= arg2;
					}else if(arg2){
						_extend(opts, arg2);
					}
					if(arg3)
						_extend(opts, arg3);
				// prepare event
					event	= new KeyboardEvent(eventName, opts);
			}catch(e){
				event = document.createEvent('KeyboardEvent');
				(event.initKeyboardEvent || event.initKeyEvent)(eventName, true, true, window, 0, 0, 0, 0, 0, arg2 && (typeof arg2 == 'string') &&  character.charCodeAt(0));
			}
			this.eachTag(element => {
				element.dispatchEvent(event);
			});
		}
	// special event
		function _triggerSpecialEvent(ele, eventName){
			if(ele && ele[eventName])
				ele[eventName]();
		}
	// other events
		function _triggerEvent(element, eventName, options){
			var event;
			try{
				event	= new Event(eventName, { view: window, cancelable: true, bubbles: true});
			}catch(e){
				event = document.createEvent('Event');
				event.initEvent(eventName, true, true);
			}
			element.dispatchEvent(event);
		}
	// custom events
		function _triggerCustomEvent(element, eventName, options){
			var event;
			try{
				event	= new CustomEvent(eventName, { view: window, cancelable: true, bubbles: true});
			}catch(e){
				event = document.createEvent('Event');
				event.initEvent(eventName, true, true);
			}
			element.dispatchEvent(event);
		}
})();