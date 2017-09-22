

// fonction hiritees et utiliser directement depuis la class Array
	// Array.prototype.every((ele, index) => true || false)		returns true if all elements passed the test
	// Array.prototype.some((ele, index) => true || false)		returns true if at least one element passes the test 
	// 
	// Array.prototype.map(ele => {return img})
	// Array.prototype.reduce()
	// Array.prototype.reduceRight()
	// 
	// Array.prototype.pop
	// Array.prototype.shift


// add element to collection
	$$prototype.push = $$prototype.add = function(){
		// control
			var list = _argsToBrighterList(arguments);
		// add to list
			Array.prototype.push.apply(this, list);
		return this;
	};

// unshift
	$$prototype.unshift = function(){
		// control
			var list = _argsToBrighterList(arguments);
		// unshift
			Array.prototype.unshift.apply(this, list);
		return this;
	};

// concat
	$$prototype.concat	= function(){
		var lst	= this.concat(_argsToBrighterList(arguments));
		lst.__proto__ = $$prototype;
		return lst;
	};

//slice
	$$prototype.slice	= function(){
		var lst	= Array.prototype.slice.apply(this, arguments);
		lst.__proto__ = $$prototype;
		return lst;
	};

// splice
	$$prototype.splice	= function(strt, nbrRemove){
		// elements to be added
			var tobeAdded	= [];
			if(arguments.length > 2){
				tobeAdded = Array.prototype.push.apply(tobeAdded, arguments);
				tobeAdded.splice(0,2);
				tobeAdded	= _argsToBrighterList(tobeAdded);
			}
		// other args
			tobeAdded.splice(0, 0, strt, nbrRemove);
		// returned array
			var lst= Array.prototype.splice.apply(this, tobeAdded);
			lst.__proto__ = $$prototype;
			return lst;
	};

// duplicate collection
	$$prototype.duplicate	= function(){
		return this.slice(0);
	};

// forEach
	$$prototype.forEach		= $$prototype.each	= function(callBack){
		var i, c= this.length;
		for(i=0; i<c ; ++i){
			if(callBack(this[i], i) === false)
				break;
		}
		return this;
	};

// each tag (tag only, exclude attributeNode, commentNode, textNode, ...)
	$$.prototype.eachTag	= function(callBack){
		var i, c= this.length, ele;
		for(i=0; i<c; ++i){
			ele	= this[i];
			if(
				ele
				&& ele.nodeType == 1
				&& callBack(ele, i) === false
			)
				break;
		}
		return this;
	};

// filter
	$$prototype.filter	= function(){
		var filtered	= Array.prototype.filter.apply(this, arguments);
		filtered.__proto__	= $$prototype;
		return filtered;
	};

// sort
	$$prototype.sort	= function(){
		Array.prototype.sort.apply(this, arguments);
		return this;
	};
// reverse
	$$prototype.reverse	= function(){
		Array.prototype.reverse.apply(this, arguments);
		return this;
	};
/**
 * make a test on every element in the array
 * 	every((ele, index) =>{
 * 		return true||false;
 * 	})
 *
 * @return {boolean} if all elements in the array passed successfuly the test
 */
 	// $$prototype.every	= native fx (Array.prototype.every)
 	// 

/**
 * get element from position
 */
 	$$.prototype.eq	= function(index){
 		var result	= this.length? [this[index < 0 ? this.length + index : index]] : [];
		result.__proto__ = $$prototype;
		return result;
 	};
// first
	$$prototype.first	= function(){ return this.eq(0); };
// last
	$$prototype.last	= function(){ return this.eq(-1); };
//first tag
	$$prototype.getFirstTag	= function(){
		var i, c = this.length;
		for(i=0; i<c; ++i){
			if(this[i].nodeType == 1)
				return this[i];
		}
		return undefined;
	};
	$$prototype.firstTag	= function(){
		var ele			= this.getFirstTag();
		ele				= ele ? [ele] : [];
		ele.__proto__	= $$prototype;
		return ele;
	};
// last tag
	$$prototype.getLastTag= function(){
		var i;
		for(i = this.length - 1; i>=0; --i){
			if(this[i].nodeType == 1)
				return this[i];
		}
		return undefined;
	};
	$$prototype.lastTag	= function(){
		var ele			= this.getLastTag();
		ele				= ele ? [ele] : [];
		ele.__proto__	= $$prototype;
		return ele;
	};