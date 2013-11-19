require.config({
  baseUrl: 'js',
  paths: {
    'jquery': './libs/jquery.v2',
    'underscore': './libs/underscore',
    'backbone': './libs/backbone',
    'modernizr': './libs/modernizr-2.6.2.min',
    'jqueryraty': './libs/jquery.raty',
    'script': './libs/script',
    'bootstrap': './libs/bootstrap.min',
    'backbone.layout': '/js/libs/backbone.layoutmanager',
    'jqueryknob': './libs/jquery.knob',
    'jquerynicescroll': './libs/jquery.nicescroll',
    'jqueryscrollTo': './libs/jquery.scrollTo.min',
    'jquerystepy': './libs/jquery.stepy',
  	'jquerytags':'./libs/jquery.tagsinput',
  	'customcheck':'./libs/ga',
  	'datepicker':'./libs/bootstrap-datepicker',
  	'date':'./libs/date',
  	'daterange':'./libs/daterangepicker',
  	'jqueryui':'./libs/jquery-ui-1.10.1.custom.min',
  	'jqueryddslick':'./libs/jquery.ddslick',
    'jqueryraty': './libs/jquery.raty',
    'commonscripts': './libs/common.scripts',
    'Sockets': '/socket.io/socket.io',
    'App': 'App',
    'app': './app',
    'templates': './templates'
  },

  shim: {
    underscore: {
      exports: "_"
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'backbone.layout': {
      deps: ['backbone', 'underscore', 'jquery']
    },
    modernizr: {
      exports: 'Modernizr'
    },
    bootstrap: {
      deps: ["jquery"],
      exports: "$.fn.popover"
    },
  	jquerystepy: {
      deps: ["jquery"]
    },
  	datepicker:{
  		deps:["jquery"]
  	},
  	jqueryui:{
  		deps:["jquery"]
  	},
  	jqueryddslick:{
  		deps:["jquery"]
  	},
  	jqueryraty: {
      deps: ["jquery"]
    },
	  commonscripts: {
      deps: ["jquery","jquerytags","jqueryraty","jqueryscrollTo","jquerynicescroll"]
    },
  	jqueryknob: {
      deps: ["jquery"]
    },
  	jquerynicescroll: {
      deps: ["jquery"]
    },
  	jqueryscrollTo: {
      deps: ["jquery"]
    },
	  script: {
      deps: ["jquery"]
    },
    App: {
          deps: ['jquery', 'backbone', 'bootstrap', 'backbone.layout']
    }
  }
  /*,
  enforceDefine: true /// FIXME
  */
});

require(['backbone', 'App', 'require'],function (Backbone, App) {
      App.initialize();
});

