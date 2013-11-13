define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'app/helpers/utils',
    'text!templates/curd.html',
	], function($,_, Backbone, boostrap, utils,curdTemplate) {
	
	var curdView=Backbone.View.extend({
	
		 tagName: 'section',
    
    id: 'addmeal',

    className: 'wrapper',

    template: _.template(curdTemplate),

    initialize: function () {
        this.render();
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
		console.log("Curd testing");
        return this;
    }
	
	});
	
	return curdView;
	
});