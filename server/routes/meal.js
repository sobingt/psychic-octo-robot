var database = require('../database');
var mysql = require('mysql')
, config = require('../config');
var connection = mysql.createConnection({ host: config.database.host,
                                        user: config.database.user,
                                        password: config.database.password,
                                        database: config.database.database
                                        });

/*
 * Create A New Meal
 */
exports.createMeal = function(request, response) {
    if (database.connection) {
        var queryString = "INSERT INTO adukala.meal (uid, name, description, created, type, cuisine, picture, cost, max_allowed, date, menu_id, diet, guests_preferred, advance_lead_time, location_id) VALUES ()";
     //   database.connection.query(queryString, );
    }
};

/*
 * GET the menu of a Meal
 */
exports.getMealMenu = function(request, response, next) {
    if (database.connection) {
        var id = request.params.id;
        var queryString = "SELECT GROUP_CONCAT(DISTINCT d.name) as menu FROM meal m LEFT JOIN location l ON m.location_id = l.id LEFT JOIN city c ON l.city = c.id LEFT JOIN menu mn ON m.menu_id = mn.menu_id LEFT JOIN dish d ON mn.dish_id = d.id LEFT JOIN meal_tags mt ON m.id =  mt.mid LEFT JOIN tags t ON mt.tid = t.tid WHERE m.id=?";
        database.connection.query(queryString, id, function(errors, results, fields) {
            if (errors) {
                throw errors;
            }
            if (results.length > 0) {
                response.contentType('application/json');
                response.send(JSON.stringify(results));
                response.end();
            }
        });
    }
};



/*
 * GET the list of all the Meals
 */
exports.list = function(request, response) {
    if (database.connection) {
        var queryString = "SELECT m.id, m.name, m.description, m.picture, DATE(m.date) as da, l.city, l.area,  GROUP_CONCAT(t.name ) as tags FROM meal m LEFT JOIN location l ON m.location_id = l.id LEFT JOIN meal_tags mt ON m.id = mt.mid LEFT JOIN tags t ON mt.tid = t.tid WHERE m.date >= CURRENT_DATE";
        database.connection.query(queryString, function(errors, results, fields) {
            if (errors) {
                throw errors;
            }
            if (results.length > 0) {
                response.contentType('application/json');
                response.send(JSON.stringify(results));
                response.end();
            }
        });
    }
};


/*
 * GET the Meals of a particular city
 */
exports.getCityMeal = function(request, response) {
    if (database.connection) {
        var city = request.params.city;
        var queryString = "SELECT m.name, m.description, m.picture, m.cost, m.max_allowed, GROUP_CONCAT(DISTINCT d.name) as menu, GROUP_CONCAT(DISTINCT t.name) as tags, m.advance_lead_time, l.street_address, l.area, c.city, l.state, l.country, l.pincode FROM meal m LEFT JOIN location l ON m.location_id = l.id LEFT JOIN city c ON l.city = c.id LEFT JOIN menu mn ON m.menu_id = mn.menu_id LEFT JOIN dish d ON mn.dish_id = d.id LEFT JOIN meal_tags mt ON m.id =  mt.mid LEFT JOIN tags t ON mt.tid = t.tid WHERE c.city = ? GROUP BY m.id ";
        database.connection.query(queryString, city, function(errors, results, fields) {
            if (errors) {
                throw errors;
            }
            if (results.length > 0) {
                response.contentType('application/json');
                response.send(JSON.stringify(results));
                response.end();
            }
        });
    }
};



/*
 * GET the dineouts(meal_events) of a particular city
 */
