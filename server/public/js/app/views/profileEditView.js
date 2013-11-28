define([
    'jquery',
    'underscore',
    'backbone',
	'bootstrap',
	'app/helpers/utils',
    'text!templates/userProfileEdit.html',
	'jquerytags',
	'jqueryknob',
	'jquerynicescroll',
	'jqueryscrollTo',

	'commonscripts'
], function($,_, Backbone, boostrap, utils, UserProfileEditTemplate) {
	
	var ProfileEditView = Backbone.View.extend({
		
		el: '#main-content',
		 
		template: _.template(UserProfileEditTemplate),

		initialize: function() {
			this.model.bind('change', this.render, this);
		},
		
		events: {
			'click #userProfile': 'goToProfile',
			'click #userChangePassword': 'goToChangePassword',
			'submit form': 'saveProfile'
			
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

		saveProfile: function() {
			var self = this;
            //e.preventDefault();
            var form_data = JSON.stringify( this.getFormData( this.$el.find('form') ) );
            this.model.save(null, {
            	success: function(model) {
                    //self.render();


                    // TO-DO fix the redirect to the created meal page


                    Backbone.history.navigate('me', true);
                    console.log('here' + model);
                    ///return false;
                    utils.showAlert('Success!', 'Meal saved successfully', 'alert-success');
                },
                error: function() {
                    utils.showAlert('Error', 'An error occurred while trying to save this item', 'alert-error');     
                }
            });
            //console.log(form_data);
            //this.collection.add(this.model);
            //return false 

		},
		getFormData: function(form) {
            var unindexed_array = form.serializeArray();
            var indexed_array = {};
            $.map(unindexed_array, function(n, i){
                var temp = n['name'].split('.');
                if ( temp.length > 1) {
                    if (!indexed_array[temp[0]]) {
                        indexed_array[temp[0]] = {};
                        indexed_array[temp[0]][temp[1]] = n['value'];
                    }
                    else {
                        indexed_array[temp[0]][temp[1]] = n['value'];
                    }
                }
                else {
                    indexed_array[n['name']] = n['value'];
                }
            });
            var data = this.model.toJSON();
            indexed_array['facebook_id'] = data.facebook.id;
            indexed_array['facebook'] = {};
            indexed_array['facebook'] = data.facebook;
            this.model.set(indexed_array);
            return indexed_array;
            
        }

    });

	return ProfileEditView;

});
