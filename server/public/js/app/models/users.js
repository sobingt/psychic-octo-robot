define([
	'backbone',
	'bootstrap',
	'app/helpers/config'
], function(Backbone, config) {

        var Users = Backbone.Model.extend({

            urlRoot: "/users",

            idAttribute: "_id",

            initialize: function () {
                this.validators = {};
            },

            defaults: {
                _id: null,
                name: "",
                fname: "",
                lname: "",
                email: "",
                password: "",
                bio: "",
                phone: "",
                picture: "",
                location: {
                    id: 1,
                    latitude: "",
                    longitude: "",
                    street_address: "",
                    area: "",
                    city: "",
                    state: "",
                    country: "",
                    pincode: ""
                },
                is_active: "",
                facebook_id: "",
                role: "",
                language: [
                    {
                        value: ""
                    }
                ],
                hobbies: [
                    {
                        value: ""
                    }
                ],
            },

        });


        var UsersCollection = Backbone.Collection.extend({

            //model: Users,

            url: "/users"
        });

        return {
                model: Users,
                collection: UsersCollection
        };

});
