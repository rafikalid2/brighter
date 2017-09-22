/**
 * this function allow to add new functionnality to brighter
 * $$.plugin('pluginName', {
 * 		value	: 	// value could be function or static value
 * 		get		: // getter
 * 		set		: // setter
 * }, isRootPlugin)// isRootPlugin: when true, this plug in will run with $$, default will run with $$ collection
 *
 * $$.plugin({key:value}, isRootPlugin)
 */

Object.defineProperty($$, 'plugin', {
	value	: function(plugins, isRootPlugin){
		if(arguments.length){
			// add plugin as: plugin(pluginName, pluginDescriptor, isRootPlugin)
				if(typeof arguments[0]	== 'string'){
					Object.defineProperty(
						arguments[2] ? $$ : $$.prototype,
						arguments[0],	// plugin name
						arguments[1]	// plugin descriptor
					);
				}
			// else: add plugin as: plugin(pluginsMap, isRootPlugin)
				else{
					var obj		= arguments[1] ? $$ : $$.prototype;
					var plugins	= arguments[0];
					for(var i in plugins)
						Object.defineProperty(
							obj,
							i,
							plugins[i]
						);
				}
		}
	}
});