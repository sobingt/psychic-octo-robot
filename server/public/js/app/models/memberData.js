define([
	'backbone',
	'bootstrap',
	'app/helpers/config'
], function(Backbone, config) {

	var MemberData = Backbone.Model.extend({
		urlRoot: '/me',

		defaults: function() {
			return {
				name: '',
				profile_picture: '',
				updated_time: '',
				verified: true,
				locale: '',
				timezone: ,
				email: '',
				gender: '',
				bio: '',
				username: '',
				link: '',
				last_name: '',
				middle_name: '',
				first_name: '',
				id: ''
			}
		}
	});

	return MemberData;

});
