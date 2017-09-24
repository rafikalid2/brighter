/**
 * this is Element.prototype.matches fix
 */

var _ElementMatches;
if( Element.prototype.matches )
	_ElementMatches	= function(ele, selector){ return ele.matches(selector); };
else if( Element.prototype.matchesSelector )
	_ElementMatches	= function(ele, selector){ return ele.matchesSelector(selector); };
else if( Element.prototype.mozMatchesSelector )
	_ElementMatches	= function(ele, selector){ return ele.mozMatchesSelector(selector); };
else if( Element.prototype.msMatchesSelector )
	_ElementMatches	= function(ele, selector){ return ele.msMatchesSelector(selector); };
else if( Element.prototype.oMatchesSelector )
	_ElementMatches	= function(ele, selector){ return ele.oMatchesSelector(selector); };
else if( Element.prototype.webkitMatchesSelector )
	_ElementMatches	= function(ele, selector){ return ele.webkitMatchesSelector(selector); };
else
	_ElementMatches	= function(ele, selector){
		var matches = document.querySelectorAll(selector),
        	i = matches.length;
        while (--i >= 0 && matches.item(i) !== ele) {}
        return i > -1;
	}