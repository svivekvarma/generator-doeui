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
            _compileTemplate: function (data, isRefresh) {
                var compiled = Handlebars.compile(tmpl);
                this.element.html(compiled({ model: data }));
                if(!isRefresh){
                    this._trigger("complete", null, {});
                }
                this._bindEvents();
            },
            _bindEvents: function () {
                $('body').on("processwindowchanged",$.proxy(function () {
                    this._fetchAndRender(true);
                },this));
            },
            destroy: function () {
                 $('body').off("processwindowchanged");
            },
            _fetchAndRender: function (isRefresh) {

                var req = menuservice.get();

                req.done($.proxy(function (data) {
                    localStorage.setItem("menudata", JSON.stringify(data));
                    this._compileTemplate.call(this, data, isRefresh);
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

