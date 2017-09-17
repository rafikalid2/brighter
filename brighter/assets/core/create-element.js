/**
 * this function is the main in brighter
 * it creates HTML and SVG elements as the general purpose
 * it can reveice a function too, this will be executed when the window loading is done
 *
 * 	- $$()						: create document fragment
 * 	- $$(HTML or SVG element or $$ element)	: add it
 * 	- $$(elementName)			: create HTML or SVG element
 * 	- $$(function)				: add this function to be executed when the window is loaded
 *
 * other usecases:
 * 	- $$('div', 5)	 create 5 divs
 * 	- $$.create('div#jks.cc.hello')
 */

function $$(expression){
	var result;
	// create empty document fragment
		if(!expression)
			result	= [document.createDocumentFragment()];
	// create HTML or SVG element
		else if(typeof expression == 'string'){
			result	= [document.createElement(expression)];
		}
		else if(typeof expression == 'function')
			{throw new Error('---- document ready is not yeat implemented!')}
		else if(
			expression instanceof HTMLElement
			|| expression instanceof SVGElement
		)
			result	= [expression];
		else if(expression instanceof $$)
			result	= expression;
		else
			throw new Error('insupported argument')
	// make list as brighter object
		result.__proto__	= $$.prototype;
	return result;
}


// create SVG element
	$$.svg	= function(tagName){
		var result	= [document.createElementNS(svgNS, tagName)];
		result.__proto__	= $$.prototype;
		return result;
	};