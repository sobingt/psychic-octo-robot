
var mysql = require('mysql');
var connection = mysql.createConnection({ host: 'localhost',
                                        user: 'root',
                                        password: '',
                                        database: 'adukala'
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
                req.userInfo = JSON.stringify(results);
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
        var queryString = "UPDATE adukala.user SET fname =?, lname =?, email =?, password =?, bio =?, phone =?, picture =?, language =?, hobby =? WHERE id = ?";
        connection.query(queryString, [req.body.fname, req.body.lname, req.body.email, req.body.password, req.body.bio, req.body.picture, req.body.language, req.body.hobby], function(errors, rows) {
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

exports.getToken = function(req, res, next) {
    if (connection) {
        var querString = "SELECT token FROM token WHERE uid = ?";
        connection.query(querString, req.session.uid, function(errors, results, fields) {
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
