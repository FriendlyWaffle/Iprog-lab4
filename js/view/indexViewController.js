var IndexViewController = function(view, model, overallController) {
 	view.continueButton.click(function(){
		//console.log("continue click");
		//view.container.hide();

		// tester, inget fungerar som vi vill
		//console.log(view);
		//console.log("hej", view.container);
		//console.log("yo",this);

		overallController.createDinner();

	});
	
}