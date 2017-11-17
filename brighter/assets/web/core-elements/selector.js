// root plugins
// that's why we added "true" argument
(function(){
	$$.plugin(true,{
		// select one element
		// using CSS selector
		// if multiple arguments are given, use the first matched one
			find		: function(){
				var matchedElement, i, c, ele;
				for(i = 0, c = arguments.length; i < c; ++i){
					ele	= document.querySelector(arguments[i]);
					if(ele){
						matchedElement	= ele;
						break;
					}
				}
				if(!matchedElement)
					matchedElement = [];
				matchedElement.__proto__ = $$.prototype;
				return matchedElement;
			},

		// multiple elements selector
			findAll	: function(){
				var result	= [], i, ele, c, j, cc;
				for(i=0, c = arguments.length; i < c; ++i){
					ele		= document.querySelectorAll(arguments[i]);
					if(ele && ele.length){
						// copy node list to array
						for(var j=0, cc = ele.length; j< cc; ++j)
							result.push(ele[j]);
						break;
					}
				}
				result.__proto__ = $$.prototype;
				return result;
			}
	});
	/**
	 *	=		: equals
	 *	!=		: not equals
	 *	|=		: contains prefix, example: attr |=prev will matches: prev, prev-*
	 *	*=		: contains
	 *	~=		: contains word
	 *	^=		: starts with
	 *	$=		: ends with
	 *	=/.../	: apply regex
	 *
	 * [attr=/.../, attr2=klsdfk]
	 * 
	 * special selectors
	 * :first
	 * :last
	 * :eq(index)
	 * :slice(i,i2)
	 * 
	 * :not(selector,...)
	 * 
	 *
	 * :prev
	 * :prev(selector, ...)
	 * :prevAll
	 * :prevAll(selector, ...)
	 *
	 * :nextUntil(selector, ...)
	 * :prevUntil(selector, ...)
	 *
	 * :siblings(selector, ...)
	 * :siblingsUntil(selector, ...)
	 *
	 * :style.border			// has border style
	 * :style.border="red"
	 * :style.border^="kkkk"
	 * :css[border*=red, ...]	// use window.computedStyle instead of normale style attribute
	 *
	 * :contains(text)
	 * :text="kkkk"
	 * :text!="kkkk"
	 * :text*="kkkk"
	 * 
	 *
	 *
	 * :any(selector1, ...)
	 * :matches()	// any alias
	 * 
	 * :has(selector, ...)
	 *
	 * :parent
	 * :parent(selector, ...)
	 * :parent(5)		// get the 5 parent
	 * :offset-parent
	 * :offset-parent(selector, ...)
	 * :offset-parent(5)
	 * :has-parent(selector)
	 *
	 * :visible
	 * :hidden
	 *
	 * :target 			// $$('p:target') whill mach p#foo, $$('#target') #foo, will replaced with url hastag
	 * :even			// eq :nth-child(even)
	 * :odd				// eq :nth-child(odd)
	 * :form-control	// input, textarea, select, .btn
	 * :button			// button, input[type=button], .btn
	 * :readonly		// alias :read-only
	 * :readwrite		// alias : read-write
	 *
	 * :animated		// select elements that are in some animation
	 *
	 *
	 */
	/**
	 * @return {function} a function that do what the selector expects
	 */
	const BRIGHTER_EXPRESSIONS	= 'not,first,last,eq,slice,prev,prevAll,prevUntil,nextUntil,siblings,siblingsUntil,style,css,contains,text,any,matches,has,parent,offsetParent,hasParent,visible,hidden,animated'.split(',');
	const _selectorSplitter		= /(?=)/;
	const	whitespace			= "[\\x20\\t\\r\\n\\f]",
			regexCommaSpliter	= new RegExp( whitespace + '*,' + whitespace + '*' ),
			BRIGHTER_EXP		= new RegExp(':' + BRIGHTER_EXPRESSIONS.join('|:'), 'i');
	
	function _compileSelector(selector){
		var nativeSelector		= [],
			brighterSelector	= [],
			i, c;
		// replace shortcuts
			// :form-control		:any(input, select, textarea, button)
				selector	= selector.replace(/:form-control\b/gi, ':any(input, select, textarea, button)');
			// :button
				selector	= selector.replace(/:button/gi, ':any(button, input[type=button], .btn)');
			// :even, :odd
				selector	= selector.replace(/:(odd|even)\b/gi, ':nth-child($1)');
			// readonly
				selector	= selector.replace(/:readonly\b/gi, ':read-only');
			// readwrite
				selector	= selector.replace(/:readwrite\b/gi, ':read-write');
			// attributes
				selector	= selector.replace(/\[((?:[^,\[\]]+,)+[^,\[\]]+)\]/g, (_, sel) => {
					return '[' + sel.split(regexCommaSpliter).join('][') + ']';
				});
		// make sample selectors
			// split into sub selectors
				if(selector.indexOf(',') == -1)
					selector	= [selector];
				else
					selector	= _splitSelector(selector);
			// expand "not", "any", and "matches" selectors
				selector.forEach(s => {
					if(/:not\(|:any\(|:matches\(/i.test(s)){

					}
				});
			// expend grouped expressions (:any, :matches)
				// selector.forEach(sel => {
				// 	if(/:any\(|:matches\(/i.test(sel)){
				// 		// do expand
				// 	} else {
				// 		selectorExec.push(sel);
				// 	}
				// });
				//...
			// find native selectors & brighters selectors
				selector.forEach(s => {
					if(BRIGHTER_EXP.test(s))
						brighterSelector.push(s);
					else
						nativeSelector.push(s);
				});
			// tokenize brighter selectors
			// execute native selectors

			// filter :target if do not exists
				// if(!document.location.hash)
				// 	selectorExec	= selectorExec.filter(sel => !/:target\b/i.test(sel));

			// compile each selector
				selectorExec	= selectorExec.map(_compileOneSelector);

		// return function
			return function($$obj){
				var $$newObj	= $$();
				selectorExec.forEach(executor => {
					if(executor){
						$$newObj.add(executor($$obj));
					}
				});
				return $$newObj;
			};
	}

	function _compileOneSelector(selector){
		// expand grouped expressions
			// :any, :matches
		// :target
			// selector	= selector.replace(/:target/gi, document.location.hash);
		// tokenize 
			selector	= selector.split(/(:(?:first|last|eq|slice|not|prev|prevAll|style|css|has|parent|offset-parent|visible|hidden|animated))(?:\((.+?)\)|\b)/i);
	}

	// split using comma outside parentises
	function _splitSelector(str){
		var i, c = str.length;
		var brackets	= 0,
			parentises	= 0,
			ch,
			result	= [],
			begin	= 0,
			count;
		while(i < c){
			chr	= str.charAt(i);
			if(chr == '[') ++brackets;
			else if(chr == ']') --brackets;
			else if(chr == '(') ++parentises;
			else if(chr == ')') --parentises;
			else if(chr == ',' && !brackets && !parentises){
				result.push(str.substring(begin, i));
				begin	= i + 1;
			}
		}
		return result;
	}

	// expand ":not", "any" and "matches"
	function _expandAny(selector){
		var pos	= 
	}

	// find brighter keywords and split with them
	// 
})();