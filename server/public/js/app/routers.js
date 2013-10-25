define([
    'backbone',
    'app/models/loginData',
    'app/models/memberData',
    'app/models/meal',
    'app/views/header',
    'app/views/loginView',
    'app/views/MemberView',
    'app/views/mealView',
    'app/views/mealList'
], function (Backbone,LoginData,MemberData,Meals,HeaderView,LoginView,MemberView, MealView, MealList ) {
    var Router = Backbone.Router.extend({
        initialize: function() {

            
        },

        routes: {
            '': 'login',
			'meal': 'meal',
		  'meals' : 'list',
            'meals/page/:page'  : 'list',
            'meals/add'         : 'addMeal',
            'meals/:id'         : 'mealDetails'
        },

        initialize: function () {
            this.headerView = new HeaderView.View();
            $('.header').html(this.headerView.el);
        },

        login: function () {
        var loginData  = new LoginData();
        var loginView  = new LoginView({ model: loginData });

         $('#content').append( loginView.render().el );
        },
		

		mealDetails: function(id) {
            var meal = new Meals.model({
                _id: id
            });
            
            console.log("meal");
            meal.fetch({success: function(){
                $('#content').html(new MealView({model: meal}).el);
            }});
        },
		
        //////


        list: function(page) {
            console.log("Hello");
            var p = page ? parseInt(page, 10) : 1;
            var mealList = new Meals.collection();
            mealList.fetch({success: function(){
                $("#content").html(new MealList.ListView({model: mealList, page: p}).el);
            }});
            this.headerView.selectMenuItem('home-menu');
        },

    
    addMeal: function() {
        console.log("Hello");
        var meal = new Meals.model();
        $('#content').html(new MealView({model: meal}).el);
        this.headerView.selectMenuItem('add-menu');
    },
    


        /////

    });
    return Router;
});