define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'app/helpers/utils',
    'app/views/reviewListView',
    'app/views/chefView',
    'text!templates/addMealView.html',
    'jqueryraty',
    'jquerystepy',
    'jqueryddslick',
    'datepicker',
    'jquerytags',
    'customcheck'
], function ($,
    _,
    Backbone,
    boostrap,
    utils,
    ReviewListView,
    ChefView,
    AddMealTemplate) {

    var AddMealView = Backbone.View.extend({

        el: '#main-content',

        template: _.template(AddMealTemplate),

        initialize: function () {
            this.render();
        },

        events: {
            "click .save": "beforeSave",
            "submit form": "saveMeal",
            "drop #picture": "dropHandler"
        },

        initialize: function() {
            this.model.bind('change', this.render, this);
        },

        serialize: function() {
                return this.model.toJSON();
        },

        formSubmit: function () {
            var self = this;
            console.log('before save');
            this.model.save(null, {
                success: function (model) {
                    self.render();
                    app.navigate('meals/' + model.id, false);
                    utils.showAlert('Success!', 'Meal saved successfully', 'alert-success');
                },
                error: function () {
                    utils.showAlert('Error', 'An error occurred while trying to delete this item', 'alert-error');
                }
            });
        },

        beforeSave: function () {
            var self = this;
            var check = this.model.validateAll();
            if (check.isValid === false) {
                utils.displayValidationErrors(check.messages);
                alert("ERROR");
                console.log(check.messages);
                return false;
            }
            this.saveMeal();
            return false;
        },

        saveMeal: function () {
            var self = this;
            console.log('before save');
            this.model.save(null, {
                success: function (model) {
                    self.render();
                    app.navigate('meals/' + model.id, false);
                    utils.showAlert('Success!', 'Meal saved successfully', 'alert-success');
                },
                error: function () {
                    utils.showAlert('Error', 'An error occurred while trying to delete this item', 'alert-error');
                }
            });
        },


        dropHandler: function (event) {
            event.stopPropagation();
            event.preventDefault();
            var e = event.originalEvent;
            e.dataTransfer.dropEffect = 'copy';
            this.pictureFile = e.dataTransfer.files[0];

            // Read the image file from the local file system and display it in the img tag
            var reader = new FileReader();
            reader.onloadend = function () {
                $('#picture').attr('src', reader.result);
            };
            reader.readAsDataURL(this.pictureFile);
        }

    });

    return AddMealView;

});