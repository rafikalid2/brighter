/**
 * find inside elements
 */
// (function(){
// 	$$.pluing('find', {
// 		value	: function(selector){

// 		}
// 	});

// 	// find childrens
// 		function _find(selectorFx){
// 			return function(selector){

// 			};
// 		}
// })();


/*
> div > div > .element

we correct this by adding ":scope"

div:first >hello


:button (input button, button, .btn),   => .btn, button, input[type=button]
:checkbox								=> input[type=checkbox]
:file									=> input[type=file]
:header									=> h1, h2, h3, h4, h5, h6
:text									=> input[type=text], textarea

:style(border)
:style(border:red)

:css(border)		// equivalent to style(border)
:css(border:red)	// use window.computedStyle instead of normale style attribute

:contains(text)
:eq(index)
:even		// even
:odd
:has(selector)
:parent
:offset-parent
:visible

:first
:last

:target			// $$('p#:target') whill mach p#foo, $$('#:target') #foo, will replaced with url hastag

:animated	// select elements that are in some animation

:slice(i,i2)
:form-control

:lang(fr)

:prev()
:prevAll()

+ subling
 */

/**
 * native supported
 * 		:lang
 * 		:checked
 * 		:visited
 * 		:last-child
 * 		:
 */

// function _advancedSelector(rootElement, selector){
// 	throw new Error('_advancedSelector not implemented')
// }