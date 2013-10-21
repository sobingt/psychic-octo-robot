define([
    'backbone',
    'app/models/loginData',
    'app/models/memberData',
    'app/views/loginView',
    'app/views/MemberView'
], function (Backbone,LoginData,MemberData,LoginView,MemberView) {
    var Router = Backbone.Router.extend({
        initialize: function() {

            
        },

        routes: {
            '': 'login'
        },

        login: function () {
        var loginData  = new LoginData();
        var loginView  = new LoginView({ model: loginData });

         $('body').append( loginView.render().el );
        }

    });
    return Router;
});