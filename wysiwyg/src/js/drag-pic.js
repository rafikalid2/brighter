Wysiwyg.prototype._uploadPic = function(editor){

	editor.on('dragenter', function (e){
	    $(this).addClass('active');
	});
	editor.on('dragleave', function(e){
		$(this).removeClass('active');
	});

	var context = this;

	editor.on('drop', function(e){
		// get files selected (draged)
	   	var files = e.originalEvent.dataTransfer.files;

	   	// focus in the editor
	   	$(this).trigger('focus');

	   	// handle files
	   	_handleFiles(this, context, files);

	   	if(editor.hasClass('error'))
	   		setTimeout(function(){
	   			editor.removeClass('error');
	   		},2000);

	   	// remove active calss of editor
	    $(this).removeClass('active');
	});

	// stop brwser to open the file whene it is droping outside the editor
	$(document).on('dragenter', function (e){
	    e.stopPropagation();
	    e.preventDefault();
	});
	$(document).on('dragover', function (e){
	  	e.stopPropagation();
	  	e.preventDefault();
	});
	$(document).on('drop', function(e){
		e.stopPropagation();
		e.preventDefault();
	});

	/**
	 * handle the files selectioned,
	 * this function take the context and files array
	 * @param  {[this]} context 
	 * @param  {[array]} files array of files selected
	 */
	function _handleFiles(editor, context, files){
		// loop for the files
		for(var i=0; i<files.length; i++){

			// check file if it is an image
			if(!files[i].type.match(/.(jpg|jpeg|png|gif)$/)){
		      $(editor).addClass('error');
		      //console.error('File selected is not an image');
		      continue;
		    }
		    
			var reader = new FileReader();
 			
 			reader.onload = function (event) {
		    	context._executeCommand('insertImage', event.target.result);
		    }

            // Read in the image file as a data URL.
            reader.readAsDataURL(files[i]);
		}
	}
}