define(['jquery',
    'jqueryuiwidget',
    'handlebars',
    'js/services/menuservice',
    'js/vendor/text!js/sharedwidgets/menu.html'],
    function ($, ui, Handlebars, menuservice, tmpl) {

        $.widget("doe.menu", {

            // Options to be used as defaults
            options: {

            },
            _create: function () {
                this._fetchAndRender();
            },
            _compileTemplate: function (data) {
                var compiled = Handlebars.compile(tmpl);
                this.element.html(compiled({ model: data }));
                 this._trigger("complete", null, { });
            },
            bindEvents: function () {
            },
            destroy: function () {

            },
            _fetchAndRender: function () {

                var req = menuservice.get();

                req.done($.proxy(function (data) {
                    localStorage.setItem("menudata", JSON.stringify(data));
                    this._compileTemplate.call(this, data);
                }, this));

           
            },
            _setOption: function (key, value) {
                this._super(key, value);
            },
            _setOptions: function (options) {
                this._super(options);
            }
        });
    });

