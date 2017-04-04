define(["jquery",
    "jqueryuiwidget",
    "pageloader",
    "handlebars",
    'js/vendor/text!js/sharedwidgets/progresscircle.html'], function ($, widget, pageloader, Handlebars, tmpl) {
        $.widget("doe.progresscircle", {
            options: {
                value: {},
                text: {}
            },
            _privateState: {
                pageloader: {}
            },
            _create: function () {
                this._compileTemplate();
            },
            _compileTemplate: function (data) {
                var compiled = Handlebars.compile(tmpl);
                this.element.append(compiled({}));
                this._renderWidgets();
                this._bindEvents();
            },
            _bindEvents: function () {
                this._on({
                    "pageloadercomplete": function (event, data) {
                        this._privateState.pageloader.pageLoader('destroy');
                        this._destroy();
                    }
                });
            },
            _renderWidgets: function () {
                this._privateState.pageloader = pageloader = this.element.find('#progresscircle').pageLoader({
                    value: 0.10,
                    text: "Loading page assets",
                    animationDuration: 300
                });

                this._showProgressCircle();
            },
            _showProgressCircle: function () {
                this.element.find('#progresscircle').voverlay('show', {
                    style: "min-width:980px;max-width:1000px",
                    showClose: false
                });
            },
            _setOption: function (key, value) {
                this._super(key, value);
            },
            _setOptions: function (options) {
                this._super(options);
                this._privateState.pageloader.pageLoader({ value: this.options.value, text: this.options.text });
            },
            _destroy: function () {
                this.element.find('#progresscircle').voverlay('hide');
                this.element.find('#progresscircle').remove();
            }
        });
    });