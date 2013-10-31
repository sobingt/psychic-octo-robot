define([
    'jquery',
    'underscore',
    'backbone',
	'app/models/meal',
	'app/views/mealList',
	'text!templates/member.html'

], function($, _, Backbone, Meals, MealList, MemberTemplate) {

	var MemberView = Backbone.View.extend({
		tagName: 'section',
		id: 'member',
		className: 'container',

		template: MemberTemplate,

		initialize: function() {
			_.bindAll(this, 'render');
			this.model.on('change', this.renderOnBody, this);
		},

		render: function() {
			var data = this.model.toJSON();
			var mealList = new Meals.collection();
			var mealListView = new MealList.ListView({model: mealList});
			console.log(data);
			this.$el.append(_.template(MemberTemplate,data));
			console.log(this.$el.html);
			this.$el.find('.host-meals').append(mealListView.render().el);
						
			this.$('[data-use="rating"]').raty({
				readOnly: true,
				score: 2.5,
				//score: this.model.get('rating'),
				//width:,
				//size     : 24,
				starHalf    : 'image/star-half-old.png',                                // The name of the half star image.
				starOff     : 'image/star-off-old.png',                                 // Name of the star image off.
				starOn      : 'image/star-on-old.png'                                   // Name of the star image on.   
			});
			
			return this;
		},

		renderOnBody: function() {
			$('body').append( this.render().el );
		}
	});

	return MemberView;

});
