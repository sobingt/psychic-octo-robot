define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/meal.html'
], function($, _, Backbone, MealTemplate) {

	var MealView = Backbone.View.extend({
		tagName: 'section',
		id: 'meal',

		template: MealTemplate,

		initialize: function() {
			_.bindAll(this, 'render');
			this.model.on('change', this.renderOnBody, this);
		},

		render: function() {
			var data = this.model.toJSON();
			console.log(data);
			this.$el.append(_.template(MealTemplate,data));
			return this;
		},

		renderOnBody: function() {
			$('body').append( this.render().el );
		}
	});

	return MealView;

});
