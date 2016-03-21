//ExampleView Object constructor
var DinnerOptionView = function (container, model) {
	
	this.container = container;

	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)

	this.numberOfGuests = container.find("#numberOfGuests");
	this.menuContainer = container.find("#menuTable");
	this.plusButton = container.find("#plusGuest");
	this.minusButton = container.find("#minusGuest");
	this.confirmButton = container.find("#confirmDinner");

	//model.setNumberOfGuests(Number(this.numberOfGuests.text()));
	// register to observe the model
	// adds this to observer list in model
	
	model.addObserver(this);


	this.loadView = function() {
		var guests = model.getNumberOfGuests();
		this.numberOfGuests.html(guests);

		var dinnerString = "<tr class='table-header'>"
						+ "<td>Dish name</td>"
						+ "<td class='right-align'>Cost</td>"
					+ "</tr>";
		var menu = model.getFullMenu();
		//console.log("This is our menu",menu);
		if ( menu != [] ) {
			for (var i = 0; i < menu.length; i++) {
				var dish = "<tr>"
							+ "<td>" + String(menu[i].Title) + "</td>"
							+ "<td class='right-align'>" + String(model.getDishPrice(menu[i].RecipeID)*guests) + "</td>"
						+ "</tr>";

				dinnerString = dinnerString + dish;
			}

			dinnerString = dinnerString + "<tr>"
							+"<td>Pending</td>"
							+"<td class='right-align'>0.00</td>"
						+"</tr>"
						+"<tr class='right-align'>"
							+"<td colspan='2' class='border-top'>"
								+"SEK <span id='totalCost'>" + String(model.getTotalMenuPrice()) + "</span>"
							+"</td>"
						+"</tr>";

		}
		this.menuContainer.html(dinnerString);


	}

	this.update = function() {
		this.loadView();
	}

	this.loadView();

}
 
