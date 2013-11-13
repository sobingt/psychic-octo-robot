define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'app/helpers/utils',
    'app/models/users',
    'text!templates/userView.html'
], function($,_, Backbone, boostrap, utils, Users, UserTemplate) {

var UserView = Backbone.View.extend({

    tagName: 'section',
    
    id: 'user',

    className: 'container',

    template: _.template(UserTemplate),

    initialize: function () {
        this.render();
    },

    events: {
        "click .submit"   : "saveUser",
    },

    saveUser: function () {
        var self = this;
        console.log("save");        console.log(this.model);
        this.model.save(null, {
            success: function (model) {
                console.log(model);
                //self.render();
                //app.navigate('users', true);
                //utils.showAlert('Success!', 'User saved successfully', 'alert-success');
            },
            error: function () {
                utils.showAlert('Error', 'An error occurred while trying to save this item', 'alert-error');
            }
        });
    },


    render: function () {
        var template = _.template(UserTemplate, {user: this.model.toJSON()});
        this.$el.html(template);
        //$(this.el).html(this.template(this.model.toJSON()));
        //return this;
    }
});

    return UserView;

});


