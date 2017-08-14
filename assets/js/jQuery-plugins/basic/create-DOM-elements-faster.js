jQuery.createElement	= function(tagName, attributes, children){
	var e = document.createElement(tagName);
	if(attributes){
		for(var i in attributes){
			e.setAttribute(i, attributes[i]);
		}
	}
	if(children){
		if(typeof children == 'string'){
			var txt	= document.createTextNode(children);
			e.appendChild(txt);
		}else if(Array.isArray(children)){
			for(var i = 0; i < children.length; ++i)
				e.appendChild(children[i]);
		}else{
			e.appendChild(children);
		}
	}
	return e;
};