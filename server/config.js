// Facebook app config for tests
module.exports = {
  //root: require('path').normalize(__dirname + '/..'),
  root: require('path').normalize(__dirname + '/'),
  app: {
    name: 'demo-login-nodejs-mongodb-backbonejs-socket.io'
  },
  db: 'mongodb://localhost/foodbmg',
  facebook: {
    clientID: "507476602678031",
    clientSecret: "ddfaf92057646c2d83125690568a565f",
    scope:      'email,user_about_me,user_birthday, user_location,publish_stream,read_stream,friends_location',
    callbackURL: "http://localhost:4000/login/facebook/callback"
  },
  google: {
    clientID: "984023802526.apps.googleusercontent.com",
    clientSecret: "OPp7uhIxHXsJMR9E89F0JGq6",
    callbackURL: "http://localhost:4000/login/google/callback"
  },
  database: {
    host:       'localhost',
    user:       'root',
    password:   '',
    database:   'adukala'
  },
  mail: {
  	from : "support@mealo.in",
      fromAuthor: "Mealo Team",
  	mealoRegistrationId:2955,
  	mealoWelcomeId:2956,
  	mealoCreationToHostId:2957,
      newAttendeToHostId:2958,
  	attendeCancelToHostId:2959,
  	mealoCancelToAttendeId:2960,
  	mealoConfirmToRestaurantId:2961,
  	mealoReminderId:2962,
  	mealoForgetPasswordId:2976
  },
  host:
  {
  	url:"http://localhost:",
  	port:3000
  },
  payment:
  {
    key: "C0Dr8m",
    salt: "3sf0jURk",
    posturl: "https://test.payu.in/_payment",
    successurl: "http://localhost:3000/user/103",
    failureurl: "http://localhost:3000/user/103",
    offerkey: 123456,
    apiversion: 2
  }
  
};