define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'app/helpers/utils',
    'app/views/reviewListView',
    'app/views/chefView',
    'text!templates/mealView.html',
    'text!templates/meal.html',
    'jqueryraty'
], function ($, 
            _, 
            Backbone, 
            boostrap, 
            utils, 
            ReviewListView, 
            ChefView, 
            MealEditTemplate, 
            MealTemplate) {

    var MealView = Backbone.View.extend({

        el: "#main-content",

        //template: _.template(MealEditTemplate),
        template: _.template(MealTemplate),

        initialize: function () {
            this.model.bind('change', this.render, this);
        },

        //add model to template
        serialize: function() {
                return this.model.toJSON();
        },
/*
        render: function () {
            var reviewListView = new ReviewListView();

            var chefView = new ChefView();

            //this.$el.append(_.template(MealTemplate));

            this.$el.find('.host-stats').append(chefView.render().el);

            this.$el.find('.review-section').append(reviewListView.render().el);

            this.$('.art-pop').tooltip({
                container: 'body',
                placement: 'left'
            });

            this.$('[data-use="rating"]').raty({
                readOnly: true,
                score: 2.5,
                //score: this.model.get('rating'),
                width: 360,
                size: 24,
                starHalf: 'image/star_orange_half.gif', // The name of the half star image.
                starOff: 'image/star_off.gif', // Name of the star image off.
                starOn: 'image/star_orange_full.gif' // Name of the star image on.   
            });

            return this;
        },
*/
        events: {
            "change": "change",
            "click .save": "beforeSave",
            "click .delete": "deleteMeal",
            "drop #picture": "dropHandler"
        },

        change: function (event) {
            // Remove any existing alert message
            utils.hideAlert();

            // Apply the change to the model
            var target = event.target;
            var change = {};
            change[target.name] = target.value;
            this.model.set(change);

            // Run validation rule (if any) on changed item
            var check = this.model.validateItem(target.id);
            if (check.isValid === false) {
                utils.addValidationError(target.id, check.message);
            } else {
                utils.removeValidationError(target.id);
            }
        },

        beforeSave: function () {
            var self = this;
            var check = this.model.validateAll();
            if (check.isValid === false) {
                utils.displayValidationErrors(check.messages);
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

        deleteMeal: function () {
            this.model.destroy({
                success: function () {
                    alert('Meal deleted successfully');
                    //TODO: Just push back to the history
                    window.history.back();
                }
            });
            return false;
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

    return MealView;

});