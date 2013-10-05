
var mysql = require('mysql')
, config = require('../config');
var connection = mysql.createConnection({ host: config.database.host,
                                        user: config.database.user,
                                        password: config.database.password,
                                        database: config.database.database
                                        });

/*
 * GET users listing.
 */
exports.list = function(req, res, next){
  if(connection) {
   var queryString = "SELECT id, fname, lname, email, role FROM user WHERE is_active = 1";
   connection.query(queryString, function(errors, results, fields){
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
};



/*
 * GET The data for the user edit form.
 */
exports.getUser = function(req, res, next) {
    if (connection) {
        var queryString = "SELECT u.fname, u.lname, u.email, u.password, u.bio, u.phone, u.picture, GROUP_CONCAT(t.name) as tags FROM user u LEFT JOIN user_tags ut ON u.id = ut.uid LEFT JOIN tags t ON ut.tid = t.tid WHERE id=?";
        connection.query(queryString, req.params.id, function(errors, results, fields) {
            if (errors) throw errors;
            if (results.length > 0) {
                res.contentType('application/json');
                res.send(JSON.stringify(results));
                res.end();
                next();
            }
        });
    }
};



/*
 * GET The homechefs by city
 */
exports.getChefbyCity = function(req, res, next) {
    if (connection) {
        var city = req.params.city;
        var queryString = "SELECT u.fname, u.lname, u.email, u.password, u.bio, u.phone, u.picture, GROUP_CONCAT(t.name) as tags, l.street_address, l.area, c.city, l.state, l.country, l.pincode FROM homechef h LEFT JOIN user u ON h.uid = u.id LEFT JOIN location l ON l.id = u.location_id LEFT JOIN city c ON c.id = l.city LEFT JOIN user_tags ut ON u.id = ut.uid LEFT JOIN tags t ON ut.tid = t.tid WHERE c.city=?";
        connection.query(queryString, city, function(errors, results, fields) {
            if (errors) throw errors;
            if (results.length > 0) {
                res.contentType('application/json');
                res.send(JSON.stringify(results));
                res.end();
                next();
            }
        });
    }
};


/*
 * GET The homechef by ID.
 */
exports.getChefbyId = function(req, res, next) {
    if (connection) {
        var id = req.params.id;
        var queryString = "SELECT u.fname, u.lname, u.email, u.password, u.bio, u.phone, u.picture, GROUP_CONCAT(t.name) as tags, l.street_address, l.area, c.city, l.state, l.country, l.pincode FROM homechef h LEFT JOIN user u ON h.uid = u.id LEFT JOIN location l ON l.id = u.location_id LEFT JOIN city c ON c.id = l.city LEFT JOIN user_tags ut ON u.id = ut.uid LEFT JOIN tags t ON ut.tid = t.tid WHERE h.uid=?";
        connection.query(queryString, id, function(errors, results, fields) {
            if (errors) throw errors;
            if (results.length > 0) {
                res.contentType('application/json');
                res.send(JSON.stringify(results));
                res.end();
                next();
            }
        });
    }
};


/*
 * GET The meals of homechef by ID.
 */
exports.getChefMealbyId = function(req, res, next) {
    if (connection) {
        var id = req.params.id;
        var queryString = "SELECT m.name, m.description, m.picture, m.cost, m.max_allowed, GROUP_CONCAT(DISTINCT d.name) as menu, GROUP_CONCAT(DISTINCT t.name) as tags, m.advance_lead_time, l.street_address, l.area, c.city, l.state, l.country, l.pincode FROM meal m LEFT JOIN location l ON m.location_id = l.id LEFT JOIN city c ON l.city = c.id LEFT JOIN menu mn ON m.menu_id = mn.menu_id LEFT JOIN dish d ON mn.dish_id = d.id LEFT JOIN meal_tags mt ON m.id =  mt.mid LEFT JOIN tags t ON mt.tid = t.tid WHERE m.uid = ? GROUP BY m.id ";
        connection.query(queryString, id, function(errors, results, fields) {
            if (errors) throw errors;
            if (results.length > 0) {
                res.contentType('application/json');
                res.send(JSON.stringify(results));
                res.end();
                next();
            }
        });
    }
};


/*
 * GET The Dineouts of homechef by ID.
 */
exports.getChefDineoutbyId = function(req, res, next) {
    if (connection) {
        var id = req.params.id;
        var queryString = "SELECT m.name, m.description, m.picture, m.cost, m.max_allowed, GROUP_CONCAT(DISTINCT d.name) as menu, GROUP_CONCAT(DISTINCT t.name) as tags, do.date, m.advance_lead_time, l.street_address, l.area, c.city, l.state, l.country, l.pincode FROM dineout do LEFT JOIN meal m ON do.meal_id = m.id LEFT JOIN location l ON m.location_id = l.id LEFT JOIN city c ON l.city = c.id LEFT JOIN menu mn ON m.menu_id = mn.menu_id LEFT JOIN dish d ON mn.dish_id = d.id LEFT JOIN meal_tags mt ON m.id =  mt.mid LEFT JOIN tags t ON mt.tid = t.tid WHERE m.uid = ? GROUP BY m.id ";
        connection.query(queryString, id, function(errors, results, fields) {
            if (errors) throw errors;
            if (results.length > 0) {
                res.contentType('application/json');
                res.send(JSON.stringify(results));
                res.end();
                next();
            }
        });
    }
};

/*
 * UPDATE the user
 */
exports.updateUser = function(req, res) {
    //FIX ME
    //  HASH THE PASSWORDS AND COVERT THE LANGUAGE< HOBBY TO JSON, CONVERT THE URL OF THE PICTURE.
    //
    if (connection) {
        var queryString = "UPDATE adukala.user SET fname =?, lname =?, email =?, password =?, bio =?, phone =?, picture =? WHERE id = ?";
        connection.query(queryString, [req.body.fname, req.body.lname, req.body.email, req.body.password, req.body.bio, req.body.picture], function(errors, rows) {
            if (errors)
                res.send("The User cannot be saved");
        });
    }
};


/*
 * INSERT a new user
 */
exports.createUser = function(req, res) {
    
    // FIX ME
    // HASH THE PASSWORD
    // COVERT LANGUAGE AND HOBBY TO JSON
    // GET THE PICTURE UPLOAD URL
    // SET THE PROPER ROLE AND IS_ACTIVE    
    if (connection) {
        var queryString = "INSERT INTO adukala.user (fname, lname, email, password, bio, phone, picture, language, hobby, role, is_active) VALUES ('?', '?', '?', ?, '?', ?, ?, '?', '?', '?', ?)";
        connection.query(queryString, [req.body.fname, req.body.lname, req.body.email, req.body.password, req.body.bio, req.body.phone, req.body.picture, req.body.language, req.body.hobby, req.body.role, req.body.is_active]);
    }
};


/*
 * DISABLE a user
 */
exports.disable = function(req, res) {
    if (connection) {
        var queryString = "UPDATE adukala.user SET is_active = 0 WHERE id = ?";
        connection.query(queryString, req.params.id, function(errors, rows) {
            if (errors)
                res.send('The User cannot be disabled');
        });
    }
};

/*
 * Get the saved token for a particular user
 */

exports.getToken = function(req, res, next) {
    if (connection) {
        var querString = "SELECT t.token FROM token t LEFT JOIN user u ON t.uid = u.id WHERE u.email = ?";
        connection.query(querString, req.session.username, function(errors, results, fields) {
            if (errors) {
                throw errors;   
            }
            if (results.length > 0) {
                res.contentType('application/json');
                req.token = JSON.stringify(results);
                next();
            }
        });
    }
}
    
/*
 *  Function to authenticate a user 
 */
exports.auth = function(req, res, next){
    var username = req.body.username;
    var password = req.body.password;
    var pwd = crypto.createHash('md5').update(password).digest("hex");
    var response = '';
    var body = '';
    request.post('http://localhost:3000/auth',
    { form: { username: username, password: pwd } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            response = JSON.parse(body);
            if(typeof response.error !== "undefined")
            {
                res.render('login', {error:"Wrong combination username and password"});
            }else
            {
                req.uid = response[0].uid;
                next();
            }
            
        }
        else
        {
            res.render('login', {error: error});
        }
    } 
);
};

exports.hasAuthToken = function(req,res,next){
    if (connection) {
        var queryString = 'SELECT token FROM token where uid = ?';
        connection.query(queryString, [req.uid], function(err, rows, fields) {
            if (err) throw err;
            if(rows.length <= 0)
            {
                next();
            }
            else
            {
                if(req.session.auth_token==rows[0].auth_token)
                {
                    res.writeHead(301,{Location: '/user/'+req.uid});
                    res.end();
                }
                else
                {
                    auth_token = rows[0].auth_token;
                    req.session.auth_token = auth_token;
                    res.writeHead(301,{Location: '/user/'+req.uid});
                    res.end();                
                }

            }
        });
    }

};
//app.post('/login', user.auth, user.hasAuthToken, user.requestForAuthToken);
exports.requestForAuthToken = function(req,res){
    var auth_token = crypto.randomBytes(48).toString('hex');
    if (connection) {
    
        var queryString = 'INSERT INTO token (id, uid, token, time) VALUES (NULL, ?, ?,5259480)'
        connection.query(queryString, [req.uid,auth_token], function(err, rows, fields) {
            if (err) throw err;
            else
            {
                req.session.auth_token = auth_token;
                res.writeHead(301,{Location: '/user/'+req.uid});
                res.end();
            }
        });
    }
};

exports.isAuthTokenValid = function(req,res,next)
{
    console.log(req.url);
    if (connection) {
        var queryString = 'SELECT uid FROM token where token = ?';
        connection.query(queryString, [req.session.auth_token], function(err, rows, fields) {
            if (err) throw err;
            if(rows.length <= 0)
            {
                next();
            }
            else
            {
                res.writeHead(301,{Location: '/user/'+rows[0].uid});
                res.end();
            }
        });
        }
};

exports.isAuthed = function(req,res,next)
{
    console.log(req.url);
    if(typeof req.session.auth_token !== "undefined")
    {
        if (connection) 
        {
            var queryString = 'SELECT uid FROM token where auth_token = ?';
            connection.query(queryString, [req.session.auth_token], function(err, rows, fields) {
                if (err) throw err;
                if(rows.length <= 0)
                {
                    console.log("not Token "+req.session.auth_token);
                    //res.writeHead(301,{Location: '/login'});
                    res.end();
                }
                else
                {
                     next();
                }
            });
        }
    }
    else
    {
        console.log("not Token dude "+req.session.auth_token);
        //res.writeHead(301,{Location: '/login'});
        res.end();
    }
};
