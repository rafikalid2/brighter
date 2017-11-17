// data kies
 	var _BrighterPrivateData	= new WeakMap();
 	var _BrighterPublicData		= new WeakMap();

/**
 * store data inside element
 * user data	: hash map
 * brighter data: hashMap
 */
 $$.plugin('data',{
 	get		: function(){
		var ele, result;
		// if returns all elements data as list
		if(this._all){
			result	= this.mapTags(ele => _elementDataGet(ele));
		}
		// return the first element data
		else{
			ele	= this.getFirstTag();
			if(ele)
				result	= _elementDataGet(ele);
		}
		return result;
	}
 });


 /**
  * store BRIGHTER private data
  */
 	function _elementPrivateData(obj){
 		if(!_BrighterPrivateData.has(obj))
 			_BrighterPrivateData.set(obj, {});
 		return _BrighterPrivateData.get(obj);
 	}

/**
 * get the data from an object
 */
	function _elementDataGet(obj){
		if(!_BrighterPublicData.has(obj))
 			_BrighterPublicData.set(obj, {});
 		return _BrighterPublicData.get(obj);
	}