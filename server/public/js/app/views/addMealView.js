define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'app/helpers/utils',
    'app/views/dinerListView',
    'app/views/reviewListView',
	'app/views/chefView',
    'text!templates/addMealView.html',
    'jqueryraty',
	'jquerystepy',
	'jqueryddslick',
	'datepicker',
	'jquerytags',
	'customcheck'
	], function($,_, Backbone, boostrap, utils, DinerListView, ReviewListView, ChefView, AddMealTemplate) {

var AddMealView = Backbone.View.extend({

    tagName: 'section',
    
    id: 'addmeal',

    className: 'wrapper',

    template: _.template(AddMealTemplate),

    initialize: function () {
        this.render();
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
		console.log("User Add Meal");
        return this;
    },
	
    events: {
        "click .save"   : "beforeSave",
        "submit form"   : "saveMeal",
        "drop #picture" : "dropHandler"
    },
	
	formSubmit: function() {
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

