define([
    'jquery',
    'underscore',
    'backbone',
    'app/models/memberData',
    'app/views/MemberView',
    'text!templates/login.html'
], function($, _, Backbone, MemberData, MemberView, LoginTemplate) {

	var LoginView = Backbone.View.extend({
		tagName: 'section',
		className: 'container',
		id: 'login',

		template: LoginTemplate,

		events: function() {
			return {
				'click #signin': 'signIn'
			}
		},

		initialize: function() {
			_.bindAll(this, 'render', 'signIn', 'loginFailed', 'loginSuccess');

			this.model.on('invalid', this.loginFailed, this);
		},

		render: function() {
			this.$el.append( this.template );
			return this;
		},

		signIn: function(e) {
			e.preventDefault();

			var self = this;

			var data = {
				email: this.$('input[name=email]').val(),
				pass: this.$('input[name=pass]').val()
			};

			var options = {
				success: function () {
					self.loginSuccess();
				},

				error: function (model) {
					self.loginFailed(model, 'Incorrect email or password.');
				}
			};

			this.model.save(data, options);
		},

		loginFailed: function(model, error) {
			this.$el.addClass('has-error');
			this.$('.control-label').text(error);
		},

		loginSuccess: function() {
			var self = this;

			this.$el.addClass('has-success');
			this.$('.control-label').text('Login success!');

			_.delay(function() {
				self.$el.hide();
				//FIXME GET memberdata
				///app.memberData.fetch();
				var memberData = new MemberData();
				memberData.fetch();
				console.log("The");
				console.log(memberData);
				var memberView = new MemberView({ model: memberData });


			}, 1000);
		}
	});

	return LoginView;

});