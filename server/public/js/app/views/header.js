define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'app/helpers/utils',
    'text!templates/header.html',
], function($,_, Backbone, boostrap, utils, HeaderTemplate) {


var HeaderView = Backbone.View.extend({

    template: _.template(HeaderTemplate),

    initialize: function () {
        this.render();
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
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
