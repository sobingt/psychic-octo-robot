define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'modernizr',
    'app/helpers/utils',
    'text!templates/header.html',
], function($,_, Backbone, boostrap, Modernizr, utils, HeaderTemplate) {


var HeaderView = Backbone.View.extend({

            el: '#header',

            template: _.template(HeaderTemplate),

            events: {
                'click #logout-btn' : 'logout'
            },

            initialize: function() {
                this.model.bind('change', this.render, this);
            },

            serialize: function() {
                return this.model.toJSON();
            },

            logout: function() {
                $.ajax('logout').done(function(data){
                    window.location.hash = 'index';
                });
            },

            selectMenuItem: function (menuItem) {
                $('.nav li').removeClass('active');
                if (menuItem) {
                    $('.' + menuItem).addClass('active');
                }
            }  


});

return{

    View: HeaderView
};


});