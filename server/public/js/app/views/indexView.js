define([
    'jquery',
    'underscore',
    'backbone',
    'app/helpers/utils',
    'text!templates/login.html'
], function($, _, Backbone, utils, IndexTemplate) {

		var LoginView = Backbone.View.extend({
			el: '#contentwrapper',

			template: _.template(IndexTemplate),

			events: {
				'click #facebook-login-btn': 'facebook_login',
				'click #google-login-btn': 'google_login'
			},

			facebook_login: function(){
				utils.popupCenter('login/facebook',	600, 400, 'Facebook Login');
			},

			google_login: function(){
				utils.popupCenter('login/google', 600, 400, 'Google Login');
			}

		});

		return LoginView;

});