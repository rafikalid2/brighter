/**
* hash map
**/

$$.hashMap()
$$.hashMap({map})//convert an object to hashMap
	.clear() // remove all data
	.length	// count of elements inside the hashmap
	.has('key')// has this key//alias for "hasOwnProperty"
	.containsKey('key')// alias for "has"//alias for "hasOwnProperty"

	.hasValue('value')	
	.containsValue('value')

	.isEmpty()
	.clone()	// get a copy of this map

	.keySet()	// get a set of all kies
	.values()	// get a list of all values

	.put(key, value)// recommanded to use "mapObj.key = value" instead
	.remove('key')	// recommanded to use "delete map.key" instead

	.each((key,value)=>{})

	.iterator()	// get an iterator of this


/**
* Collection : "SET"
**/

$$.set()
$$.set([list])
	.push
	.pop
	..