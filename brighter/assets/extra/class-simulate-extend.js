/**
 * this function simulate inheritance by linking prototypes
 */

function classExtend(parent, child){
	function surrogate(){
		this.constructor	= parent;
	}
	surrogate.prototype	= parent.prototype;

	var oldPrototype	= child.prototype;
	child.prototype		= new surrogate();
	if(oldPrototype){
		_extendObject(child.prototype, oldPrototype);
	}
}

// make it usable by others
	$$.classExtend	= classExtend;