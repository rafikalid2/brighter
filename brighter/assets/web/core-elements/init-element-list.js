/**
 * _argsToBrighterList(HTMLElement, ...)
 * _argsToBrighterList(ArrayLike, ...)
 * _argsToBrighterList(this => this.someFxThatReturnsElements())
 * _argsToBrighterList(selector)
 * 
 * this function will init element list for those methodes
 * 		- push/add
 * 		- unshift
 */

function _argsToBrighterList(args){
	var list	= [], ele;
	for(var i = 0, c = args.length; i < c; ++i){
		ele	= args[i];
		// HTML or SVG element
		if(ele.nodeType){
			list.push(ele);
			continue;
		}
		// elements from current collection ($$Obj => $$obj.someFx())
		else if(typeof ele == 'function'){
			ele	= ele(this);
			if(ele && ele.length)
				ele	= ele.filter(e => e && e.nodeType > 0);
			else
				continue;
		}
		// selector
		else if(typeof ele == 'string')
			ele	= this.findAll(ele);
		// brighter
		else if(ele instanceof $$){}
		// array like
		else if('length' in ele)
			ele	= Array.prototype.filter.call(ele, e => e && e.nodeType > 0);
		else
			throw new $$.err.illegalArgument('Argument ' + i + ' is not supported: ', ele);

		if(ele.length)
			Array.prototype.push.apply(list, ele);
	}
	return list;
}