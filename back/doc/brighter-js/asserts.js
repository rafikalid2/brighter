/*
 and
 or
 or exculsif
 not
 nor
 nand
*/

// aserts
	// $$.assert(expression, errorMessage).is(value);
	// $$.assert(expression).is(true, ErrorMessage);
	// $$.assert(expression).is(false, ErrorMessage);
	// $$.assert(expression).is(null, ErrorMessage);

	// $$.assert(obj).isNaN(ErrorMessage);
	// 	.isUndefined(ErrorMessage)
	// 	.isDefined(ErrorMessage)
	// 	.isNull(ErrorMessage)

	// 	.exists(errorMessage)	// if != undefined and != null

	// $$.assert(ele).isString(ErrorMessage);
	// 	.isEmpty(ErrorMessage)		// empty text or array or object

	// 	.not // inverser tout les methode qui viennent apres


	// $$.assert(obj).instanceof(String);



	$$.assert(fx)
		.throws(err);
	$$.assert(fx)

		.throws(err1, err2, ,,,) // assert throws err1 or err2 or ...

	$$.assert(obj)
		.catch(err=>{}) // traitement special pour l'erreur
		.catch('msg $msg')	 // message to be trown when fails, $msg is the original error message
		.than(obj => {}) // exec an fx if all previous asserts didn't fail


		.has(value) // an array or object or string contains value
		.has([value1], errMsg)//and
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

//--------------------------------------------------------------------------------
/**
 * all sub function has this signature
 * 		.fx(value)
 * 		.fx(value, errMessage)
 * 		.fx(value, errType, errMessage) @param {String} errType
 * 		.fx(value, new Error('message'))
 */
// main assert
(function(){
	$$.plugin(true, 'assert', {
		value	: _$$Assert
	});

	function _$$Assert(obj, a, b){
		return new _$$AssertFacto(obj, a, b);
	}

	function _$$AssertFacto(obj){
		this._obj			= obj;
		this._defaultMsg	= b || a;
		this._defaultType	= !b && a;
	}

	
	//make those vars all of type $$.assert
		var $$assertProto = _$$Assert.prototype	= _$$AssertFacto.prototype;


	_extendNative($$assertProto, {
		is			: _conditionWithArg((obj, arg) => obj == arg, 'Equals'),
		isNumber	: _condition(obj => !isNaN(obj), 'Number'),
		isNaN		: _condition(obj => isNaN(obj), 'not Number'),
		isString	: _condition(obj => typeof obj == 'string', 'String'),

		isUndefined	: _condition(obj => obj === undefined, 'Undefined'),
		isDefined	: _condition(obj => obj !== undefined, 'Undefined'),
		isNull		: _condition(obj => obj === null, 'Null'),
		exists		: _condition(obj => obj !== null && obj !== undefined, 'Exists'),
		isEmpty		: _condition(obj => !obj || $$.isEmpty(obj), 'Empty'), // empty array or empty string or empty object, null or undefined or 0

		// (array).has(value)
		// (string).has(substr)
		// (object).has(value)
		has			: _conditionWithArg((obj, arg) => {
			(cnd => {
				Array.isArray(arg)? arg.every() : obj instanceof arg
			})(ele => {

			});
		}, 'Has'),

		instanceof	: _conditionWithArg((obj, arg) => obj instanceof arg, 'Instanceof'),// .instanceOf(String)
	});

	/**
	 * exec condition
	 * privates:
	 * 		 ._not	: inverses condition
	 */
		function _conditionWithArg(cndFx, msgPrefix){
			return function(arg, a, b){
				var cnd	= cndFx.call(this, this._obj, arg);
				if(this._not ? cnd : !cnd)
					_throwError.call(this, msgPrefix, a, b);
				return this;
			};
		}
		function _condition(cndFx, msgPrefix){
			return function(a, b){
				var cnd	= cndFx.call(this, this._obj);
				if(this._not ? cnd : !cnd)
					_throwError.call(this, msgPrefix, a, b);
				return this;
			};
		}
		function _throwError(msgPrefix, a, b){
			var msg, type;
			if(a && (typeof a != 'string')){
				throw a;
			}else{
				msg 	= b || a || this._defaultMsg;
				type	= !b && a || this._defaultType;
				msg		= (this._not ? msgPrefix : 'Not ' + msgPrefix) + (msg ? ': ' + msg : '');
				throw type && $$.err[type] && (new $$.err[type](msg)) || new Error(msg);
			}
		}

	Object.defineProperty($$assertProto, 'not', {
		get	: function(){
			this._not	= true;
			return this;
		}
	})

//
// $$.assert(obj).not.null();
// $$.assert(path).match(/^(?:\w+\.)+\w+$/);
// 
// $$.assert(obj).fx(value, errMessage)
// $$.assert(obj).fx(value, errType, errMessage)
// 
// $$.assert(obj).exists(errMsg)
//
// $$.assert(eventName, 'Error with eventName').isString().match(/^(?:(?:[\w-]+\.)*[\w-]+\s*)+$/);
// $$.assert(listener, 'Error with listener').isFunction();
// 
// 
// conditions
// .whenExists. 	// when the variable !=undefined and !=null, do what is next, example: $$.assert(eventName, 'Error with eventName').whenExists.match(/^(?:(?:[\w-]+\.)*[\w-]+\s*)+$/);
// 
// 		.typeof(...)	// accepted types



/*
assert(arg1)
		.exists('define: need the seconde argument')
		.when
			.not.isPlainObject()
		.then
			.isString()
			.and(arg2)
			.isPlainObject();


assert(arg1)
		.exists('define: need the seconde argument')
		.or(
			a => a.isPlainObject(),
			a => a.isString()
				.and(arg2)
				.isPlainObject()
		);
			
 */

})();