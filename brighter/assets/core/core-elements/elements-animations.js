$$.plugin({
	/**
	 * 
	 */
	transition	: function(){}, //TODO
	/**
	 * 
	 */
	animate		: function(){} //TODO
});

/**
 * animations
 */

$$.plugin('anim', {
	get	: function(){
		return new _animationFx(this);
	}
});


function _animationFx($$currentCollection){
	this._$$	= $$currentCollection;
};

_objExtend(_animationFx.prototype, {
	/**
	 * fade()		: fade toggle
	 * fade(1)		: fadeIn
	 * fade(0)		: fadeOut
	 * fade(0.5)	: fade to 0.5
	 */
	fade		: function(opacity, duration, doNotHideWhenTransparent){}, //TODO
	/**
	 * 
	 */
	slide		: function(){}, //TODO
	/**
	 * vertical slide
	 */
	vSlide		: function(){}, //TODO
	/**
	 * stop all animations
	 */
	stop		: function(){}, //TODO
	/**
	 * reset animations
	 */
	reset		: function(){}, //TODO
	/**
	 * skip all animations
	 */
	skip		: function(){} //TODO
});