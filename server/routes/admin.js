var user = require('./user');
var database = require('../database');
/*
 * GET home page.
 */

exports.index = function(request, response){
  response.render('admin/index', { title: 'Express' });
};
exports.meal = function(request, response){
  response.render('admin/meal', { title: 'Express' });
};
exports.user = function(request, response){
  response.render('admin/user', { title: 'Express' });
};
exports.createuser = function(request, response){
    if (database.connection) {
        var queryString = "SELECT id, city FROM city";
        database.connection.query(queryString, function(errors, rows) {
            if (errors)
                response.send("No cities found " + errors);
            //response.contentType("application/json");
            //esponse.send(JSON.stringify(rows));
            var cities = rows;
            response.render('admin/createuser', {title: 'Admin Create User', cities: cities });
            //response.end();
        });
    }
  
};
exports.createmeal = function(request, response){
  if (database.connection) {
        var queryString = "SELECT id, city FROM city";
        database.connection.query(queryString, function(errors, rows) {
            if (errors)
                response.send("No cities found " + errors);
            //response.contentType("application/json");
            //esponse.send(JSON.stringify(rows));
            var cities = rows;
            response.render('admin/createmeal', { title: 'Admin Create Meal', cities: cities });
            //response.end();
        });
    }
  
};
exports.edituser = function(request, response){
  response.render('admin/edituser', { title: 'Express' });
};
exports.editmeal = function(request, response){
  response.render('admin/editmeal', { title: 'Express' });
};
exports.deleteuser = function(request, response){
  response.render('admin/deleteuser', { title: 'Express' });
};
exports.deletemeal = function(request, response){
  response.render('admin/deletemeal', { title: 'Express' });
};