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
		
		tagName: 'section',
		className: 'wrapper',
		 
		template: _.template(ChatTemplate),

		initialize: function() {
			_.bindAll(this, 'render');
		},

		
		render: function() {
			
			$(this.el).html(this.template(this.model.toJSON()));

			this.$("#chat-guest-list").niceScroll({styler:"fb",cursorcolor:"#e8403f", cursorwidth: '4', cursorborderradius: '10px', background: '#404040', cursorborder: ''});
			this.$("#chat-body").niceScroll({styler:"fb",cursorcolor:"#e8403f", cursorwidth: '4', cursorborderradius: '10px', background: '#404040', cursorborder: ''});
			
			return this;
		},
		
		
	});

	return ChatView;

});
