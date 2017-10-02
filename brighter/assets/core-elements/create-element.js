/**
 * this function is the main in brighter
 * it creates HTML and SVG elements as the general purpose
 * it can reveice a function too, this will be executed when the window loading is done
 *
 * 	- $$()						: create document fragment
 * 	- $$(HTML or SVG element or $$ element)	: add it
 * 	- $$(elementName)			: create HTML element
 * 	- $$(namespace, elementName): create HTML element with namespace
 * 	- $$(function)				: add this function to be executed when the window is loaded
 *
 * other usecases:
 * 	- $$.create('div#jks.cc.hello')
 */

function $$(arg){
	var result;
	// create empty document fragment
		if(!arg)
			result	= [document.createDocumentFragment()];
	// create HTML or SVG element
		else if(typeof arg == 'string')
			result	= _createElement(arg, arguments[1]);
	// window.onload
		else if(typeof arg == 'function')
			$$(window).load(arg);
	// HTMLElement, ArrayLike, jQuery, Brighter, ...
		else{
			result	= _argsToBrighterList(arg);
			if(!result.length)
				throw new $$.errors.illegalArgument(arg);
		}
	// make list as brighter object
		result.__proto__	= $$prototype;
	return result;
}


// create SVG element
	$$.svg	= function(tagName){
		var list		= _createElement(tagName, svgNS);
		list.__proto__	= $$prototype;
		return list;
	};

/**
 * create element
 * _createElement(string_exp, namespace)
 * _createElement('div', namespace)
 * _createElement('div#id.cl1.cl2[attr=value][attr2=value2]:style(border:red; color:yellow)>div', namespace)
 * _createElement('div#id.cl1.cl2[attr=value, attr2=value2]:style(border:red; color:yellow)>svg>circle:svg + path:svg[attr=rrr]', namespace)
 * @return {HTMLElement or HTMLDocumentFragment} returns HTMLELement if we created a root element, a documentFragment otherwise
 */
//TODO
function _createElement(strExpression, namespace){
	var result;
	// create normal tags (faster)
		try{
			if(namespace)
				result	= [document.createElementNS(_mapNS(namespace), strExpression)];
			else
				result	= [document.createElement(strExpression)];
		}
	// parse expression (slow, to avoid with loops)
		catch(e){
			// try to parse the expression
			throw e;
		}
	return result;
}
}