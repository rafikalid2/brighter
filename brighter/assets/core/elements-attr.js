
$$.plugin({
	// setAttribute
	setAttribute	: function(attrName, attrValue){
		return this.eachTag(ele=> ele.setAttribute(attrName, attrValue));
	},
	// get or set attributes
	// @param attr
	// 		- {string} 	: attribute name
	// 		- obj		: attributes list
	attr			: function(attr){
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
	}
});