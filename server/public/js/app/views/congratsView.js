define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'app/helpers/utils',
	'app/models/payment',
	'text!templates/congrats.html',
    'jqueryraty'
], function ($, 
            _, 
            Backbone, 
            boostrap, 
            utils, 
			Payment,
			CongratsTemplate) {

    var CongratsView = Backbone.View.extend({

        el: "#main-content",

        //template: _.template(MealEditTemplate),
        template: _.template(CongratsTemplate),

        initialize: function () {
			console.log("inside congratsView");
			this.render();
            //this.model.bind('change', this.render, this);
        },


		
		});
		
		return CongratsView;
		
	});