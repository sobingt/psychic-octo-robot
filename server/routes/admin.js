
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('admin/index', { title: 'Express' });
};
exports.createuser = function(req, res){
  res.render('admin/createuser', { title: 'Express' });
};
exports.createmeal = function(req, res){
  res.render('admin/createmeal', { title: 'Express' });
};