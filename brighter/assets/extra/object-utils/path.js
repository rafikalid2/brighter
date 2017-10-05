/**
 * Go through object
 * $$.obj.path(
 * 		obj, 	// base object: Plain object or array
 * 		path,	// string or list<String>
 * 		{		// optional
 * 			template	: object or array to use to create attribute if not exists, default to {}
 * 			childNode	: String, list<String>
 * 			putValue	: value to put in the last attribute in the path
 * 			upsert		: create path if not exists, implicite true if "template" is set
 * 		}
 * 	)
 *
 * $$.obj.path(obj, path) // returns the value inside this path or undefined if the path do not exists
 * $$.obj.path(obj, path, {template:{...}}) // get path, create it using this template if not exists
 */
/**
 * create Object path
 * $$.obj.path(obj, 'g1.g2.g3', template, clue)
 * $$.obj.path(obj, 'g1.g2.g3')
 * $$.obj.path(obj, 'g1.g2.g3', {items:{}, att:value, ...})
 * $$.obj.path(obj, 'g1.g2.g3', {items:{}, att:value, ...}, 'items')
 */
$$.obj.path	= function(obj, path, options){
	// control
	// plain object or array
		if(!obj)
			throw new $$.errors.missedArgument('first argument');
		$$.assert(path, 'incorrect path').match(/^(?:\w+\.)+\w+$/);
	// operations
		return _objPath(obj, path.split('.'), template, childrenAttr, putValue);
};

/**
 * @param  {Object} 		obj
 * @param  {Array<String>} 	path
 * @param  {Object or Array, optional} template
 * @param  {String, optional} 
 * @param  {any, optional} putValue
 * @return {object}
 */
const _objPathEmptyOptions	= {};// we just need this to avoid to create new object each time we do not have options, this will remaine empty
function _objPath(obj, path, options){
	// set path as Array
		if(typeof path == 'string')
			path	= path.split('.');
		if(!options)
			options	= _objPathEmptyOptions;
	// vars
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
	var exists	= true,
		c	= path.length,
		i;
	try{
		if(childrenAttr)
			for(i = 0; i < c; ++i)
				obj	= obj[path[i]][childrenAttr];
		else
			for(i = 0; i < c; ++i)
				obj	= obj[path[i]];
	}catch(e){
		exists	= false;
	}
	return exists;
}