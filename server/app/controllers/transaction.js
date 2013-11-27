var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {
    auto_reconnect: true
});
db = new Db('foodbmg', server, {
    safe: true
});

db.open(function (err, db) {
    if (!err) {
        console.log("Connected to 'foodbmg' database");
        //populateDB();
        db.collection('transaction', {
            safe: true
        }, function (err, collection) {
            if (err) {
                console.log("The 'foodbmg' collection doesn't exist. Creating it with sample data...");
                //populateDB();
            }
        });
    }
});

exports.addTransaction = function (req, res) {
	req.body.userId=req.user._id;
	req.body.userName=req.user.facebook.name;
	console.log("inside add transaction");
    var transaction = req.body;
    console.log('Adding transaction: ' + JSON.stringify(transaction));
    db.collection('transaction', function (err, collection) {
        collection.insert(transaction, {
            safe: true
        }, function (err, result) {
            if (err) {
                res.send({
                    'error': 'An error has occurred'
                });
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.confirmTransaction=function(req,res){
	var id=req.params.id;
	//console.log(req.body);
	console.log(id);
	db.collection('transaction',function(errr,collection){
	/*collection.findAndModify({_id:id},[['_id','asc']],{$set:{status:"Success"}},{}, function(err,result){
		if (err) {
                console.log('Error updating meal: ' + err);
                res.send({
                    'error': 'An error has occurred'
                });
            } else {
						console.log("success");
						console.log(result);
					}
		});*/
	collection.update({_id:new BSON.ObjectID(id)},{$set:{status:"Success"}},{safe:true},function(err,result){
		if (err) {
                console.log('Error updating meal: ' + err);
                res.send({
                    'error': 'An error has occurred'
                });
            } else {
						res.send("success");
						console.log(result);
					}
		});
		
	//db.collection.find({ _id:id });
	
	});
}

exports.getTransaction = function (req, res) {
	console.log("inside get transaction");
	var payment = null;
	payment={
		userid:req.user._id,
		username : req.user.facebook.name
		}
	res.send(payment);
}