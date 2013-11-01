var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('foodbmg', server, {safe: true});

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'foodbmg' database");
        populateDB();
        db.collection('foodbmg', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'foodbmg' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

exports.findById = function(req, res) {
    console.log("find");
    var id = req.params.id;
    console.log('Retrieving meal: ' + id);
    db.collection('foodbmg', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
             res.header('Access-Control-Allow-Origin', "*");     // TODO - Make this more secure!!
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
        res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
        
            res.send(item);
        });
    });
};

exports.findUserById = function(req, res) {
    console.log("find");
    var id = req.params.id;
    console.log('Retrieving user: ' + id);
    db.collection('users', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.header('Access-Control-Allow-Origin', "*");     // TODO - Make this more secure!!
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
            res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('foodbmg', function(err, collection) {
        collection.find().toArray(function(err, items) {
            console.log(items);
            res.send(items);
        });
    });
};

exports.findAllUsers = function(req, res) {
    db.collection('users', function(err, collection) {
        collection.find().toArray(function(err, items) {
            console.log(items);
            res.send(items);
        });
    });
};

exports.addMeal = function(req, res) {
    var meal = req.body;
    console.log('Adding meal: ' + JSON.stringify(meal));
    db.collection('foodbmg', function(err, collection) {
        collection.insert(meal, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateMeal = function(req, res) {
    var id = req.params.id;
    var meal = req.body;
    delete meal._id;
    console.log('Updating meal: ' + id);
    console.log(JSON.stringify(meal));
    db.collection('foodbmg', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, meal, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating meal: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(meal);
            }
        });
    });
}

exports.updateUser = function(req, res) {
    var id = req.params.id;
    var user = req.body;
    console.log(req.body);
    res.send(req.body);
    delete user._id;
    console.log('Updating user: ' + id);
    console.log(JSON.stringify(user));
    db.collection('users', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, user, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating user: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(user);
            }
        });
    });
}

