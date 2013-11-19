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
	
	var ProfileEditView = Backbone.View.extend({
		
		el: '#main-content',
		 
		template: _.template(UserProfileEditTemplate),

		initialize: function() {
			this.model.bind('change', this.render, this);
		},
		
		events: {
			'click #userProfile': 'goToProfile',
			'click #userChangePassword': 'goToChangePassword'
			
		},
		//add model to template
		serialize: function() {
                return this.model.toJSON();
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

	return ProfileEditView;

});
