define([
    'jquery',
    'underscore',
    'backbone',
	'bootstrap',
    'text!templates/userProfile.html',
	'jqueryknob',
	'jquerynicescroll',
	'jqueryscrollTo',
	'commonscripts'
], function($,_, Backbone, boostrap, UserProfileTemplate) {
	
	var UserProfileView = Backbone.View.extend({
		
		tagName: 'section',
		className: 'wrapper',
		 
		template: UserProfileTemplate,

		initialize: function() {
			_.bindAll(this, 'render');
		},
		
		render: function() {
			
			this.$el.append(_.template(UserProfileTemplate));
			this.$(".knob").knob();			
			return this;
		},
		
	});
		
	return UserProfileView;

});