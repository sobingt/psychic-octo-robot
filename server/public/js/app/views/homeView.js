define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'app/helpers/utils',
	'app/views/paginator',
	'text!templates/home.html',
	'script',
    'jqueryraty'
], function ($, 
            _, 
            Backbone, 
            boostrap, 
            utils,
			Paginator,
			HomeTemplate) {

    var HomeView = Backbone.View.extend({

        el: "#main-content",

        template: _.template(HomeTemplate),

		});
	
    return HomeView
});