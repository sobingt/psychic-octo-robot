
/**
 * Module dependencies.
 */

var express = require('express')
, routes = require('./routes')
, user = require('./routes/user')
, meal = require('./routes/meal')
, config = require('./config.js')
, http = require('http')
, hbs = require('hbs')
, mysql = require('mysql')
, admin = require('./routes/admin.js')
, path = require('path')
, connect = require('express/node_modules/connect')
, parseCookie = connect.utils.parseCookie
, MemoryStore = connect.middleware.session.MemoryStore;

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.session({
    secret: 'secret'
    , key: 'express.sid'
    , store: store = new MemoryStore()
    , expires: new Date(Date.now() + (30 * 86400 * 1000))
  }));

app.use(function(request, response, next){
    var username = request.session.email;
    var user_token = user.getToken;
    if (request.session.auth_token = user_token)
        next();
    else
        response.send([{'error': 404}]);
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
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
//app.get('/get/allcities', user.getCities);

app.post('update/user', user.updateUser);
app.post('/admin/create/user', user.createUser);
app.post('/admin/create/meal', meal.createMeal);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
