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
    'app/views/usersList',
    'app/models/users',
    'app/views/userView',
    'app/views/userProfileView'
], function (Backbone,LoginData,MemberData,Meals,HeaderView,LoginView,MemberView, MealView, MealList, UsersList, Users, UserView, UserProfileView) {
    var Router = Backbone.Router.extend({
        routes: {
            ''                   : 'login',
            'profile/:id'        : 'profile',
            'users'              : 'userList',
            'users/:id'          : 'userDetails',
			'meal'               : 'meal',
		    'meals'              : 'list',
            'meals/page/:page'   : 'list',
            'meals/add'          : 'addMeal',
            'meals/:id'          : 'mealDetails',
            'register'           : 'register',
            'me/:id'             : 'profile',
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
		
        userDetails: function(id) {
            var user = new Users.model({_id: id});
            user.fetch({success: function(){
                $('#content').html(new UserView({model: user}).el);
            }});
          //  user.fetch({success: function(){
            //}});
        },

        list: function(page) {
            var p = page ? parseInt(page, 5) : 1;
            var mealList = new Meals.collection();
            mealList.fetch({success: function(){
                $("#main-content").html(new MealList.ListView({model: mealList, page: p}).el);
            }});
            this.headerView.selectMenuItem('home-menu');
        },

        userList: function(){
            var usersList = new UsersList();
            $("#content").html(usersList.render());
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
        },

		diner: function () {		
			var diner = new DinerView();
			$('body').html(diner.render().el );			
		},

        profile: function(id) { 
            var profile = new MemberData({id: id}); 
            var profileView = new ProfileView({model: profile});
            $('body').html(profileView.render()); 
        },

        register: function() {
            var register = new RegisterData();
            var registerView = new RegisterView({model: register});
        }
    });
    return Router;
});