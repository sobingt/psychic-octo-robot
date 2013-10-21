
var database = require('../database');
var currentUser = '';

/*
 * GET users listing.
 */
exports.list = function(request, response){
  if(database.connection) {
   var queryString = "SELECT id, fname, lname, email, role FROM user WHERE is_active = 1";
   database.connection.query(queryString, function(errors, results, fields){
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
 * INSERT a new username
 */
exports.createUser = function(request, response) {
    // FIX ME
    // HASH THE PASSWORD
    // COVERT LANGUAGE AND HOBBY TO JSON
    // GET THE PICTURE UPLOAD URL
    // SET THE PROPER ROLE AND IS_ACTIVE   
    console.log(request.body); 
    var avatar = request.body.avatar
       ,location_id = ''
       ,languages = request.body.languageList
       ,hobbies = request.body.hobbiesList;
    var languages = languages.split(",");
    var hobbies = hobbies.split(",");
    var langlen = languages.length,
        element  = null,
        user_id = null,
        hobbieslen = hobbies.length;
        console.log('length '+hobbieslen);
    if (database.connection) {
        var queryString = "INSERT INTO adukala.location (street_address, area, city, state, country, pincode) VALUES (?, ?, ?, ?, ?, ?)";
        database.connection.query(queryString, [request.body.streetadd, request.body.area, request.body.city, request.body.state, request.body.country, request.body.pincode], function(errors, rows) {
            if (errors)
                response.send("The user cannot be created because of "+errors);
            location_id = rows.insertId;
            var queryString2 = "INSERT INTO adukala.user (fname, lname, email, password, bio, phone, picture, role, location_id, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            database.connection.query(queryString2, [request.body.fname, request.body.lname, request.body.email, request.body.password, request.body.bio, request.body.phone, avatar, request.body.role, location_id, request.body.is_active], function(errors, rows1) {
            if (errors)
                response.send("The user cannot be created because of "+errors);
            else
                user_id = rows1.insertId;   
                for (var i = 0; i < langlen; i++) {
                    element = languages[i];
                    console.log('ele '+element);
                    var queryString = "SELECT t.tid FROM tags t LEFT JOIN vocabulary v ON t.vid = v.vid WHERE v.name = 'language' AND t.name = ?";
                    database.connection.query(queryString, element, function(errors, rows2, element) {
                        if (errors)
                            throw errors;
                        console.log('find term row '+rows2);
                        if (rows2.length === 0) {
                            //var query = "SELECT vid FROM adukala.vocabulary WHERE name = 'language'";
                            //database.connection.query(query, function(errors, row){
                            //    if (errors) throw errors;
                                var vid = 1;
                                //console.log('rows '+row);
                                var queryString1 = "INSERT INTO adukala.tags (vid, name) VALUES (?, ?)";
                                database.connection.query(queryString1, [vid, element], function(errors, rows3, element){
                                   if (errors) throw errors;
                                    console.log(rows3);
                                    var tid = rows3.insertId;
                                    var insertTag = "INSERT INTO adukala.user_tags (uid, tid) VALUES (?, ?);"
                                    database.connection.query(insertTag, [user_id, tid], function(errors, rows4){
                                        console.log(rows4);
                                        if (errors) throw errors;
                                    });
                                });
                            //});
                        }
                        else {
                            var insertTag = "INSERT INTO adukala.user_tags (uid, tid) VALUES (?, ?);"
                            database.connection.query(insertTag, [user_id, rows2], function(errors, rows5){
                                console.log(rows5);
                                if (errors) throw errors;
                            });
                        }        
                    });    
                };
                /*for (var i = 0; i < hobbieslen; i++) {
                    element = hobbies[i];
                    console.log('ele '+element);
                    var queryString = "SELECT t.name FROM tags t LEFT JOIN vocabulary v ON t.vid = v.vid WHERE v.name = 'hobbies' AND t.name = ?";
                    database.connection.query(queryString, element, function(errors, result) {
                        if (errors)
                            throw errors;
                        console.log('find term row '+result);
                        if (result.length == 0) {
                            //var query = "SELECT vid FROM adukala.vocabulary WHERE name = 'language'";
                            //database.connection.query(query, function(errors, row){
                            //    if (errors) throw errors;
                                var vid = 6;
                                //console.log('rows '+row);
                                var queryString1 = "INSERT INTO adukala.tags (vid, name) VALUES (?, ?)";
                                database.connection.query(queryString1, [vid, element], function(errors, result1){
                                    console.log(result1);
                                   if (errors) throw errors;
                                    var tid = result1.insertId;
                                    var insertTag = "INSERT INTO adukala.user_tags (uid, tid) VALUES (?, ?);"
                                    database.connection.query(insertTag, [user_id, tid], function(errors, result2){
                                        console.log(result2);
                                        if (errors) throw errors;
                                    });
                                });
                            //});
                        }
                        else {
                            var insertTagh = "INSERT INTO adukala.user_tags (uid, tid) VALUES (?, ?);"
                            database.connection.query(insertTagh, [user_id, result], function(errors, result3){
                                console.log(result3);
                                if (errors) throw errors;
                            });
                        }        
                    });    
                }*/

            //var queryString3 = "INSERT INTO adukala.user (fname, lname, email, password, bio, phone, picture, role, location_id, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                //response.setHeader("Location", "/admin");
                response.end();
            });
        });
    }
};

/*function findTag(element, vocab) {
    if (database.connection) {
        var queryString = "SELECT t.name FROM tags t LEFT JOIN vocabulary v ON t.vid = v.vid WHERE v.name = ? AND t.name = ?";
        database.connection.query(queryString, vocab, element, function(errors, rows) {
            if (errors)
                throw errors;
            console.log(rows);
            if (rows.length > 0)
                return true;
            else
                return false;
        });
    }
}*/



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
