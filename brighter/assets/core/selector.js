// select one element
	$$.query	= function(selector){
		var ele	= document.querySelector(selector);
		ele	= ele? [ele] : [];
		ele.__proto__ = $$.prototype;
		return ele;
	};

// multiple elements selector
	$$.queryAll	= function(selector){
		var ele		= document.querySelectorAll(selector);
		var result	= [];
		if(ele && ele.length){
			// copy node list to array
			var c= ele.length;
			for(var i=0; i< c; ++i)
				result.push(ele[i]);
		}
		result.__proto__ = $$.prototype;
		return result;
	};