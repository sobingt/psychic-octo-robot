define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'app/helpers/utils',
    'app/routers',
    'app/models/profile',
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
    Routers,
    Profile,
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
            //"click .save": "saveMeal",
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
            console.log(this.model);
            /*this.model.save(null, {
                success: function (model) {
                    self.render();
                    this.navigate('meals/' + model.id, false);
                    utils.showAlert('Success!', 'Meal saved successfully', 'alert-success');
                },
                error: function () {
                    utils.showAlert('Error', 'An error occurred while trying to delete this item', 'alert-error');
                }
            }); */
        },

        color : function(){
            $(this.el).find("label").css('color','red');

        },

        beforeSave: function () {
            var self = this;
            var check = this.model.validateAll();
            if (check.isValid === false) {
                utils.displayValidationErrors(check.messages);
                console.log(check.messages);
                return false;
            }
            this.saveMeal();
            return false;
        },

        saveMeal: function (e) {
            var self = this;
            e.preventDefault();
            var form_data = JSON.stringify( this.getFormData( this.$el.find('form') ) );
            console.log(form_data);
            this.model.save(null, {
                success: function(model) {
                    //self.render();


                    // TO-DO fix the redirect to the created meal page


                    Routers.navigate('meals/' + model.id, true);
                    console.log('here' + model);
                    ///return false;
                    utils.showAlert('Success!', 'Meal saved successfully', 'alert-success');
                },
                error: function() {
                    utils.showAlert('Error', 'An error occurred while trying to save this item', 'alert-error');     
                }
            });
            //this.collection.add(this.model);
            return false 
            /*this.model.save(null, {
                success: function (model) {
                    self.render();
                    app.navigate('meals/' + model.id, false);
                    utils.showAlert('Success!', 'Meal saved successfully', 'alert-success');
                },
                error: function () {
                    utils.showAlert('Error', 'An error occurred while trying to delete this item', 'alert-error');
                }
            }); */
        },

        getFormData: function(form) {
            var unindexed_array = form.serializeArray();
            var indexed_array = {};
            
            $.map(unindexed_array, function(n, i){
                var temp = n['name'].split('.');
                if ( temp.length > 1) {
                    if (!indexed_array[temp[0]]) {
                        indexed_array[temp[0]] = {};
                        indexed_array[temp[0]][temp[1]] = n['value'];
                    }
                    else {
                        indexed_array[temp[0]][temp[1]] = n['value'];
                    }
                }
                else {
                    indexed_array[n['name']] = n['value'];
                }
            });
            var profile = new Profile();
            profile.fetch({
                success: function(model) {
                    var data = model.toJSON();
                    indexed_array['host'] = {};
                    indexed_array['host']['id'] = data._id;
                    indexed_array['host']['fname'] = data.facebook.first_name;
                    indexed_array['host']['lname'] = data.facebook.last_name;
                    indexed_array['host']['email'] = data.email;
                }
            });
            this.model.set(indexed_array);
            return indexed_array;
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