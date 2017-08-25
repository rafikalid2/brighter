// week of year
	if(!Date.prototype.hasOwnProperty('getWeekOfYear'))
		Date.prototype.getWeekofYear = function(){
			var d		= new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
			var dayNum	= d.getUTCDay() || 7;
			d.setUTCDate(d.getUTCDate() + 4 - dayNum);
			var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
			return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
		};

// week of month
	if(!Date.prototype.hasOwnProperty('getWeekOfMonth'))
		Date.prototype.getWeekOfMonth	= function(){
			var d	= new Date(this.getFullYear(), this.getMonth(), 1);
			return (d.getDay() + this.getDate()) / 7;
		};

// day of year
	if(!Date.prototype.hasOwnProperty('getDayOfYear'))
		Date.prototype.getDayOfYear	= function(){
			var d	= new Date(this.getFullYear(), 0, 0);
			return Math.floor((this - d) / 86400000);
		};

// now
	if(!Date.now)
		Date.now	= function(){
			return new Date().getTime();
		};