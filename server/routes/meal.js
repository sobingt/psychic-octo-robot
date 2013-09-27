var mysql = require('mysql');
var connection = mysql.createConnection({ host: 'localhost',
                                        user: 'root',
                                        password: '',
                                        database: 'adukala'
                                        });

/*
 * Create A New Meal
 */
exports.createMeal = function(req, res) {
    if (connection) {
        var queryString = "INSERT INTO adukala.meal (uid, name, description, created, type, cuisine, picture, cost, max_allowed, date, menu_id, diet, guests_preferred, advance_lead_time, location_id) VALUES ()";
     //   connection.query(queryString, );
    }
};
                         

/*
 * GET the list of all the Meals
 */
exports.list = function(req, res, next) {
    if (connection) {
        var queryString = "SELECT m.id, m.name, m.description, m.picture, DATE(m.date) as da, l.city, l.area,  GROUP_CONCAT(t.name ) as tags FROM meal m LEFT JOIN location l ON m.location_id = l.id LEFT JOIN meal_tags mt ON m.id = mt.mid LEFT JOIN tags t ON mt.tid = t.tid WHERE m.date >= CURRENT_DATE";
        connection.query(queryString, function(errors, results, fields) {
            if (errors) {
                throw errors;
            }
            if (results.length > 0) {
                res.contentType('application/json');
                req.meals = JSON.stringify(results);
                next();
            }
        });
    }
};


/*
 * GET the Meal details for admin edit
 */
exports.getMeal = function(req, res, next) {
    if (connection) {
        var queryString = "SELECT m.name, m.description, m.picture, m.cost, m.max_allowed, m.date, GROUP_CONCAT(DISTINCT d.name) as menu, GROUP_CONCAT(DISTINCT t.name) as tags, m.advance_lead_time, l.street_address, l.area, l.city, l.state, l.country, l.pincode FROM meal m LEFT JOIN location l ON m.location_id = l.id LEFT JOIN menu mn ON m.menu_id = mn.menu_id LEFT JOIN dish d ON mn.dish_id = d.id LEFT JOIN meal_tags mt ON m.id =  mt.mid LEFT JOIN tags t ON mt.tid = t.tid WHERE m.id = ";
        connection.query(queryString, req.params.id, function(errors, results, fields) {
            if (errors) {
                throw errors;
            }
            if (results.length > 0) {
                res.contentType('application/json');
                req.meal = JSON.stringify(results);
                next();
            }
        });
    }
};