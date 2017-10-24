$$.plugin({
	/**
	 * className()				: get the className of the fist eleemnt
	 * className(className)		: set the className of the fist eleemnt
	 * all.className()			: get all elements className as a list
	 * all.className(className)	: set the className of all elements
	 */
		className		: function(className){return _elementsAttr.call(this, 'class', className);},
	// addClass('cl1', 'cl2', ...)
		addClass		: function(){
		 	if(arguments.length){
			 	this.eachTag(ele =>{
		 			ele.classList.add.apply(ele.classList, arguments);
			 	});
		 	}
			return this;
		},
	// removeClass('cl1', 'cl2', ...)
		removeClass		: _elementClassRemove,
		rmClass			: _elementClassRemove,
	/**
	 * hasClass('cl1', 'cl2', ...)	: if all elements have those classes
	 * all.hasClass('cl1', ...)		: return an array of if each element has those classes
	 */
		hasClass		: function(){
			var i, hasClass, c = arguments.length;
			// return an array
			if(this._all){
				if(c)
					hasClass	= this.mapTags(ele=>{
						for(i=0; i<c; ++i){
							if(!ele.classList.contains(arguments[i]))
								return false;
						}
						return true;
					});
				else
					hasClass	= this.mapTags(ele => false);
			}
			// if elements has all those classes
			else{
				hasClass	= true;
				if(c){
					this.eachTag(ele =>{
						for(i=0; i<c; ++i){
							if(!ele.classList.contains(arguments[i])){
								hasClass	= false;
								return false;// break the two loops
							}
						}
					});
				}else{
					hasClass	= false;
				}
			}
			return hasClass;
		},
	// toggleClass('cl1', 'cl2', ...)
	// toggleClass(boolean, 'cl1', 'cl2')	// if boolean == true, add those classes, else remove theme
		toggleClass		: function(){
			var i, arg, c = arguments.length;
			if(c){
				// add or remove classes
				if(typeof arguments[0] == 'boolean'){
					arg	= Array.prototype.slice.call(arguments, 1);
					if(arguments[0]) // add classes
						this.addClass.apply(this, arg);
					else // remove classes
						this.removeClass.apply(this, arg);
				}
				// toggle classes
				else{
				 	this.eachTag(ele =>{
				 		for(i=0; i<c; ++i)
				 			ele.classList.toggle(arguments[i]);
				 	});
				 }
			}
			return this;
		}
});

// remove class
	function _elementClassRemove(){
		if(arguments.length){
		 	this.eachTag(ele =>{
		 		ele.classList.remove.apply(ele.classList, arguments);
		 	});
	 	}
		return this;
	}
// 