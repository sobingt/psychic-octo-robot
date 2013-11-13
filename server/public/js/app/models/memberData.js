define([
	'backbone',
	'bootstrap',
	'app/helpers/config'
], function(Backbone, config) {

	var MemberData = Backbone.Model.extend({
		url: '/me',

		defaults: function() {
			return {
				name: 'Sobin George Thomas',
				profile_picture: 'https://graph.facebook.com/100000483391087/picture',
				updated_time: '2013-11-04T16:12:37+0000',
				verified: true,
				locale: 'en_US',
				timezone: 5.5,
				email: 'sobingt@gmail.com',
				gender: 'male',
				bio: 'to know abt me you have read this',
				username: 'sobingt',
				link: 'https://www.facebook.com/sobingt',
				last_name: 'Thomas',
				middle_name: 'George',
				first_name: 'Sobin',
				id: '2'
			}
		}
	});

	return MemberData;

});
