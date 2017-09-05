define(["jquery",
    "jqueryuiwidget",
    "pageloader",
    "handlebars",
    'js/vendor/text!js/sharedwidgets/progresscirclepulse.html'], function ($, widget, pageloader, Handlebars, tmpl) {
        $.widget("doe.progresscirclepulse", {
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
                this.element.append(compiled(this.options));
                this.showProgressCircle();
            },
            _bindEvents: function () {

            },
            _renderWidgets: function () {
                this._showProgressCircle();
            },
            showProgressCircle: function () {
                this.element.find('#progresscirclepulse').voverlay('show', {
                    style: "min-width:980px;max-width:1000px",
                    showClose: false
                });
            },
            hideProgressCircle: function(){
                this.element.find('#progresscirclepulse').voverlay('hide');
                this.element.find('#progresscirclepulse').remove();
                this._destroy();
            },
            _setOption: function (key, value) {
                this._super(key, value);
            },
            _setOptions: function (options) {
                this._super(options);
                //this._privateState.pageloader.pageLoader({ value: this.options.value, text: this.options.text });
            },
            _destroy: function () {
                
            }
        });
    });