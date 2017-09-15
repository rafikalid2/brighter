/**
* priorityQueu
* this is an async task manager
**/

$$.priorityQueu()		// message queu
$$.priorityTaskQueu()	// tasks queu, each task will be executed based on it's priority
	.add(task:function, priority: int = 0)// add task; priotity in [-infinity, 0, +infinity]

	.pause()
	.continue()// alias: start()

