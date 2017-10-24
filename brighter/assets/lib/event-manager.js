/**
 * this brighter library add 3 utils functions to an element
 * * *
	 * .bind('eventName', eventListner)
	 * .bind('event1 event2', eventListner)
	 * .bind('eventName.groupe', eventListner)
	 * .bind('eventName.group.subGroup', eventListner)
	 * 
	 * .unbind()							// unbind all avents
	 * .unbind(eventName)					// unbind all listeners on this event
	 * .unbind(eventName.grp.subGrp)		// unbind all events of this group
	 * .unbind(eventName, eventListener)	// unbind this listner on this event
	 * .unbind(eventName.grp, eventListener)// unbind this listner on this event from this group and its subgroups
	 *
	 * .trigger('eventName', extraParams)
	 * .trigger(eventName)
 * * *
 * target element needs to support tree functions: addEventListener, removeEventListener and dispatchEvent
 *
 * Example of use
 * * *
  	 * add event manager on this object
  	 * $$.addEventManager(obj);
 * * *
 * we could add underlayer functions
 * * *
  	 * $$.addEventManager(clzz.prototype, {
  	 * 		bind	: (eventName, eventListener) 		=> {this.addEventListener(eventName, eventListener, false)},
  	 * 		unbind	: (eventName, eventListener) 		=> {this.removeEventListener(eventName, eventListener, false)},
  	 * 		trigger	: (eventNameOrEvent, extratParams)	=> {this.removeEventListener(eventName, eventListener, false)},
  	 * 		// optional methods
  	 * 			items	: function(){} // when this is a helper too, and not the distination object, example; liste of object, must return a list
  	 * 			//exampe: items : obj => {return this.filter();}
  	 * });
  	 *
 * * *
 * we could costurmise functions too
 * * * 
  	 * $$.addEventManager(clzz.prototype, {
  	 * 		bind	: {
  	 * 			name	: 'on',
  	 * 			wrapper	: (element, eventName, eventListener) 		=> {this.addEventListener(eventName, eventListener, false)},
  	 * 		},
  	 * 		unbind	: {
  	 * 			name	: 'off',
  	 * 			wrapper	: (element, eventName, eventListener) 		=> {this.removeEventListener(eventName, eventListener, false)},
  	 * 		},
  	 * 		trigger	: {
  	 * 			name	: 'fire',
  	 * 			wrapper	: (element, eventNameOrEvent, extratParams)	=> {this.removeEventListener(eventName, eventListener, false)},
  	 * 		}
  	 * });
  	 * 
 * * *
 * 
 */
