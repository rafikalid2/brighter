/**
 * native HTML element builder
 * to be used when creating lot of elements
 * 100 time faster than jQuery alternative
 */
(function($){
	$.createElement	= $.ce	= function(tagName){
		return new DOMElementBuilder(tagName);
	};
	$.createFragment= $.cf	= function(){
		return new DOMFragmentBuilder();
	}

	function DOMElementBuilder(tagName){
		this.ele	= document.createElement(tagName);
		return this;
	}

	function DOMFragmentBuilder(){
		this.ele	= document.createDocumentFragment();
		return this;
	}

	$.extend(DOMElementBuilder.prototype, {
		attr	: function(attrName, attrValue){
			if(typeof attrName == 'object'){
				for(var i in attrName)
					this.ele.setAttribute(i, attrName[i]);
			}else{
				this.ele.setAttribute(attrName, attrValue);
			}
			return this;
		},
		addClass: function(className){
			this.ele.classList.add(className);
			return this;
		},
		removeClass: function(className){
			this.ele.classList.remove(className);
			return this;
		},
		className	: function(className){
			this.ele.setAttribute('class', className);
			return this;
		},
		appendText: function(value){
			var txt	= document.createTextNode(value);
			this.ele.appendChild(txt);
			return this;
		},
		append	: function(child){
			this.ele.appendChild(child);
			return this;
		},
		appendTo: function(parent){
			parent.appendChild(this.ele);
			return this;
		},
		// insertBefore : function(element){
		// 	this.ele.insertBefore(element);
		// 	return this;
		// },
		css		: function(key, value){
			this.ele.style[key]	= value;
			return this;
		},
		build	: function(){
			return this.ele;
		},
		get		: function(){
			return this.ele;
		},

		click	: function(callBack){
			return this.on('click', callBack);
		}
	});

	$.extend(DOMFragmentBuilder.prototype, {
		append	: function(child){
			this.ele.appendChild(child);
			return this;
		},
		appendTo: function(parent){
			parent.appendChild(this.ele);
			return this;
		},
		build	: function(){
			return this.ele;
		},
		get		: function(){
			return this.ele;
		}
	});

	// navigator compatible functions
		var hasDivCreator	= typeof HTMLDivElement != 'undefined'; // juste pour  s'assurer :D
		// text
			DOMElementBuilder.prototype.text	=
				hasDivCreator
				&& HTMLDivElement.prototype.hasOwnProperty('innerText') ?
					function(value){this.ele.innerText	= value; return this;}
					: function(value){this.ele.innerHTML	= value; return this;};

		// add event listener
			DOMElementBuilder.prototype.on = 
				hasDivCreator
				&& HTMLDivElement.prototype.addEventListener ?
					function(type, listener){this.ele.addEventListener(type, listener, false); return this;}
					: function(type, listener){this.ele.attachEvent(type, listener); return this;};

})(jQuery);