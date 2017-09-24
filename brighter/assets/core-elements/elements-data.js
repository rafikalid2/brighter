// data kies
	var BRIGHTER_DATA_KEY		= 'b' + BRIGHTER_ID; // used to store brighter data
	var BRIGHTER_USER_DATA_KEY	= 'u' + BRIGHTER_ID; // used to store user data set by the methode $$ele.data


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
			result	= this.mapTags(ele => _elementDataGet(ele, BRIGHTER_USER_DATA_KEY));
		}
		// return the first element data
		else{
			ele	= this.getFirstTag();
			if(ele)
				result	= _elementDataGet(ele, BRIGHTER_USER_DATA_KEY);
		}
		return result;
	}
 });


 /**
  * store BRIGHTER private data
  */
 	function _elementPrivateData(obj){
 		return _elementDataGet(BRIGHTER_DATA_KEY, obj);
 	}

/**
 * get the data from an object
 */
function _elementDataGet(obj, key){
	var dataObj	= obj[key];
	if(!dataObj)
		Object.defineProperty(obj, key, {
			value	: {}
		});
	return dataObj;
}