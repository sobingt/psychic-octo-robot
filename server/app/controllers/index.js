//TODO  have to work on ACL
// Checks whether the request is allowed. 
exports.checkAuthentication = function(req, res, next){
	if (!req.isAuthenticated()) {
		console.log('Unauthorized Request!!!');
		res.send(401);
	} else {
		console.log('Authorized Request!!!');
		next();
	}
};