
  /////////////////////////////////////
 // 		Core methods			//
/////////////////////////////////////
class XHR extends Promise{
	// promise
		then(cb){ var a = super.then(cb); a._xhr= this._xhr; return a;}
		catch(cb){ var a = super.then(cb); a._xhr= this._xhr; return a;}
		finally(cb){ var a = super.then(cb); a._xhr= this._xhr; return a;}
}

  /////////////////////////////////////
 // 	Interface methods			//
/////////////////////////////////////
$$.plugin(true, {
	// pricipal calls
		get			: _makeAjax('GET'),
		post		: _makeAjax('POST'),
		delete		: _makeAjax('DELETE'),
		head		: _makeAjax('HEAD'),
	// specified calls
		getJSON		: _makeAjax('GET', options => {options.contentType = 'json'}),
		getXML		: _makeAjax('GET', options => {options.contentType = 'xml'}),
	// GET once
	// get url only once, and store parsed response in the cache
		getOnce		: _makeAjax('GET', options => {options.once = true}),
		getJSONOnce	: _makeAjax('GET', options => {options.once = true; options.contentType = 'json'}),
		getXMLOnce	: _makeAjax('GET', options => {options.once = true; options.contentType = 'xml'})
});

function _makeAjax(){

}