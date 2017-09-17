/**
* BRIGHTER JS
**/
(function(factory){
	"use strict";
	// window object
		var win	= typeof window !== "undefined" ? window : this;
	// is nodeJs
	// if is node js, for the version, we just expose other featchers others then those that needs "document"
	// like asserts & tests
	// in this beta version, we focused on the navigator side
		if ( typeof module === "object" && typeof module.exports === "object" ) {
			module.exports	= factory(win);
		}
	// is navigator
		else{
			win.Brighter = window.$$ = factory(win);
		}
})(function(window){
	var version = "0.1.0";


	// extend Array prototype
		classExtend(Array, $$);

	/**
	 * params
	 */
		var svgNS = "http://www.w3.org/2000/svg";


// <!> do not add any closing parenteses, this is splited in several files;// main asert
	$$.assert	= function(expression){};;/**
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
	};;;// select one element
	$$.query	= function(selector){
		var ele	= document.querySelector(selector);
		ele	= ele? [ele] : [];
		ele.__proto__ = $$.prototype;
		return ele;
	};

// multiple elements selector
	$$.queryAll	= function(selector){
		var ele		= document.querySelectorAll(selector);
		var result	= [];
		if(ele && ele.length){
			// copy node list to array
			var c= ele.length;
			for(var i=0; i< c; ++i)
				result.push(ele[i]);
		}
		result.__proto__ = $$.prototype;
		return result;
	};;/**
 * this function simulate inheritance by linking prototypes
 */

function classExtend(parent, child){
	function surrogate(){
		this.constructor	= parent;
	}
	surrogate.prototype	= parent.prototype;

	var oldPrototype	= child.prototype;
	child.prototype		= new surrogate();
	if(oldPrototype){
		_extendObject(child.prototype, oldPrototype);
	}
}

// make it usable by others
	$$.classExtend	= classExtend;;
// make it public
	$$.extend	= extend;
/**
 * this function will copy all elemetns content into the first element
 */
function extend(baseObj){
	// if(arguments.length < 2)
	// 	throw new Error('this function needs at least 2 arguments');
	throw new Error('not yeat implemented!')
}


function _extendObject(target, source){
	for(var i in source){
		if(source.hasOwnProperty(i))
			target[i]	= source[i];
	}
};
	// set as global
		return $$;
});