define([
	'backbone',
	'bootstrap',
	'app/helpers/config'
], function(Backbone, config) {

	var Meal = Backbone.Model.extend({
		url: '/get/meal/mumbai',

		defaults: function() {
			return {
                name: '',
                description: '',
                picture: '',
                cost: '',
                max_allowed: '',
                menu: '',
                tags: '',
                advance_lead_time: '',
                street_address: '',
                area: '',
                city: '',
                state: '',
                country: '',
                pincode: ''
			}
		}
	});

	return Meal;

});

