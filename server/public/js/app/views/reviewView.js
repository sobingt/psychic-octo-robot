define([
    'jquery',
    'underscore',
    'backbone',
	'bootstrap',
    'text!templates/review.html',
	'jqueryraty'
], function($,_, Backbone, boostrap, ReviewTemplate) {
	
	var ReviewView = Backbone.View.extend({
		
		//tagName: 'div',
		 
		template: ReviewTemplate,

		initialize: function() {
			_.bindAll(this, 'render');
		},
		
				
		render: function() {
			
			this.$el.append(_.template(ReviewTemplate));
						
			return this;
		},
		
		
	});

	return ReviewView;

});