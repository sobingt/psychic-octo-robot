define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'app/helpers/utils',
    'app/views/paginator',
    'text!templates/MealListItemView.html',
	'script',
	'jqueryraty'
], function($,_, Backbone, boostrap, utils, Paginator, MealListItemTemplate) {

var MealListView = Backbone.View.extend({

    el: "#main-content",

    initialize: function () {
        this.render();
    },

    render: function () {
        var meals = this.model.models;
        var len = meals.length;
        var startPos = (this.options.page - 1) * 8;
        var endPos = Math.min(startPos + 8, len);
        $(this.el).html('<div class="col-md-1"></div><div class="col-md-10"><div class="thumbnails"></div></div><div class="col-md-1"></div>');

        $('.thumbnails', this.el).append('<div class="row row0"></div>');
        var rowValue= 0;
        for (var i = startPos; i < endPos; i++) {
            $('.row'+rowValue, this.el).append(new MealListItemView({model: meals[i]}).render().el);
            if((i+1)%3==0)
            {
                rowValue++;
                $('.thumbnails', this.el).append('<br><div class="row row'+rowValue+'"></div>');
            }
        }

        $('.col-md-10', this.el).append(new Paginator.View({model: this.model, page: this.options.page}).render().el);

        return this;
    }
});

var MealListItemView = Backbone.View.extend({

    tagName: "div",

    className: "dish col-md-4",

    template: _.template(MealListItemTemplate),

    initialize: function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
		
		this.$('.meal-carousels').on('mouseenter',function() {
                 $(this).carousel({ interval: 1000, cycle: true, pause: 'none' });
		  }).on('mouseleave', function() {
						$(this).carousel('pause'); 
		  });
		
		this.$('[data-use="rating"]').raty({
			readOnly: true,
			score: 2.5,
			//score: this.model.get('rating'),
			width: 360,
			size     : 24,
			starHalf    : 'image/star_half.gif',                                // The name of the half star image.
			starOff     : 'image/star_off.gif',                                 // Name of the star image off.
			starOn      : 'image/star_full.gif'                                   // Name of the star image on.   
		});

        return this;
    }

});

return{

	ListView: MealListView,
	ListItemView: MealListItemView
};

});