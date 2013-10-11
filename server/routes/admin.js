
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
  response.render('admin/createuser', { title: 'Express' });
};
exports.createmeal = function(request, response){
  response.render('admin/createmeal', { title: 'Express' });
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