// reset // to default values, apply on: form, form-control
// serialize() // serialize the first form, add .all to serialize all forms in the collection, apply on: form
// clear()	//remove all results, apply on: form, form-control

// fill({values}), apply on: form
// fill({
// values:values}); // true means
/**
 * fill({values})	// unspecified fields will not be touched
 * fill({values}, true) // unspecified fields will be filled with default values
 * fill({values}, false)// unspecified values will be cleared
 * fill({values}, {defaultValue: ''})	// unspecified values will be filled with this value
 */
/**
 * reset: (default values or brighter default values)
 * serialize
 * fill
 * toObject
 * toJSON
 */


/**
 * form controls
 */
 	$$.plugin('formControls', {
 		get	: function(){
 			this.$$map(ele => ele.elements);
 		}
 	});