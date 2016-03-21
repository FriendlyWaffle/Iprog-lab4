//ExampleView Object constructor
var DishInfoView = function (container, model) {
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)

	this.container = container;
	this.dishName = container.find("#dishName");
	this.dishImage = container.find("#dishImage");
	this.dishInfo = container.find("#dishInfo");
	this.ingredientTable = container.find("#ingredientTable");
	this.dishConfirmButton = container.find("#confirmDish");
	this.dishID = "";

	var id = undefined;


	// register to observe the model
	// adds this to observer list in model
	model.addObserver(this);

	this.loadIngredientList = function(id) {
		if (id != undefined){
			dish = model.getDish(id);
			//update containers with data
			this.dishID = id;
			this.dishName.html(String(dish.Title));
			this.dishImage.html("<img src=" + String(dish.ImageURL) + "'/>");
			this.dishInfo.html(String(dish.description));

			var ingredientList = "<tr class='table-header'>"
								+ "<td colspan='4'>Ingredients</td>"
							+ "</tr>";

			// for each ingredient for this dish
			for (var i = 0; i < dish.Ingredients.length; i++) {
				var currIngredient = dish.Ingredients[i];
				
				var ingredient = "<tr>"
					+ "<td class='amount'>" + String(currIngredient.quantity) + " " + String(currIngredient.unit) + "</td>"
					+ "<td class='name'>" + String(currIngredient.name) + "</td>"
					+ "<td class='currency'>SEK</td>"
					+ "<td class='price'>" + String(currIngredient.price) + "</td>"
				+ "</tr>"

				// add the ingredient to the ingredient list
				ingredientList = ingredientList + ingredient;
			}

			ingredientList = ingredientList + "<tr>"
								+ "<td colspan='2' class='border-top'>"
								+ "</td>"
								+ "<td class='border-top'>SEK</td>"
								+ "<td class='total border-top' id='totalPrice'>" + String(model.getDishPrice(this.dishID)) + "</td>"
							+ "</tr>";

			// update the ingredient table with the ingredient list
			this.ingredientTable.html(ingredientList);
		}
	}

	this.update = function(id) {
		this.loadIngredientList(id);
	}

	this.loadIngredientList(id);
}
 
