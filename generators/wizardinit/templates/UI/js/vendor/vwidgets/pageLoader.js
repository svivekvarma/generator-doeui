define(["jquery", "jqueryuiwidget"], function ($) {
    $.widget("vwidgets.pageLoader", {
        options: {
            viewportElement: 'body',
            animationDuration: 1000,
            value: .0,
            text: ""
        },
        _privateState: {
        },
        _create: function () {
            var arrHtml = [];
            arrHtml.push('<div class="pageloader">');
            arrHtml.push('<canvas class="pageloadercanvas" width="240" height="240"></canvas>');
            arrHtml.push('<span class="dummy"></span>');
            arrHtml.push('</div>');
            $(arrHtml.join('')).appendTo(this.element);
            this.element.find('.dummy:first').css('letter-spacing', '0');
            //this.element.css('letter-spacing', '0');
            this._drawProgress(true);
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
        incrementValue: function (value, text) {
            this._setOptions({ value: this._constrain(value + this.options.value), text: text });
        },
        _constrain: function (value) {
            if (value > 1) {
                value = 1;
            }
            if (value < 0) {
                value = 0;
            }
            return value;
        },
        reset: function () {
            this.element.find('.dummy:first').css('letter-spacing', '0');
            //this.element.css('letter-spacing', '0');
            this._setOptions({ value: 0, text: "" });
        },
        _drawProgress: function (isFirstTime) {
            var bg = this.element.find('canvas')[0];
            var ctx = ctx = bg.getContext('2d');
            var imd = null;
            var circ = Math.PI * 2;
            var quart = Math.PI / 2;
            var text = this.options.text;
            ctx.strokeStyle = '#99CC33';
            ctx.lineCap = 'round';
            ctx.lineWidth = 10.0;
            var oncomplete = this._checkIfComplete;
            var that = this;
            var animatepromise = this.element.find('.dummy:first').animate({ "letter-spacing": this.options.value }, {
                duration: this.options.animationDuration,
                easing: 'swing',
                step: function (now, fx) {
                    //imd = ctx.getImageData(0, 0, 240, 240);
                    //ctx.putImageData(imd, 0, 0);

                    ctx.clearRect(0, 0, 240, 240);
                    ctx.beginPath();
                    ctx.textBaseline = "middle"
                    ctx.textAlign = "center";
                    ctx.font = "25px Verdana";
                    ctx.fillText(Math.round((fx.now * 100)) + " %", 130, 120);
                    ctx.font = "16px Verdana";
                    ctx.fillText(text, 120, 230);
                    ctx.arc(120, 120, 70, -(quart), ((circ) * fx.now) - quart, false);
                    ctx.stroke();
                }
            }).promise();

            animatepromise.done(function () {
                oncomplete.apply(that);
            });
        },
        _checkIfComplete: function () {
            if (this.options.value >= 1) {
                this._trigger("complete", null, { value: 1 });
            }
        },
        _destroy: function () {

        }
    });

});