$(function() {
	//We instantiate our model
	
	var model = new DinnerModel();
	
	//And create the needed controllers and views
	var indexView = new IndexView($("#indexView"), model);
	var dinnerOptionView = new DinnerOptionView($("#dinnerOptionView"), model);
	var allDishesView = new AllDishesView($("#allDishesView"), model);
	var dishInfoView = new DishInfoView($("#dishInfoView"), model);
	var fullMenuView = new FullMenuView($("#fullMenuView"), model);
	var dinnerOverviewView = new DinnerOverviewView($("#dinnerOverviewView"), model);

	var overallController = new OverallController(indexView, dinnerOptionView, allDishesView, dishInfoView, fullMenuView, dinnerOverviewView, model);
	
	var dinnerOptionViewController = new DinnerOptionViewController(dinnerOptionView, model, overallController);
	var fullMenuViewController = new FullMenuViewController(fullMenuView, model, overallController);
	var dinnerOverViewController = new DinnerOverviewViewController(dinnerOverviewView, model, overallController);
	var indexViewController = new IndexViewController(indexView, model, overallController);
	var allDishesViewController = new AllDishesController(allDishesView, model, overallController);
	var dishInfoViewController = new DishInfoViewController(dishInfoView, model, overallController);
});