/**
 * modify the style of the selected items
 * 	.css()				// get computed style
 * 	.css(':after')		// get pseudo element computed style
 * 	.css('styleAttr')	// returns the computed value of the first element element, if "all" is set, return a list of all elements
 * 	.css(':after', 'styleAttr')
 * 	.css({key: value})	// set thos attributes
 */
$$.plugin({
	css	: function(arg, arg2){
		var i, ele, computedStyle;
		// if get the computed style
			if(!arg || (typeof arg	== 'string')){
				// if we want the element or its pseudo-element
					if(!arg)
						arg	= null;
					else if(arg.charAt(0) != ':'){
						arg2	= arg;
						arg		= null;
					}
				// if "all" is specified, get all computed styles inside a list
				if(this._all){
					computedStyle	= this.map(ele => {
						var result;
						if(ele.nodeType != 1) // not a tag
							result	= undefined;
						else{
							result	= window.getComputedStyle(ele, arg);// on peu ajouter le pseudo aussi
							//get specifique property if required
								if(arg2){
									result	= result.getPropertyValue(arg2);
								}
						}
						return result;
					});
				}else{
					var ele	= this.getFirstTag();
					if(ele){
						computedStyle	= window.getComputedStyle(ele, arg);// on peu ajouter le pseudo aussi
						//get specifique property if required
							if(arg2){
								computedStyle	= computedStyle.getPropertyValue(arg2);
							}
					}
				}
				return computedStyle;
			}
		// else if set style attribute
			else{
				$.eachTag(ele =>{
					for(i in arg)
						ele.style[i]	= arg[i];
				});
			}
		return this;
	},
	// remove css property
	rmCss	: function(){
		var i, c= arguments.length;
		return this.eachTag(ele => {
			for(i=0; i<c; ++i)
				ele.removeProperty(arguments[i]);
		});
	}
});