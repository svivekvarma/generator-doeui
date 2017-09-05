/// <reference path="progressindicator.js" />
define(["jquery", "jqueryuiwidget"], function ($) {
    $.widget("vwidgets.progressindicator", {
        options: {
            targetElement: 'body',
            progressText: 'Loading the website'
        },
        _privateState: {
            
        },
        _create: function () {

            $(this.options.targetElement).html(




                );

            var arrHtml = [];
            arrHtml.push('<div id="slideoutmenuwrapper" class="slideoutmenuwrapper">');
            arrHtml.push('  <div id="slideoutmenuheader" class="slideoutmenuheader">');

            if (this.options.headerTitle === '' || this.options.headerTitle === undefined || this.options.headerTitle === null) {
                arrHtml.push(this.options.headerMarkup);
            } else {
                arrHtml.push('<h4>' + this.options.headerTitle + '</h4>');
            }
            arrHtml.push('  </div>');
            arrHtml.push('  <nav id="slideoutmenuoptions" class="slideoutmenuoptions">');
            arrHtml.push('  </nav>');
            arrHtml.push('</div>');

            $(arrHtml.join('')).appendTo(this.options.pageWrapperElement);

            if (this.options.ajaxLoad) {
                $.get(this.options.ajaxUrl, function (data) {
                    $("#slideoutmenumenuoptions").html(data);
                    this._bindEvents();
                });

            } else {
                $('#slideoutmenuoptions').html($(this.options.menuListDataElement).html());
                this._bindEvents();
            }
        },
        _setOptions: function () {
            // _super and _superApply handle keeping the right this-context
            this._superApply(arguments);
        },
        _setOption: function (key, value) {
            // prevent invalid color values
            this._super(key, value);
        },
        _bindEvents: function () {

            this._on(this.element, {
                "click .vwidgetsslideoutmenutriggerelement": function (event) {
                    event.stopPropagation();
                    this.openSlideOutMenu();
                },
                "touchend .vwidgetsslideoutmenutriggerelement": function (event) {
                    event.stopPropagation();
                    this.openSlideOutMenu();
                },
                "touchend .slidemenuopenwrapperdeactivatepagewrapper": function (event) {
                    event.stopPropagation();
                    this.closeSlideOutMenu();
                },
                "click .slidemenuopenwrapperdeactivatepagewrapper": function (event) {
                    event.stopPropagation();
                    this.closeSlideOutMenu();
                }
            });

            var that = this;
            $('#slideoutmenuwrapper').hammer().on('panleft.vwidgetsslideoutmenu', function () {
                that.closeSlideOutMenu();
            });
        },
        openSlideOutMenu: function () {
            if (!this._privateState.isSlideOutMenuOpen) {
                $('#slideoutmenuwrapper').addClass('showslidemenu');
                $(this.options.pageWrapperElement).addClass('slidemenuopenwrapperdeactivatepagewrapper');
                this._privateState.isSlideOutMenuOpen = true;
                this._trigger("open", null, {});
            }
        },
        closeSlideOutMenu: function () {
            if (this._privateState.isSlideOutMenuOpen) {
                $(this.options.pageWrapperElement).removeClass('slidemenuopenwrapperdeactivatepagewrapper');
                $('#slideoutmenuwrapper').removeClass('showslidemenu');
                this._privateState.isSlideOutMenuOpen = false;
                this._trigger("closed", null, {});
            }
        },
        toggleSlideOutMenu: function (event) {

            if (this._privateState.isSlideOutMenuOpen) {
                $(this.options.pageWrapperElement).removeClass('slidemenuopenwrapperdeactivatepagewrapper');
                $('#slideoutmenuwrapper').removeClass('showslidemenu');
                this._privateState.isSlideOutMenuOpen = false;
                this._trigger("closed", null, {});
            } else {
                $('#slideoutmenuwrapper').addClass('showslidemenu');
                $(this.options.pageWrapperElement).addClass('slidemenuopenwrapperdeactivatepagewrapper');
                this._privateState.isSlideOutMenuOpen = true;
                this._trigger("open", null, {});
            }
        },
        _destroy: function () {
            this._off(this.element, "click.slideoutmenu");
            $('#slideoutmenuwrapper').remove();
            $('#vwidgetsslideoutmenutriggerelement').remove();
            $('#slideoutmenuwrapper').hammer().off('panleft.vwidgetsslideoutmenu');
        }
    });
});