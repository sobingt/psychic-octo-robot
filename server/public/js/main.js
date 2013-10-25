require.config({
  baseUrl: 'js',
  paths: {
    'jquery': './libs/jquery.v2',
    'underscore': './libs/underscore',
    'backbone': './libs/backbone',
    'jquery-raty': './libs/jquery.raty',
    'bootstrap': './libs/bootstrap.min',
    //'App': 'app',
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