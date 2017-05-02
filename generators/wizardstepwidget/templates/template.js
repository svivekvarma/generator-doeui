define(['jquery',
    'jqueryuiwidget',
    'handlebars',
    'moment',
    'js/vendor/text!js/pagewidgets/pagesubwidgets/<%=widgetname%>.html'],
    function ($, ui, Handlebars, moment, tmpl) {

        $.widget("doe.<%=widgetname%>", $.doe.toywizardstepbase, {
            // Options to be used as defaults
            options: {
                params: {},
                data: {},
                totalSteps:{},
                isLastStep : {},
                isFirstStep : {}
            },
            _create: function () {
                this._fetchAndRender();
            },
            _fetchAndRender: function () {
                this._super();
                this._compileTemplate();
            },
            _compileTemplate: function () {
                var compiled = Handlebars.compile(tmpl);
                this.element.html(compiled({}));
                this._super();
                this._bindEvents();
            },
            _bindEvents: function () {
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

