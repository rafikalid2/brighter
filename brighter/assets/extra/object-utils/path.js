
/**
 * create Object path
 * $$.obj.path(obj, 'g1.g2.g3', template, clue)
 * $$.obj.path(obj, 'g1.g2.g3')
 * $$.obj.path(obj, 'g1.g2.g3', {items:{}, att:value, ...})
 * $$.obj.path(obj, 'g1.g2.g3', {items:{}, att:value, ...}, 'items')
 */
$$.obj.path	= function(obj, path, template, childrenAttr, putValue){
	// control
		if(!obj)
			throw new $$.errors.missedArgument('first argument');
		if(!path || !path.match(/^(?:\w+\.)+\w+$/))
			throw new $$.errors.illegalArgument('incorrect path: ', path);
	// operations
		return _objPath(obj, path.split('.'), template, childrenAttr, putValue);
};

function _objPath(obj, path, template, childrenAttr, putValue){
	var i, c = path.length;
	// if put value
		var lastKey;
		if(putValue){
			--c;
			lastKey	= path[c];
		}
	// create path
		for(i = 0; i < c; i++){
			if(!obj[path[i]])
				obj[path[i]]	= template && _objClone(template, true) || {};
			obj	= obj[path[i]];
			if(childrenAttr){
				if(!obj[childrenAttr])
					obj[childrenAttr] = {};
				obj	= obj[childrenAttr];
			}
		}
	// if put value
		if(putValue){
			obj[lastKey]	= putValue;
			obj	= obj[lastKey];
		}
	return obj;
}

/**
 * if a path exists
 * $$.obj.exists(obj, path)
 */
$$.obj.exists	= function(obj, path, childrenAttr){
	// control
		if(!obj)
			throw new $$.errors.missedArgument('first argument');
		if(!path || !path.match(/^(?:\w+\.)+\w+$/))
			throw new $$.errors.illegalArgument('incorrect path: ', path);
	// operations
		return _objExists(obj, path.split('.'), childrenAttr);
}

function _objExists(obj, path, childrenAttr){
	var exists	= true;
	for(var i = 0, c = path.length; i < c; ++i){
		if(obj[path[i]]){
			obj	= obj[path[i]];
			if(childrenAttr){
				obj	= obj[childrenAttr];
				if(!obj){
					exists	= false;
					break;
				}
			}
		}else{
			exists	= false;
			break;
		}
	}
	return exists;
}