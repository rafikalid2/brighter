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
 $$prototype.className		= function(className){
 	return this.setAttribute('class', className);
 };
 $$prototype.addClass		= function(className){};
 $$prototype.removeClass	= $$prototype.rmClass	= function(className){};
 $$prototype.hasClass		= function(){};
 $$prototype.toggleClass	= function(){};

 /**
  * val
  */