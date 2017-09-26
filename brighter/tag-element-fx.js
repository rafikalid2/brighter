// setAttribute
	$$prototype.setAttribute	= function(attrName, attrValue){
		return this.each(ele=> ele.setAttribute(attrName, attrValue));
	};

// attributes
// @param attr
// 		- {string} 	: attribute name
// 		- obj		: attributes list
	$$prototype.attr	= function(attr){
		if(this.length){
			if(typeof attr == 'string')
				return this[0].getAttribute(attr);
			else
				this.each(ele => {
					for(var i in attr)
						ele.setAttribute(i, attr[i]);
				});
		}
		return this;
	};

/**
 * classes
 */
 $$prototype.className		= function(className){return this.setAttribute('class', className);};
 /**
  * addClass('cl1 cl2 cl3 ...')
  * addClass('cl1', 'cl2', ...)
  * addClass(['cl1', 'cl2', ...])
  */
 $$prototype.addClass		= function(className){
 	if(className){
	 	className	= className.split(' ');
	 	var i, c = className.length;
	 	this.eachTag(ele =>{
	 		for(i=0; i<c; ++i)
	 			ele.classList.add(className[i]);
	 	});
 	}
	return this;
 };
 $$prototype.removeClass	= $$prototype.rmClass	= function(className){
 	if(className){
 		className	= className.split(' ');
	 	var i, c = className.length;
	 	this.eachTag(ele =>{
	 		for(i=0; i<c; ++i)
	 			ele.classList.remove(className[i]);
	 	});
 	}
	return this;
 };
 /**
  * if all elements has specifid class
  * @return {Boolean} [description]
  */
 $$prototype.hasClass		= function(){
 	var hasClass;
 	if(className){
 		className	= className.split(' ');
	 	var i, c = className.length;
	 	this.eachTag(ele =>{
	 		for(i=0; i<c; ++i)
	 			ele.classList.remove(className[i]);
	 	});
 	}else{
 		hasClass	= false;
 	}
	return hasClass;
 };
 $$prototype.toggleClass	= function(){};

 // get classes list
 	function _tagElementFxClassesList(args){
 		var lst = [];
 		var i, arg, c= args.length;
 		for(i = 0; i<c; ++i){
 			arg	= args[i];
 			if(Array.isArray(arg))
 				lst.push
 		}
 	}

 /**
  * val
  */