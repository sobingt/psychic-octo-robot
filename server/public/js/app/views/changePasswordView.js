define([
    'jquery',
    'underscore',
    'backbone',
	'bootstrap',
    'text!templates/changePassword.html',
	'jquerytagsinput',
	'jqueryknob',
	'jquerynicescroll',
	'jqueryscrollTo',

	'commonscripts'
], function($,_, Backbone, boostrap, ChangePasswordTemplate) {
	
	var ChangePasswordView = Backbone.View.extend({
		
		//tagName: 'section',
		//className: 'wrapper',
		 
		template: _.template(ChangePasswordTemplate),

		initialize: function() {
			_.bindAll(this, 'render');
		},
		
		render: function() {
			
			$(this.el).html(this.template(this.model.toJSON()));

			return this;
		},
		
		
	});

	return ChangePasswordView;

});
