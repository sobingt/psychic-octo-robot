define([
    'jquery',
    'underscore',
    'backbone',
	'bootstrap',
    'text!templates/dinerlist.html',
	'app/views/dinerView',
	'jqueryraty'
], function($,_, Backbone, boostrap, DinerListTemplate, DinerView) {


	var DinerListView = Backbone.View.extend({

		
		
		render: function() {
			var dinerView = new DinerView();
			
			this.$el.append(_.template(DinerListTemplate));
			
			this.$el.find('.diners').append(dinerView.render().el);
			
						
			return this;
		},
		
		
		

		
		/*
		render: function() {
			this.collection.each(function() {
				var dinerListView = new DinerListView();
				this.$el.append(dinerListView.render().el);
			}, this);
		*/
	});
	
	return DinerListView;
	
});

