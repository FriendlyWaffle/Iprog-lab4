
var DinnerOverviewView = function (container, model) {
	
	this.container = container;
	this.myDinner = container.find("#myDinner");
	this.menuOverview = container.find("#menuOverview");
	this.numberOfGuests = container.find("#dinnerGuests");
	this.backButton = container.find("#goBack");
	this.printButton = container.find("#goButton");	

	// register to observe the model
	// adds this to observer list in model
	model.addObserver(this);
	
	

	this.loadView = function(){
		var guests = model.getNumberOfGuests();

		var guestNumber = String(guests);
		this.numberOfGuests.html(guestNumber);

		//get all the dishes on the menu, returns the dish-object
		
		var dishes = model.getFullMenu();

		var dishString = " ";
		var dishPrices = [];

		for (var i in dishes) {

			var currentDish = dishes[i];
		
			// create part of dishString that will contain the values wanted for each dish
			var currentDishPrice = model.getDishPrice(currentDish.id);
			currentDishPrice = currentDishPrice * guests;
			dishPrices.push(currentDishPrice);
			var dishDiv = "<div class='dish-container'>"
							+ "<div class='dish-image'>"
								+ "<img src='images/" + String(currentDish.image) + "'/>"
							+ "</div>"
							+ "<div class='dish-name'>"
								+ String(currentDish.name)
							+ "</div>"
							+ "<div class='dish-price'>"
								+ String(currentDishPrice)
							+ " SEK</div>"
						+ "</div>";

			dishString = dishString + dishDiv;
		}

		var totalPrice = 0
		for (i in dishPrices) {
			var dishPrice = dishPrices[i];
			totalPrice = totalPrice + dishPrice;
		}

		var extraDiv = "<div class='dish-container verticalLine'>"
							+ "<div class='dish-price leftAlignPrice'>Total: <br/>" +  String(totalPrice) + " SEK</div>"
					+ "</div>";
		
		dishString = dishString + extraDiv;

		this.menuOverview.html(dishString);
	}

	this.update = function() {
		this.loadView();
	}

	this.loadView();
}