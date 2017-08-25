class Serial extends Graph{
	constructor(){
		super();

		// this attribute define the chart style
		// the user can define this style by using the style function developed in parent class
		this._style = {
			offsetTop: 10,
			offsetRight: 80,
			offsetBottom: 80,
			offsetLeft: 80,
		}

		// chart axis, this array content all the chart axis defined by user
		this._axisList = [];

		// chart graphs, this array content all the chart graphs defined by user
		this._graphList = [];
	}
	/**
	 * Check all needs if exist and call functions to build the chart
	 * this build function extends the parent build function to do some common tasks
	 * @return no return value for this function
	 */
	build(){
		super.build(); // call build function in parent class

		// group will content all the axis
		var axisGroup = this._svg.group();

		// create the axis steps and values
		for(var a in this._axisList){
			// draw axis, this function need a group which will content all the axis
			this._drawAxis(axisGroup, this._axisList[a]);
			// prepare and draw the steps and values with the axis title
			this._prepareStep(axisGroup, this._axisList[a]);
		}

		// draw graphs
		for(var g in this._graphList){
			// if a graph is a column so call the _drawCoulumn() function, this function take as argument an graph object
			if(this._graphList[g].type === 'column')
				this._drawColumn(this._graphList[g]);
			// if the graph is an line so call the _drawLine() function, this function take as argument an graph object
			else if(this._graphList[g].type === 'line')
				this._drawLine(this._graphList[g]);
		}

		// draw the chart key
		this._drawChartKey();
	}
	/**
	 * Add an axis to the chart, by this function the user can add the chart axis
	 * and define axis style, the arttribute not defined will take default value,
	 * the axis values stored in _axisList array
	 * @param {[object]} return the current object to do other tasks
	 */
	addAxis(options){
		this._axisList[options.field] = {
			field: options.field,
			type: options.type,
			position: options.position,
			color: options.color || "#b7b7b7",
			textColor: options.textColor || "#000",
			offset: options.offset || 0,
			offsetTitle: options.offsetTitle || 0,
			titleColor: options.titleColor || "#000",
			display: options.display !== false,
			stepsNumber: options.stepsNumber || 10,
		}
		return this;
	}
	/**
	 * Add an column graph, by this function the user can add column graph to the chart
	 * and define its style the attribute not defined will take the default value
	 * the graph values stored in _graphList array
	 * @param {[object]} return the current object to do other tasks
	 */
	addColumn(options){

		var position = [5,90];
		if(options.position)
			position = options.position.split(' ').map(Number);;
		if(position.length === 1)
			position.push(position[0]);

		this._graphList.push({
			field: options.field,
			type: "column",
			color: options.color || this._getRandomColor(),
			border: options.border || "#71bcde", // border color
			opacity: options.opacity || 1,
			position: position, // position preset before default value is "5 90"
			offset: options.offset || 0,
			class: options.class || "columns",
		});
		return this;
	}
	/**
	 * Add an Line graph, by this function the user can add line graph to the chart
	 * and define its style the attribute not defined will take the default value
	 * the graph values stored in _graphList array
	 * @param {[object]} return the current object to do other tasks
	 */
	addLine(options){
		this._graphList.push({
			field: options.field,
			type: "line",
			color: options.color || this._getRandomColor(),
			opacity: options.opacity || 1,
			joint: options.joint || "rect",
			class: options.class || "lines",
			strokeWidth : options.strokeWidth || 2,
			animate: options.animate || '',
		});
		return this;
	}
	/**
	 * Draw an axis, this function take as arguments the group which will content the axis,
	 * and the axis object which content the axis values
	 * this function need the type, position ans color of the axis
	 * @param  {[object]} group   svg group which will content the axis
	 * @param  {[object]} options axis object which content the axis values
	 * @return no return for this function
	 */
	_drawAxis(group, options){
		// get size of space where we can draw
		var drawableSpace = this._getDrawableSpaceSize();

		switch(options.type){

			case 'horizontal':

					// the x point coordinate which is the offset left
				var x = this._style.offsetLeft,

					// if the user didn't define the position so will be the default value "bottom"
					// so the y coordinate will be the height of the drawable space + the offsetTop value
					y = drawableSpace.height + this._style.offsetTop,

					// the size of the horizontal axis is the drawable space width
					size = drawableSpace.width;

				// draw the axis
				if(options.display)
					this._svg.line(group, x,y, x+size,y, {stroke: options.color});
			break;

			case 'vertical':
					// if the user didn't define the position so will be the default value "left"
					// so the y coordinate will be the height of the drawable space + the offsetTop value
				var x = this._style.offsetLeft,

					// if the user didn't define the position so will be the default value "bottom"
					// so the y coordinate will be the height of the drawable space + the offsetTop value
					y = drawableSpace.height + this._style.offsetTop,

					// the size of the horizontal axis is the drawable space width
					size = drawableSpace.height;

				// check if axis position is right, if it is so change y value to drawableSpace width + the offsetLeft
				if(options.position === 'right')
					x += drawableSpace.width;

				// draw the axis
				if(options.display)
					this._svg.line(group, x,y, x,y-size, {stroke: options.color});
			break;
		}

		// store the axis size in it object in _axisList array
		options['size'] = size;
	}
	/**
	 * Prepare steps data and call the _drawSteps() function to draw steps after we call _drawValues to draw the axis values
	 * this function is called for every axis by the build() function
	 * this function take as argumnet the axis group and the axis it self in options
	 * @param  {[svg group]} axisGroup the group wich content the axis
	 * @param  {[object]} options      the axis object
	 */
	_prepareStep(axisGroup, options){
			// get drawable space
		var drawableSpace = this._getDrawableSpaceSize(),

			// the axis field
			field = options.field,
			// get the axis size
			axisSize = options.size,
			// prepare the steps array values
			values = [],

			// step size, this step size it is for the vertical axis,
			// for the vertical axis the step size will be calculate by the _getSteps fucntion
			// and the result values will store in this variable
			stepSize = 1,

			// this variable is for the axis step szie whiche will be calculate after
			// the axis step size is the number of steps result by the axis size
			axisStepSize,

			// x value
			x = this._style.offsetLeft,

			// y value, this value can change if the axis position is top
			y = drawableSpace.height + this._style.offsetTop;

		// for horizontal axis, we need to get the axis steps values which sotred in the _data array
		// this axis is the bas axis so we don't need to calculate the steps values
		if(options.type === 'horizontal'){
			// get array steps values from the data array
			for(var elm in this._data)
				values.push(this._data[elm][field]);
		}

		// if the axis is not a base axis so in this case we need to calculate the steps values
		// so we use _getSteps function
		else if(options.type === 'vertical'){
				// get the min value of data
			var min = this._min(field),
				// get the max value of data
				max = this._max(field),
				// get step size and steps values,
				// _getSteps function return an object content stepSize and values
				steps = this._getSteps(min, max, options.stepsNumber);

			// store data and stepSize
			values = steps.values;
			// stepSize calculate by the function
			stepSize = steps.stepSize;

			// store the min step value for this axis in the axis options
			options['minVal'] = values[0];
		}

		// calculate the steps size
		axisStepSize = axisSize / values.length;

		// sotre the unity for this axis, if the axis is a base axis so the unity will be the step size
		// if not so we calculate the unity by the formate
		options['unity'] = axisStepSize / stepSize;

		// call the draw steps function to draw the steps
		if(options.display)
			this._drawSteps(axisGroup, {x, y, values, axisStepSize, type: options.type, position: options.position, color: options.color});
		// call the draw Values to draw the steps values
		this._drawValues(axisGroup,{
				x, y, values, axisStepSize, type: options.type, position: options.position,
				color: options.textColor, offset: options.offset, field: options.field,
				offsetTitle: options.offsetTitle, titleColor: options.titleColor
		});
		
	}

	/**
	 * Draw steps, this function take as argument the x and y values
	 * the array values, axisStepSize, type of the axis, the position of the axis
	 * and the color of the steps,
	 * and the axis Group which will content the elements
	 * @param  {[svgGroup]} axisGroup [the svg group which will content the elements]
	 * @param  {[object]}   options   
	 */
	_drawSteps(axisGroup, options){
		var x = options.x,
			y = options.y,

			// default style
			style = {stroke: options.color};

		// svg group which will content all steps elements
		var group = this._svg.group(axisGroup);

		// this part of code is for the horizontal axis
		// in this part we will draw the horizontal axis steps
		if(options.type === 'horizontal'){
			// draw steps
			for(var i=0; i<=options.values.length; i++){
				this._svg.line(group, x,y, x,y+8, style);
				x += options.axisStepSize;
			}
		}
		// this part of code is for the vertical axis
		// in this part we will draw the vertical axis steps
		else if(options.type === 'vertical'){
			// check if the axis position is the right so add an style and change x value,
			// if the positions not defined or it's value is left we don't do nothing
			if(options.position === 'right'){
				style['transform'] = 'translate(8 0)';
				x = this._getDrawableSpaceSize().width + this._style.offsetLeft;
			}
			// draw steps
			for(var i=0; i< options.values.length; i++){
				this._svg.line(group, x,y, x-8,y, style);
				y -= options.axisStepSize;
			}
		}
			
	}
	/**
	 * This function draw the value of the steps, and call _drawAxisTitle() to draw the axis title
	 * @param  {[svg group]} axisGroup svg group which will content all values elements
	 * @param  {[object]} options x and y values
	 *                            the array values, axisStepSize, type of the axis, the position of the axis
	 *                            and the color of the steps
	 */
	_drawValues(axisGroup, options){
		var x = options.x,
			y = options.y,

			// default style, which commun for all axis types
			style = {fill: options.color, "text-anchor": "middle", "font-size": 12};
		
		// svg group which will content all the values elements
		var group = this._svg.group(axisGroup);

		// this part of code is for the horizontal axis, so we check the type if it is horizontal
		// so we define the x value and add an style element
		if(options.type === 'horizontal'){
			x += options.axisStepSize / 2;
			style['alignment-baseline'] = "text-before-edge";

			// draw the stepsValue
			for(var i=0; i<options.values.length; i++){
				this._svg.text(group, x,y, options.values[i].toString(), style);
				x += options.axisStepSize;
			}
		}
		// if the axis type is vertical so we change the x value and add style elements for the vertical axis
		else if(options.type === 'vertical'){

			x -= options.offset;

			style['alignment-baseline'] = "middle";
			style['text-anchor'] = "end";

			// check if the axis position is right, if it is we need to chage the 'text-anchor' value and add 'transform' to the style
			// and change the x value
			if(options.position === 'right'){
				style['text-anchor'] = 'start';
				style['transform'] = 'translate(24 0)';

				// this case the x will be the size of the horizontal axis + the offset left + the offset between axis if it is defined,
				// if not it will be the default value which is 0
				x = this._getDrawableSpaceSize().width + this._style.offsetLeft + options.offset;
			}

			// draw the values
			for(var i=0; i<options.values.length; i++){
				this._svg.text(group, x-12,y, options.values[i].toString(), style);
				y -= options.axisStepSize;
			}

			// call _drawAxisTitle() function to draw the axis title 
			this._drawAxisTitle({field: options.field, x, position: options.position, offsetTitle: options.offsetTitle, titleColor: options.titleColor});
		}
			
	}
	/**
	 * this fucntion draw the axis title, this funtion called by _drawValues() function
	 * and take an options attribute, which is an object of options which define the title position and color ....
	 * @param  {[object]} options opbject which content all title options
	 */
	_drawAxisTitle(options){
		var drawableSpace = this._getDrawableSpaceSize(),
			field = options.field,
			x = options.x,

			// to get the center of the y axis we use the following
			y = (drawableSpace.height + this._style.offsetTop) / 2;

		// if the axis position is right so we change the x value
		if(options.position === 'right')
			x += options.offsetTitle + 55;
		// if it is not define or it is left so the x value will be as following
		else
			x -= options.offsetTitle + 45;

		// create an group for the title an rotate it
		var group = this._svg.group({'transform':"rotate(-90)", 'transform-origin': x+'px '+y+'px'});

		// draw the title inside the group defined
		this._svg.text(group, x, y, field.toString(), {'text-anchor': 'middle', fill: options.titleColor});
	}
	/**
	 * This function draw an column passed as argument
	 * @param  {[object]} graph the graph we want draw
	 */
	_drawColumn(graph){

		// find axis base, in this case the axis base is the horizontal axis
		for(var a in this._axisList){
			if(this._axisList[a].type === 'horizontal')
				var stepSize = this._axisList[a].unity;
		}

		// svg group which will content the columns
		var group = this._svg.group({class : graph.class});

		// array which will content data values
		var data = [];

		// get array data from the _data array
		for(var elm in this._data)
			data.push(this._data[elm][graph.field]);

		// get the drawable space size
		var drawableSpace = this._getDrawableSpaceSize(),

			startPosition = (graph.position[0] * stepSize) / 100,

			// calculate the width of each column
			width = ((graph.position[1] * stepSize) / 100) - (2 * graph.offset),

			// calculate the x value where the drawing will start
			x = (this._style.offsetLeft + startPosition) + graph.offset,
			// calculate the y value where the drawing will start
			y = drawableSpace.height + this._style.offsetTop,

			
			//width = stepSize - (offsetLeft + offsetRight),

			// get the unity of the axis, which refernece the data
			unity = this._axisList[graph.field].unity,

			// get the min value of this axis, this value is stored in axis option by 
			// _prepareSteps function
			minVal = this._axisList[graph.field].minVal;

		// draw columns
		for(var i=0; i<data.length; i++){
			// calculate the value to draw
			var val = (data[i] - minVal) * unity,
				// get the position to start
				ey = y- val;
			// draw colum
			this._svg.rect(group, x, ey, width, val, {stroke: graph.border, fill: graph.color, opacity: graph.opacity, class: 'column'});
			x += stepSize;
		}
	}
	/**
	 * draw an line graph, this function draw an line passed in parameter
	 * @param  {[object]} graph the graph we want draw
	 */
	_drawLine(graph){

		// find axis base, in this case the axis base is the horizontal axis
		for(var a in this._axisList){
			if(this._axisList[a].type === 'horizontal')
				var stepSize = this._axisList[a].unity;
		}

		// svg group which will content the columns
		var group = this._svg.group({class : graph.class});

		// array which will content data values
		var data = [];

		// get array data from the _data array
		for(var elm in this._data)
			data.push(this._data[elm][graph.field]);

		// get the drawable space size
		var drawableSpace = this._getDrawableSpaceSize(),

			// calculate the x value where the drawing will start
			x = this._style.offsetLeft + stepSize / 2,
			// calculate the y value where the drawing will start
			y = drawableSpace.height + this._style.offsetTop,

			// get the unity of the axis, which refernece the data
			unity = this._axisList[graph.field].unity,

			// get the min value of this axis, this value is stored in axis option by 
			// _prepareSteps function
			minVal = this._axisList[graph.field].minVal;

		// calculate the positions where we will draw the line pionts
		for(var i=0; i<data.length; i++)
			data [i] = y - ((data[i] - minVal) * unity);

		// prepare the path value add the first point
		var path = 'M'+x+','+data[0];
		// add the rest points
		for(var i=1, v=x; i<data.length ; i++){
			v += stepSize;
			path += 'L'+v+','+data[i];
		}

		// draw the path
		this._svg.path(group, path, {fill: 'none', stroke: graph.color, opacity: graph.opacity, class: 'line '+graph.animate, strokeWidth: graph.strokeWidth});

		// create the joint points group
		group = this._svg.group(group, {class: 'points'});

		// draw the joints
		for(var i=0; i<data.length; i++){
			// check if the points joint type is rect
			if(graph.joint === 'rect')
				this._svg.rect(group, x-5, data[i]-5, 10, 10, {fill: graph.color, stroke: graph.color, class: 'point',});

			// check if the points joint type is circle
			else if(graph.joint === 'circle')
				this._svg.circle(group, x, data[i], 8, {fill: graph.color, stroke: graph.color, class: 'point',});
			x += stepSize;
		}
	}
	/**
	 * this function draw key for all graphs of the chart
	 * this fucntion is called by the build() function
	 * @return {[type]} [description]
	 */
	_drawChartKey(){

		var x = 0,
			y = this._getSvgHeight() - 30;

		// create group which will content the key
		var group = this._svg.group();

		//loop for all graphs of the chart
		for(var i=0; i<this._graphList.length; i++){

			// get the ieme graph
			var graph = this._graphList[i];

			// if the graph type is column
			if(graph.type === 'column'){
				// draw the rect for the column graph with the same color
				this._svg.rect(group, x, y, 35, 15, {fill: graph.color, stroke: graph.border});
				x += 40; // space between the rect and text
				//draw the text
				this._svg.text(group, x, y+9, graph.field.toString(), {"alignment-baseline": "middle", "font-size": 14});
				x+= 70; // space between the text and the next graph key
			}
			// if the graph type is line
			else if(graph.type === 'line'){
				// draw the line
				this._svg.line(group, x, y+9, x+35, y+9, {stroke: graph.color, strokeWidth: graph.strokeWidth});

				// check the type of the joint and draw it in middle of the line
				if(graph.joint === 'rect')
					// draw rect joint in middle of the line
					this._svg.rect(group, x+14, y+5, 8, 8, {stroke: graph.color, fill: graph.color});
				// if the joint is circle draw it in center of the line
				else if(graph.joint === 'circle')
					this._svg.circle(group, x+18, y+9, 5, {stroke: graph.color, fill: graph.color});

				x += 40; // space between the line and text
				// draw the text
				this._svg.text(group, x, y+9, graph.field.toString(), {"alignment-baseline": "middle", "font-size": 14});
				x+= 70; // space between the text and next graph key
			}
		}

		// get size to move the group key, this code is to make the key group in center of the chart
		// so we need the translate value
		var xtranslate = (this._getSvgWidth() - group.getBBox().width) / 2;

		// translate the group with the xtranslate value
		this._svg.configure(group, {'transform': 'translate('+xtranslate+')'});
	}
	/**
	 * _getSteps function calculate the step size for an axis which has an min and max values
	 * and return the step size value and an array of steps values,
	 * which will used to draw the steps
	 * @param  {[int]} min   the min value in axis values
	 * @param  {[int]} max   the max value in axis values
	 * @param  {[int]} ticks number of steps wanted
	 * @return {[object]}    an object content the step size and array of steps values
	 */
	_getSteps(min,max,ticks=10){
		if(min == max){
	   		min -= 10;
	    	max += 10;
	  	}

		// Adjust ticks if needed
		if(ticks < 2)
		    ticks = 2;
		else if(ticks > 2)
		    ticks -= 2;

	  		// Get raw step value
	  	var tempStep = (max - min) / ticks,

		  	// Calculate pretty step value
		  	mag = Math.floor(Math.log10(tempStep)),
		  	magPow = Math.pow(10,mag),
		  	magMsd = parseInt(tempStep/magPow + 0.5),

		  	// step size
			stepSize = magMsd * magPow,

			// Lower and upper bounds calculations
		  	lb = stepSize * Math.floor(min/stepSize),
		  	ub = stepSize * Math.ceil((max/stepSize)),

		  	// Build steps values array
		  	val = lb,

		  	// create values array
		  	values = [];

	  	do {
	    	values.push(val);
	    	val += stepSize;
	  	}while(val <= ub);

	  	// return the step size and values
	  	return {stepSize, values}
	}
}