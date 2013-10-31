define([
    'jquery',
    'underscore',
    'backbone',
	'bootstrap',
    'text!templates/reviewlist.html',
	'app/views/reviewView',
	'jqueryraty'
], function($,_, Backbone, boostrap, ReviewListTemplate, ReviewView) {


	var ReviewListView = Backbone.View.extend({

		
		
		render: function() {
			var reviewView = new ReviewView();
			
			this.$el.append(_.template(ReviewListTemplate));
			
			this.$el.find('.reviews').append(reviewView.render().el);
			
						
			return this;
		},
		
		
		

		
		/*
		render: function() {
			this.collection.each(function() {
				var reviewListView = new ReviewListView();
				this.$el.append(reviewListView.render().el);
			}, this);
		*/
	});
	
	return ReviewListView;
	
});