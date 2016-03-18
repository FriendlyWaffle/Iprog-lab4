//ExampleViewController Object constructor
var DinnerOverviewViewController = function(view, model, overallController) {
 
	view.backButton.click(function(){
		console.log("editDinnerCall");
		overallController.editDinner();
	});

	view.printButton.click(function(){
		console.log("printDinnerCall");
		overallController.printDinner();
	});
}