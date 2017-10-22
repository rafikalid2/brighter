/**
 * this function will make copies
 * copy normale object: use Object.assign
 * copy dates
 * copy arrays, use slice
 *
 *
 * assign: full clonnning
 * 
 * jquery copy only normal object and arrays, and it'is slow on array copy
 */
//TODO clone
$$.plugin(true,{
	clone	: _clone
});

function _clone(obj, isDeep){
	var clone, key;
	// is deep clone
	if(isDeep)
		clone	= new _cloneDeeper().next(obj);
	// clone only current object
	else{
		if(Array.isArray(obj))
			clone	= obj.slice(0);
		else{
			clone	= {};
			for(key in obj)
				clone[key]	= obj[key];
		}
	}
	return clone;
}

function _cloneDeeper(){
	this._EditedObj	= []; // to avoid circular loops
	this._targetObj	= [];
};

_cloneDeeper.prototype.next	= function(obj){
	var c	= this._EditedObj.indexOf(obj),
		isArray,
		clone,
		key,
		arrLength;
	// if object already referenced
	if(c != -1)
		clone	= this._targetObj[c]; // get already clonned alternative
	else{
		isArray	= Array.isArray(obj);
		clone	= isArray ? [] : {};
		// add to list
			this._EditedObj.push(obj);
			this._targetObj.push(clone);
		// continue clonning
			if(isArray){
				arrLength	= obj.length;
				for(key=0; key<arrLength; ++key)
					clone.push(this.next(obj[i]));
			}
			else{
				for(key in obj)
					clone.push(this.next(obj[i]));
			}
	}
	return clone;
};