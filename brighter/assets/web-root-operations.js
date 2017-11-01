
	// extend Array prototype
		classExtend(Array, $$);
	// racourcis vers $$.prototype
		var $$prototype	= $$.prototype;
	// BRIGHTER unique identifier
		var BRIGHTER_ID	= '$$' + Math.random().toString(16).substr(2,4);

	/**
	 * params
	 */
		var svgNS = "http://www.w3.org/2000/svg";

	/**
	 * map namespaces
	 */
	 	var _MAP_NAMESPACES	= {
	 		svg		: svgNS
	 	};
	 	function _mapNS(namespace){
	 		if(namespace){
		 		var ns	= namespace.toLowerCase();
		 		if(_MAP_NAMESPACES[ns])
		 			namespace	= _MAP_NAMESPACES[ns];
	 		}
	 		return namespace;
	 	}