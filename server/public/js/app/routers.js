define([
'jquery',
'backbone',
'app/models/meal',
'app/models/profile',
'app/models/users',
'app/views/header',
'app/views/loginView',
'app/views/mealView',
'app/views/mealList',
'app/views/profileView',
'app/views/profileEditView',
'app/views/userProfileView',
'app/views/changePasswordView',
'app/views/chatView',
'app/views/addMealView',
'app/views/homeView',
'app/views/congratsView',
'jqueryui',
'jquerytags',
'customcheck',
'jquerytags'

], function ($,
    Backbone,
    Meals,
    Profile,
    Users,
    HeaderView,
    LoginView,
    MealView,
    MealList,
    ProfileView,
    ProfileEditView,
    UserProfileView,
    ChangePasswordView,
    ChatView,
    AddMealView,
	HomeView,
	CongratsView
    ) {
        Backbone.Layout.configure({
            manage: true
        });

        var Router = Backbone.Router.extend({

            currentView: null,

            socketEvents: _.extend({}, Backbone.Events),

            routes: 
            {
                '': 'meProfile',
                'home': 'home',
                'index': 'login',
                'me': 'meProfile',
                'me/edit': 'meProfileEdit',
                'profile/:id': 'profile',
                'chat/:id': 'chat',
                'meals': 'meallist',
                'meals/page/:page': 'meallist',
                'meal/add': 'addMeal',
                'meal/:id': 'singleMeal',
				'congrats':'congrats'
            },
        // Function that loads the views, clearing the view of past events.
        changeView: function (view) {
            if (null != this.currentView) {
                this.currentView.$el.fadeOut();
                this.currentView.undelegateEvents();
            }

            this.currentView = view;
            this.currentView.render();
            this.currentView.$el.hide().fadeIn();
        },

        home: function () {
            var profile = new Profile();
            var headerView = new HeaderView.View({
                model: profile
            });
            profile.fetch();
			
			var homeView=new HomeView();
			this.changeView(homeView);

        },

        login: function () {
            this.changeView(new LoginView());
        },

        profile: function (id) {
            var profile = new Profile();
            var headerView = new HeaderView.View({
                model: profile
            });
            profile.fetch();

            var users = new Users.model({
                id: id
            });
            var profileView = new UserProfileView({
                model: users
            });
            users.fetch();
            //profileView.taginput();
            profileView.$el.find('.tagsinput').tagsInput({
                'interactive': false,
                'onAddTag': function () {
                    return false;
                }
            });

            $('#meal-carousels').on('mouseenter', function () {
                $(this).carousel({
                    interval: 1500,
                    cycle: true,
                    pause: 'none'
                });
            }).on('mouseleave', function () {
                $(this).carousel('pause');
            });

            $('[data-use="rating"]').raty({
                readOnly: true,
                score: 2.5,
                //score: this.model.get('rating'),
                width: 360,
                size: 24,
                starHalf: 'image/star-half-old.png', // The name of the half star image.
                starOff: 'image/star-off-old.png', // Name of the star image off.
                starOn: 'image/star-on-old.png' // Name of the star image on.   
            });

            $(".panel").hover(function () {
                $(this).find('.shadow').css("display", "block");
            }, function () {
                $(this).find('.shadow').css("display", "none");
            });

        },

        meProfile: function () {
            var profile = new Profile();
            var headerView = new HeaderView.View({
                model: profile
            });

            var profileView = new ProfileView({
                model: profile
            });
            profile.fetch();
            profileView.$el.find('.tagsinput').tagsInput({
                'interactive': false,
                'onAddTag': function () {
                    return false;
                }
            });

            $('#meal-carousels').on('mouseenter', function () {
                $(this).carousel({
                    interval: 1500,
                    cycle: true,
                    pause: 'none'
                });
            }).on('mouseleave', function () {
                $(this).carousel('pause');
            });

            $('[data-use="rating"]').raty({
                readOnly: true,
                score: 2.5,
                //score: this.model.get('rating'),
                width: 360,
                size: 24,
                starHalf: 'image/star-half-old.png', // The name of the half star image.
                starOff: 'image/star-off-old.png', // Name of the star image off.
                starOn: 'image/star-on-old.png' // Name of the star image on.   
            });

            $(".panel").hover(function () {
                $(this).find('.shadow').css("display", "block");
            }, function () {
                $(this).find('.shadow').css("display", "none");
            });

        },

        meProfileEdit: function (id) {
            var profile = new Profile();
            var headerView = new HeaderView.View({
                model: profile
            });
            var profileEditView = new ProfileEditView({
                model: profile
            });
            profile.fetch();
        },

        chat: function (id) {
            var profile = new Profile();
            var headerView = new HeaderView.View({
                model: profile
            });
            profile.fetch();
            var chatView = new ChatView({
                model: profile
            });
            $("#chat-guest-list").niceScroll({styler:"fb",cursorcolor:"#e8403f", cursorwidth: '4', cursorborderradius: '10px', background: '#404040', cursorborder: ''});
            $("#chat-body").niceScroll({styler:"fb",cursorcolor:"#e8403f", cursorwidth: '4', cursorborderradius: '10px', background: '#404040', cursorborder: ''});
        },

        meallist: function(page) {
            var p = page ? parseInt(page, 5) : 1;
            var mealList = new Meals.collection();
            var meallistView = new MealList.ListView({model: mealList, page: p});
            
        },
		
		congrats:function(){
			var profile = new Profile();
            var headerView = new HeaderView.View({
                    model: profile
            });
			profile.fetch();
			var congratsView=new CongratsView();
			
		},

        singleMeal: function (id) {
            var profile = new Profile();
            var headerView = new HeaderView.View({
                    model: profile
            });
            profile.fetch();
            var meal = new Meals.model({
                _id: id
            });
            var mealView = new MealView({
                model: meal
            });
            meal.fetch({
                success: function () {
                    function initialize() {
                        var latLong = new google.maps.LatLng(meal.attributes.address.latitude, meal.attributes.address.longitude);
                        var mapOptions = {
                            zoom: 15,
                            center: latLong,
                            mapTypeId: google.maps.MapTypeId.ROADMAP
                        }
                        var map = new google.maps.Map(document.getElementById('meal-map'), mapOptions);
                        var marker = new google.maps.Marker({
                            map: map,
                            draggable: false,
                            position: latLong
                        });
                    }
                    google.maps.event.addDomListener(window, "load", initialize);
                }
            });
               

        },

        addMeal: function () {
            var profile = new Profile();
            var headerView = new HeaderView.View({
                model: profile
            });
            profile.fetch();

            var meal = new Meals.model({
                _id: null
            });
            var addMealView = new AddMealView({
                model: meal
            });
            this.changeView(addMealView);

            var lat;
            var lon;
            addMealView.$el.find('#createmeal').stepy({
                backLabel: 'Previous',
                block: true,
                nextLabel: 'Next',
                titleTarget: '.stepy-tab',
                duration: 300,
                transition: 'fade',

                finish: function () {
                    //alert('Canceling...');
                    var pricePerGuests = $('#priceperguest').val();
                    var currency = $('#currency').val();
                    if ((pricePerGuests === 0) || (pricePerGuests === "")) {
                        $('#errordiv3').append("<p>Price is required!!!</p>");
                        return false;
                    } else if ((currency === "") || (currency === "Choose")) {
                        $('#errordiv3').html("");
                        $('#errordiv3').append("<p>Currency is required!!!</p>");
                        return false;
                    } else {
                        //everything is validated!!!!
                        $('form').submit();

                    }

                },

                next: function (index) {
                    //alert('Going to step: ' + index);
                    var mealTitle = $('#mealtitle').val();
                    var mealType = $('#mealtype').val();
                    var cuisineType = $('#cuisinetype').val();
                    var dishesServed = $('#dishesserved').val();
                    var alcohol = $('#alcohol').val();
                    var ownMenu = $('#ownmenu').val();
                    var minGuests = $("#slider-range").slider("values", 0);
                    var maxGuests = $("#slider-range").slider("values", 1);
                    var eventDuration = $('#eventduration').val();
                    var hostWith = $('#hostwith').val();
                    var howIHost = $('#howihost').val();
                    //console.log(mealTitle);
                    //console.log(mealType);
                    //console.log(minGuests+"eventduration"+eventDuration+"menu"+ownMenu);
                    if (index === 2) {
                        if (mealTitle === "") {
                            //alert("Meal Title is Required");
                            $('#errordiv').append("<p>Meal Title is required!!!</p>");
                            return false;
                        } else if (mealType === "") {
                            $('#errordiv').html("");
                            $('#errordiv').append("<p>Meal Type is required!!!</p>");
                            return false;
                        } else if (cuisineType === "") {
                            $('#errordiv').html("");
                            $('#errordiv').append("<p>Cuisine Type is required!!!</p>");
                            return false;
                        } else if (dishesServed === "") {
                            $('#errordiv').html("");
                            $('#errordiv').append("<p>Dishes served is required!!!</p>");
                            return false;
                        } else if (alcohol === "") {
                            $('#errordiv').html("");
                            $('#errordiv').append("<p>Alcohol option is required!!!</p>");
                            return false;
                        } else if (ownMenu === "") {
                            $('#errordiv').html("");
                            $('#errordiv').append("<p>Your Menu is required!!!</p>");
                            return false;
                        } else if (minGuests === 0) {
                            $('#errordiv').html("");
                            $('#errordiv').append("<p>Minimum Guests cant be 0!!!</p>");
                            return false;
                        } else if (maxGuests === 100) {
                            $('#errordiv').html("");
                            $('#errordiv').append("<p>Maximum Guests is required!!!</p>");
                            return false;
                        } else if ((eventDuration === "") || (eventDuration === "Choose")) {
                            $('#errordiv').html("");
                            $('#errordiv').append("<p>Event Duration is required!!!</p>");
                            return false;
                        } else if ((hostWith === "") || (hostWith === "Choose")) {
                            $('#errordiv').html("");
                            $('#errordiv').append("<p>Host With option is required!!!</p>");
                            return false;
                        } else if ((howIHost === "") || (howIHost === "Choose")) {
                            $('#errordiv').html("");
                            $('#errordiv').append("<p>How I Host option is required!!!</p>");
                            return false;
                        } else {
								//CODE TO UPLOAD THE IMAGES
							
                            return true;
                        }
                    } //end of validation page 1
                    if (index === 3) {
                        //alert("inside 3");
                        var mapLocation = $('#maploc').val();
                        var directions = $('#directions').val();
                        var amenities = "";
                        $(":checkbox[name=amenities]:checked").each(function () {
                            amenities += $(this).val();
                        });
                        console.log("amenitiess initial" + amenities);
                        if (mapLocation === "") {
                            //alert("inside map location");
                            $('#errordiv2').append("<p>Map Location is required!!!</p>");
                            return false;
                        } else if (directions === "") {
                            $('#errordiv2').html("");
                            $('#errordiv2').append("<p>Directions is required!!!!!!common guys lets do it!!!!!</p>");
                            return false;
                        } else {
                            //$("#latitude").val(lat);dhjdhddjhdh
                            //$("#longitude").val(lon);   
                            console.log("lat is" + lat + "lon is" + lon);
                            console.log("amenities" + amenities);
                            return true;
                        }
                    }
                }
            });

        $(".tagsinput").tagsInput();
        $('.tagsinput input').attr('disabled', 'disabled');

        $('#maploc').keypress(function () {
            $('#map').css("height", "230px");
            var latLong = new google.maps.LatLng(19.28, 70.80);
            var mapOptions = {
                zoom: 15,
                center: latLong,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            var map = new google.maps.Map(document.getElementById('map'), mapOptions);
            var geocoder = new google.maps.Geocoder();

            var address = document.getElementById('maploc').value;
            geocoder.geocode({
                'address': address
            }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    lat = results[0].geometry.location.lat();
                    lon = results[0].geometry.location.lng();
                    console.log("lat initial" + lat + "longg initial" + lon);
                    map.setCenter(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location
                    });
                } else {
                   // alert('Geocode was not successful for the following reason: ' + status);
                }
            });
        });

        $('.selecttag').change(function () {
            var selectedvalue = $(this).val();
            var parents = $(this).parent();
            if (selectedvalue !== 'Choose') {
                if (!(parents.find('.tagsinput').tagExist(selectedvalue))) {
                    parents.find('.tagsinput').addTag(selectedvalue);
					//parents.find('.addbutton').css('visibility', 'visible');
					parents.children('.tagsinput').append('<button type="button" class="btn addbutton"><i class="icon-plus"></i></button>');
					$(this).css('visibility', 'hidden');
                }
            }
            $(".selecttag").val($(".selecttag").data("default-value"));
			
			$(".addbutton").on('click',function(){
					//alert("hi");
					$(this).parent().parent().find('.selecttag').css('visibility', 'visible');
					$(this).remove();
			});
			
        });
		
		$('#pictures').change(function(){
			//alert("hi");
			var preview=$("#preview");
			var x=$(this).get(0).files[0];
			//alert(x);
			//var fileList=$(this).files;
			//alert(fileL4ist);
			//var numFiles=x.length;
			//alert(numFiles);
			
			
			var img = document.createElement("img");
			img.classList.add("obj");
			img.file = $(this).get(0).files[0];
			preview.append(img);
    
			var reader = new FileReader();
			reader.onload = (function(aImg) { 
						return function(e) { 
									aImg.src = e.target.result; 
									};
							})(img);
			reader.readAsDataURL($(this).get(0).files[0]);
		
		});
		
		
		$('.addrepeatmeal').on('click',function(){
				var date=$("#datepicker").val();
				var time=$("#time").val();
				var repeat=$("#repeat").val();
				var parent=$(this).parent();
				if(time!=="ChooseTime"){
				var bigdiv='<div class="row"><div class="col-lg-2"><input type="text" name="availabiltiy.date" class="form-control" value='+date+' disabled="disabled"></div><div class="col-lg-1"><input type="text" name="availability.time" class="form-control" value='+time+' disabled="disabled"></div><div class="col-lg-2"><input type="text" name="availability.repeat" class="form-control" value='+repeat+' disabled="disabled"></div><div class="col-lg-1"><button type="button" class="btn deletebutton"><i class="icon-remove"></i></button></div></div>';
				parent.prepend(bigdiv);
				}
				
				$("#time").val($("#time").data("default-value"));
				$("#repeat").val($("#repeat").data("default-value"));
				
				$('.deletebutton').on('click',function(){
					var parent=$(this).parent().parent();
					parent.remove();
				});
		
		});
		
        $("#slider-range").slider({
            range: true,
            min: 0,
            max: 50,
            values: [10, 20],
            slide: function (event, ui) {
                $("#slider-range-amount").text(+ui.values[0] + " - " + ui.values[1]);
            }
        });
        $("#slider-range-amount").text($("#slider-range").slider("values", 0) + " - " + $("#slider-range").slider("values", 1));
        $("#max_allowed").val($("#slider-range").slider("values", 1));
        $("#min_allowed").val($("#slider-range").slider("values", 0));
        $('#datepicker').datepicker();


    },

    });
    return new Router();
});