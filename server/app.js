
/**
 * Module dependencies.
 */

var express = require('express')
, mealmongodb = require('./routes/mealmongodb')
, config = require('./config.js')
, http = require('http')
, hbs = require('hbs')
, mysql = require('mysql')
, path = require('path')
, connect = require('express/node_modules/connect')
, parseCookie = connect.utils.parseCookie
, MemoryStore = connect.middleware.session.MemoryStore
, fs      = require('fs')
, socket    = require('socket.io')   
, passport  = require('passport')
, events    = require('events')
, mongoStore  = require('connect-mongo')(express)

// Loads settings...
, mongoose  = require('mongoose')
, routes    = require('./app/controllers/')
, user    = require('./app/controllers/user')
, meal    = require('./app/controllers/meal')
,transaction=require('./app/controllers/transaction')
, FacebookStrategy  = require('passport-facebook').Strategy
, GoogleStrategy    = require('passport-google-oauth').OAuth2Strategy
, _         = require('Underscore');

/*
 * Database configuration.
 */

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to the database:'));
db.once('open', function callback () {
  console.log('[MongoDB] OK - Connection');
});

// Bootstrap two models
var models_path = __dirname + '/app/models';
fs.readdirSync(models_path).forEach(function (file) {
  require(models_path+'/'+file)
  console.log(models_path+'/'+file);
})


// Settings PassportJS.
var User = mongoose.model('User');

// Serializes the sessions.
passport.serializeUser(function(user, done) {
  done(null, user.id)
})

passport.deserializeUser(function(id, done) {
  User.findOne({ _id: id }, function (err, user) {
    done(err, user)
  })
})

// Strategy for Facebook.
passport.use(new FacebookStrategy({
  clientID: config.facebook.clientID,
  clientSecret: config.facebook.clientSecret,
  callbackURL: config.facebook.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ 'facebook.id': profile.id }, function (err, user) {
      if (err) { return done(err) }
      if (!user) {
        user = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          username: profile.username,
          provider: 'facebook',
          facebook: _.extend(profile._json, {
            // add photo to the profile object facebook
            profile_picture : 'https://graph.facebook.com/' + profile._json.id + '/picture'
          })
        })
        user.save(function (err) {
          if (err) { console.log(err) }
          return done(err, user)
        })
      } else {
        return done(err, user)
    }
    })
  }
));

// Strategy Google.
passport.use(new GoogleStrategy({
  clientID: config.google.clientID,
  clientSecret: config.google.clientSecret,
  callbackURL: config.google.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ 'google.id': profile.id }, function (err, user) {
      if (!user) {
        user = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          username: profile.username,
          provider: 'google',
          google: profile._json
        })
          user.save(function (err) {
          if (err) { console.log(err) }
          return done(err, user)
        })
      } else {
        return done(err, user)
      }
    })
  }
));



var app = express();

// all environments
app.set('swhoStackError', true);
app.set('port', process.env.PORT || 4000);
//Uncomment for admin views
//app.set('views', config.root + '/views');
//TODO MVC structure on the server side.
app.set('views', config.root + '/app/views');
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
app.use(express.compress({
  filter: function (req, res) {
    // console.log(res.getHeader('Content-Type'));
    return /json|text|javascript|css/.test(res.getHeader('Content-Type'));
  },
  level: 9
}));

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.limit('1mb'));
app.use(express.cookieParser('blah'));
app.use(express.static(path.join(config.root, 'public')));
console.log(config.root+" config");
app.use(express.session({
  secret: 'foodbmg',
  store: new mongoStore({
    url: config.db,
    collection : 'sessions'
  })
}));

app.use(passport.initialize());
app.use(passport.session());

//Note to all: Router should always be at the end
// can't solve
app.use(app.router);

// Assume "not found" in the error msgs
// Is the 404. this is somewhat silly, but
// Valid, you can do whatever you like, Sep.
// Properties, etc use instanceof.
app.use(function(err, req, res, next){
  // treat as 404
  if (~err.message.indexOf('not found')) return next()

  // log it
  console.error(err.stack)

  // error page
  res.status(500).render('500', { error: err.stack })
})

// assume 404 since no middleware responded
app.use(function(req, res, next){
  res.status(404).render('404', { url: req.originalUrl })
});


/**
app.use(function(request, response, next){
    var username = request.session.email;
    var user_token = user.getToken;
    if (request.session.auth_token = user_token)
        next();
    else
        response.send([{'error': 404}]);
});
**/
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}



