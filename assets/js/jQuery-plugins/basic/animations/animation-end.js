/*
	By Osvaldas Valutis, www.osvaldas.info
	Available for use under the MIT License
*/

;( function( $)
{
	$.fn.extend(
	{
		onCSSAnimationEnd: function( callback )
		{
			this.one( 'webkitAnimationEnd mozAnimationEnd oAnimationEnd oanimationend animationend', callback );
			return this;
		},
		onCSSTransitionEnd: function( callback )
		{
			this.one( 'webkitTransitionEnd mozTransitionEnd oTransitionEnd otransitionend transitionend', callback );
			return this;
		}
	});
})( jQuery);