exports.deleteMeal = function(req, res) {
    var id = req.params.id;
    console.log('Deleting meal: ' + id);
    db.collection('foodbmg', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

    var users = [{
    "name": "Akshat Verma",
    "fname": "akshat",
    "lname": "verma",
    "email": "akshat@bitbrothers.com",
    "password": "abc123",
    "bio": "hasdasdajhsdasndmabm,xhczxmcjlcansmn.xczc",
    "phone": "02525274529",
    "picture": "saint_cosme.jpg",
    "location": {
        "id": 1,
        "latitude": "",
        "longitude": "",
        "street_address": "street",
        "area": "araea",
        "city": "mumbai",
        "state": "maharashtra",
        "country": "india",
        "pincode": "400072"
    },
    "is_active": "yes",
    "facebook_id": "123123123",
    "role": "admin",
    "language": [
        {
            "value": "hindi"
        },
        {
            "value": "english"
        }
    ],
    "hobbies": [
        {
            "value": "internet"
        },
        {
            "value": "reading"
        }
    ]
}
]
    var meals = [
    {
        "name": "DUCK A LORANGE ITALIAN STYLE",
        "description": "Im going to make you discover some traditional dishes from Italy. Our trip starts in Lombardia since I will serve schiacciatina as a starter, a crunchy and thin bread of pizza with parmesan cheese, aromatic herbs and olive oil. Then we will move to my region, Veneto! There you will taste the flavour of my land and my traditions: I will serve homemade gnocchi (recipe of my mother) with gorgonzola, aromatic herbs and walnuts. Afterwards we will head to Tuscany, where we will enjoy a really fine dish: breast of duck with a sauce of red meal,orange juice, cinnamon and caramelized orange, served with a rocked salad and fennel. For dessert, a fruit salad using fruit of the season. For drinking I will serve a good Italian red meal and for aperitif an iced tea. I choose and I buy every ingredient in the market of Santa Caterina so as to use the most fresh products.Start the week with Italian style and join me for dinner tonight!",
        "meal_type": "Dinner",
        "cuisine_type": "Italian, Mediterranean",
        "dishes": "Main Course, Appetizers",
        "alcohol": "Wine",
        "fit_for": "Unique Location, Outdoor Dining, Professional Chef, Company Events",
        "created": "Wed Oct 13 2013 07:43:05 GMT+0530 (India Standard Time)",
        "picture": "saint_cosme.jpg",
        "host": {
            "id": 1,
            "fname": "Sobin",
            "lname": "Thomas",
            "email": "sobingt@gmail.com"
        },
        "cost": {
            "amount": 200,
            "currency": "USD"
        },
        "max_allowed": 10,
        "min_allowed": 2,
        "duration": 1,
        "host_with": "I host with a friend",
        "host_how": "When I host I just serve the meal",
        "address": {
            "street": "Shivling, Off Holy Cross Road,",
            "apartment": "A",
            "floor": "502"
        },
        "amenities": "Free Parking on Premises, Paid Parking",
        "availability": [
            {
                "date": "12/07/2013",
                "time": "21:00",
                "repeat": "repeat weekly"
            },
            {
                "date": "12/07/2013",
                "time": "10:00",
                "repeat": "repeat weekly"
            }
        ]
    },
    {
        "name": "A TASTE OF MEDITERRANEAN SEA",
        "description": "I’m going make you try the delicious tastes of the Barcelona’s fish and seafood. As starter I will serve two tapas and one pintxo: fried squids, mussels with onion and white meal, bread with goat cheese, shrimps and curry. As main dish I will serve a Greek recipe that an Albanian guy taught to me: sea breams with potatos, olives, garlic, onion and white meal. For drinking I will serve a good white meal! I choose and I buy every ingredient in the Market of Santa Caterina so as to use the most fresh products",
        "meal_type": "Dinner",
        "cuisine_type": "Mediterranean",
        "dishes": "Main Course, Appetizers",
        "alcohol": "Wine",
        "fit_for": "Unique Location, Outdoor Dining, Professional Chef, Company Events",
        "created": "Wed Oct 13 2013 07:43:05 GMT+0530 (India Standard Time)",
        "picture": "saint_cosme.jpg",
        "host": {
            "id": 1,
            "fname": "Sobin",
            "lname": "Thomas",
            "email": "sobingt@gmail.com"
        },
        "cost": {
            "amount": 200,
            "currency": "USD"
        },
        "max_allowed": 10,
        "min_allowed": 2,
        "duration": 1,
        "host_with": "I host with a friend",
        "host_how": "When I host I just serve the meal",
        "address": {
            "street": "Shivling, Off Holy Cross Road,",
            "apartment": "A",
            "floor": "502"
        },
        "amenities": "Free Parking on Premises, Paid Parking",
        "availability": [
            {
                "date": "12/07/2013",
                "time": "21:00",
                "repeat": "repeat weekly"
            },
            {
                "date": "12/07/2013",
                "time": "10:00",
                "repeat": "repeat weekly"
            }
        ]
    },
    {
        "name": "DUCK A LORANGE ITALIAN STYLE",
        "description": "Im going to make you discover some traditional dishes from Italy. Our trip starts in Lombardia since I will serve schiacciatina as a starter, a crunchy and thin bread of pizza with parmesan cheese, aromatic herbs and olive oil. Then we will move to my region, Veneto! There you will taste the flavour of my land and my traditions: I will serve homemade gnocchi (recipe of my mother) with gorgonzola, aromatic herbs and walnuts. Afterwards we will head to Tuscany, where we will enjoy a really fine dish: breast of duck with a sauce of red meal,orange juice, cinnamon and caramelized orange, served with a rocked salad and fennel. For dessert, a fruit salad using fruit of the season. For drinking I will serve a good Italian red meal and for aperitif an iced tea. I choose and I buy every ingredient in the market of Santa Caterina so as to use the most fresh products.Start the week with Italian style and join me for dinner tonight!",
        "meal_type": "Dinner",
        "cuisine_type": "Italian, Mediterranean",
        "dishes": "Main Course, Appetizers",
        "alcohol": "Wine",
        "fit_for": "Unique Location, Outdoor Dining, Professional Chef, Company Events",
        "created": "Wed Oct 13 2013 07:43:05 GMT+0530 (India Standard Time)",
        "picture": "saint_cosme.jpg",
        "host": {
            "id": 1,
            "fname": "Sobin",
            "lname": "Thomas",
            "email": "sobingt@gmail.com"
        },
        "cost": {
            "amount": 200,
            "currency": "USD"
        },
        "max_allowed": 10,
        "min_allowed": 2,
        "duration": 1,
        "host_with": "I host with a friend",
        "host_how": "When I host I just serve the meal",
        "address": {
            "street": "Shivling, Off Holy Cross Road,",
            "apartment": "A",
            "floor": "502"
        },
        "amenities": "Free Parking on Premises, Paid Parking",
        "availability": [
            {
                "date": "12/07/2013",
                "time": "21:00",
                "repeat": "repeat weekly"
            },
            {
                "date": "12/07/2013",
                "time": "10:00",
                "repeat": "repeat weekly"
            }
        ]
    },
    {
        "name": "DUCK A LORANGE ITALIAN STYLE",
        "description": "Im going to make you discover some traditional dishes from Italy. Our trip starts in Lombardia since I will serve schiacciatina as a starter, a crunchy and thin bread of pizza with parmesan cheese, aromatic herbs and olive oil. Then we will move to my region, Veneto! There you will taste the flavour of my land and my traditions: I will serve homemade gnocchi (recipe of my mother) with gorgonzola, aromatic herbs and walnuts. Afterwards we will head to Tuscany, where we will enjoy a really fine dish: breast of duck with a sauce of red meal,orange juice, cinnamon and caramelized orange, served with a rocked salad and fennel. For dessert, a fruit salad using fruit of the season. For drinking I will serve a good Italian red meal and for aperitif an iced tea. I choose and I buy every ingredient in the market of Santa Caterina so as to use the most fresh products.Start the week with Italian style and join me for dinner tonight!",
        "meal_type": "Dinner",
        "cuisine_type": "Italian, Mediterranean",
        "dishes": "Main Course, Appetizers",
        "alcohol": "Wine",
        "fit_for": "Unique Location, Outdoor Dining, Professional Chef, Company Events",
        "created": "Wed Oct 13 2013 07:43:05 GMT+0530 (India Standard Time)",
        "picture": "saint_cosme.jpg",
        "host": {
            "id": 1,
            "fname": "Sobin",
            "lname": "Thomas",
            "email": "sobingt@gmail.com"
        },
        "cost": {
            "amount": 200,
            "currency": "USD"
        },
        "max_allowed": 10,
        "min_allowed": 2,
        "duration": 1,
        "host_with": "I host with a friend",
        "host_how": "When I host I just serve the meal",
        "address": {
            "street": "Shivling, Off Holy Cross Road,",
            "apartment": "A",
            "floor": "502"
        },
        "amenities": "Free Parking on Premises, Paid Parking",
        "availability": [
            {
                "date": "12/07/2013",
                "time": "21:00",
                "repeat": "repeat weekly"
            },
            {
                "date": "12/07/2013",
                "time": "10:00",
                "repeat": "repeat weekly"
            }
        ]
    },
    {
        "name": "DUCK A LORANGE ITALIAN STYLE",
        "description": "Im going to make you discover some traditional dishes from Italy. Our trip starts in Lombardia since I will serve schiacciatina as a starter, a crunchy and thin bread of pizza with parmesan cheese, aromatic herbs and olive oil. Then we will move to my region, Veneto! There you will taste the flavour of my land and my traditions: I will serve homemade gnocchi (recipe of my mother) with gorgonzola, aromatic herbs and walnuts. Afterwards we will head to Tuscany, where we will enjoy a really fine dish: breast of duck with a sauce of red meal,orange juice, cinnamon and caramelized orange, served with a rocked salad and fennel. For dessert, a fruit salad using fruit of the season. For drinking I will serve a good Italian red meal and for aperitif an iced tea. I choose and I buy every ingredient in the market of Santa Caterina so as to use the most fresh products.Start the week with Italian style and join me for dinner tonight!",
        "meal_type": "Dinner",
        "cuisine_type": "Italian, Mediterranean",
        "dishes": "Main Course, Appetizers",
        "alcohol": "Wine",
        "fit_for": "Unique Location, Outdoor Dining, Professional Chef, Company Events",
        "created": "Wed Oct 13 2013 07:43:05 GMT+0530 (India Standard Time)",
        "picture": "saint_cosme.jpg",
        "host": {
            "id": 1,
            "fname": "Sobin",
            "lname": "Thomas",
            "email": "sobingt@gmail.com"
        },
        "cost": {
            "amount": 200,
            "currency": "USD"
        },
        "max_allowed": 10,
        "min_allowed": 2,
        "duration": 1,
        "host_with": "I host with a friend",
        "host_how": "When I host I just serve the meal",
        "address": {
            "street": "Shivling, Off Holy Cross Road,",
            "apartment": "A",
            "floor": "502"
        },
        "amenities": "Free Parking on Premises, Paid Parking",
        "availability": [
            {
                "date": "12/07/2013",
                "time": "21:00",
                "repeat": "repeat weekly"
            },
            {
                "date": "12/07/2013",
                "time": "10:00",
                "repeat": "repeat weekly"
            }
        ]
    },
    {
        "name": "DUCK A LORANGE ITALIAN STYLE",
        "description": "Im going to make you discover some traditional dishes from Italy. Our trip starts in Lombardia since I will serve schiacciatina as a starter, a crunchy and thin bread of pizza with parmesan cheese, aromatic herbs and olive oil. Then we will move to my region, Veneto! There you will taste the flavour of my land and my traditions: I will serve homemade gnocchi (recipe of my mother) with gorgonzola, aromatic herbs and walnuts. Afterwards we will head to Tuscany, where we will enjoy a really fine dish: breast of duck with a sauce of red meal,orange juice, cinnamon and caramelized orange, served with a rocked salad and fennel. For dessert, a fruit salad using fruit of the season. For drinking I will serve a good Italian red meal and for aperitif an iced tea. I choose and I buy every ingredient in the market of Santa Caterina so as to use the most fresh products.Start the week with Italian style and join me for dinner tonight!",
        "meal_type": "Dinner",
        "cuisine_type": "Italian, Mediterranean",
        "dishes": "Main Course, Appetizers",
        "alcohol": "Wine",
        "fit_for": "Unique Location, Outdoor Dining, Professional Chef, Company Events",
        "created": "Wed Oct 13 2013 07:43:05 GMT+0530 (India Standard Time)",
        "picture": "saint_cosme.jpg",
        "host": {
            "id": 1,
            "fname": "Sobin",
            "lname": "Thomas",
            "email": "sobingt@gmail.com"
        },
        "cost": {
            "amount": 200,
            "currency": "USD"
        },
        "max_allowed": 10,
        "min_allowed": 2,
        "duration": 1,
        "host_with": "I host with a friend",
        "host_how": "When I host I just serve the meal",
        "address": {
            "street": "Shivling, Off Holy Cross Road,",
            "apartment": "A",
            "floor": "502"
        },
        "amenities": "Free Parking on Premises, Paid Parking",
        "availability": [
            {
                "date": "12/07/2013",
                "time": "21:00",
                "repeat": "repeat weekly"
            },
            {
                "date": "12/07/2013",
                "time": "10:00",
                "repeat": "repeat weekly"
            }
        ]
    },
    {
        "name": "DUCK A LORANGE ITALIAN STYLE",
        "description": "Im going to make you discover some traditional dishes from Italy. Our trip starts in Lombardia since I will serve schiacciatina as a starter, a crunchy and thin bread of pizza with parmesan cheese, aromatic herbs and olive oil. Then we will move to my region, Veneto! There you will taste the flavour of my land and my traditions: I will serve homemade gnocchi (recipe of my mother) with gorgonzola, aromatic herbs and walnuts. Afterwards we will head to Tuscany, where we will enjoy a really fine dish: breast of duck with a sauce of red meal,orange juice, cinnamon and caramelized orange, served with a rocked salad and fennel. For dessert, a fruit salad using fruit of the season. For drinking I will serve a good Italian red meal and for aperitif an iced tea. I choose and I buy every ingredient in the market of Santa Caterina so as to use the most fresh products.Start the week with Italian style and join me for dinner tonight!",
        "meal_type": "Dinner",
        "cuisine_type": "Italian, Mediterranean",
        "dishes": "Main Course, Appetizers",
        "alcohol": "Wine",
        "fit_for": "Unique Location, Outdoor Dining, Professional Chef, Company Events",
        "created": "Wed Oct 13 2013 07:43:05 GMT+0530 (India Standard Time)",
        "picture": "saint_cosme.jpg",
        "host": {
            "id": 1,
            "fname": "Sobin",
            "lname": "Thomas",
            "email": "sobingt@gmail.com"
        },
        "cost": {
            "amount": 200,
            "currency": "USD"
        },
        "max_allowed": 10,
        "min_allowed": 2,
        "duration": 1,
        "host_with": "I host with a friend",
        "host_how": "When I host I just serve the meal",
        "address": {
            "street": "Shivling, Off Holy Cross Road,",
            "apartment": "A",
            "floor": "502"
        },
        "amenities": "Free Parking on Premises, Paid Parking",
        "availability": [
            {
                "date": "12/07/2013",
                "time": "21:00",
                "repeat": "repeat weekly"
            },
            {
                "date": "12/07/2013",
                "time": "10:00",
                "repeat": "repeat weekly"
            }
        ]
    },
    {
        "name": "DUCK A LORANGE ITALIAN STYLE",
        "description": "Im going to make you discover some traditional dishes from Italy. Our trip starts in Lombardia since I will serve schiacciatina as a starter, a crunchy and thin bread of pizza with parmesan cheese, aromatic herbs and olive oil. Then we will move to my region, Veneto! There you will taste the flavour of my land and my traditions: I will serve homemade gnocchi (recipe of my mother) with gorgonzola, aromatic herbs and walnuts. Afterwards we will head to Tuscany, where we will enjoy a really fine dish: breast of duck with a sauce of red meal,orange juice, cinnamon and caramelized orange, served with a rocked salad and fennel. For dessert, a fruit salad using fruit of the season. For drinking I will serve a good Italian red meal and for aperitif an iced tea. I choose and I buy every ingredient in the market of Santa Caterina so as to use the most fresh products.Start the week with Italian style and join me for dinner tonight!",
        "meal_type": "Dinner",
        "cuisine_type": "Italian, Mediterranean",
        "dishes": "Main Course, Appetizers",
        "alcohol": "Wine",
        "fit_for": "Unique Location, Outdoor Dining, Professional Chef, Company Events",
        "created": "Wed Oct 13 2013 07:43:05 GMT+0530 (India Standard Time)",
        "picture": "saint_cosme.jpg",
        "host": {
            "id": 1,
            "fname": "Sobin",
            "lname": "Thomas",
            "email": "sobingt@gmail.com"
        },
        "cost": {
            "amount": 200,
            "currency": "USD"
        },
        "max_allowed": 10,
        "min_allowed": 2,
        "duration": 1,
        "host_with": "I host with a friend",
        "host_how": "When I host I just serve the meal",
        "address": {
            "street": "Shivling, Off Holy Cross Road,",
            "apartment": "A",
            "floor": "502"
        },
        "amenities": "Free Parking on Premises, Paid Parking",
        "availability": [
            {
                "date": "12/07/2013",
                "time": "21:00",
                "repeat": "repeat weekly"
            },
            {
                "date": "12/07/2013",
                "time": "10:00",
                "repeat": "repeat weekly"
            }
        ]
    },
    ];

    db.collection('foodbmg', function(err, collection) {
        collection.insert(meals, {safe:true}, function(err, result) {});
    });

};