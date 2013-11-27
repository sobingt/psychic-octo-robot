define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'app/helpers/utils',
	'app/models/payment',
	'text!templates/payment.html',
    'jqueryraty'
], function ($, 
            _, 
            Backbone, 
            boostrap, 
            utils, 
			Payment,
			PaymentTemplate) {

    var PaymentView = Backbone.View.extend({

        el: "#main-content",

        //template: _.template(MealEditTemplate),
        template: _.template(PaymentTemplate),

        initialize: function () {
			console.log("inside paymentview");
            this.model.bind('change', this.render, this);
        },

        //add model to template
        serialize: function() {
                return this.model.toJSON();
        },
		
		events: {
            "click #cancel": "cancelMeal",
			"click #confirm":"confirmMeal"
        },
		
		cancelMeal:function(){
		
		},
		
		confirmMeal:function(){
			
		}
		
		});
		
		return PaymentView;
		
	});