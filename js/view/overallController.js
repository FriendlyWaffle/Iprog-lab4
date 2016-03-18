//Overall controller
var OverallController = function(indexView, dinnerOptionView, allDishesView, dishInfoView, fullMenuView, dinnerOverviewView, model) {
	//hides and shows views based on user interation
	//controllers of the individual views send messages to 
	//the overall controller
	this.indexView = indexView;
	this.dinnerOptionView = dinnerOptionView;
	this.allDishesView = allDishesView;
	this.dishInfoView = dishInfoView; 
	this.fullMenuView = fullMenuView; 
	this.dinnerOverviewView = dinnerOverviewView; 
	this.model = model;


	this.hideView = function(view) {
		view.container.hide();
	}

	this.showView = function(view) {
		view.container.show();
	}

	this.updateView = function(view, arg) {
		view.update(arg);
	}
	// index -> selectDish
	//behöver ingen input
	// ska hidea indexView???
	// ska visa dinnerOptionView och allDishesView

	this.createDinner = function() {
		this.hideView(this.indexView);
		this.showView(this.dinnerOptionView);
		this.showView(this.allDishesView);
	}

	this.confirmDinner = function() {
		this.hideView(this.dinnerOptionView);
		this.hideView(this.allDishesView);
		this.hideView(this.dishInfoView);
		this.updateView(this.dinnerOverviewView);
		this.showView(this.dinnerOverviewView);
	}


	this.editDinner = function() {
		this.hideView(fullMenuView);
		this.hideView(dinnerOverviewView);
		this.showView(allDishesView);
		this.showView(dinnerOptionView);
		//"gå tillbaka till" hide and seek selectDish-view.
	}

	this.printDinner = function() {
		this.hideView(this.dinnerOverviewView);
		this.updateView(this.fullMenuView);
		this.showView(this.fullMenuView);
		//gå vidare till dinnerPreparation-view.
	}

	this.dishInfo = function() {
		this.hideView();
		//när klickat på en dish, kom till infodish-view.
	}

	this.confirmDish = function() {
		this.hideView(this.dishInfoView);
		this.showView(this.allDishesView);
		//när en valt en rätt, kom tillbaka till selectDish-view
		//lägg till dish i menu (kanske i "vanliga" controllern)
	}

	this.selectedDish = function(id) {
		this.hideView(this.allDishesView);
		this.updateView(this.dishInfoView, id);
		this.showView(this.dishInfoView);
	}
}