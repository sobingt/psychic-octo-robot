define([
    'jquery',
    'underscore',
    'backbone',
	'bootstrap',
	//Other user's profile with meals
    'text!templates/userProfileOther.html',
	//User's profile without meals
    //'text!templates/userProfileAdd.html',
	//Other user's profile without meals
    //'text!templates/userProfileNoMeal.html',
	//User's profile with meals
    //'text!templates/userProfile.html',
	'jqueryknob',
	'jquerynicescroll',
	'jqueryscrollTo',
	'jquerytags',
	'commonscripts'
], function($,_, Backbone, boostrap, UserProfileTemplate) {
	
	var UserProfileView = Backbone.View.extend({
		
		tagName: 'section',
		className: 'wrapper',
		 
		template: _.template(UserProfileTemplate),

		initialize: function() {
			_.bindAll(this, 'render');
		},
		
		events: {
			'click #userProfileEdit': 'goToEditProfile',
			'click #userChangePassword': 'goToChangePassword'
		},
		
		render: function() {
				
			 $(this.el).html(this.template(this.model.toJSON()));
			 console.log(this.model.toJSON());
			this.$('#c-slide').on('mouseenter',function() {
                 $(this).carousel({ interval: 1500, cycle: true, pause: 'none' });
			  }).on('mouseleave', function() {
							$(this).carousel('pause');
			  });
			  
			this.$('#meal-carousels').on('mouseenter',function() {
                 $(this).carousel({ interval: 1500, cycle: true, pause: 'none' });
			  }).on('mouseleave', function() {
							$(this).carousel('pause');
			  });
			
			this.$('[data-use="rating"]').raty({
				readOnly: true,
				score: 2.5,
				//score: this.model.get('rating'),
				width: 360,
				size     : 24,
				starHalf    : 'image/star-half-old.png',                                // The name of the half star image.
				starOff     : 'image/star-off-old.png',                                 // Name of the star image off.
				starOn      : 'image/star-on-old.png'                                   // Name of the star image on.   
			});
			
			this.$( ".panel" ).hover(function() {
				$( this ).find('.shadow').css("display","block");
			  }, function() {
			   $( this ).find('.shadow').css("display","none");
			  }
			);
			
			return this;
		},
		
		goToEditProfile: function() {
			Backbone.history.navigate('profile/edit/' + 2 , { trigger: true });
			return this;
		},
				
		goToChangePassword: function() {
			Backbone.history.navigate('profile/cp/' + 2 , { trigger: true });
			return this;
		},
		
	});
		
	return UserProfileView;

});