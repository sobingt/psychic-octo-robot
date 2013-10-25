define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'app/helpers/utils',
    'app/views/paginator',
    'text!templates/MealListItemView.html'
], function($,_, Backbone, boostrap, utils, Paginator, MealListItemTemplate) {

var MealListView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        var meals = this.model.models;
        var len = meals.length;
        var startPos = (this.options.page - 1) * 8;
        var endPos = Math.min(startPos + 8, len);

        $(this.el).html('<ul class="thumbnails"></ul>');

        for (var i = startPos; i < endPos; i++) {
            $('.thumbnails', this.el).append(new MealListItemView({model: meals[i]}).render().el);
        }

        $(this.el).append(new Paginator.View({model: this.model, page: this.options.page}).render().el);

        return this;
    }
});

var MealListItemView = Backbone.View.extend({

    tagName: "li",

    template: _.template(MealListItemTemplate),

    initialize: function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});

return{

	ListView: MealListView,
	ListItemView: MealListItemView
};

});