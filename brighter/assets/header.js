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
	"use strict";
	var version = "0.0.1";

// <!> do not add any closing parenteses, this is splited in several files
