define([
    'jquery',
    'underscore',
    'backbone',
	'bootstrap',
    'text!templates/diner.html',
	'jquery-raty'
], function($,_, Backbone, boostrap, DinerTemplate) {
	
	var DinerView = Backbone.View.extend({
		
		//tagName: 'div',
		 
		template: DinerTemplate,

		initialize: function() {
			_.bindAll(this, 'render');
		},
		
				
		render: function() {
			
			this.$el.append(_.template(DinerTemplate));
						
			return this;
		},
		
		
	});

	return DinerView;

});
