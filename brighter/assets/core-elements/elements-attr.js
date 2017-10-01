
$$.plugin({
	// setAttribute		: set attr of the first element
	// all.setAttribute	: set attribute of all elements
	setAttribute	: function(attrName, attrValue){
		return _elementsAttr.call(this, attrName, attrValue);
	},
	// get or set attributes
	// attr('attrName')		// get attrubute value
	// attr({key: value})	// set attributes
	// attr(namespace, {key: value})	// set attributes with namespace
	attr			: function(){
		var ele, resut, attr, namespace;
		// arguments
			if(arguments.length ==1)
				attr		= arguments[0];
			else if(arguments.length == 2){
				namespace	= _mapNS(arguments[0]);
				attr		= arguments[1];
			}
		if(attr){
			// get value
				if(typeof attr == 'string'){
					if(this._all){ // "all" is specified for the current object (.all.attr(...))
						result	= this.mapTags(ele => ele.getAttribute(attr));
					}else{
						ele	= this.getFirstTag();
						if(ele)
							resut	= ele.getAttribute(attr);
					}
					return resut;
				}
			// set values
				else{
					if(namespace)
						this.eachTag(ele => {
							for(var i in attr)
								ele.setAttributeNS(namespace, i, attr[i]);
						});
					else
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
				hasAttr	= this.mapTags(ele=>{
					for(i=0; i<c; ++i){
						if(!ele.hasAttribute(arguments[i]))
							return false;
					}
					return true;
				});
			else
				hasClass	= this.mapTags(ele => false);
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
// set/get attribute
	function _elementsAttr(attr, attrValue){
		var result, frstElement;
		// insert
		if(attrValue){
			if(this._all)
				this.eachTag(ele => {
					ele.setAttribute(attr, attrValue);
				});
			else{
				frstElement	= this.getFirstTag();
				if(frstElement)
					frstElement.setAttribute(attr, attrValue);
			}
			result	= this;
		}
		// get
		else{
			if(this._all)
				result	= this.mapTags(ele => ele.getAttribute(attr));
			else{
				frstElement	= this.getFirstTag();
				if(frstElement)
					result	= frstElement.getAttribute(attr);
			}
		}
		return result;
	}