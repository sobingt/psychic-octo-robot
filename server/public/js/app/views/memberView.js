define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/member.html'
], function($, _, Backbone, MemberTemplate) {

	var MemberView = Backbone.View.extend({
		tagName: 'section',
		id: 'member',

		template: MemberTemplate,

		initialize: function() {
			_.bindAll(this, 'render');
			this.model.on('change', this.renderOnBody, this);
		},

		render: function() {
			var data = this.model.toJSON();
			console.log(data);
			this.$el.append(_.template(MemberTemplate,data));
			return this;
		},

		renderOnBody: function() {
			$('body').append( this.render().el );
		}
	});

	return MemberView;

});
