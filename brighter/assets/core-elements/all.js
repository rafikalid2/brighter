/**
 * when this attribute present, functions thats returns values (like: data, css(attrName), ...)
 * will returns a liste of all elements in the collection instead of value of the first one
 */

$$.plugin('all',{
	get		: function(){
		Object.defineProperty(this, '_all',{
			value	: true,
			writable: true,
			enumerable: false
		});
		return this;
	}
});