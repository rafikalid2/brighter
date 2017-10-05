
(function(){
	// params
		var LISTNER_ATTR_NAME	= '_eventListeners';
	// add wrappers
		var mouseWrappers	= ['click', 'contextmenu', 'dblclick', 'hover', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'mouseup'];
		var otherWrappers	= [ 'change', 'error', 'focusin', 'focusout', 'load', 'resize', 'unload'];
		var keyboardEvents	= ['keydown', 'keypress', 'keyup'];
		var specialWrappers	= ['blur', 'focus', 'submit'];



	// add/remove listeners
		var plugins	= {};
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
		plugins.bind	= plugins.on	=  function(eventName, listener){
			if(eventName)
				eventName	= eventName.trim();
			// arg validation
				$$.assert(eventName, 'Error with eventName').match(/^(?:(?:[\w-]+\.)*[\w-]+\s*)+$/);
				$$.assert(listener, 'Error with listener').isFunction();
			// groups
				var events		= eventName.split(/\s+/).map(evnt =>{ return evnt.split('.'); });
				var eventsCount	= events.length;
				var i;
			// add listner
				return this.eachTag(ele => {
					for(i = 0; i < eventsCount; ++i)
						_addListener(ele, events[i], listener);
				});
		};
	// store listener
		function _addListener(element, eventListPath, listener){
			// add event to element
				ele.addEventListener(eventListPath[0], listener, false);
			// get private data store
				var obj	= _elementPrivateData(ele);
				if(!obj[LISTNER_ATTR_NAME])
					obj[LISTNER_ATTR_NAME]	= {};
				obj	= obj[LISTNER_ATTR_NAME];
			// add listener to dest path
				obj = _objPath(obj, eventListPath, {items: {}, listeners: []}, 'items');
				obj.listeners.push(listener);
		}

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
		plugins.unbind	= plugins.off	=  function(eventName, listener){
			if(eventName)
			eventName	= eventName.trim();
			// arg validation
				$$.assert(eventName, 'Error with eventName').whenExists.match(/^(?:(?:[\w-]+\.)*[\w-]+\s*)+$/);
				$$.assert(listener, 'Error with listener').whenExists.isFunction();
			// if unbind all
				if(!eventName)
					this.eachTag(ele => _unbindEvent(ele));
			// if unbind specific event
				else{
					eventName	= eventName.split(/\s+/).map(evnt =>{ return evnt.split('.'); });
					var i, c	= eventName.length;
					this.eachTag(ele =>{
						// remove event listener in data
							for(i = 0; i < c; ++i)
								_unbindEvent(ele, eventName[i], listener);
					});
				}
		};

	 function _unbindEvent(obj, eventPath, listener){
	 	var dataEvent	= _elementPrivateData(ele);
	 	var eventName	= eventPath[0];
	 	// unbind from DOM
		 	if(listener){
		 		obj.removeEventListener(eventName, listener, false);
		 		// remove this listener on data
		 			_ObjDeepOperation(dataEvent, eventPath, 'items' , ele => {
		 				ele.listeners && $$Arrays.removeAll.call(ele.listeners, listener);
		 			})
		 	}
		 	else // unbind all regestred events
		 		$$.obj.deep(dataEvent, ele => ele.items, ele => {
		 			ele.listeners.forEach(lstner => obj.removeEventListener(eventName, lstner, false));
		 		});
	 }
	 function _unbindEventFrom_ (obj, rootObj, listener){
	 	// remove all ocurrence of this object
	 		if(eventListener)
	 			$$Arrays.removeAll.call(rootObj.listeners, listener);
	 		else
	 			rootObj.listeners.forEach(lst => obj.removeEventListener())
	 	// use recursive fx
	 		for(var i in rootObj.items)
	 			_unbindEventFrom_(obj, rootObj.items[i], listener);
	 	//TODO change recursive function
	 }

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

	// trigger event
		plugins.trigger	= function(eventName, options){
			if(mouseWrappers.indexOf(eventName) != -1)
				_triggerMouseEvent.call(this, eventName, options);
			else if(otherWrappers.indexOf(eventName) != -1)
				_triggerEvent.call(this, eventName, options);
			else if(keyboardEvents.indexOf(eventName) != -1)
				_triggerKeyboardEvent.call(this, eventName, options);
			else if(specialWrappers.indexOf(eventName) != -1)
				_triggerSpecialEvent.call(this, eventName);
			else // custom event
				_triggerCustomEvent.call(this, eventName, options);
		};
	
	// add to brighter
		$$.plugin(plugins);
	/**
	 * apply mouse events
	 * examples:
	 * 			$$(...).click()				// trigger click event
	 * 			$$(...).click({options})	// trigger click event with those options
	 * 			$$(...).click(callBack)		// set callBack as event listener
	 */
	// 
		mouseWrappers.forEach(function(eventName){
			$$.plugin(eventName, {
				value	: function(arg){
					// add new listener
						if(arg && (typeof arg == 'function'))
							this.on(eventName, arg);
					// trigger event
						else
							_triggerMouseEvent.call(this, eventName, arg);
				}
			});
		});
	/**
	 * apply keybord events
	 * examples:
	 * 			$$(...).keydown()			// trigger this event
	 * 			$$(...).keydown({options})	// trigger this event with those options
	 * 			$$(...).keydown('a');		// trigger like char 'a' is pressed
	 * 			$$(...).keydown('a', {options});		// trigger like char 'a' is pressed
	 * 			$$(...).keydown(callBack)	// add this callBack as a listener
	 */
		keyboardEvents.forEach(function(eventName){
			$$.plugin(eventName, {
				value	: function(arg, arg2){
					// add new listener
						if(arg && (typeof arg == 'function'))
							this.on(eventName, arg);
					// trigger event
						else
							_triggerKeyboardEvent.call(this, eventName, arg, arg2);
				}
			});
		});
	/**
	 * special wrappers
	 * examples
	 * 		$$(...).focus()	// focus the first tag on the list
	 * 		$$(...).focus(callBack)// set callBack as a listener
	 */
	 	specialWrappers.forEach(function(eventName){
	 		$$.plugin(eventName, {
				value	: function(arg){
					// add new listener
						if(arg && (typeof arg == 'function'))
							this.on(eventName, arg);
					// trigger event
						else
							_triggerSpecialEvent.call(this, eventName);
				}
			});
	 	});
	 /**
	  * other events
	  */
		otherWrappers.forEach(function(eventName){
			$$.plugin(eventName, {
				value	: function(arg){
					// add new listener
						if(arg && (typeof arg == 'function'))
							this.on(eventName, arg);
					// trigger event
						else
							_triggerEvent.call(this, eventName, arg);
				}
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
		function _triggerSpecialEvent(eventName){
			var ele	= this.getFirstTag();
			if(ele && ele[eventName])
				ele[eventName]();
		}
	// other events
		function _triggerEvent(eventName, options){
			var event;
			try{
				event	= new Event(eventName, { view: window, cancelable: true, bubbles: true});
			}catch(e){
				event = document.createEvent('Event');
				event.initEvent(eventName, true, true);
			}
			this.eachTag(element => {
				element.dispatchEvent(event);
			});
		}
	// custom events
		function _triggerCustomEvent(eventName, options){
			var event;
			try{
				event	= new CustomEvent(eventName, { view: window, cancelable: true, bubbles: true});
			}catch(e){
				event = document.createEvent('Event');
				event.initEvent(eventName, true, true);
			}
			this.eachTag(element => {
				element.dispatchEvent(event);
			});
		}
})();