define([
    'backbone',
    'app/models/loginData',
    'app/models/memberData',
    'app/views/loginView',
    'app/views/MemberView',
    'app/views/MealView',
    'app/views/dinerView'
], function (Backbone,LoginData,MemberData,LoginView,MemberView, MealView, DinerView) {
    var Router = Backbone.Router.extend({
        initialize: function() {

            
        },

        routes: {
            '': 'login',
			'meal': 'meal',
			'meal/:id': 'diner'
        },

        login: function () {
        var loginData  = new LoginData();
        var loginView  = new LoginView({ model: loginData });

         $('body').append( loginView.render().el );
        },
		
		meal: function () {
		var member = new MemberData(); 
		var mealView  = new MealView({model: member});
	//	var dinerListView  = new DinerListView();
	//	mealView.setDinerView(dinerListView);
		//member.fetch();       
		$('body').html(mealView.render().el );
        },
		
		diner: function () {
		
			var diner = new DinerView();
			$('body').html(diner.render().el );			
		
		}

    });
    return Router;
});