require.config({
  baseUrl: 'js',
  paths: {
    'jquery': './libs/jquery.v2',
    'underscore': './libs/underscore',
    'backbone': './libs/backbone',
    'jqueryraty': './libs/jquery.raty',
	'script': './libs/script',
    'bootstrap': './libs/bootstrap.min',
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
    'commonscripts': './libs/common.scripts',
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
	jqueryknob: {
          deps: ["jquery"]
    },
	jquerynicescroll: {
          deps: ["jquery"]
    },
	jqueryscrollTo: {
          deps: ["jquery"]
    },
	commonscripts: {
          deps: ["jquery","jquerytags","jqueryraty","jqueryscrollTo","jquerynicescroll"]
    },
	script: {
          deps: ["jquery"]
    }
  }/*,
  enforceDefine: true /// FIXME
  */
});

require(["backbone",/*App,*/
        "app/routers"],
         function (Backbone, Router) {

          require([ "jquery" ], function () {
              // Instantiates a new Backbone.js Mobile Router
              app = new Router();
              Backbone.history.start();
            });

          //App.initialize();

        });