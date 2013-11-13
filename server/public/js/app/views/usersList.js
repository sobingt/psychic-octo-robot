define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'app/helpers/utils',
    'app/models/users',
    //'app/views/paginator',
    'text!templates/UserListItemView.html'
], function($,_, Backbone, boostrap, utils, Users,  UserListTemplate) {

var UsersList = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    el: '#content',

    //template: _.template(UserListTemplate),


    render: function () {
        var users = new Users.collection(users);
        //var len = users.length;
        //var startPos = (this.options.page - 1) * 8;
        //var endPos = Math.min(startPos + 8, len);
        var that = this;
        users.fetch({
            success: function(){
                var template = _.template(UserListTemplate, {users: users.models});
                that.$el.html(template);
            }
        });
        //$(this.el).html(this.template(this.model.toJSON().el));
        //$('.thumbnails', this.el).append(new UserListItemView({model: users[i]}).render().el);
        //console.log(this.model.el);

        //$(this.el).append(new Paginator.View({model: this.model, page: this.options.page}).render().el);

        return this;
    }
});

/*var UserListItemView = Backbone.View.extend({

    tagName: "td",

    template: _.template(UserListTemplate),

    initialize: function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});*/

return UsersList;
	//ListItemView: UserListItemView

});