define(['jquery',
    'jqueryuiwidget',
    'handlebars',
    'moment',
    'js/vendor/text!js/pagewidgets/pagesubwidgets/demoquestion.html'],
    function ($, ui, Handlebars, moment, tmpl) {
        "use strict";

        $.widget("doe.demoquestion", $.doe.wizardstepbase, {
            // Options to be used as defaults
            options: {
                params: {},
                data: {},
                stepModel: {},
                totalSteps: {},
                isLastStep: {},
                isFirstStep: {}
            },
            _create: function () {
                this._fetchAndRender();
            },
            _fetchAndRender: function () {
                var p = this._super();
                p.done($.proxy(function () {
                    this._compileTemplate();
                }, this));
            },
            _compileTemplate: function () {
                var compiled = Handlebars.compile(tmpl);
                this.element.html(compiled(this.options.stepModel));
                this._super();
                this._bindEvents();
            },
            _bindEvents: function () {
                this._super();
                this._wordcount();  //initial counts
                this._on(this.element, {
                    "input textarea.wordCount": function (e) {
                        this._wordcount();
                    },                    
                    // "keyup textarea.wordCount": function (e) {
                    //     this._wordcount();
                    // },
                    // "paste textarea.wordCount": function (e) {
                    //     this._wordcount();
                    // },
                    // "contextmenu textarea.wordCount": function (e) {
                    //     this._wordcount();
                    // },                        
                });
            },
            _wordcount: function() {
                var txt = this.element.find('.wordCount')[0];
                var words = $.trim(txt.value).length ? txt.value.match(/\S+/g).length : 0;
                var maxCount = txt.dataset.maxWords;
                var displayCount = this.element.find('.display_count')[0];
                var wordLeft = this.element.find('.word_left')[0];
                if (words <= maxCount) {
                    displayCount.textContent = words;
                    wordLeft.textContent = maxCount - words  + ".";
                } else {
                    displayCount.textContent = words + '**';
                    wordLeft.textContent = maxCount - words  + ".";
                    // wordLeft.text(maxCount - words)
                }
            },
            _destroy: function () {
                this._super();
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

