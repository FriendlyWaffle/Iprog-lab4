//ExampleViewController Object constructor
var DinnerOptionViewController = function(view, model, overallController) {
 
	view.plusButton.click(function(){
		model.setNumberOfGuests(model.getNumberOfGuests() + 1);
	});
 
	view.minusButton.click(function(){
		model.setNumberOfGuests(model.getNumberOfGuests() - 1);
	});

	view.confirmButton.click(function(){
		overallController.confirmDinner()

	});
}