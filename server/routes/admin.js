
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('admin/index', { title: 'Express' });
};
exports.meal = function(req, res){
  res.render('admin/meal', { title: 'Express' });
};
exports.user = function(req, res){
  res.render('admin/user', { title: 'Express' });
};
exports.createuser = function(req, res){
  res.render('admin/createuser', { title: 'Express' });
};
exports.createmeal = function(req, res){
  res.render('admin/createmeal', { title: 'Express' });
};
exports.edituser = function(req, res){
  res.render('admin/edituser', { title: 'Express' });
};
exports.editmeal = function(req, res){
  res.render('admin/editmeal', { title: 'Express' });
};
exports.deleteuser = function(req, res){
  res.render('admin/deleteuser', { title: 'Express' });
};
exports.deletemeal = function(req, res){
  res.render('admin/deletemeal', { title: 'Express' });
};