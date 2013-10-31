define([
    'backbone',
    'app/models/loginData',
    'app/models/memberData',
    'app/models/meal',
    'app/views/header',
    'app/views/loginView',
    'app/views/MemberView',
    'app/views/mealView',
    'app/views/mealList',
    'app/views/userProfileView'
], function (Backbone,LoginData,MemberData,Meals,HeaderView,LoginView,MemberView, MealView, MealList, UserProfileView ) {
    var Router = Backbone.Router.extend({
        initialize: function() {

            
        },

        routes: {
            '': 'login',
			'profile/:id': 'profile',
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

         $('#main-content').append( loginView.render().el );
        },
		
		profile: function(id) {
			var profileView = new UserProfileView();
			
			$('#main-content').append( profileView.render().el );
		},
		
        list: function(page) {
            var p = page ? parseInt(page, 5) : 1;
            var mealList = new Meals.collection();
            mealList.fetch({success: function(){
                $("#main-content").html(new MealList.ListView({model: mealList, page: p}).el);
            }});
            this.headerView.selectMenuItem('home-menu');
        },

    
		addMeal: function() {
			console.log("Hello");
			var meal = new Meals.model();
			$('#main-content').html(new MealView({model: meal}).el);
			this.headerView.selectMenuItem('add-menu');
		},
		
		mealDetails: function(id) {
            var meal = new Meals.model({
                _id: id
            });
            
            console.log("meal");
            meal.fetch({success: function(){
                $('#main-content').html(new MealView({model: meal}).el);
            }});
        }

    });
    return Router;
});