(function(){
	// params
		var LISTNER_ATTR_NAME	= '_eventListeners';
	// when there is no underlayer event manager
		const OWN_EVENTS	= {
			bind	: {
				wrapper	: function(element, eventName, eventListener){}
			},
			unbind	: {
				wrapper	: function(element, eventName, eventListener){}
			},
			trigger	: {
				wrapper	: function(element, eventNameOrEvent, extratParams){}
			}
		};
	// add plugin
	$$.plugin(true, {
		addEventManager	: function(obj, params){
			$$.assert(obj, 'the first arg must be defined');
			// events with inderlayer functions (HTMLElement, Ajax, ...)
				if(params)
					$$.assert(params.bind && params.unbind && params.trigger, 'Needs bind, unbind and trigger methods, please see the documentation.');
			// if manage events on it's own
				else
					params	= OWN_EVENTS;
			// add event methods
				// bind
					Object.defineProperty(obj, params.bind.name || 'bind', {value : function(eventName, listener){
						// assertions
							$$.assertArg((typeof eventName == 'string') && /^\s*(?:(?:[\w-]+\.)*[\w-]+\s*)+$/.test(eventName), 'Incorrect event name');
							$$.assertFunction(listener, 'Incorrect listener');
						// groups
							var events		= eventName.split(/\s+/).map(evnt =>{ return evnt.split('.'); }),
								eventsCount	= events.length,
								i;
						// add listner
							(fx => {
								if(params.items) params.items(obj).forEach(fx);
								else fx(obj);
							})(ele => {
								for(i = 0; i < eventsCount; ++i)
									_addListener(ele, events[i], listener, params.bind.wrapper || OWN_EVENTS.bind.wrapper);
							});
					} });
				// unbind
					Object.defineProperty(obj, params.unbind.name || 'unbind', {value : function(eventName, listener){
						var i, eventCount;
						// arg validation
							$$.assertArg(!eventName || (typeof eventName == 'string') && /^\s*(?:(?:[\w-]+\.)*[\w-]+\s*)+$/.test(eventName), 'Incorrect event name');
							$$.assertArg(!listener || typeof listener == 'function', 'Incorrect listener');
						// unbind all or unbind listener from all
							var applyOnElements	= (fx => {
								if(params.items) params.items(obj).forEach(fx);
								else fx(obj);
							});

							// remove all events or a listener from all events
								if(!eventName)
									applyOnElements(ele => { _unbindEvent(ele, null, listener, params.unbind.wrapper || OWN_EVENTS.unbind.wrapper) });
								else{
									eventName	= eventName.split(/\s+/).map(evnt =>{ return evnt.split('.'); });
									eventCount	= eventName.length;
									applyOnElements(ele => {
										for(i = 0; i < eventCount; ++i)
											_unbindEvent(ele, eventName[i], listener, params.unbind.wrapper || OWN_EVENTS.unbind.wrapper);
									});
								}
					} });
				// trigger
					Object.defineProperty(obj, params.trigger.name || 'trigger', {value : function(){
						
					} });
		}
	});

	// add listener
		function _addListener(element, eventListPath, listener, wrapper){
			// add event to element
				// wrapper.addEventListener(eventListPath[0], listener, false);
				wrapper(element, eventListPath[0], listener);
			// get private data store
				var privateData	= _elementPrivateData(element);
				if(!privateData[LISTNER_ATTR_NAME])
					privateData[LISTNER_ATTR_NAME]	= {};
				privateData	= privateData[LISTNER_ATTR_NAME];
			// add listener to dest path
				privateData = $$.path(privateData, eventListPath, {
					template	: {items: {}, listeners: []},
					childNode	: 'items'
				});
				privateData.listeners.push(listener);
		}

	// unbind event
		function _unbindEvent(obj, eventPath, listener){
		 	var dataEvent	= _elementPrivateData(ele),
		 		eventName,
		 		i, c,
		 		prnt;
		 	// no events
		 		if(!dataEvent){}
		 	// unbind all events
			 	if(!eventPath){
			 		for(i in dataEvent){
				 		_ObjDeepOperation(
				 			dataEvent[i],
				 			ele => {
				 				ele.listeners.forEach(lstner => obj.removeEventListener(eventName, lstner, false));
					 		},{
					 			childNode	: 'items'
							}
						);
						delete dataEvent[i];
				 	}
			 	}
			 	else{
				 	// eventPath to Array
				 		if(typeof eventPath == 'string')
				 			eventPath	= eventPath.split('.');
				 	eventName	= eventPath[0];
				 	// unbind from DOM
					 	if(listener){
					 		obj.removeEventListener(eventName, listener, false);
					 		// remove this listener on data
					 			_ObjDeepOperation(
					 				_ObjDeepOperation(dataEvent, eventPath),
					 				ele => {
					 					ele.listeners && $$Arrays.removeAll.call(ele.listeners, listener);
					 				},{
					 					childNode	: 'items'
					 				}
					 			);
					 	}
					// unbind all regestred event listeners
					 	else{
					 		_ObjDeepOperation(
				 				_ObjDeepOperation(dataEvent, eventPath),
				 				ele => {
				 					if(ele.listener)
				 						for(i = 0, c = ele.listeners.length; i < c; ++i)
				 							obj.removeEventListener(eventName, ele.listeners[i], false);
				 				},{
				 					childNode	: 'items'
				 				}
				 			);
				 			if(eventPath.length == 1)
				 				delete dataEvent[eventName];
				 			else
				 				delete _ObjDeepOperation(dataEvent, eventPath.slice(0,-2))[eventPath[eventPath.length - 1]];
					 	}
			 	}
		}
})();