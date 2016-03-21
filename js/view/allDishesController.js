var AllDishesController = function(view, model, overallController) {

	//när något som har klassen dish-container som ligger i containern
	//klickas på, körs denna funktion
 	view.container.on('click', '.dish-container', function(){

	    //this är den dish-container som blivit klickad på
	    //då skickar vi med dess id i selectedDish
	    overallController.selectedDish(this.id);
	});

 	// när dishtype ändras
 	view.dishTypeSelect.change(function() {
 		//uppdaterar viewn, med det nya värdet
 		// kollar om det finns ett sökvärde
 		overallController.loading();
 		if( view.searchField.val() ) {
 			view.update(view.searchField.val());
 		} else {
 			view.update();
 		}
 	});

 	view.searchButton.click(function(){
 		// om det finns något värde i sökfältet
 		// uppdateras viewen med sökordet
 		overallController.loading();
 		if( view.searchField.val() ) {
 			view.update(view.searchField.val());
 		} else {
 			view.update();
 		}
 	});
 

}