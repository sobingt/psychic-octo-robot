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
    'app/views/userProfileView',
    'app/views/userProfileEditView',
    'app/views/changePasswordView',
    'app/views/chatView',
	'jquerytagsinput'
], function (Backbone,
			LoginData,
			MemberData,
			Meals,
			HeaderView,
			LoginView,
			MemberView,
			MealView,
			MealList,
			UsersList,
			Users,
			UserView,
			UserProfileView,
			UserProfileEditView,
			ChangePasswordView,
			ChatView
			) 
	{
    var Router = Backbone.Router.extend({
        routes: {
            ''					: 'login',
			'profile/:id'		: 'profile',
			'profile/edit/:id'	: 'profileEdit',
			'profile/cp/:id'	: 'changePassword',
			'chat/:id'			: 'chat',
			'users'             : 'userList',
            'users/:id'         : 'userDetails',
			'meal'				: 'meal',
			'meals' 			: 'list',
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

         $('#main-content').html( loginView.render().el );
        },
		
		profile: function(id) {
			var member = new MemberData({
				id: id
			});
			
			//var profileView = new UserProfileView();
			var profileView = new UserProfileView({model: member});
			//console.log("member");
			//console.log(member);
			//console.log(new UserProfileView({model: member}).el);
			$('#main-content').html( profileView.render().el );
			$(".tagsinput").tagsInput({
			'interactive':false,
			'onAddTag' : function(){ return false;}
			});
			$('.tagsinput').find('a').remove();
			//('#main-content').html(new UserProfileView({model: member}).el);
		},
		
		profileEdit: function(id) {
			var member = new MemberData({
				id: id
			});
			
			var profileEditView = new UserProfileEditView({model: member});
			$('#main-content').html( profileEditView.render().el );
			$(".tagsinput").tagsInput();

			//('#main-content').html(new UserProfileView({model: member}).el);
		},
		
		changePassword: function(id) {
			var member = new MemberData({
				id: id
			});
			
			var changePasswordView = new ChangePasswordView({model: member});
			$('#main-content').html( changePasswordView.render().el );
			//('#main-content').html(new UserProfileView({model: member}).el);
		},
		
		chat: function(id) {
			var member = new MemberData({
				id: id
			});
			
			var chatView = new ChatView({model: member});
			$('#main-content').html( chatView.render().el );
			//('#main-content').html(new UserProfileView({model: member}).el);
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



        register: function() {
            var register = new RegisterData();
            var registerView = new RegisterView({model: register});
        }
    });
    return Router;
});