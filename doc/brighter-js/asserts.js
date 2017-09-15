/*
 and
 or
 or exculsif
 not
 nor
 nand
*/

// aserts
	$$.assert(expression).is(value);
	$$.assert(expression).is(true);
	$$.assert(expression).is(false);


	$$.assert(obj).instanceof(String);

	$$.assert(obj).isNaN();

	$$.assert(ele).isString();

	$$.assert(fx)
		.throws(err);
	$$.assert(fx)

		.throws(err1, err2, ,,,) // assert throws err1 or err2 or ...

	$$.assert(obj)
		.catch(err=>{}) // traitement special pour l'erreur
		.catch('msg $msg')	 // message to be trown when fails, $msg is the original error message
		.than(obj => {}) // exec an fx if all previous asserts didn't fail

		.isEmpty()		// empty text or array or object
		.isNotEmpty()

		.isNull()
		.isNotNull()
		.isUndefined()
		.isDefined()

		.not // inverser tout les methode qui viennent apres

		.has(value) // an array or object or string contains value
		.has(value1, value2, ,,,)//and
		// cas ou on veut juste qu'une veleur soit presente (ou), ou exlusif
		.contains(value) // alias: has
		.deepHas(value)// value is contained deeply inside the object
		.deepHas(value1, ,,,)// value is contained deeply inside the object
		
		.hasKey(key) // an array or object contains this key
		.hasProperty; hasOwnProperty
		.hasKies(key1, ,,,)

		.hasProperty('propertyName')
		.hasProperties('pro1', 'prop2', ...)
		
		.hasPair(key, value);
		.hasPaires({key, value})
			// containsKey('key')
			// containsKey('key.subkey.0.subkey2')
			// containsKey(15)

		.startsWith(ele) // an array or string strats with
		.endsWith(ele)	// and array or string ends with ele

		.match(regex)	// a string match regex


		.is(value)		// equals using == (alias: equals)
		.strictEquals(value)	// equals using ===
		.deepEquals(value)// compare object or array inside values, or use "==" otherwise
		.deepStrictEquals(value) //some as deepEqual, except that we use "===" instead of "=="

		.instanceof(Fx)

		.length() // get lenght if array or string or object attr length
			.is(size)
			.gt()	// greater than
			.lt()	// less than
			.gte()	// greater than or equals
			.lte()	// less than or equals
			.and()	// go back to previous level

		.isNumber()
		.isNaN()
		.isString()
		.isFunction()
		.isArray()
		.isHTMLElement()
		.isObject()
		.isFinite()
		.isInfinite()
		.isBoolean()

		.or(assertObjCopy =>{}, assertObjCopy2=>{},,,) // throws exception when all of fx throws exception

		.satisfy(obj=>{return true, undefined | false or throws error;})

// execute time
	$$.assert(fx)
		.call(thisObj, args1, argsN) // execute the fx, set return value as the current obj, and get execution timeout
		.apply(thisObj, args_as_array)
			// all other fx are applied on the returned value
			.throws(err, ,,,)
			.time()
				.is(125)
				// all fx used with length

//cases
	$$.assert(obj)
		.case() // alias: if()
			.is(value)
				.then(obj=>{})
				.else(obj=>{}) // if the assert fails

			.gt(value)
			.lt(value2)
				.then()
					// other asserts
					.isString()
					// ...
					.else()	// and other case
						.isEmpty()
						.isArray()
						.then()
					.else()
						.then()
					.case() // start an other case
					.and() // go back to top level
					.break() // stop asserts
// add plugin
	$$.assert.prototype.plugin = function(){
		// this = the assertion obj
		// this.get(); // get the current object
	};


// tests
	$$.test(fx)
	$$.AsyncTest(callBack =>{
		fx(callBack);//
	})
		.than((err, timeout) =>{})