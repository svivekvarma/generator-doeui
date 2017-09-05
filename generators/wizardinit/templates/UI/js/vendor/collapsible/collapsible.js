(function ($) {
    var defaults = {
        closeOtherPanels: false
    };
    var settings = {};

    var methods = {
        init: function () {
            $(".content").hide();
            //toggle the componenet with class msg_body
            $(".collapsibles .panel").click(function () {
                if ($(this).children('span.icon').hasClass('minusicon')) {
                    $(this).children('span.icon').removeClass('minusicon').addClass('plusicon');
                } else {
                    $(this).children('span.icon').removeClass('plusicon').addClass('minusicon');
                }
                $(this).next(".content").slideToggle(500);
            });

            if ($(location.hash).length > 0) {
                $(location.hash).trigger('click');
            }
        },
        show: function () {
            return this.each(function () {
                if ($(this).children('span.icon').hasClass('minusicon')) {
                    
                } else {
                    $(this).children('span.icon').removeClass('plusicon').addClass('minusicon');
                    $(this).next(".content").slideDown(500);
                } 
            })
        }
    };

    $.fn.collapsibles = function (method, options) {
        settings = $.extend({}, defaults, options);
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.collapsibles');
        }
    };
    $.collapsibles = function () {

        methods.init();
    };

})(jQuery);
