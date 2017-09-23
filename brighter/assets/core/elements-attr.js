
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
	},
	// hasAttr(attr1, attr2, ...)
	hasAttr			: function(){
		var i, hasAttr, c = arguments.length;
		// returns an array
		if(this._all){
			if(c)
				hasAttr	= this.map(ele=>{
					if(ele.nodeType != 1)// node a tag
						return undefined;
					else{
						for(i=0; i<c; ++i){
							if(!ele.hasAttribute(arguments[i]))
								return false;
						}
						return true;
					}
				});
			else
				hasClass	= this.map(ele => ele.nodeType != 1 ? false : undefined);
		}
		// test if all elements has those attributes
		else{
			hasAttr	= true;
			if(c){
				this.eachTag(ele =>{
					for(i=0; i<c; ++i){
						if(!ele.hasAttribute(arguments[i])){
							hasAttr	= false;
							return false;// break the two loops
						}
					}
				});
			}else{
				hasAttr	= false;
			}
		}
		return hasAttr;
	},
	// remove attributes
	removeAttr		: _elementattrRemoveAttr,
	rmAttr			: _elementattrRemoveAttr
});


// remove attribute
	function _elementattrRemoveAttr(){
		var i; c= arguments.length;
		if(c){
			this.eachTag(ele => {
				for(i=0; i<c; ++i)
					ele.removeAttribute(arguments[i]);
			});
		}
		return this;
	}