/***
app.post('/login', user.login);
app.get('/login', fb.authfacebook, fb.registerAccessToken);
app.get('/me/:id', user.me);
app.get('/auth/facebook', fb.authfacebook, fb.getuser);

app.get('/admin', admin.index);

//app.get('/admin/meals', admin.meal);
//app.get('/admin/users', admin.getUsers);
app.get('/admin/create/user', admin.createuser);
app.get('/admin/create/meal', admin.createmeal);
app.get('/admin/users', user.list);
app.get('/admin/meals', meal.list);
app.get('/user/:id/edit', user.getUser);
app.get('/user/:id/disable', user.disable);
app.get('/user/:id/delete', user.disable);
app.get('/meal/:id/edit', meal.getMeal);

//get routes  
app.get('/get/meal/:city', meal.getCityMeal);
app.get('/get/dineout/:city', meal.getCityDineout);
app.get('/get/chef/:id', user.getChefbyId);
app.get('/get/chef/:id/meal', user.getChefMealbyId);
app.get('/get/chef/:id/dineout', user.getChefDineoutbyId);
app.get('/get/:city/chef', user.getChefbyCity);
app.get('/get/:city/cuisines', meal.getCityCuisines);
app.get('/get/meal/:id/menu', meal.getMealMenu);
app.get('/get/meals/:city/:cuisine', meal.getMealCityCuisine);

//FIXME CREATE A SINGLE FUCNTION AND SINGLE ROUTE FOR TAGS
app.get('/get/tags/language', meal.getLanguageTag);
app.get('/get/tags/hobbies', meal.getHobbiesTag);
app.get('/get/tags/cuisine', meal.getCuisinesTag);
app.get('/get/tags/diet', meal.getDietTag);
app.get('/get/tags/mealtype', meal.getMealTypeTag);
app.get('/get/tags/guestsTag', meal.getGuestsTag);

app.get('/test', function(req, res){
  res.render('admin/test');
});
//app.get('/get/allcities', user.getCities);
/*
app.post('update/user', user.updateUser);
//user create routes
app.post('/admin/create/userinfo', user.createUserInfo);

//user edit routes
//app.get('user/:id/edit', function(req, res){
//  res.render('admin/edituser');
//});
app.post('/user/:id/edit/userinfo', user.createUserAdd);

//meal create routes
app.post('/admin/create/meal', meal.createMeal);

app.post('/admin/create/meal_detail', meal.createMealDetail)
***/

// additional routes to fetch data from server
app.get('/', function(req, res) {
  res.header('Access-Control-Allow-Origin', "*")
  res.sendfile(__dirname + '/public/index.html');
});


//mongoDB
app.get('/meals', meal.findAll);
app.get('/meals/:id', meal.findById);
app.post('/meals', meal.addMeal);
app.put('/meals/:id', meal.updateMeal);
app.delete('/meals/:id', meal.deleteMeal);
app.get('/payment',transaction.getTransaction);
app.post('/payment',transaction.addTransaction);


app.get('/me', user.getProfile);

app.get('/users', mealmongodb.findAllUsers);
app.get('/users/:id', mealmongodb.findUserById);
app.put('/users/:id', mealmongodb.updateUser);


// routes
app.get('/authentication', user.requiresLogin(app));

// authentication Facebook 
app.get('/login/facebook', passport.authenticate('facebook', { display: 'popup', scope: [ 'email', 'user_about_me'], failureRedirect: '/' }), user.signin);
app.get('/login/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), user.callbackLogin);

// authentication Google 
app.get('/login/google', passport.authenticate('google', { failureRedirect: '/', scope: ['https://www.googleapis.com/auth/userinfo.profile','https://www.googleapis.com/auth/userinfo.email'] }), user.signin)
app.get('/login/google/callback', passport.authenticate('google', { failureRedirect: '/' }), user.callbackLogin)

// Logout
app.get('/logout', user.logout);


app.get('/user/profile', routes.checkAuthentication, user.getProfile);  


// Adds the app functions events.
var eventDispatcher = new events.EventEmitter();

app.addEventListener = function ( eventName, callback ) {
  eventDispatcher.on(eventName, callback);
};
app.triggerEvent = function( eventName, eventOptions ) {
  eventDispatcher.emit( eventName, eventOptions );
};
app.removeEventListener = function( eventName, callback ) {
  eventDispatcher.removeListener( eventName, callback );  
};



// Server
var server = app.listen(app.get('port'));

// Active listening and Socket.IO makes "global" access.
io = socket.listen(server);

server.listen(app.get('port'), function(){
  console.log("[Server][Express] OK : " + app.get('port'));
});
