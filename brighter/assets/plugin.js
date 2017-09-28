/**
 * this function allow to add new functionnality to brighter
 *
 * $$.plugin({key:value})				// elements plugin
 * $$.plugin(isRootPlugin, {key:value})	// root plugin
 *
 * $$.plugin('pluginName', {
 * 		value	: 	// value could be function or static value
 * 		get		: // getter
 * 		set		: // setter
 * })
 * $$.plugin(true, 'pluginName', {	// root plugin
 * 		value	: 	// value could be function or static value
 * 		get		: // getter
 * 		set		: // setter
 * })
 */

Object.defineProperty($$, 'plugin', {
	value	: function(){
		var isRootPlugin	= arguments[0],
			plugName,
			plugs;
		// is root plugin
			if(typeof isRootPlugin == 'boolean'){
				plugName	= arguments[1];
				plugs		= arguments[2];
			}
			else{
				isRootPlugin	= false;
				plugName	= arguments[0];
				plugs		= arguments[1];
			}
		// $$.plugin('pluginName', {});
			if(typeof plugName == 'string'){
				Object.defineProperty(
					isRootPlugin ? $$ : $$.prototype,
					plugName,	// plugin name
					plugs		// plugin descriptor
				);
			}
		// $$.plugin({key:value})
			else{
				var obj		= isRootPlugin ? $$ : $$.prototype;
				for(var i in plugName)
					Object.defineProperty(
						obj,
						i,
						{
							value	: plugName[i]
						}
					);
			}

		// if(arguments.length){
		// 	// add plugin as: plugin(pluginName, pluginDescriptor, isRootPlugin)
		// 		if(typeof arguments[0]	== 'string'){
		// 			Object.defineProperty(
		// 				arguments[2] ? $$ : $$.prototype,
		// 				arguments[0],	// plugin name
		// 				arguments[1]	// plugin descriptor
		// 			);
		// 		}
		// 	// else: add plugin as: plugin(pluginsMap, isRootPlugin)
		// 		else{
					
		// 		}
		// }
	}
});