/**
 * this function is the main in brighter
 * it creates HTML and SVG elements as the general purpose
 * it can reveice a function too, this will be executed when the window loading is done
 *
 * 	- $$()						: create document fragment
 * 	- $$(HTML or SVG element or $$ element)	: add it
 * 	- $$(elementName)			: create HTML element
 * 	- $$(elementName, namespace): create HTML element with namespace
 * 	- $$(function)				: add this function to be executed when the window is loaded
 *
 * other usecases:
 * 	- $$.create('div#jks.cc.hello')
 */

function $$(expression, namespace){
	var result;
	// create empty document fragment
		if(!expression)
			result	= [document.createDocumentFragment()];
	// create HTML or SVG element
		else if(typeof expression == 'string'){
			if(namespace && (typeof namespace == 'string'))
				result	= [document.createElementNS(namespace)];
			else
				result	= [document.createElement(expression)];
		}
		else if(typeof expression == 'function'){
			$$(window).on('load', expression);
		}else if(expression.nodeType)// HTML or SVG element
			result	= [expression];
		else if(expression instanceof $$)
			result	= expression.duplicate();
		else
			throw new Error('insupported argument')
	// make list as brighter object
		result.__proto__	= $$.prototype;
	return result;
}


// create SVG element
	$$.svg	= function(tagName){
		return $$(tagName, svgNS);
	};