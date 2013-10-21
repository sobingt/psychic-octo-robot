define([
	'backbone',
	'bootstrap',
	'app/helpers/config'
], function(Backbone, config) {

	var MemberData = Backbone.Model.extend({
		url: '/me',

		defaults: function() {
			return {
				name: '',
				uid: '',
				pos: '',
				url: '',
				loc: ''
			}
		}
	});

	return MemberData;

});
