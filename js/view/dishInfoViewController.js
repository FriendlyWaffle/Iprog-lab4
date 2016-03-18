//ExampleViewController Object constructor
var DishInfoViewController = function(view, model, overallController) {
	
	view.dishConfirmButton.click(function(){
		overallController.confirmDish();
		model.addDishToMenu(view.dishID);


	});

}