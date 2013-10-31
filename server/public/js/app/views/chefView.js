define([
    'jquery',
    'underscore',
    'backbone',
	'bootstrap',
    'text!templates/chef.html',
	'jqueryraty'
], function($,_, Backbone, boostrap, ChefTemplate) {
	
	var ChefView = Backbone.View.extend({
		
		//tagName: 'div',
		 
		template: ChefTemplate,

		initialize: function() {
			_.bindAll(this, 'render');
		},
		
				
		render: function() {
			
			this.$el.append(_.template(ChefTemplate));
						
			return this;
		},
		
		
	});

	return ChefView;

});