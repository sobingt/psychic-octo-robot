define([
	'backbone',
	'bootstrap',
	'app/helpers/config'
], function(Backbone, config) {

        var Payment = Backbone.Model.extend({

            urlRoot: "/payment",
		
		defaults: {
			_id:null,
			status: "Pending"
		}
		
		});
		
		return Payment;
	
	
});