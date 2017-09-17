class Pie extends Graph{
	constructor(){
		super();

		// this attribute define the chart style
		// the user can define this style by using the style function developed in parent class
		this._style = {
			radius: 100, // radius of the circle
			offsetTop: 80,
			offsetRight: 80,
			offsetBottom: 80,
			offsetLeft: 80,
			class: "piegraph",
		}
	}
	/**
	 * Check all needs if exist and call functions to build the chart
	 * this build function extends the parent build function to do some common tasks
	 * @return no return value for this function
	 */
	build(){
		super.build(); // call build function in parent class

		var center = {
				x: this._style.offsetLeft + this._style.radius,
				y: this._style.offsetTop + this._style.radius,
			},
			perimeter = this._calcPerimeter(),
			rotate = 0,
			total = 0,

			x = this._getDrawableSpaceSize().width - this._style.offsetRight,
			y = this._style.offsetTop,

			// create group that will content all the graph parts
			// with the class name defined by user or the default value "piegraph"
			group = this._svg.group({class: this._style.class});

		// use callback if the getValue is a function
		// the user can set getValue attribute as a callback fucntion 
		// in this case we use this part of code
		if(typeof this._data.getValue === 'function'){
			// get the context
			var self = this;

			// calculate the sum of data values
			this._data.data.forEach( function(element, index) {
				total += self._data.getValue(element);
			});

			// draw the pie chart parts
			this._data.data.forEach( function(element, index) {
				// get part value
				var value = self._data.getValue(element);

				var text = self._data.getKey(element);
				// get part color
				//var color = self._color[index];
				var color = self._getColor(index);

				// draw part with _drawPart function
				// for this function we need the center point, perimeter of the circle, value, total values
				// rotate => arc size and the color of this part
				rotate = self._drawPart({group, center, perimeter, value, total, rotate, color});

				this._drawKey(group, {x, y, color, text});

			});
		}

		// use getValue as a key if it is not a function
		// if the user set getValue attribute as a key name
		// for the value, so we use this part of code
		else{

			// calculate the sum of data values
			for(var index in this._data.data)
				total += this._data.data[index][this._data.getValue];

			// draw the pie chart parts
			for(var index in this._data.data){
				// get part value
				var value = this._data.data[index][this._data.getValue];

				var text = this._data.data[index][this._data.getKey];

				// get part color
				var color = this._getColor(index);;

				// draw the part
				rotate = this._drawPart({group, center, perimeter, value, total, rotate, color});

				this._drawKey(group, {x, y, color, text});
				y += 25;
			}
		}
		
		
	}
	/**
	 * Create a part of Pie chart
	 * for this function we need this center point as an object contnet x and y attribute
	 * and the perimeter of the circle, the value we want to draw, the total of the data values,
	 * the color of the part and the rotate size which set in 0 at first and
	 * the function return its value evrytime to use it in the next part
	 * @return {[int]} rotate return the rotate size
	 */
	_drawPart(options){
		var cx = options.center.x,
			cy = options.center.y,
			r =  this._style.radius / 2,
			rotate = options.rotate,
			perimeter = options.perimeter,
			size = perimeter * (options.value / options.total);

		// draw the part
		this._svg.circle(options.group ,cx, cy, r, {fill: "none", strokeWidth: this._style.radius, stroke: options.color, strokeDashArray: "0 "+rotate+" "+size+" "+perimeter, class: "part"});

		return rotate + size;
	}
	/**
	 * Calculate the perimeter of the circle based in its radius
	 * and return the value
	 * @return {[int]}	the perimter value
	 */
	_calcPerimeter(){
		return 2 * Math.PI * (this._style.radius / 2);
	}
	/**
	 * check if user defined colors for the chart and get those colors,
	 * for this case we need the index of the color in _color array
	 * if the user didn't define the colors use _getRandomColor function to get an random color and return its value
	 * @param  {[int]} index color index in _color array
	 * @return {[string]}    color string value
	 */
	_getColor(index){
		// check if _color array exist
		if(!this._color)
			// return random color
			return this._getRandomColor();
		// if not than check if index variable has a value
		if(index === undefined)
			throw new Error('Color index not found');
		// return the color defined by user
		return this._color[index];
	}

	_drawKey(group, options){

		var x = options.x,
			y = options.y;

		this._svg.rect(group, x, y, 35, 15, {fill: options.color});
		x += 40;
		this._svg.text(group, x, y+12, options.text, {"font-size": 14}); 
	}
}