define(['jquery',
    'jqueryuiwidget',
    'handlebars',
    'moment',
    'js/vendor/text!js/pagewidgets/pagesubwidgets/<%=pagesubwidgetname%>.html'],
    function ($, ui, Handlebars, moment, tmpl) {

        $.widget("doe.<%=pagesubwidgetname%>", {
            // Options to be used as defaults
            options: {
                params: {},
                data: {}
            },
            _create: function () {
                
                this._fetchAndRender();
            },
            _fetchAndRender: function () {
                
                this._compileTemplate();
            },
            _compileTemplate: function () {
                
                var compiled = Handlebars.compile(tmpl);
                this.element.html(compiled({}));
                this._bindEvents();
            },
            _bindEvents: function () {
                
            },
            _destroy: function () {
                
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


