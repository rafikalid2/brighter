$$.plugin({
	// set class
		className		: function(className){return this.setAttribute('class', className);},
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
	// hasClass('cl1', 'cl2', ...)
		hasClass		: function(){
			var i, hasClass, c = arguments.length;
			// return an array
			if(this._all){
				if(c)
					hasClass	= this.map(ele=>{
						if(ele.nodeType != 1) // not a tag
							return undefined;
						else{
							for(i=0; i<c; ++i){
								if(!ele.classList.contains(arguments[i]))
									return false;
							}
							return true;
						}
					});
				else
					hasClass	= this.map(ele => ele.nodeType != 1 ? false : undefined);
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
		toggleClass		: function(){
			var i, c	= arguments.length;
			if(c){
			 	this.eachTag(ele =>{
			 		for(i=0; i<c; ++i)
			 			ele.classList.toggle(arguments[i]);
			 	});
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