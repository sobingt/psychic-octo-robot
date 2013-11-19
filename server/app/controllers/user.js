
// Returns the login screen...
exports.requiresLogin = function(app){
	// Releases direct access ...
	// return function(req, res, next) {res.send(req.session.accountId); }

	return function(req, res, next){
		if (!req.isAuthenticated()) {
			res.send(401);
			//res.render('401');
		} else {
			res.send(req.session.accountId);
		}
	};
};

exports.signin = function(req, res){};

exports.callbackLogin = function(req, res, next){
	res.render('callback_login');
};

exports.logout = function(req, res){
	req.logout();
	res.send(200);
}

// Returns logged user info..
exports.getProfile = function(req, res){

	var user = null;

	switch (req.user.provider) {

		case 'facebook': 
			 user = {
				_id : req.user._id,
				provider_id : req.user.facebook.id,
				profile_picture : req.user.facebook.profile_picture,
				name : req.user.facebook.name,
				first_name : req.user.facebook.first_name,
				last_name : req.user.facebook.last_name,
				email : req.user.email,
				gender : req.user.facebook.gender,
				locale: req.user.facebook.locale,
				location: req.user.facebook.location
                
			};
			break;
		case 'google':
			 user = {
				_id : req.user._id,
				provider_id : req.user.google.id,
				name : req.user.google.name,
				profile_picture: '',
				location: ''

			};
			break;
    
	}

	res.send(req.user);
};

/*
  profile_picture: 'https://graph.facebook.com/100000483391087/picture',
  updated_time: '2013-11-04T16:12:37+0000',
  verified: true,
  locale: 'en_US',
  timezone: 5.5,
  email: 'sobingt@gmail.com',
  gender: 'male',
  bio: 'to know abt me you have read this',
  username: 'sobingt',
  link: 'https://www.facebook.com/sobingt',
  last_name: 'Thomas',
  middle_name: 'George',
  first_name: 'Sobin',
  name: 'Sobin George Thomas',
  id: '100000483391087'
                
 */