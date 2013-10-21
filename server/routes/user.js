
var database = require('../database');

var currentUser = '';

/*
 * GET users listing.
 */
exports.list = function(request, response){
  if(database.connection) {
   var queryString = "SELECT id, fname, lname, email, role FROM user WHERE is_active = 1";
   database.connection.query(queryString, function(errors, results, fields){
    if (errors) {
        throw errors;
    }
    if (results.length > 0) {  
        response.contentType('application/json');
        response.send(JSON.stringify(results));
        response.end();
        next();
    }
   });      
  }
};



/*
 * GET The data for the user edit form for admin
 */
exports.getUser = function(request, response) {
    if (database.connection) {
        var queryString = "SELECT u.fname, u.lname, u.email, u.password, u.bio, u.phone, u.picture, GROUP_CONCAT(t.name) as tags FROM user u LEFT JOIN user_tags ut ON u.id = ut.uid LEFT JOIN tags t ON ut.tid = t.tid WHERE id=?";
        database.connection.query(queryString, request.params.id, function(errors, results, fields) {
            if (errors) throw errors;
            if (results.length > 0) {
                response.contentType('application/json');
                response.send(JSON.stringify(results));
                response.end();
            }
        });
    }
};



/*
 * GET The homechefs by city
 */
exports.getChefbyCity = function(request, response) {
    if (database.connection) {
        var city = request.params.city;
        var queryString = "SELECT u.fname, u.lname, u.email, u.password, u.bio, u.phone, u.picture, GROUP_CONCAT(t.name) as tags, l.street_address, l.area, c.city, l.state, l.country, l.pincode FROM homechef h LEFT JOIN user u ON h.uid = u.id LEFT JOIN location l ON l.id = u.location_id LEFT JOIN city c ON c.id = l.city LEFT JOIN user_tags ut ON u.id = ut.uid LEFT JOIN tags t ON ut.tid = t.tid WHERE c.city=?";
        database.connection.query(queryString, city, function(errors, results, fields) {
            if (errors) throw errors;
            if (results.length > 0) {
                response.contentType('application/json');
                response.send(JSON.stringify(results));
                response.end();
            }
        });
    }
};


/*
 * GET The homechef by ID.
 */
exports.getChefbyId = function(request, response) {
    if (database.connection) {
        var id = request.params.id;
        var queryString = "SELECT u.fname, u.lname, u.email, u.password, u.bio, u.phone, u.picture, GROUP_CONCAT(t.name) as tags, l.street_address, l.area, c.city, l.state, l.country, l.pincode FROM homechef h LEFT JOIN user u ON h.uid = u.id LEFT JOIN location l ON l.id = u.location_id LEFT JOIN city c ON c.id = l.city LEFT JOIN user_tags ut ON u.id = ut.uid LEFT JOIN tags t ON ut.tid = t.tid WHERE h.uid=?";
        database.connection.query(queryString, id, function(errors, results, fields) {
            if (errors) throw errors;
            if (results.length > 0) {
                response.contentType('application/json');
                response.send(JSON.stringify(results));
                console.log("The Error "+results.length );
                response.end();
            }
            else
            {
             console.log("The Error")
            }
        });
    }
};


/*
 * GET The meals of homechef by ID.
 */
exports.getChefMealbyId = function(request, response) {
    if (database.connection) {
        var id = request.params.id;
        var queryString = "SELECT m.name, m.description, m.picture, m.cost, m.max_allowed, GROUP_CONCAT(DISTINCT d.name) as menu, GROUP_CONCAT(DISTINCT t.name) as tags, m.advance_lead_time, l.street_address, l.area, c.city, l.state, l.country, l.pincode FROM meal m LEFT JOIN location l ON m.location_id = l.id LEFT JOIN city c ON l.city = c.id LEFT JOIN menu mn ON m.menu_id = mn.menu_id LEFT JOIN dish d ON mn.dish_id = d.id LEFT JOIN meal_tags mt ON m.id =  mt.mid LEFT JOIN tags t ON mt.tid = t.tid WHERE m.uid = ? GROUP BY m.id ";
        database.connection.query(queryString, id, function(errors, results, fields) {
            if (errors) throw errors;
            if (results.length > 0) {
                response.contentType('application/json');
                response.send(JSON.stringify(results));
                response.end();
            }
        });
    }
};


/*
 * GET The Dineouts of homechef by ID.
 */
