/**
 * this function will init element list for those methodes
 * 		- push/add
 * 		- unshift
 */

function _argsToBrighterList(args){
	var list	= [], i, j, ele;
	for(i=0; i<args.length; ++i){
		ele	= args[i];
		if(ele.nodeType)// HTML or SVG element
			list.push(ele);
		else if(ele instanceof $$)
			Array.prototype.push.apply(list, ele);
		else
			throw new Error('Argument ' + i + ' is not supported');
	}
	return list;
}