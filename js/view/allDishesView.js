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
	var allDishes = [];
	var dishResults = null;
	var errorMessage = document.createElement('div');
	this.loadDishes = function(searchWord) {
		this.currType = String(container.find("#dishType option:selected").val());
		model.getAllDishes(this.currType, searchWord, function(dishes){
			/* visualize the dishes */
			//console.log("in callback?");
			//console.log(dishes);
			var allDishDivs = document.createElement('div');
			if (dishes.ResultCount === 0) {
				dishResults = false;
				
				errorMessage.innerHTML = "We could not find what you were searching for. Please try again.";
			}
			
			else {
				dishResults = true;
				for (var i = 0; i < 4; i++) {

					//console.log("in foor loop");
					var currentDish = dishes.Results[i];
					//console.log("for loop, dishname: ", currentDish.Title);


					//skapar ett div-element
					var dishDiv = document.createElement('div');
					

						dishDiv.className = "dish-container"; //lägger till classname
						dishDiv.id = String(currentDish.RecipeID); //lägger till id
						//lägger till innehållet i dishdiv (info om dishen)
						dishDiv.innerHTML = "<div class='dish-image'><img src='" 
						+ String(currentDish.ImageURL) + "'/></div><div class='dish-name'>" 
						+ String(currentDish.Title) 
						+ "</div><div class='dish-info'>" + String(currentDish.Subcategory) 
						+ "</div>";

					
					//lägger in dishDiven i containern
					//this.dishContainer.append(dishDiv);
					allDishes.push(dishDiv);
					//console.log("This is our allDishes",allDishes);
				}
			}
		});
		//console.log("YO",allDishes);
		if (dishResults === false) {
			this.dishContainer.append(errorMessage);
		}
		else {
			for (var j = 0; j < allDishes.length; j++) {
				//console.log("alldishes[j]",allDishes[j]);
				this.dishContainer.append(allDishes[j]);
			}

			allDishes = [];
		}
		//console.log("this.dishContainer", this.dishContainer);
		//console.log("loadDishes AllDishes call: ");


	}

	this.update = function(searchWord) {
		//empties the dishcontainer before loading new dishes
		this.dishContainer.empty();
		this.loadDishes(searchWord);
	}

	// load dishes on initialization
	this.loadDishes();
}
 
