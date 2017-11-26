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
	// create empty document fragment when using: append, prepend,appendTo, preppendTo
		if(!arg)
			result	= [];
	// create HTML or SVG element
		else if(typeof arg == 'string')
			result	= _createElements(arg, arguments[1]);
	// window.onload
		else if(typeof arg == 'function')
			window.addEventListener('load', arg, false);
	// HTMLElement or SVG element
		else if(arg.nodeType)
			result	= [arg];
	// brighter
		else if(arg instanceof $$)
			result	= arg.duplicate();
	// ArrayLike, jQuery, ...
		else if(arg.length){
			result	= [];
			$$prototype.add.call(result, arg);
		}
	// else
		else
			throw new $$.err.illegalArgument(arg);
	// make list as brighter object
		result.__proto__	= $$prototype;
	return result;
}

// create SVG element
	$$.plugin(true, {
		svg			:  function(tagName){
			var list		= _createElements(tagName, svgNS);
			list.__proto__	= $$prototype;
			return list;
		}
	});

/**
 * create element
 * _createElements(string_exp, namespace)
 * _createElements('div', namespace)
 * _createElements('div#id.cl1.cl2[attr=value][attr2=value2]:style(border:red; color:yellow)>div', namespace)
 * _createElements('div#id.cl1.cl2[attr=value, attr2=value2]:style(border:red; color:yellow)>svg>circle:svg + path:svg[attr=rrr]', namespace)
 * @return {HTMLElement or HTMLDocumentFragment} returns HTMLELement if we created a root element, a documentFragment otherwise
 */
//TODO
function _createElements(strExpression, namespace){
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