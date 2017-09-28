// root plugins
// that's why we added "true" argument
$$.plugin(true,{
	// select one element
	// using CSS selector
	// if multiple arguments are given, use the first matched one
		query		: function(){
			var matchedElement, i, ele;
			for(i =0; i< arguments.length; ++i){
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
			var result	= [], i, ele, c;
			for(i=0; i<arguments.length; ++i){
				ele		= document.querySelectorAll(selector);
				if(ele && ele.length){
					// copy node list to array
					c	= ele.length;
					for(var i=0; i< c; ++i)
						result.push(ele[i]);
					break;
				}
			}
			result.__proto__ = $$.prototype;
			return result;
		}
});