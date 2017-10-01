$$.plugin({
	 /**
	  * isVisible()		: is at least one tag is visible
	  * all.isVisible()	: is all tags are visible
	  */
	isVisible	: function(){
		return (compFx => {
			return this._all ? this.everyTag(compFx) : this.someTag(compFx);
		})(ele => ele ? !!( ele.offsetWidth || ele.offsetHeight || ele.getClientRects().length ) : false);
	},

	/**
	 * is(selector)			// returns true if at least one element matches the selector
	 * is(HTMLELement)
	 * is(ArrayLike of HTMLElements)
	 * is(function)
	 * all.is(selector)		// returns true if all elements matches the selector
	 */
	is			: function(selector){
		return this[this._all ? 'every' : 'some'](ele => _extendedMatches(ele, selector));
	}
})