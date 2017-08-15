/**
 * native HTML element builder
 * to be used when creating lot of elements
 * 100 time faster than jQuery alternative
 */
(function($){
	$.createElement	= function(tagName){
		return new DOMElementBuilder(tagName);
	};

	function DOMElementBuilder(tagName){
		this.ele	= document.createElement(tagName);
		return this;
	}

	$.extend(DOMElementBuilder.prototype, {
		attr	: function(attrName, attrValue){
			this.ele.setAttribute(attrName, attrValue);
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
		text	: function(value){
			this.ele.text(txt);
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
		insertBefore : function(element){
			this.ele.insertBefore(element);
			return this;
		},
		css		: function(key, value){
			this.ele.style[key]	= value;
			return this;
		},
		on		: function(type, listener){
			if(this.ele.addEventListener)
				this.ele.addEventListener(type, listener, false);
			else if(this.ele.attachEvent) // ie
				this.ele.attachEvent(type, listener);
			else
				throw new Error('Could not attach event.');
			return this;
		},
		build	: function(){
			return this.ele;
		},
		get		: function(){
			return this.ele;
		}
	});
})(jQuery);