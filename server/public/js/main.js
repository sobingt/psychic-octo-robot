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
	commonscripts: {
          deps: ["jquery"]
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