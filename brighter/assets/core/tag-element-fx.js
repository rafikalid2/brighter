// setAttribute
	$$prototype.setAttribute	= function(attrName, attrValue){
		return this.eachTag(ele=> ele.setAttribute(attrName, attrValue));
	};

// attributes
// @param attr
// 		- {string} 	: attribute name
// 		- obj		: attributes list
	$$prototype.attr	= function(attr){
		var ele, resut;
		if(attr){
			// get value
				if(typeof attr == 'string'){
					if(this._all){ // "all" is specified for the current object (.all.attr(...))
						result	= this.map(ele => ele.nodeType != 1 && ele.getAttribute(attr));
					}else{
						ele	= this.getFirstTag();
						if(ele)
							resut	= ele.getAttribute(attr);
					}
					return resut;
				}
			// set values
				else{
					this.eachTag(ele => {
						for(var i in attr)
							ele.setAttribute(i, attr[i]);
					});
				}
		}
		return this;
	};

/**
 * classes
 */
 $$prototype.className		= function(className){return this.setAttribute('class', className);};
 /**
  * addClass('cl1', 'cl2', ...)
  */
 $$prototype.addClass		= function(){
 	if(arguments.length){
	 	this.eachTag(ele =>{
 			ele.classList.add.apply(ele.classList, arguments);
	 	});
 	}
	return this;
 };
 /**
  * removeClass('cl1', 'cl2', ...)
  */
 $$prototype.removeClass	= $$prototype.rmClass	= function(className){
 	if(arguments.length){
	 	this.eachTag(ele =>{
	 		ele.classList.remove.apply(ele.classList, arguments);
	 	});
 	}
	return this;
 };
 /**
  * if all elements has specified class or classes
  * hasClass('cl1', 'cl2', ...)
  * @return {Boolean} [description]
  */
 $$prototype.hasClass		= function(){
 	var hasClass	= true;
 	if(arguments.length){
	 	var i, c = arguments.length;
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
	return hasClass;
 };
 /**
  * toggle selected classes
  * toogleClass('cl1', 'cl2', ...)
  */
 $$prototype.toggleClass	= function(){
 	var i, c	= arguments.length;
 	if(c){
	 	this.eachTag(ele =>{
	 		for(i=0; i<c; ++i)
	 			ele.classList.toggle(arguments[i]);
	 	});
 	}
 	return this;
 };

 /**
  * val/value
  * get or set the value of an element
  * if the element has hooks, use the hook
  * condition on hooks:
  * 	- tag name
  * 	- contains attribute
  * 	- has attribute with a value
  * 	- attached to element statically
  * possible hooks are
  * 	- hook added to element by the function .val(valueResulver)
  * 	- hook added by the function $$.valueResolver(tagName, )
  *
  * 	// element value resolver
  * 	$$ele.valueResolver({
  * 		get		: ele => {},
  * 		set		: (ele, value) => {}
  * 	})
  * 	// global value resolver
  * 	$$.valueResolver({
  * 		get		: ele => {},
  * 		set		: (ele, value) => {},
  * 		selector: 'input[type=text]'
  * 	});
  */