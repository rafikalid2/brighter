class Graph{

	/**
	 * Create svg canvas inside container 
	 * @param  {[string]} container id/class of a container
	 */
	_createSvg(context = this){
		// create svg and store it in svg attribute
		$(this._container).svg(function(svg){
			// add viewBox to the svg
			svg.configure({viewBox: "0.5 0.5 "+svg.width()+" "+svg.height()});
			// store the svg in _svg attribute
			context._svg = svg;
		});
	}
	/**
	 * Get the svg paper width
	 * @return {[int]} svg paper width in px
	 */
	_getSvgWidth(){
		return this._svg.width();
	}
	/**
	 * Get the svg paper height
	 * @return {[int]} svg paper height in px 
	 */
	_getSvgHeight(){
		return this._svg.height();
	}
	/**
	 * Get x and y center point coordinate for the svg paper
	 * @return {[object]} x: x coordinate
	 *                    y: y coordinate
	 */
	_getSvgCenter(){
		return {
			x: this._getSvgWidth() / 2,
			y: this._getSvgHeight() / 2,
		}
	}
	/**
	 * Get the space where we can draw
	 * @return {[object]} object with the width and height values 
	 */
	_getDrawableSpaceSize(){
		return {
			width: this._getSvgWidth() - (this._style.offsetLeft + this._style.offsetRight),
			height: this._getSvgHeight() - (this._style.offsetTop + this._style.offsetBottom),
		}
	}
	/**
	 * Get random color everytime, this function give as a return
	 * an random color value every time
	 * @return {[string]} the color string value
	 */
	_getRandomColor(){
	  	var letters = '0123456789ABCDEF';
	  	var color = '#';
	  	for (var i = 0; i < 6; i++) {
	    	color += letters[Math.floor(Math.random() * 16)];
	  	}
	  	return color;
	}
	_min(field){
		var min = this._data[0][field];
		for(var elm in this._data){
			if(min > this._data[elm][field])
				min = this._data[elm][field];
		}
		return min;
	}
	_max(field){
		var max = this._data[0][field];
		for(var elm in this._data){
			if(max < this._data[elm][field])
				max = this._data[elm][field];
		}
		return max;
	}
	/**
	 * Specifiy the svg container
	 * @param  {[string]} container the container id or class
	 * @return {[object]}           return the current object to do other tasks
	 */
	container(container){
		// store value in container attribute
		this._container = container;
		return this;
	}
	/**
	 * Store the data in _data attribute of this object
	 * @param  {[array]} data an array of data for the chart
	 * @return {[object]}      return the current object to do other tasks
	 */
	data(data){
		// store value in data attribute
		this._data = data;
		return this;
	}
	/**
	 * Store style for the this chart, the style need to be an object of css elements
	 * @param  {[object]} style object of css elements which define the style of the chart
	 * @return {[object]}       return the current object to do other tasks
	 */
	style(style){
		// add the not exist style and change the existent's value
		for(var s in style)
			this._style[s] = style[s];
		return this;
	}
	/**
	 * Define graphs color, the color need to be an array of colors
	 * @param  {[array]} color array of colors
	 * @return {[object]}      return the current object to do other tasks
	 */
	color(color){
		this._color = color;
		return this;
	}
	/**
	 * Check all needs if exist and call functions to build the chart
	 * @return no return value for this function
	 */
	build(){
		// check if container already defined if not throw new Error exception
		if(!this._container)
			throw new Error('Container not found');

		// check if data already defined if not throw new Error exception
		else if(!this._data)
			throw new Error('Data not found');

		// call createSvg function to create the svg canvas in the container
		this._createSvg();
	}
	delete(){
		$(this._container).removeAttr('class').empty();
	}
}