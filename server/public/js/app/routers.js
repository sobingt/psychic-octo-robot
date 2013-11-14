define([
	'jquery',
    'backbone',
    'app/models/loginData',
    'app/models/memberData',
    'app/models/meal',
	'app/models/curd',
    'app/views/header',
    'app/views/loginView',
    'app/views/MemberView',
    'app/views/mealView',
    'app/views/mealList',
	'app/views/usersList',
    'app/models/users',
    'app/views/userView',
    'app/views/userProfileView',
    'app/views/userProfileEditView',
    'app/views/changePasswordView',
    'app/views/chatView',
	'app/views/addMealView',
	'app/views/curdView',
	'jqueryui',
	'datepicker',
	'date',
	'daterange',
	'jquerytags',
	'customcheck',
	'jquerytags'
	
], function ($,
			Backbone,
			LoginData,
			MemberData,
			Meals,
			Curd,
			HeaderView,
			LoginView,
			MemberView,
			MealView,
			MealList,
			UsersList,
			Users,
			UserView,
			UserProfileView,
			UserProfileEditView,
			ChangePasswordView,
			ChatView,
            AddMealView,
            CurdView
			) 
	{
    var Router = Backbone.Router.extend({
        routes: {
            ''					: 'login',
			'profile/:id'		: 'profile',
			'profile/edit/:id'	: 'profileEdit',
			'profile/cp/:id'	: 'changePassword',
			'chat/:id'			: 'chat',
			'users'             : 'userList',
            'users/:id'         : 'userDetails',
			'meal'				: 'meal',
			'meals' 			: 'list',
            'meals/page/:page'  : 'list',
            'meals/add'         : 'addMeal',
			'meals/curd'		: 'mealCurd',
            'meals/:id'         : 'mealDetails'

        },

        initialize: function () {
            this.headerView = new HeaderView.View();
            $('.header').html(this.headerView.el);
        },

        login: function () {
        var loginData  = new LoginData();
        var loginView  = new LoginView({ model: loginData });

         $('#main-content').html( loginView.render().el );
        },
		
		profile: function(id) {
			var member = new MemberData({
				id: id
			});
			
			//var profileView = new UserProfileView();
			var profileView = new UserProfileView({model: member});
			//console.log("member");
			//console.log(member);
			//console.log(new UserProfileView({model: member}).el);
			$('#main-content').html( profileView.render().el );
			$(".tagsinput").tagsInput({
			'interactive':false,
			'onAddTag' : function(){ return false;}
			});
			$('.tagsinput').find('a').remove();
			//('#main-content').html(new UserProfileView({model: member}).el);
		},
		
		profileEdit: function(id) {
			var member = new MemberData({
				id: id
			});
			
			var profileEditView = new UserProfileEditView({model: member});
			$('#main-content').html( profileEditView.render().el );
			$(".tagsinput").tagsInput();

			//('#main-content').html(new UserProfileView({model: member}).el);
		},
		
		changePassword: function(id) {
			var member = new MemberData({
				id: id
			});
			
			var changePasswordView = new ChangePasswordView({model: member});
			$('#main-content').html( changePasswordView.render().el );
			//('#main-content').html(new UserProfileView({model: member}).el);
		},
		chat: function(id) {
			var member = new MemberData({
				id: id
			});
			
			var chatView = new ChatView({model: member});
			$('#main-content').html( chatView.render().el );
			//('#main-content').html(new UserProfileView({model: member}).el);
		},

        userDetails: function(id) {
            var user = new Users.model({_id: id});
            user.fetch({success: function(){
                $('#content').html(new UserView({model: user}).el);
            }});
          //  user.fetch({success: function(){
            //}});
        },

        list: function(page) {
            var p = page ? parseInt(page, 5) : 1;
            var mealList = new Meals.collection();
            mealList.fetch({success: function(){
                $("#main-content").html(new MealList.ListView({model: mealList, page: p}).el);
            }});
            this.headerView.selectMenuItem('home-menu');
        },

        userList: function(){
            var usersList = new UsersList();
            $("#content").html(usersList.render());
            this.headerView.selectMenuItem('home-menu');
        },

		addMeal: function() {
			var meal = new Meals.model();
			$('#main-content').html(new MealView({model: meal}).el);
			this.headerView.selectMenuItem('add-menu');
		},
		
		mealDetails: function(id) {
            var meal = new Meals.model({
                _id: id
            });
            meal.fetch({success: function(){
                $('#main-content').html(new MealView({model: meal}).el);
                function initialize() {
                    var latLong = new google.maps.LatLng(meal.attributes.address.latitude, meal.attributes.address.longitude);
                    var mapOptions = {
                        zoom: 15,
                        center: latLong,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    }
                    var map = new google.maps.Map(document.getElementById('meal-map'),mapOptions);
                    var marker=new google.maps.Marker({
                        map: map,
                        draggable: false,
                        position:latLong
                    });
                }
                google.maps.event.addDomListener(window, "load", initialize);
            }});
            
        },

		diner: function () {		
			var diner = new DinerView();
			$('body').html(diner.render().el );			
		},

		addMeal: function() {
        var meal = new Meals.model();
		console.log(meal);
        $('#main-content').html(new AddMealView({model: meal}).el);
        this.headerView.selectMenuItem('add-menu');
		var lat;
		var lon;
		$('#createmeal').stepy({
            backLabel: 'Previous',
            block: true,
            nextLabel: 'Next',
            titleTarget: '.stepy-tab',
            duration  : 300,
            transition: 'fade',
			  
        finish: function() {
        	//alert('Canceling...');
        	var pricePerGuests=$('#priceperguest').val();
        	var currency=$('#currency').val();
        	if((pricePerGuests===0) || (pricePerGuests==="")){
        			$('#errordiv3').append("<p>Price is required!!!</p>" );
        			return false;
        		}
        	else if((currency==="") || (currency==="Choose")){
        				$('#errordiv3').html("");
        				$('#errordiv3').append("<p>Currency is required!!!</p>" );
        				return false;
        				}
        	else {
        		//everything is validated!!!!
        		$('form').submit();
        			
        		}	
        		
        },		
        		
        next: function(index) {
        		//alert('Going to step: ' + index);
        		var mealTitle=$('#mealtitle').val();
        		var mealType=$('#mealtype').val();
        		var cuisineType=$('#cuisinetype').val();
        		var dishesServed=$('#dishesserved').val();
        		var alcohol=$('#alcohol').val();
        		var ownMenu=$('#ownmenu').val();
        		var minGuests=$("#slider-range").slider("values", 0);
        		var maxGuests=$("#slider-range").slider("values", 1);
        		var eventDuration=$('#eventduration').val();
        		var hostWith=$('#hostwith').val();
        		var howIHost=$('#howihost').val();
        		//console.log(mealTitle);
        		//console.log(mealType);
        		//console.log(minGuests+"eventduration"+eventDuration+"menu"+ownMenu);
        		if(index===2) {
        			if(mealTitle===""){
        				//alert("Meal Title is Required");
        				$('#errordiv').append("<p>Meal Title is required!!!</p>" );
        				return false;
        							  }
        			else if(mealType===""){
        				$('#errordiv').html("");
        				$('#errordiv').append("<p>Meal Type is required!!!</p>" );
        				return false;
        				}
        			else if(cuisineType===""){
        				$('#errordiv').html("");
        				$('#errordiv').append("<p>Cuisine Type is required!!!</p>" );
        				return false;
        				}
        			else if(dishesServed===""){
        				$('#errordiv').html("");
        				$('#errordiv').append("<p>Dishes served is required!!!</p>" );
        				return false;
        				}
        			else if(alcohol===""){
        				$('#errordiv').html("");
        				$('#errordiv').append("<p>Alcohol option is required!!!</p>" );
        				return false;
        				}
        			else if(ownMenu===""){
        				$('#errordiv').html("");
        				$('#errordiv').append("<p>Your Menu is required!!!</p>" );
        				return false;
        				}
        			else if(minGuests===0){
        				$('#errordiv').html("");
        				$('#errordiv').append("<p>Minimum Guests cant be 0!!!</p>" );
        				return false;
        				}
        			else if(maxGuests===100){
        				$('#errordiv').html("");
        				$('#errordiv').append("<p>Maximum Guests is required!!!</p>" );
        				return false;
        				}
        			else if((eventDuration==="") || (eventDuration==="Choose")){
        				$('#errordiv').html("");
        				$('#errordiv').append("<p>Event Duration is required!!!</p>" );
        				return false;
        				}
        			else if((hostWith==="") || (hostWith==="Choose")){
        				$('#errordiv').html("");
        				$('#errordiv').append("<p>Host With option is required!!!</p>" );
        				return false;
        				}
        			else if((howIHost==="") || (howIHost==="Choose")){
        				$('#errordiv').html("");
        				$('#errordiv').append("<p>How I Host option is required!!!</p>" );
        				return false;
        				}
        			else {	
        				return true;
        				}
        		}//end of validation page 1
        		if(index===3){
        			//alert("inside 3");
        			var mapLocation=$('#maploc').val();
        			var directions=$('#directions').val();
        			var amenities="";
        			$(":checkbox[name=amenities]:checked").each(function() {
        							amenities+= $(this).val();
        					});
        			console.log("amenitiess initial"+amenities);
        			if(mapLocation===""){
        					//alert("inside map location");
        					$('#errordiv2').append("<p>Map Location is required!!!</p>");
        					return false;
        				}
        			else if(directions===""){
        					$('#errordiv2').html("");
        					$('#errordiv2').append("<p>Directions is required!!!</p>" );
        					return false;
        				}
        			else{
        					console.log("lat is"+lat+"lon is"+lon);
        					console.log("amenities"+amenities);
        					return true;
        				}	
        		}
        	}	
        });
		  
		$(".tagsinput").tagsInput();
		$('.tagsinput input').attr('disabled', 'disabled');
		
		$('#maploc').change(function() {
			$('#map').css("height","230px");
					var latLong = new google.maps.LatLng(19.28,70.80);
					var mapOptions = {
										zoom: 15,
										center: latLong,
										mapTypeId: google.maps.MapTypeId.ROADMAP
									}
					var map = new google.maps.Map(document.getElementById('map'),mapOptions);
					var geocoder = new google.maps.Geocoder();
				
					var address = document.getElementById('maploc').value;
					geocoder.geocode( { 'address': address}, function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						lat=results[0].geometry.location.lat();
						lon=results[0].geometry.location.lng();
						console.log("lat initial"+lat +"longg initial"+lon);
						map.setCenter(results[0].geometry.location);
						var marker = new google.maps.Marker({
						map: map,
						position: results[0].geometry.location
					});
					} else {
							alert('Geocode was not successful for the following reason: ' + status);
							}
					});
		});
		
		 $('.selecttag').change(function(){
			var selectedvalue=$(this).val();
			var parents=$(this).parent();
			if(selectedvalue!=='Choose') {
					if (!(parents.find('.tagsinput').tagExist(selectedvalue))) {
							parents.find('.tagsinput').addTag(selectedvalue);
							 }
					}
			$(".selecttag").val($(".selecttag").data("default-value"));
		 });
		 
		  $("#slider-range").slider({
        range: true,
        min: 0,
        max: 50,
        values: [10, 20],
        slide: function (event, ui) {
            $("#slider-range-amount").text(+ ui.values[0] + " - " + ui.values[1]);
									}
			});
		$("#slider-range-amount").text($("#slider-range").slider("values", 0) + " - " + $("#slider-range").slider("values", 1));
		
		$('#dpYears').datepicker();
					
	/*	$( "#generate" ).click(function() {
					//alert( "Handler for .click() called." );
					//var geocoder = new google.maps.Geocoder();
					$('#map').css("height","230px");
					var latLong = new google.maps.LatLng(19.28,70.80);
					var mapOptions = {
										zoom: 15,
										center: latLong,
										mapTypeId: google.maps.MapTypeId.ROADMAP
									}
					var map = new google.maps.Map(document.getElementById('map'),mapOptions);
					var geocoder = new google.maps.Geocoder();
				
					var address = document.getElementById('maploc').value;
					geocoder.geocode( { 'address': address}, function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						lat=results[0].geometry.location.lat();
						lon=results[0].geometry.location.lng();
						console.log("lat initial"+lat +"longg initial"+lon);
						map.setCenter(results[0].geometry.location);
						var marker = new google.maps.Marker({
						map: map,
						position: results[0].geometry.location
					});
					} else {
							alert('Geocode was not successful for the following reason: ' + status);
							}
					});
		
		}); */
			
		},
    
		mealCurd:function() {
			var curd=new Curd.model();
			$('#main-content').html(new CurdView({model:curd}).el);
			this.headerView.selectMenuItem('add-menu');
		},




        register: function() {
            var register = new RegisterData();
            var registerView = new RegisterView({model: register});
        }
    });
    return Router;
});