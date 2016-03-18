//ExampleViewController Object constructor
var FullMenuViewController = function(view, model, overallController) {
 
	view.backButton.click(function(){
		overallController.editDinner();
	});
 
}