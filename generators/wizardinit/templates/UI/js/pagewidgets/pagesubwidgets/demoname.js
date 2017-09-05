define(['jquery',
    'jqueryuiwidget',
    'handlebars',
    'moment',
    'js/vendor/text!js/pagewidgets/pagesubwidgets/demoname.html'],
    function ($, ui, Handlebars, moment, tmpl) {

        $.widget("doe.demoname", $.doe.wizardstepbase, {
            // Options to be used as defaults
            options: {
                params: {},
                data: {},
                stepModel: {},
                totalSteps: {},
                isLastStep: {},
                isFirstStep: {}
            },
            _create: function () {
                this._fetchAndRender();
            },
            _fetchAndRender: function () {
                var p = this._super();
                p.done($.proxy(function () {
                    this._compileTemplate();
                }, this));
            },
            _compileTemplate: function () {
                var compiled = Handlebars.compile(tmpl);
                this.element.html(compiled(this.options.stepModel));
                this._super();
                this._bindEvents();
            },
            _bindEvents: function () {

                this.element.find('form').validate({
                    rules: {},
                    onfocusout: function (element) { $(element).valid(); },
                    messages: {
                        SchoolSize: {
                            greaterthanzero: "Please enter a positive integer.",
                            integer: "Please enter a positive integer."
                        }
                    },
                    submitHandler: function () { }
                });

                this._super();
            },
            _destroy: function () {
                this._super();
                this.element.html('');
            },
            _setOption: function (key, value) {
                this._super(key, value);
            },
            _setOptions: function (options) {
                this._super(options);
            }
        });
    });


