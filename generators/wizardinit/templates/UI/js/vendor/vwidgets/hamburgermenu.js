define(["jquery", "jqueryuiwidget", "hammerjs"], function ($, jquerywidget, Hammer) {

    $.widget("vwidgets.hamburgermenu", {
        options: {
            animationType: 'slideout',
            hamburgerMarkup: '<span class="glyphicon glyphicon-menu-hamburger  btn-lg hamburgermenutrigger" aria-hidden="true"></span>',
            defaultHeader: true,
            hammerInstance: null,
            hamburgermenutrigger: '#hamburgerwrapper',
            headerTitle: 'Welcome Suzanne',
            data: {}
        },
        _privateState: {
        },
        _create: function () {

            this._renderMarkup();

        },
        _renderMarkup: function () {

            $(this.options.hamburgermenutrigger).html(this.options.hamburgerMarkup);

            var arrHtml = [];

            var i = 0;
            arrHtml.push('  <div class="slider sliderclose">');
            arrHtml.push('  <div class="header">');
            arrHtml.push('  Hello <span class="username">Vivek Siruvuri</span>');
            arrHtml.push('  </div>');
            arrHtml.push('  <div class="menucontainer">');
            var data = this.options.data;
            for (i = 0; i < data.length; i++) {
                arrHtml.push('  <div id="' + i + 'menu" class="topmenu">');
                arrHtml.push('  <a href="' + data[i]["ItemUrl"] + '"><span class="' + data[i]["ItemIconClass"] + '" aria-hidden="true"></span>' + data[i]["ItemName"] + '</a>');
                if (data[i]["ItemMenus"] !== null && data[i]["ItemMenus"].length > 0) {
                    var j = 0;
                    for (j = 0; j < data[i]["ItemMenus"].length; j++) {
                        arrHtml.push('  <div class="submenu">');
                        arrHtml.push('  <a href="' + data[i]["ItemMenus"][j]["ItemUrl"] + '"><span class="' + data[i]["ItemMenus"][j]["ItemIconClass"] + '" aria-hidden="true"></span>' + data[i]["ItemMenus"][j]["ItemName"] + '</a>');
                        arrHtml.push('</div>');
                    }
                }
                arrHtml.push('  </div>');
            }

            arrHtml.push('  </div>');
            arrHtml.push('  </div>');
            this.element.html(arrHtml.join(''));

            this._bindEvents();
        },
        _setOption: function (key, value) {
            if (key === "value") {
                value = this._constrain(value);
            }
            this._super(key, value);
        },
        _setOptions: function (options) {
            this._super(options);
            this._drawProgress();
        },
        _bindEvents: function () {
            this._on(this.element,
                {
                    "click div.topmenu": function (event, data) {
                        console.log(event);
                        console.log(event.currentTarget.attributes["id"]);
                        event.stopImmediatePropagation();
                        if ($(event.currentTarget).hasClass('topmenuopen')) {
                            $(event.currentTarget).removeClass('topmenuopen');
                        } else {
                            $(event.currentTarget).addClass('topmenuopen');
                        }
                        //console.log(event);
                    },
                    "click div.submenu": function (event, data) {
                        event.stopImmediatePropagation();
                        //console.log(event);
                    },
                    "click div.submenu a": function (event, data) {
                        event.stopImmediatePropagation();
                        //console.log(event);
                        this.element.find('.slider').addClass('sliderclose');
                        this.element.find('.topmenu').removeClass('topmenuopen');
                    }
                });

            $(this.options.hamburgermenutrigger).on('click', $.proxy(function () {

                if (this.element.find('.slider').hasClass('sliderclose')) {
                    this.element.find('.slider').removeClass('sliderclose');
                }
            }, this));

            var that = this;

            var mc = new Hammer(this.element[0]);

            mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });

            mc.on("panleft", function (ev) {
                that.element.find('.slider').addClass('sliderclose');
                this.element.find('.topmenu').removeClass('topmenuopen');
            });

            this.options.hammerInstance = mc;

        },
        _destroy: function () {
        }
    });

});