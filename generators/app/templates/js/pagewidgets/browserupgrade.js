define(['jquery',
    'jqueryuiwidget',
    'handlebars',
    'js/vendor/text!js/pagewidgets/browserupgrade.html'],
    function ($, ui, Handlebars, tmpl) {

        $.widget("doe.browserupgrade", $.doe.base, {
            // Options to be used as defaults
            options: {
                params: {},
                data: {}
            },
            _create: function () {
                this._super();
                this._fetchAndRender();
            },
            _fetchAndRender: function (event, data) {
                this._super();
                this._compileTemplate();
            },
            _compileTemplate: function (data) {
                this._super();
                var compiled = Handlebars.compile(tmpl);
                this.element.html(compiled({}));
                this._bindEvents();
            },
            _bindEvents: function () {
                this._super();
                $('#appmenu').hide();
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


