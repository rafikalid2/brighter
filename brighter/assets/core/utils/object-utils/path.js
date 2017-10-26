/**
 * Go through object
 * $$.path(
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
 * $$.path(obj, path) // returns the value inside this path or undefined if the path do not exists
 * $$.path(obj, path, {template:{...}}) // get path, create it using this template if not exists
 */
/**
 * create Object path
 * $$.path(obj, 'g1.g2.g3', template, clue)
 * $$.path(obj, 'g1.g2.g3')
 * $$.path(obj, 'g1.g2.g3', {items:{}, att:value, ...})
 * $$.path(obj, 'g1.g2.g3', {items:{}, att:value, ...}, 'items')
 *
 *
 * $$.path(obj, 'path', 'childAttr')
 * 
 */
//TODO add support to wildcard, it means any key, add support de [a,b], it means a or b
//TODO if it is an array, add support to, arr.attr means a.att of any a from arr
$$.plugin(true, {
	// check if a path is valid
	isPath	: function(path){
		return (typeof path == 'string') && /^(?:\w+\.)+\w+$/.test(path);
	},
	// exec path
	path	: function(obj, path, options){
		// plain object or array
			$$.assert(obj, $$.err.missedArgument, 'Needs the object');
			$$.assertArg($$.isPath(path), 'Inccorect path');
			//TODO verifier les options
		// operations
			return _objPath(obj, path, options);
	},

	hasPath	: function(obj, path, childrenAttr){
		// control
			$$.assert(obj, $$.err.missedArgument, 'Needs the object');
			$$.assertArg($$.isPath(path), 'Inccorect path');
		// operations
			return _objExists(obj, path.split('.'), childrenAttr);
	}
});

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
	// reglage
		var childrenAttr	= options.childNode; // pour le moment on support juste d'avoir un string //TODO
		var upsert	= options.upsert || !!options.template;
	// if put value
		var lastKey;
		if(options.putValue){
			--c;
			lastKey	= path[c];
		}
	// create path
		for(i = 0; i < c; i++){
			if(!obj[path[i]]){
				// if create element
					if(upsert)
						obj[path[i]]	= options.template && _objClone(options.template, true) || {};
				// else, returns undefined
					else
						return undefined;
			}
			obj	= obj[path[i]];
			if(childrenAttr){
				if(!obj[childrenAttr])
					obj[childrenAttr] = {};
				obj	= obj[childrenAttr];
			}
		}
	// if put value
		if(options.putValue){
			obj[lastKey]	= options.putValue;
			obj	= obj[lastKey];
		}
	return obj;
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