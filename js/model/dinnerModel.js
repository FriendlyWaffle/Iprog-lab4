//DinnerModel Object constructor
var DinnerModel = function() {
	//TODO Lab 2 implement the data structure that will hold number of guest
	// and selected dinner options for dinner menu

	this.menu = [null, null, null];
	this.NumberOfGuests = 1;
	//tanken är att id läggs in på varje rätt

	//list of observers
	this._observers  = [];

	// adds the listener to the list
	this.addObserver = function (observer) {
		this._observers.push(observer);
	}

	// notify the observer
	// calls the update method on all the observers in the list
	this.notifyObservers = function () {
		for (var i = 0; i < this._observers.length; i++) {
			//console.log("Observer:",this._observers[i]);
			this._observers[i].update();
		}
	}


	this.setNumberOfGuests = function(num) {
		//TODO Lab 2
		this.NumberOfGuests = num;
		this.notifyObservers();
	}

	// should return 
	this.getNumberOfGuests = function() {
		//TODO Lab 2
		return this.NumberOfGuests;
	}

	//Returns the dish that is on the menu for selected type 
	this.getSelectedDish = function(category) {
		//TODO Lab 2
		//Runs through menu
        for (var i = 0; i < this.menu.length; i++) {
        	//Using getDish func (provide id) to get dish-object back
          var currentDish = this.getDish(this.menu[i]);
          //If the dish type is equal to the provided type the dish 
          //id is returned
          if (currentDish.category === category){
            return currentDish.id;        
          }

        }
	}

	//Returns all the dishes on the menu.
  	this.getFullMenu = function() { 
    	//TODO Lab 2
    	var fullMenu = [];

    	for (var i = 0; i < this.menu.length; i++) {
      		//if we want to return objects
      		if ( this.menu[i] != null ) {
      			fullMenu.push(this.getDish(this.menu[i]));
      		}
      
      		//if we want to return dish-id
      		//fullMenu.push(this.menu[i]);
    }

    return fullMenu; 

  }

	//Returns all ingredients for all the dishes on the menu.
	this.getAllIngredients = function() {
		//TODO Lab 2
        //Make a list to store all ingredients
        var allIngredients = [];
      
        //for-loop to run through each dish in the menu 
    	for (var i in this.menu) {
            var getCurrentDish = this.getDish(this.menu[i]);

            //get ingredients from each dish object
            var ingrs = getCurrentDish.ingredients;
        
            //run through 
            for (var j in ingrs){
                var ingr = ingrs[j].name
                allIngredients.push(ingr);
          }
     
        }
      	return allIngredients;
	}


	//Returns the total price of the menu (all the ingredients multiplied by number of guests).
	this.getTotalMenuPrice = function() { 
		//TODO Lab 2
	    var menuPrice = 0;
	    for (var i = 0; i < this.menu.length; i++) {
	      	//get the current dish in the menu
	      	if ( this.menu[i] != null ) {
		      	var currentDish = this.getDish(this.menu[i]);
		        
		        //for each ingredient, add price to menuPrice
		        var ingredientLength = currentDish.ingredients.length;
		        for (var j=0; j < ingredientLength; j++) {
		          menuPrice = menuPrice + currentDish.ingredients[j].price;
		        }        
	    	}
	      
	    }
    
    	//multiply ingredient price by number of guests
    	return menuPrice * this.getNumberOfGuests();

	}


	//Adds the passed dish to the menu. If the dish of that type already exists on the menu
	//it is removed from the menu and the new one added.
	this.addDishToMenu = function(id) {
		//TODO Lab 2 
      var dishType = this.getDish(id).category;

      //Depending on what type of dish, the new dish will overwrite the old one
      if (dishType === 'starter'){
           this.menu[0] = id;
      } else if (dishType === 'main dish'){
           this.menu[1] = id;
      } else if (dishType === 'dessert') {
            this.menu[2] = id;
          
      }  
      this.notifyObservers();
	}


	//Removes dish from menu
	this.removeDishFromMenu = function(id) { 
		//TODO Lab 2    
	    var menuLength = this.menu.length;
	    //iterate through the menu and look for the id. Set to null
	    for (var i = 0; i < menuLength; i++) {
	      if (this.menu[i] === id) {
	        this.menu[i] = null;
	      }  
	    }
	    this.notifyObservers();
   }

	//function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
	//you can use the filter argument to filter out the dish by name or ingredient (use for search)
	//if you don't pass any filter all the dishes will be returned
	this.getAllDishes = function (category,filter,cb) {
	    var apiKey = "H9n1zb6es492fj87OxDtZM9s5sb29rW3";
	    var type = category;
	    var titleKeyword = filter;
	    if (typeof filter === "undefined"){
	      var url = "http://api.bigoven.com/recipes?&api_key=" + apiKey + "&include_primarycat=" + type + "&pg=1&rpp=25";
	    }
	    else {
	      var url = "http://api.bigoven.com/recipes?&api_key=" + apiKey + "&title_kw=" + titleKeyword + "&include_primarycat=" + type + "&pg=1&rpp=25";
	    }
	    console.log("YO AJAX REQUEST");
	    
    	//var result = "";
	    $.ajax({
	      	type: "GET",
	      	dataType:'json',
	      	cache: false,
	      	async: false,
	      	url: url,
	      	success: cb
	    });
		// if result === undefined then...! (felkontroll)
		console.log("Ajax request 2");
		//cb(data);

	    //console.log("dish", data);
	}


	//function that returns a dish of specific ID
	this.getDish = function (id) {
	  	var apiKey = "H9n1zb6es492fj87OxDtZM9s5sb29rW3";
	  	var recipeID = id;
	  	var url = "http://api.bigoven.com/recipe/" + recipeID + "?&api_key=" + apiKey + "&pg=1&rpp=25";
		this.dishes = function () {
	    	var result = "";
	    	console.log("result");
		    $.ajax({
		      	type: "GET",
		      	dataType:'json',
		      	cache: false,
		      	async: false,
		      	url: url,
		      	success: function (data) {
		      		result = data;	
		      }
		    });
		// if result === undefined then...! (felkontroll)
		return result;  
		}

		var dish = this.dishes(id);
		console.log("dish: ", dish);
		return dish;
	 	
	}

	this.getDishPrice = function (id) {
		var dishPrice = 0; 
		var dish = this.getDish(id);
        var ingredients = dish.Ingredients;
        for (i in ingredients) {
        	ingredient = ingredients[i];
        	ingredientQuantity = ingredient.Quantity;
        	var price = 1*ingredientQuantity;
        	dishPrice = dishPrice + price;
        }
      	return dishPrice;
    }



	// the dishes variable contains an array of all the 
	// dishes in the database. each dish has id, name, type,
	// image (name of the image file), description and
	// array of ingredients. Each ingredient has name, 
	// quantity (a number), price (a number) and unit (string 
	// defining the unit i.e. "g", "slices", "ml". Unit
	// can sometimes be empty like in the example of eggs where
	// you just say "5 eggs" and not "5 pieces of eggs" or anything else.

	}
			
