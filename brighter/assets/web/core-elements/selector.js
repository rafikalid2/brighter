// root plugins
// that's why we added "true" argument
(function(){
	$$.plugin(true,{
		// select one element
		// using CSS selector
		// if multiple arguments are given, use the first matched one
			find		: function(){ return $$prototype.find.apply($$(rootDocument), arguments); },
		// multiple elements selector
			findAll	: function(){ return $$prototype.findAll.apply($$(rootDocument), arguments); },
		// faster equivalents using native selectors only
			query	: function(){ return $$prototype.query.apply($$(rootDocument), arguments); },
			queryAll: function(){ return $$prototype.queryAll.apply($$(rootDocument), arguments); }
	});

	$$.plugin({
		/**
		 * when multiple arguments are given, only the first that match will be executed
		 * .find(selector, ...)					: select elements that has somme childs
		 * .find(ArrayLike, ...)				: Array, $$Object, HTMLElements or even jQuery object
		 * .all.find							: equivalent to findAll
		 * .or.find(selector1, selector2, ...)	: use the first maches selector only
		 */
		find		: _execFind(true),
		/**
		 * findAll
		 * .findAll(selector)		: select elements that has somme childs
		 * .findAll(ArrayLike)		: Array, $$Object, HTMLElements or even jQuery object
		 */
		findAll		: _execFind(false),

		// faster equivalents, use native css selectors only
		query	: _querySelector('querySelector'),
		queryAll: _querySelector('querySelectorAll')
	});

	function _querySelector(type){
		var isAll	= type == 'querySelectorAll';
		return function(selector){
			var $$result = $$(), ele;
			this.each(element => {
				if(type in element){
					ele	= element[type](':scope ' + selector);
					if(ele.length){
						$$result.add(ele);
						return isAll; // if it's querySelector, break.
					}
				}
			});
			return $$result;
		};
	}

	function _execFind(isOnlyOneResult){
		return function(){
			var i, argLen, selector;
			var result	= $$();
			var isOnlyOne			= isOnlyOneResult && !this.all;// all.find === .findAll
			var useFirstSlectorOnly	= this._or;
			for(i=0, argLen = arguments.length; i < argLen; ++i){
				selector	= arguments[i];
				// if css selector
					if(typeof selector == 'string')
						result.add(_execStringSelector.call(this, selector, isOnlyOne));
				// TODO others
				// if "or" is set
					if(useFirstSlectorOnly && result.length)
						break;
			}
			return result;
		}
	}
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
	 * >	: child
	 * >>	: equavalent to "space"
	 * <	: parent			div<.test<.khalid<<.css
	 * <<	: grand parent		div<<p (parents(p))
	 * ~	: sibling
	 * +	: adjusent
	 * 
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
	 * :property.value!="value"
	 * 
	 *
	 *
	 * :any(selector1, ...)
	 * :matches()	// any alias
	 * :findAll()	// alias
	 * 
	 * :has(selector, ...)
	 *
	 * :parent
	 * :parent(selector, ...)
	 * :parent(5)		// get the 5 parent
	 * :offsetParent
	 * :offsetParent(selector, ...)
	 * :offsetParent(5)
	 * :hasParent(selector)
	 *
	 * :visible
	 * :hidden
	 *
	 * :target 			// $$('p:target') whill mach p#foo, $$('#target') #foo, will replaced with url hastag
	 * :even			// eq :nth-child(even)
	 * :odd				// eq :nth-child(odd)
	 * :formControls	// input, textarea, select, .btn
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
	const BRIGHTER_EXPRESSIONS	= 'first,last,eq,slice,not,prev,prevAll,prevUntil,nextUntil,siblings,siblingsUntil,style,css,contains,text,any,matches,findAll,has,parent,offsetParent,hasParent,visible,hidden,animated,formControls,property'.split(',');
	const _selectorSplitter		= /(?=)/;
	const	whitespace			= "[\\x20\\t\\r\\n\\f]",
			separators			= '(?:[\\x20\\t\\r\\n\\f<>+]|~(?!=))',
			regexSeparators		= new RegExp(separators),
			regexEndSeparator	= new RegExp(separators + '$'),
			regexCommaSpliter	= new RegExp( whitespace + '*,' + whitespace + '*' ),
			BRIGHTER_EXP		= new RegExp(':' + BRIGHTER_EXPRESSIONS.join('|:'), 'i');

	// compares
		var _compares	= {
			'='	: function(a, b){ return b instanceof RegExp ? b.test(a) : a == b; },
			'!=': function(a, b){ return a != b; },
			'|=': function(a, b){ return new RegExp('\\b' + b + '(?:\\b|-)').test(a); },
			'*=': function(a, b){ return a.indexOf(b) != -1; },
			'~=': function(a, b){ return new RegExp('\\b' + b + '\\b').test(a); },
			'^=': function(a, b){ return a.startsWith(b); },
			'$=': function(a, b){ return a.endsWith(b); }
		};
	
	// execute selector
	function _execStringSelector(selector, isOnlyOneResult){
		var i, len, s, result;
		// compile selector
			selector	= _compileSelector(selector);
		// execute selector
			for(i=0, len = selector.length; i < len; ++i){
				result	= _execCompiledSelector(this, selector[i], isOnlyOneResult);
				
				// only if query
				if(isOnlyOneResult && result.length)
					break;
			}
		return result;
	}
	function _execCompiledSelector(context, selector, isOnlyOneResult){
		var result, tmp;
		// native selector
		if(typeof selector == 'string')
			result	= context[isOnlyOneResult ? 'query': 'queryAll'](selector);
		// brighter selector
		else{
			result = selector.reduce((r, q) => {
				// native query
				if(typeof q == 'string')
					r = r.queryAll(q);
				// filter
				else if(q.operation){
					r = r.filter(
						ele => _compares[q.operation](
							$$prototype[q.fx].apply($$(ele), q.args || []),
							q.value
						)
					);
				}
				// brighter methode
				else
					r = r[q.fx].apply(r, q.args || []);
				return r;
			}, context);
			// if only first
			if(isOnlyOneResult)
				result	= result.first();
		}
		return result;
	}

	// compile selector
	function _compileSelector(selector){
		var nativeSelector		= [],
			brighterSelector	= [],
			i, c, s;
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
			// maches and any
				selector	= selector.replace(/:any\(|:findAll\(/gi, ':findAll(');
			// attributes
				selector	= selector.replace(
					/\[((?:[^,\[\]]+,)+[^,\[\]]+)\]/g,
					(_, sel) => '[' + sel.split(regexCommaSpliter).join('][') + ']'
				);
		// make sample selectors
			// split into sub selectors
				if(selector.indexOf(',') == -1)
					selector	= [selector];
				else
					selector	= _splitSelector(selector);
			// expand "not", "any", and "matches" selectors
				// selector.forEach(s => {
				// 	if(/:not\(|:any\(|:matches\(/i.test(s)){

				// 	}
				// });
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
				brighterSelector	= brighterSelector.map(s => _tokenizer(s));
			// merge tokens
				if(nativeSelector.length)
					brighterSelector.unshift(nativeSelector.join(','));
		return brighterSelector;
	}

	// tokenizer
	function _tokenizer(selector){
		selector	= selector.trim();
		var index,
			j, k, len, c,
			wArg,
			key,
			w,
			begin	= 0,
			tokens	= [];
		// exec tokenizer
		for(index = 0, len = selector.length; index < len; ++index){
			c	= selector[index]
			//escape parentises and brakets
			if(c == ':'){
				// get the word
					key = _nextWord(selector, index + 1, /[a-z-]/i);
					if(!key) throw 'incorrect use of ":"';
					j = index + key.length;
				// if the word is a brighter keyword
					if(BRIGHTER_EXPRESSIONS.indexOf(key) > -1){
						// add previous part as native selector
							if(begin < index)
								tokens.push(_fixNativeSelector(selector.substring(begin, index)));
						// find args
							++j;
							c = selector[j];
							if(c == '('){
								k = _escapeOpenedSymb(selector, j, '(', ')');
								wArg	= selector.substring(j + 1, k - 1);
								tokens.push({
									fx	: key,
									args: _splitSelector(wArg)
								});
								j = k;
							}else if(c == '['){// [color = "red"][background *= "cc.jpeg"]
								wArg	= [];
								do{
									k = _escapeOpenedSymb(selector, j, '[', ']');
									wArg.push(selector.substring(j + 1, k));
									j = k + 1;
								}while(selector[j] == '[');
								--j;
								wArg.forEach(s => {
									tokens.push(_parseAttrExpression(key, s));
								});
							}else if(c == '.'){
								wArg = selector.substring(j+1, _nextExp(selector, j+1));
								tokens.push(_parseAttrExpression(key, wArg));
								j += wArg.length;
							}else{
								tokens.push({
									fx			: key
								});
								--j;
							}
						// next native selector
							begin	= j + 1;
					}
				// next
					index = j;
			}
			else
				index	= _escapeGroups(selector, c, index); // escape [...] (...) '...' "..." /.../
		}
		// add the rest of selector
			if(begin < len)
				tokens.push(_fixNativeSelector(selector.substr(begin)));
		return tokens;
	}

	// fix native selector
	function _fixNativeSelector(selector){
		if(regexEndSeparator.test(selector))
			selector += '*';
		return selector;
	}

	// parse Attribute expression
	function _parseAttrExpression(key, expression){
		var a = expression.split(/([!|*^$~]?=)/, 3);
		// fix value
			var value	= a[2], c;
			if(value){
				c = value.charAt(0);
				if((c == '"' || c == '\'') && c == value.charAt(value.length - 1))
					value	= value.substr(1, value.length - 2);
			}
		return {
			fx			: key,
			args		: [a[0]],
			operation	: a[1],
			value		: value
		};
	}

	// split using comma outside parentises
	function _splitSelector(str){
		var i		= 0,
			len 	= str.length,
			c,
			result	= [],
			begin	= 0,
			count;
		do{
			c	= str[i];
			if(c == ','){
				result.push(str.substring(begin, i));
				begin	= i + 1;
			}
			else
				i	= _escapeGroups(str, c, i); // escape [...] (...) '...' "..." /.../
		}while(++i < len);
		if(begin < i)
			result.push(str.substring(begin, i));
		return result;
	}
	// get word after an index
	function _nextWord(strng, index, regex){
		var str	= '',
			len	= strng.length,
			c;
		// get word
			// if(regex)
				do{
					c = strng[index];
					if(regex.test(c))
						str += c;
					else
						break;
				} while(++index < len);
			// else
			// 	do{
			// 		c = strng[index];
			// 		if(c < 'A' || c > 'z')
			// 			break;
			// 		str += c;
			// 	} while(++index < len);
		return str;
	}
	// next expression (delimited by next blank space)
	function _nextExp(str, index){
		var len	= str.length;
		var c;
		do{
			c	= str.charAt(index);
			if(c == '[')		index	= _escapeOpenedSymb(str, index, '[', ']');
			else if(c == '(')	index	= _escapeOpenedSymb(str, index, '(', ')');
			else if(c == '"')	index	= _escapeStrMark(str, index + 1, '"');
			else if(c == '\'')	index	= _escapeStrMark(str, index + 1, '\'');
			else if(c == '/')	index	= _escapeStrMark(str, index + 1, '/');	// regex
			else if(regexSeparators.test(c)) break;
		}while(++index < len);
		return index;
	}
	// escape common groupers
	function _escapeGroups(str, c, i){
		if(c == '[')		i	= _escapeOpenedSymb(str, i, '[', ']');
		else if(c == '(')	i	= _escapeOpenedSymb(str, i, '(', ')');
		else if(c == '"')	i	= _escapeStrMark(str, i + 1, '"');
		else if(c == '\'')	i	= _escapeStrMark(str, i + 1, '\'');
		else if(c == '/')	i	= _escapeStrMark(str, i + 1, '/');	// regex
		return i;
	}
	// ignore text between open and closed symbol (example: brackets, parentises, quotes)
	function _escapeOpenedSymb(str, index, openSymb, closeSymb){
		var symbCount	= 0,
		len	= str.length,
		c;
		do{
			c = str[index];
			if(c == openSymb)		++symbCount;
			else if(c == closeSymb) --symbCount;
			if(!symbCount)
				return index;
		}while(++index < len);
		throw 'incorrect format'; // incorrect format
	}
	// escape string and regex mark
	function _escapeStrMark(str, index, mark){
		var len	= str.length,
			c;
		do{
			c = str[index];
			if(c == '\\') ++index; // ignore next character
			else if(c == mark)
				return index;
		}while(++index < len);
		throw 'incorrect str format';
	}
})();