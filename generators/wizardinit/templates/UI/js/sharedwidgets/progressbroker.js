define(["jquery",
    "jqueryuiwidget"], function ($, widget) {
        $.widget("doe.progressbroker", {
            options: {
                value: {},
                text: {}
            },
            _privateState: {
            
            },
            _create: function () {
             
            },
            showProgressBar: function () {
                $('body').progresscirclepulse({ text: this.options.text });
            },
            hideProgressBar: function () {
                $('body').progresscirclepulse('hideProgressCircle');
            },
            _setOption: function (key, value) {
                this._super(key, value);
            },
            _setOptions: function (options) {
                this._super(options);
            },
            _destroy: function () {
                // $('body').progresscirclepulse('destroy');
            }
        });
    });