module.exports = function (grunt) {

    //require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            css: {
                files: {
                    'css/index.css': ['js/vendor/normalize.css/normalize.css',
                        'css/menu.css',
                        'css/clf.css',
                        'css/doeclfresponsive.css',
                        'js/vendor/vwidgets/slideoutmenu.css',
                        'js/vendor/vwidgets/pageloader.css',
                    ]
                }
            }
        },
        csswring: {
            options: {
                map: true,
                preserveHacks: true,
                removeAllComments: true
            },
            main: {
                cwd: 'css/',
                dest: 'css/',
                expand: true,
                ext: '.min.css',
                src: [
                    '**/index.css'
                ]
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'css/',
                    src: ['index.css', '!*.min.css'],
                    dest: 'css/',
                    ext: '.min.css'
                }]
            }
        },
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
                        'jquery': 'js/vendor/jquery/jquery.min',
                        'respond': 'js/vendor/respond/dest/respond.min',
                        'html5shiv': 'js/vendor/html5shiv/html5shiv.min',
                        'bootstrap': 'js/vendor/bootstrap/js/bootstrap.min',
                        'jqueryuiwidget': 'js/vendor/jqueryui/ui/widget',
                        'fastclick': 'js/vendor/fastclick/fastclick',
                        'slideoutmenu': 'js/vendor/vwidgets/slideoutmenu',
                        'pageloader': 'js/vendor/vwidgets/pageloader',
                        'jquery-cookie': 'js/vendor/jquery-cookie/src/jquery.cookie',
                        'jquery-validate': 'js/vendor/jquery-validate/jquery.validate.min',
                        'jquery-validate.additionalmethods': 'js/vendor/jquery-validate/additional-methods.min',
                        'jquery-serializeJSON': 'js/vendor/jqueryserializeJSON/jquery.serializejson.min',
                        'underscore': 'js/vendor/underscore-min',
                        'mustache': 'js/vendor/mustache/mustache.min',
                        'handlebars': 'js/vendor/handlebars/handlebars-v3.0.3',
                        'router': 'js/router',
                        'animator': 'js/animator'
                    },
                    shim: {
                        'jquery': {
                            exports: ['$']
                        },
                        'bootstrap': {
                            deps: ['jquery']
                        },
                        'jqueryuiwidget': {
                            deps: ['jquery']
                        },
                        'slideoutmenu': {
                            deps: ['jquery', 'jqueryuiwidget']
                        },
                        'pageloader': {
                            deps: ['jquery', 'jqueryuiwidget']
                        },
                        'jquery-cookie': {
                            deps: ['jquery']
                        },
                        'jquery-validate': {
                            deps: ['jquery']
                        },
                        'jquery-validate.additionalmethods': {
                            deps: ['jquery', 'jquery-validate']
                        },
                        'jquery-serializeJSON': {
                            deps: ['jquery']
                        },
                        'animator': {
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
                    "css/browserincompatible.css": "less/browserincompatible.less"
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
                files: '**/*.less',
                tasks: ['less']
            },
            jshint:{
                files: 'js/**/*.js',
                tasks: ['jshint']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    // grunt.loadNpmTasks('grunt-contrib-connect')
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('csswring');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-browser-sync');

    grunt.loadNpmTasks('grunt-contrib-jshint');


    grunt.registerTask('default', ['watch']);

    grunt.registerTask('buildless', ['less']);

    grunt.registerTask('mincss', ['cssmin']);

    grunt.registerTask('concatcss', ['concat:css']);

    grunt.registerTask('builddev', ['less', 'jshint']);

    //grunt.registerTask('server', ['requirejs:compile','connect', 'open', 'watch', 'compass']);
    grunt.registerTask('server', ['connect', 'open', 'watch', 'less']);

}