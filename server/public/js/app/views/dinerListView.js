define([
    'jquery',
    'underscore',
    'backbone',
	'bootstrap',
    'text!templates/dinerlist.html',
	'jquery-raty'
], function($,_, Backbone, boostrap, DinerListTemplate) {


	var DinerListView = Backbone.View.extend({

		
		events: {
			'click a': 'goToDetails'
		},
		
		render: function() {
			
			this.$el.append(_.template(DinerListTemplate));
						
			return this;
		},
		
		
		goToDetails: function() {
			Backbone.history.navigate('meal/' + 1 , { trigger: true });
			return this;
		}
		

		
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

