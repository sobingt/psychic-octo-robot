define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'app/helpers/utils',
    'text!templates/MealListItemView.html'
], function($,_, Backbone, boostrap, utils, MealListItemTemplate) {


var Paginator = Backbone.View.extend({

    className: "pagination pagination-centered",

    initialize:function () {
        this.model.bind("reset", this.render, this);
        this.render();
    },

    render:function () {

        var items = this.model.models;
        var len = items.length;
        var pageCount = Math.ceil(len / 8);

        $(this.el).html('<ul />');

        for (var i=0; i < pageCount; i++) {
            $('ul', this.el).append("<li" + ((i + 1) === this.options.page ? " class='active'" : "") + "><a href='#meals/page/"+(i+1)+"'>" + (i+1) + "</a></li>");
        }

        return this;
    }
});

return{

    View: Paginator
};

});