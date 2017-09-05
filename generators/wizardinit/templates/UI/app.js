/*All 3rd party libraries are dropped in js/vendor folder and configured here for shorthand require callsreviews*/

requirejs.config({
    baseUrl: './',
    paths: {
        'text': 'js/vendor/text',
        'modernizer': 'js/vendor/modernizr',
        'fastclick': 'bower_components/fastclick/lib/fastclick',
        'jquery': 'bower_components/jquery/dist/jquery.min',
        'jquery-legacy': 'bower_components/jquery-legacy/jquery.min',
        'jqueryuiwidget': 'bower_components/jquery-ui/jquery-ui.min',
        'hammerjs': 'bower_components/hammerjs/hammer.min',
        'bootstrap': 'bower_components/bootstrap/dist/js/bootstrap.min',
        'bootstrap-datepicker': 'bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min',
        'slideoutmenu': 'js/vendor/vwidgets/slideoutmenu',
        'hamburgermenu': 'js/vendor/vwidgets/hamburgermenu',
        'menu': 'js/sharedwidgets/menu',
        'pageloader': 'js/vendor/vwidgets/pageloader',
        'jquery.validate': 'bower_components/jquery-validation/dist/jquery.validate.min',
        'jquery-validate.additionalmethods': 'bower_components/jquery-validation/dist/additional-methods',
        'jquery-serializeJSON': 'bower_components/jquery.serializeJSON/jquery.serializejson.min',
        'jqueryformparams': 'bower_components/jquerypp/dist/amd/dom/form_params/form_params',
        'underscore': 'bower_components/underscore/underscore-min',
        'handlebars': 'bower_components/handlebars/handlebars',
        'moment': 'bower_components/moment/min/moment.min',
        'router': 'js/router',
        'vOverlay': 'bower_components/vOverlay/voverlay',
        'vwidgetgrid': 'bower_components/vwidget-grid/src/vwidgets-grid',
        'doevalidators': 'js/helpers/validators',
        'genericHelper': 'js/helpers/generic',
        'collapsible': 'js/vendor/collapsible/collapsible',
        'jspdf': 'bower_components/jspdf/dist/jspdf.debug',
        'jspdf-autotable': 'bower_components/jspdf-autotable/dist/jspdf.plugin.autotable.src'
    },
    shim: {
        'jquery': {
            exports: ['$']
        },
        'bootstrap': {
            deps: ['jquery']
        },
        'bootstrap-datepicker': {
            deps: ['jquery', 'bootstrap']
        },
        'jqueryuiwidget': {
            deps: ['jquery']
        },
        'vwidgetgrid': {
            deps: ['jquery', 'jqueryuiwidget']
        },
        'slideoutmenu': {
            deps: ['jquery', 'jqueryuiwidget']
        },
        'hamburgermenu': {
            deps: ['jquery', 'jqueryuiwidget']
        },
        'pageloader': {
            deps: ['jquery', 'jqueryuiwidget']
        },
        'collapsible': {
            deps: ['jquery']
        },
        'jquery.validate': {
            deps: ['jquery']
        },
        'jquery-validate.additionalmethods': {
            deps: ['jquery', 'jquery.validate']
        },
        'jquery-serializeJSON': {
            deps: ['jquery']
        },
        'animator': {
            deps: ['jquery']
        },
        'jqueryformparams': {
            deps: ['jquery']
        },
        'vOverlay': {
            deps: ['jquery']
        }
    }
});

/*This is the starting point of the app , The main.js is being called from here*/
require([], function () {

    require(['jquery'], function (component) {
        require(['main'], function (main) {

        });
    }, function (err) {
        var pathArray = window.location.pathname.split('/');
       
        window.location.pathname = pathArray[1] + '/' + 'browserupgrade.html';
        console.log(err);
    });
});

