define([
    'backbone',
    'app/routers',
    'app/models/loginData',
    'app/models/memberData',
    'app/views/loginView',
    'app/views/MemberView'
], function (Backbone, Router, LoginData,MemberData,LoginView,MemberView) {

	var app;
	window.app = app || {};

	var app.model = app.model || {},
	app.store = app.store || {},

	app.view = app.view || {},
	app.jst  = app.jst || {},
	app.ui   = app.ui || {};

	app.root = $('body');

	function initialize() {
    var app = new Router();
    app.store.loginData  = new LoginData();
	app.store.memberData = new MemberData();

	app.ui.loginView  = new LoginView({ model: app.store.loginData });
	app.ui.memberView = new MemberView({ model: app.store.memberData });

	app.root.append( app.ui.loginView.render().el );
    Backbone.history.start();
 	}
/*
	$(window).on('load', function() {
		app.store.loginData  = new app.model.LoginData();
		app.store.memberData = new app.model.MemberData();

		app.ui.loginView  = new app.view.LoginView({ model: app.store.loginData });
		app.ui.memberView = new app.view.MemberView({ model: app.store.memberData });

		app.root.append( app.ui.loginView.render().el );
	});
*/
	return {
    initialize: initialize,
    App : app
  	};

});
