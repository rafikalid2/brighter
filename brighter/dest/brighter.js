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
	// racourcis vers $$.prototype
		var $$prototype	= $$.prototype;

	/**
	 * params
	 */
		var svgNS = "http://www.w3.org/2000/svg";


// <!> do not add any closing parenteses, this is splited in several files;// main asert
	$$.assert	= function(expression){};;// add element to collection
	$$prototype.push = $$prototype.add = function(){
		// control
			var list = _argsToBrighterList(arguments);
		// add to list
			Array.prototype.push.apply(this, list);
		return this;
	};

// unshift
	$$prototype.unshift = function(){
		// control
			var list = _argsToBrighterList(arguments);
		// unshift
			Array.prototype.unshift.apply(this, list);
		return this;
	};

// concat
	$$prototype.concat	= function(){
		var lst	= this.concat(_argsToBrighterList(arguments));
		lst.__proto__ = $$prototype;
		return lst;
	};

//slice
	$$prototype.slice	= function(){
		var lst	= Array.prototype.slice.apply(this, arguments);
		lst.__proto__ = $$prototype;
		return lst;
	};

// splice
	$$prototype.splice	= function(strt, nbrRemove){
		// elements to be added
			var tobeAdded	= [];
			if(arguments.length > 2){
				tobeAdded = Array.prototype.push.apply(tobeAdded, arguments);
				tobeAdded.splice(0,2);
				tobeAdded	= _argsToBrighterList(tobeAdded);
			}
		// other args
			tobeAdded.splice(0, 0, strt, nbrRemove);
		// returned array
			var lst= Array.prototype.splice.apply(this, tobeAdded);
			lst.__proto__ = $$prototype;
			return lst;
	};

// duplicate collection
	$$prototype.duplicate	= function(){
		return this.slice(0);
	};

// forEach
	$$prototype.forEach		= $$prototype.each	= function(callBack){
		var i=0, c= this.length;
		for(i=0; i<c ; ++i){
			if(callBack(this[i], i) === false)
				break;
		}
		return this;
	};

// filter
	$$prototype.filter	= function(){
		var filtered	= Array.prototype.filter.apply(this, arguments);
		filtered.__proto__	= $$prototype;
		return filtered;
	};;/**
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
		var result	= [document.createElementNS(svgNS, tagName)];
		result.__proto__	= $$.prototype;
		return result;
	};;/**
 * events
 */
	if(HTMLElement.prototype.addEventListener){
		// bind
			$$prototype.bind	= $$.prototype.on	=  function(eventName, listener){
				return this
					.filter(ele => (ele.nodeType != 8 && ele.nodeType != 3)) // filter textNode and commentNode
					.each(ele => {ele.addEventListener(eventName, listener, false)});
			};
		// unbind
			$$prototype.unbind	= $$.prototype.off	=  function(eventName, listener){
				return this
					.filter(ele=> (ele.nodeType != 8 && ele.nodeType != 3)) // filter textNode and commentNode
					.each(ele => {ele.removeEventListener(eventName, listener, false)});
			};
	}else{
		// bind
			$$prototype.bind	= $$.prototype.on	=  function(eventName, listener){
				return this
					.filter(ele=> (ele.nodeType != 8 && ele.nodeType != 3)) // filter textNode and commentNode
					.each(ele => {ele.attachEvent(eventName, listener)});
			};
		// unbind
			$$prototype.bind	= $$.prototype.off	=  function(eventName, listener){
				return this
					.filter(ele=> (ele.nodeType != 8 && ele.nodeType != 3)) // filter textNode and commentNode
					.each(ele => {ele.detachEvent(eventName, listener)});
			};
	}

// trigger event


// wrappers
;/**
 * this function will init element list for those methodes
 * 		- push/add
 * 		- unshift
 */

function _argsToBrighterList(args){
	var list	= [], i, j, ele;
	for(i=0; i<args.length; ++i){
		ele	= args[i];
		if(ele.nodeType)// HTML or SVG element
			list.push(ele);
		else if(ele instanceof $$)
			Array.prototype.push.apply(list, ele);
		else
			throw new Error('Argument ' + i + ' is not supported');
	}
	return list;
};// select one element
// using CSS selector
// if multiple arguments are given, use the first matched one
	$$.query	= function(){
		var matchedElement, i, ele;
		for(i =0; i< arguments.length; ++i){
			ele	= document.querySelector(selector);
			if(ele){
				matchedElement	= ele;
				break;
			}
		}
		if(!matchedElement)
			matchedElement = [];
		matchedElement.__proto__ = $$.prototype;
		return matchedElement;
	};

// multiple elements selector
	$$.queryAll	= function(){
		var result	= [], i, ele, c;
		for(i=0; i<arguments.length; ++i){
			ele		= document.querySelectorAll(selector);
			if(ele && ele.length){
				// copy node list to array
				c	= ele.length;
				for(var i=0; i< c; ++i)
					result.push(ele[i]);
				break;
			}
		}
		result.__proto__ = $$.prototype;
		return result;
	};;;/**
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