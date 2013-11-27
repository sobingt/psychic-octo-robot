define([
	'backbone',
	'bootstrap',
	'app/helpers/config'
], function(Backbone) {

        var Profile = Backbone.Model.extend({
            urlRoot: '/me'
			
        });

        return Profile;

});
