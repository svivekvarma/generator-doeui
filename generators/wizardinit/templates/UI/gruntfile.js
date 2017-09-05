module.exports = function (grunt) {

    //require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        requirejs: {
            compile: {
                options: {
                    mainConfigFile: "app.js",
                    name: "app",
                    out: "app.min.js",
                    removeCombined: true,
                    findNestedDependencies: true,
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
                        'collapsible': 'js/vendor/collapsible/collapsible'
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
                }
            }
        },
        less: {
            development: {
                options: {
                    paths: ["less"]
                },
                files: {
                    "css/clf.css": "less/clf.less",
                    "css/doeclfresponsive.css": "less/doeclfresponsive.less",
                    "css/framework.css": "less/framework.less",
                    "css/menu.css": "less/menu.less",
                    "css/print.css": "less/print.less",
                    "css/site.css": "less/site.less",
                    "js/vendor/vwidgets/pageLoader.css": "js/vendor/vwidgets/pageLoader.less",
                    "js/vendor/vwidgets/slideoutmenu.css": "js/vendor/vwidgets/slideoutmenu.less",
                    "css/browserincompatible.css": "less/browserincompatible.less",
                    "css/wizard.css": "less/wizard.less"
                }
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true
                },
            },
            uses_defaults: ['js/helpers/*.js',
                'js/pagewidgets/*.js',
                'js/services/*.js',
                'js/sharedwidgets/*.js']
        },
        watch: {
            less: {
                files: ['less/**/*.less', '**/*.css'],
                tasks: ['less'],
                options: {
                    livereload: true,
                    spawn: false,
                }
            },
            js: {
                files: 'js/**/*.js',
                tasks: ['jshint'],
                options: {
                    livereload: true,
                    spawn: false,
                }
            },
            html: {
                files: ['js/**/*.html', '*.html'],
                options: {
                    livereload: true,
                    spawn: false,
                }
            }
        },
        processhtml: {
            options: {
                data: {
                    message: 'V1.1'
                }
            },
            dist: {
                files: {
                    'dist/index.html': ['index.html']
                }
            }
        },
        open: {
            dev: {
                path: 'http://localhost/Scaffold',
                app: 'Chrome'
            }
        }
    });

    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('buildless', ['less']);
    grunt.registerTask('buildjsprod', ['requirejs']);
    grunt.registerTask('start', ['open:dev','watch']); 
}