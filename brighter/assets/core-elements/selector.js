// root plugins
// that's why we added "true" argument
$$.plugin(true,{
	// select one element
	// using CSS selector
	// if multiple arguments are given, use the first matched one
		query		: function(){
			var matchedElement, i, c, ele;
			for(i = 0, c = arguments.length; i < c; ++i){
				ele	= document.querySelector(selector);
				if(ele){
					matchedElement	= ele;
					break;
				}
			}
			if(!matchedElement)
				matchedElement = [];
			matchedElement.__proto__ = $$.prototype;
			return matchedElement;
		},

	// multiple elements selector
		queryAll	: function(){
			var result	= [], i, ele, c, j, cc;
			for(i=0, c = arguments.length; i < c; ++i){
				ele		= document.querySelectorAll(selector);
				if(ele && ele.length){
					// copy node list to array
					for(var j=0, cc = ele.length; j< cc; ++j)
						result.push(ele[j]);
					break;
				}
			}
			result.__proto__ = $$.prototype;
			return result;
		}
});