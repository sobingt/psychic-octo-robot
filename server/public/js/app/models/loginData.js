define([
	'backbone',
	'app/helpers/config'
], function(Backbone, config) {

	var LoginData = Backbone.Model.extend({
		url: '/login',

		defaults: function() {
			return {
				email: '',
				pass: '',
				success: false
			}
		},		

		validate: function(attrs) {		
			var regex = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/,
				error = '';

			if ( !attrs.email ) {
				error += ' Email empty.';
			};

			if ( attrs.email && !regex.test(attrs.email) ) {
				error += ' Invalid email.';
			};

			if ( !attrs.pass ) {
				error += ' Password empty.';
			};

			return error;
		},

		loggedUser: function() {
			return this.get('email');
		}
	});

	return LoginData;

});