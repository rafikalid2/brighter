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