exports.getChefDineoutbyId = function(request, response) {
    if (database.connection) {
        var id = request.params.id;
        var queryString = "SELECT m.name, m.description, m.picture, m.cost, m.max_allowed, GROUP_CONCAT(DISTINCT d.name) as menu, GROUP_CONCAT(DISTINCT t.name) as tags, do.date, m.advance_lead_time, l.street_address, l.area, c.city, l.state, l.country, l.pincode FROM dineout do LEFT JOIN meal m ON do.meal_id = m.id LEFT JOIN location l ON m.location_id = l.id LEFT JOIN city c ON l.city = c.id LEFT JOIN menu mn ON m.menu_id = mn.menu_id LEFT JOIN dish d ON mn.dish_id = d.id LEFT JOIN meal_tags mt ON m.id =  mt.mid LEFT JOIN tags t ON mt.tid = t.tid WHERE m.uid = ? GROUP BY m.id ";
        database.connection.query(queryString, id, function(errors, results, fields) {
            if (errors) throw errors;
            if (results.length > 0) {
                response.contentType('application/json');
                response.send(JSON.stringify(results));
                response.end();
            }
        });
    }
};

/*
 * UPDATE the user
 */
exports.updateUser = function(request, response) {
    //FIX ME
    //  HASH THE PASSWORDS AND COVERT THE LANGUAGE< HOBBY TO JSON, CONVERT THE URL OF THE PICTURE.
    //
    if (database.connection) {
        var queryString = "UPDATE adukala.user SET fname =?, lname =?, email =?, password =?, bio =?, phone =?, picture =? WHERE id = ?";
        database.connection.query(queryString, [request.body.fname, request.body.lname, request.body.email, request.body.password, request.body.bio, request.body.picture], function(errors, rows) {
            if (errors)
                response.send("The User cannot be saved");
                response.end();
        });
    }
};


/*
 * INSERT a new user
 */
exports.createUser = function(request, response) {
    
    // FIX ME
    // HASH THE PASSWORD
    // COVERT LANGUAGE AND HOBBY TO JSON
    // GET THE PICTURE UPLOAD URL
    // SET THE PROPER ROLE AND IS_ACTIVE    
    if (database.connection) {
        var queryString = "INSERT INTO adukala.user (fname, lname, email, password, bio, phone, picture, language, hobby, role, is_active) VALUES ('?', '?', '?', ?, '?', ?, ?, '?', '?', '?', ?)";
        database.connection.query(queryString, [request.body.fname, request.body.lname, request.body.email, request.body.password, request.body.bio, request.body.phone, request.body.picture, request.body.language, request.body.hobby, request.body.role, request.body.is_active], function(errors, rows) {
            if (errors)
                response.send("The user cannot be created because of"+errors);
                response.end();
        });
    }
};


/*
 * DISABLE a user
 */
exports.disable = function(request, response) {
    if (database.connection) {
        var queryString = "UPDATE adukala.user SET is_active = 0 WHERE id = ?";
        database.connection.query(queryString, request.params.id, function(errors, rows) {
            if (errors)
                response.send('The user cannot be disabled beacause of'+ errors);
        });
    }
};

/*
 * Get the saved token for a particular user
 */

exports.getToken = function(request, response, next) {
    if (database.connection) {
        var querString = "SELECT t.token FROM token t LEFT JOIN user u ON t.uid = u.id WHERE u.email = ?";
        database.connection.query(querString, request.session.username, function(errors, results, fields) {
            if (errors) {
                throw errors;   
            }
            if (results.length > 0) {
                response.contentType('application/json');
                request.token = JSON.stringify(results);
                next();
            }
        });
    }
}
    
/*
 *  Function to authenticate a user 
 */
exports.auth = function(request, response, next){
    var username = request.body.username;
    var password = request.body.password;
    var pwd = crypto.createHash('md5').update(password).digest("hex");
    var responseponse = '';
    var body = '';
    requestuest.post('/auth',
    { form: { username: username, password: pwd } },
    function (error, responseponse, body) {
        if (!error && responseponse.statusCode == 200) {
            responseponse = JSON.parse(body);
            if(typeof responseponse.error !== "undefined")
            {
                response.render('login', {error:"Wrong combination username and password"});
            }else
            {
                request.uid = responseponse[0].uid;
                next();
            }
            
        }
        else
        {
            response.render('login', {error: error});
        }
    } 
);
};

