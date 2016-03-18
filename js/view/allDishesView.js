//ExampleView Object constructor
var AllDishesView = function (container, model) {
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)

	this.container = container;
	this.dishContainer = container.find("#allDishes");
	this.dishTypeSelect = container.find("#dishType");
	this.searchField = container.find("#keywords");
	this.searchButton = container.find("#searchDishButton");
	
	// register to observe the model
	// adds this to observer list in model
	model.addObserver(this);

	// function that loads all the dishes
	this.loadDishes = function(searchWord) {
		this.currType = String(container.find("#dishType option:selected").val());
		this.dishes = model.getAllDishes(this.currType, searchWord);
		console.log("loadDishes AllDishes call: ", this.dishes);
		//gets all dishes
		//console.log(this.currType);

		// for each dish, add the info into the correct container
		for (var i = 0; i < this.dishes.length; i++) {
			var currentDish = this.dishes[i];
			console.log("for loop: ", currentDish.Title);


			//skapar ett div-element
			var dishDiv = document.createElement('div');
			dishDiv.className = "dish-container"; //lägger till classname
			dishDiv.id = String(currentDish.RecipeID); //lägger till id
			//lägger till innehållet i dishdiv (info om dishen)
			dishDiv.innerHTML = "<div class='dish-image'><img src='images/" 
			+ String(currentDish.ImageURL) + "'/></div><div class='dish-name'>" 
			+ String(currentDish.Title) 
			+ "</div><div class='dish-info'>" + String(currentDish.Description) 
			+ "</div>";
			
			//lägger in dishDiven i containern
			this.dishContainer.append(dishDiv);
		}

	}

	this.update = function(searchWord) {
		//empties the dishcontainer before loading new dishes
		this.dishContainer.empty();
		this.loadDishes(searchWord);
	}

	// load dishes on initialization
	this.loadDishes();
}
 
