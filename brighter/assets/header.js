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
	// BRIGHTER unique identifier
		var BRIGHTER_ID	= '$$' + Math.random().toString(16).substr(2,4);

	/**
	 * params
	 */
		var svgNS = "http://www.w3.org/2000/svg";


// <!> do not add any closing parenteses, this is splited in several files
