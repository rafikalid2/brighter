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

/**
 * reverse the meaning of the successive fx
 */
$$.plugin('not',{
	get	: function(){
		Object.defineProperty(this, '_not',{
			value	: !this._not,
			writable: true,
			enumerable: false
		});
		return this;
	}
})