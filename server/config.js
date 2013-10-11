// Facebook app config for tests
module.exports = {
  facebook: {
    client_id:      '160625610780207',
    client_secret:  'be91a962a85077f202a60ed2dcc89947',
    scope:      'email,user_about_me,user_birthday, user_location,publish_stream,read_stream,friends_location',
    redirect_uri:   'http://localhost:3000/auth/facebook'
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