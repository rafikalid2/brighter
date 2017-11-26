// create empty fragment
	$$.plugin(true, 'fragment', {
		get	: function(){ return $$(document.createDocumentFragment()); }
	});
/**
 * put all elements into fragment
 */
$$.plugin(true, 'toFragment', {
	get	: function(){
		var frag	= document.createDocumentFragment();
		this.each(ele => { frag.appendChild(ele) });
		return $$(frag);
	}
})