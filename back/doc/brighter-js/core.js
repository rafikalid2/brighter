
// create eleemnt
	$$() // create DOC fragment
	$$(elementName) // create HTML or SVG element
	$$(htmlElement) // wrap html element
	$$(SVGElement)	// wrap svg element

// select inside doc
	$$.query(selector)
	$$.queryAll(selector)
	$$.query(selector1, selector2, ..)// when selector fails, use the next one
	$$.queryAll(selector1, selector2, ..)// when selector fails, use the next one

// window on ready
	$$(fx)

// gestion des elements
	$$(..)[x]	// get element with index x
	$$(..).push(element)	// push an element to the list, element could be HTMLElement or Brighter-object


// gestion des attribut
	$$(..)
		.all. // when used:
				// GET: next fx will return value for each element as a list
				// SET: next fx will make copy of inserted value for each element in the list

		.setAttribute('attrName', 'attrValue')
		.attr('attrName'); // get attr name value
		.attr({key:value}); // set attributes

		.val() // get or set value
		.value()//alias for "val"
		.val((ele, value)=>{})// get value for each element

		.css()		// get computed style
		.css('key')	// get computed style value
		.css({key:value})	// set css

		.className()	// get the className
		.className('classes')// set classes
		.addClass('class')
		.rmClass('className')
		.removeClass('className')// alias of rmClass
		.hasClass('className')
		.toggleClass('className')

		.height() // get or set
		.width()	// get or set
		.innerWidth() //get
		.innerHeight()//get
		.outerWidth()
		.outerHeight()

		.offset()
		.position()


		.html()//get or set
		.outerHTML() // get
		.text()// get or set

		.replaceWith(element)// remove the current element and replace it with element



		.after(element); // insert elements in the list after


// smooth scroll
		.scroll()//get {x:, y:}, or set({x:, y}) or set(x, y) or set(x); scroll({y:})
		.scrollY()
		.scrollX()

//filters
		.filter(ele=>{})
		.map(ele=>{})
		.sort((a,b)=>{})
		.each((ele, index)=>{})

// data
		.data. //hashMap: store data inside the object relative to an HTML or SVG element
