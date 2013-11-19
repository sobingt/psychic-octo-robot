define([
    'jquery',
    'underscore',
    'backbone',
	'bootstrap',
    'text!templates/chat.html',
	'jquerynicescroll',
	'commonscripts'
], function($,_, Backbone, boostrap, ChatTemplate) {
	
	var ChatView = Backbone.View.extend({
		
		el: "#main-content",
		 
		template: _.template(ChatTemplate),

		initialize: function() {
			this.model.bind('change', this.render, this);
		},
		
	});

	return ChatView;

});
