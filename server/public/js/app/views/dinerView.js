define([
    'jquery',
    'underscore',
    'backbone',
	'bootstrap',
    'text!templates/diner.html',
	'jqueryraty'
], function($,_, Backbone, boostrap, DinerTemplate) {
	
	var DinerView = Backbone.View.extend({
		
		//tagName: 'div',
		 
		template: DinerTemplate,

		initialize: function() {
			_.bindAll(this, 'render');
		},
		
		events: {
			'click a': 'goToDetails'
		},
				
		render: function() {
			
			this.$el.append(_.template(DinerTemplate));
						
			return this;
		},
		
		goToDetails: function() {
			Backbone.history.navigate('meal/' + 1 , { trigger: true });
			return this;
		},
		
	});

	return DinerView;

});