exports.hasAuthToken = function(request,response,next){
    if (database.connection) {
        var queryString = 'SELECT token FROM token where uid = ?';
        database.connection.query(queryString, [request.uid], function(err, rows, fields) {
            if (err) throw err;
            if(rows.length <= 0)
            {
                next();
            }
            else
            {
                if(request.session.auth_token==rows[0].auth_token)
                {
                    response.writeHead(301,{Location: '/user/'+request.uid});
                    response.end();
                }
                else
                {
                    auth_token = rows[0].auth_token;
                    request.session.auth_token = auth_token;
                    response.writeHead(301,{Location: '/user/'+request.uid});
                    response.end();                
                }

            }
        });
    }

};
//app.post('/login', user.auth, user.hasAuthToken, user.requestuestForAuthToken);
exports.requestuestForAuthToken = function(request,response){
    var auth_token = crypto.randomBytes(48).toString('hex');
    if (database.connection) {
    
        var queryString = 'INSERT INTO token (id, uid, token, time) VALUES (NULL, ?, ?,5259480)'
        database.connection.query(queryString, [request.uid,auth_token], function(err, rows, fields) {
            if (err) throw err;
            else
            {
                request.session.auth_token = auth_token;
                response.writeHead(301,{Location: '/user/'+request.uid});
                response.end();
            }
        });
    }
};

exports.isAuthTokenValid = function(request,response,next)
{
    console.log(request.url);
    if (database.connection) {
        var queryString = 'SELECT uid FROM token where token = ?';
        database.connection.query(queryString, [request.session.auth_token], function(err, rows, fields) {
            if (err) throw err;
            if(rows.length <= 0)
            {
                next();
            }
            else
            {
                response.writeHead(301,{Location: '/user/'+rows[0].uid});
                response.end();
            }
        });
        }
};

exports.isAuthed = function(request,response,next)
{
    console.log(request.url);
    if(typeof request.session.auth_token !== "undefined")
    {
        if (database.connection) 
        {
            var queryString = 'SELECT uid FROM token where auth_token = ?';
            database.connection.query(queryString, [request.session.auth_token], function(err, rows, fields) {
                if (err) throw err;
                if(rows.length <= 0)
                {
                    console.log("not token "+request.session.auth_token);
                    //response.writeHead(301,{Location: '/login'});
                    response.end();
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
        console.log("not token dude "+request.session.auth_token);
        //response.writeHead(301,{Location: '/login'});
        response.end();
    }
};

exports.isAuth = function(email,password,callback)
{
    if (database.connection) {
            var queryString = "SELECT id FROM user WHERE email=? AND password=?";
            database.connection.query(queryString, [email,password], function(errors, results, fields) {
                if (errors) throw errors;
                if (results.length > 0) {
                    callback(true,results[0].id);
                    console.log("success "+results[0].id);
                }
                else
                {
                    callback(false,0);
                    console.log("Failed");
                }
            });
        }};


// export "login" module to handle login
exports.login = function(req, res) {
    console.log(req.body);
    //HACK: neeed to solve it
    require('./user').isAuth(req.body.email,req.body.pass,function(bool,uid){
            if(bool)
            {
                currentUser = uid;
                res.send({
                    success: true
                });
            }
            else
            {
                res.send(500, { success: true }); 
            }
    });};

exports.getUserById = function(id,callback) {
    if (database.connection) {
        var queryString = "SELECT u.fname, u.lname, u.email, u.password, u.bio, u.phone, u.picture, GROUP_CONCAT(t.name) as tags        FROM user u LEFT JOIN user_tags ut ON u.id = ut.uid          LEFT JOIN tags t ON ut.tid = t.tid         WHERE id=?";
        database.connection.query(queryString, id, function(errors, results, fields) {
            if (errors) throw errors;
            if (results.length > 0) {
                callback(true,results[0])
            }
            else
            {
                callback(false,0)

            }
        });
    }
};


// export "search" module to handle user search
exports.me = function(req, res) {
    require('./user').getUserById(currentUser, function(bool,user){
        if(bool)
        {
            var name =user.fname+" "+user.lname;
             res.send({
                name:  name,
                uid: user.id,
                pos:   user.bio,
                url:   user.picture,
                loc:   user.fname
            });
        } 
        else 
        {
            res.send(500, { success: false });
        }

    })

    //currentUser = '';
};