exports.getCityDineout = function(request, response) {
    if (database.connection) {
        var city = request.params.city;
        var queryString = "SELECT m.name, m.description, m.picture, m.cost, dn.date, m.max_allowed, GROUP_CONCAT(DISTINCT d.name) as menu, GROUP_CONCAT(DISTINCT t.name) as tags, m.advance_lead_time, l.street_address, l.area, c.city, l.state, l.country, l.pincode FROM dineout dn LEFT JOIN meal m ON dn.meal_id = m.id LEFT JOIN location l ON m.location_id = l.id LEFT JOIN city c ON l.city = c.id LEFT JOIN menu mn ON m.menu_id = mn.menu_id LEFT JOIN dish d ON mn.dish_id = d.id LEFT JOIN meal_tags mt ON m.id =  mt.mid LEFT JOIN tags t ON mt.tid = t.tid WHERE c.city = ? GROUP BY m.id";
        database.connection.query(queryString, city, function(errors, results, fields) {
            if (errors) {
                throw errors;
            }
            if (results.length > 0) {
                response.contentType('application/json');
                response.send(JSON.stringify(results));
                response.end();
            }
        });
    }
};

exports.getCityCuisines = function(request, response) {
    if (database.connection) {
        var city = request.params.city;
        var queryString = "SELECT  GROUP_CONCAT(DISTINCT t.name) as tags FROM dineout dn LEFT JOIN meal m ON dn.meal_id = m.id LEFT JOIN location l ON m.location_id = l.id LEFT JOIN city c ON l.city = c.id LEFT JOIN menu mn ON m.menu_id = mn.menu_id LEFT JOIN dish d ON mn.dish_id = d.id LEFT JOIN meal_tags mt ON m.id =  mt.mid LEFT JOIN tags t ON mt.tid = t.tid LEFT JOIN vocabulary v ON v.vid = t.vid WHERE c.city = ? AND v.name = 'cuisine'";
        database.connection.query(queryString, city, function(errors, results, fields) {
            if (errors) {
                throw errors;
            }
            if (results.length > 0) {
                response.contentType('application/json');
                response.send(JSON.stringify(results));
                response.end();
            }
        });
    }
};


/*
 * GET the Meal details for a particular cuisine
 */
exports.getMealCityCuisine = function(req, res, next) {
  if (connection) {
        var city = req.params.city;
        var cuisine = req.params.cuisine;
        if (city !== '' && cuisine !== '' ) {
            var queryString = "SELECT  m.id, m.uid, m.name, m.description, m.picture, m.cost FROM meal m LEFT JOIN location l ON m.location_id = l.id LEFT JOIN city c ON l.city = c.id LEFT JOIN meal_tags mt ON m.id =  mt.mid LEFT JOIN tags t ON mt.tid = t.tid LEFT JOIN vocabulary v ON v.vid = t.vid WHERE c.city = ? AND v.name = 'cuisine' AND t.name=?";
            connection.query(queryString, [city, cuisine], function(errors, results, fields) {
                if (errors) {
                    throw errors;
                }
                if (results.length > 0) {
                    res.contentType('application/json');
                    res.send(JSON.stringify(results));
                    res.end();
                    next();
                }
            });
       }
       else {
            console.log('Error');
       }
   }
}

/*
 * GET the Meal details for admin edit
 */
exports.getMeal = function(request, response) {
    if (database.connection) {
        var queryString = "SELECT m.name, m.description, m.picture, m.cost, m.max_allowed, m.date, GROUP_CONCAT(DISTINCT d.name) as menu, GROUP_CONCAT(DISTINCT t.name) as tags, m.advance_lead_time, l.street_address, l.area, l.city, l.state, l.country, l.pincode FROM meal m LEFT JOIN location l ON m.location_id = l.id LEFT JOIN menu mn ON m.menu_id = mn.menu_id LEFT JOIN dish d ON mn.dish_id = d.id LEFT JOIN meal_tags mt ON m.id =  mt.mid LEFT JOIN tags t ON mt.tid = t.tid WHERE m.id = ";
        database.connection.query(queryString, request.params.id, function(errors, results, fields) {
            if (errors) {
                throw errors;
            }
            if (results.length > 0) {
                response.contentType('application/json');
                response.send(JSON.stringify(results));
                response.end();
            }
        });
    }
};
