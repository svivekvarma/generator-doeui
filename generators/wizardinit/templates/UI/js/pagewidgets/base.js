define(['jquery',
    'jqueryuiwidget',
    'js/sharedwidgets/progresscircle'],
    function ($, ui) {

        $.widget("doe.base", {
            // Options to be used as defaults
            options: {

            },
            _create: function () {
                $('body').progresscircle({ value: 0.1, text: 'Loading page assets' });
            },
            _fetchAndRender: function () {
                $('body').progresscircle({ value: 0.75, text: 'Fetching data for page' });
            },
            _compileTemplate: function () {
                $('body').progresscircle({ value: 0.85, text: 'Loading page assets' });
            },
            _bindEvents: function () {
                $('body').progresscircle({ value: 1.0, text: 'Setting up the page' });
            },
            _destroy: function () {
                this._trigger('destroy');
                $('body').progresscircle('destroy');
            }

        });
    });


