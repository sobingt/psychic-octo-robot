define([
    'jquery',
    'underscore',
    'backbone',
	'bootstrap',
    'text!templates/userProfileEdit.html',
	'jquerytags',
	'jqueryknob',
	'jquerynicescroll',
	'jqueryscrollTo',

	'commonscripts'
], function($,_, Backbone, boostrap, UserProfileEditTemplate) {
	
	var UserProfileEditView = Backbone.View.extend({
		
		tagName: 'section',
		className: 'wrapper',
		 
		template: _.template(UserProfileEditTemplate),

		initialize: function() {
			_.bindAll(this, 'render');
		},
		
		events: {
			'click #userProfile': 'goToProfile',
			'click #userChangePassword': 'goToChangePassword'
			
		},
		
		render: function() {
			
			$(this.el).html(this.template(this.model.toJSON()));

			return this;
		},
		
		goToProfile: function() {
			Backbone.history.navigate('profile/' + 2 , { trigger: true });
			return this;
		},
		
		goToChangePassword: function() {
			Backbone.history.navigate('profile/cp/' + 2 , { trigger: true });
			return this;
		},
		
	});

	return UserProfileEditView;

});
