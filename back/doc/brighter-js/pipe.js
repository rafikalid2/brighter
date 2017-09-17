
/**
* sync pipe
**/
	// sync task, if is function, "this" is 
		data => {
			// ...
			return newData;
		}
		//data: faire une copi avant de la passer vers l'etape suivante,juste pour traitement d'erreur
	// pipe
		$$.pipe(inputData)	// execute a synchrounous pipe
			.onError((err, pipeObj) => {})// optionale; mast be the first pipe do not throw errors, but execute this function, can stop or correct execution
			.beforeStep((err, data, pipeObj)=>{})// optional, edit data and errors between steps, step will be executed before "onError"
			
			.pipe(task)// task: data => {}, data is the returned data from previous task
			.pipe(task, task2, task3)// execute synchronously those tasks, wait until all tasks finished before going to the next task, retournedData = [data1, ...]
			.pipe([task1, task2, ,,,]) // fork a new execution path for each task

			.getCurrentStep() // current task
			.getNextStep() // next task
			.getIndex() // get the step index

			.continue() // continue de execution of pipe
			.break() // stop the execution of the pipe
			.retry() // retry the currentstep again, used when error
			.seak(n) // go to task n


/**
* async pipe
*/
	// task, si ya return not undefined, or throw, il will be act like a synchrone task
		(data, pipeObj) => {
			//....
			pipeObj.next(err, newData);
		}
	// remove http task
		{
			url		: // task url
			query	: // data to send encoded in the URL (GET)
			post	: // use post method and send those data, could be null or undefined if no post data

			tiemout	: // timeout
			error	: (err, pipeObj)=>{}
			success	: (data, pipeObj)=>{} // when data received, sync task
		}
	$$.asyncPipe(inputData)
		.onError((err, pipeObj)=>{})
		.beforeStep((err, data, pipeObj) => {})

		.onEnd((err, data, pipeObj)=>{})

		.pipe(task)
		.pipe(task1, task2, ,,,) // waiting for all thos tasks, one return data that is a list of all return data
		.pipe([task1, task2, ,,,])// fork execution to each task

		.getCurrentStep()
		.getNextStep()
		.getIndex() // get step index

		.continue() // continue de execution of pipe
		.break() // stop the execution of the pipe
		.retry(data) // retry the currentstep again, used when error, data is optional
		.seak(n) // go to task n