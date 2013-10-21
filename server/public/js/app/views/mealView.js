define([
    'jquery',
    'underscore',
    'backbone',
	'bootstrap',
	'app/views/dinerListView',
    'text!templates/meal.html',
	'jquery-raty'
], function($,_, Backbone, boostrap , DinerListView, MealTemplate) {

	var MealView = Backbone.View.extend({
		tagName: 'section',
		id: 'meal',

		template: MealTemplate,
		
		//dinerView: DinerListView,

		initialize: function() {
			_.bindAll(this, 'render');
			this.model.on('change', this.renderOnBody, this);
		},
		
		setDinerView: function(view) {
            this.dinerView = view;
			return this;
        },
		
		render: function() {
			/*
			var data = this.model.toJSON();
			console.log(data);
			this.$el.append(_.template(MemberTemplate,data));
			*/
		
			var dinerView = new DinerListView();
			
			this.$el.append(_.template(MealTemplate));
			
			this.$el.find('.customers').append(dinerView.render().el);
						
			this.$('[data-use="rating"]').raty({
				readOnly: true,
				score: this.model.get('rating'),
				width: 350,
				starHalf    : 'image/star-half.png',                                // The name of the half star image.
				starOff     : 'image/star-off.png',                                 // Name of the star image off.
				starOn      : 'image/star-on.png'                                   // Name of the star image on.   
			});
			
			
			
			return this;
		},

		
		renderOnBody: function() {
			$('body').append( this.render().el );
		}
	});

	return MealView;

});
