/*This is the starting point of the app , The main.js is being called from here*/
require(['js/router',
    'jquery',
    'underscore',
    'fastclick',
    'jqueryuiwidget',
    'hamburgermenu',
    'pageloader',
    'moment',
    'modernizer',
    'js/services/useridentityservice',
    'doevalidators',
    'genericHelper',
    'vwidgetgrid',
    'bootstrap-datepicker',
    'js/sharedwidgets/progresscircle.js',
    'menu',
    'jquery.validate',
    'jquery-validate.additionalmethods',
    'jquery-serializeJSON',
    'vOverlay',
    'bootstrap',
    'js/vendor/text',
    'jqueryformparams',
    'hammerjs',
    'js/pagewidgets/base'], function (Router,
        $,
        _,
        FastClick,
        jqueryuiwidget,
        hamburgermenu,
        pageloader,
        moment,
        modernizer,
        identityservice,
        doevalidators,
        genericHelper) {

        localStorage.clear();

        // Attach Fastclick to drop the 300 ms
        FastClick.attach(document.body);

        genericHelper.registerAjaxGlobal();

        doevalidators.registerValidators();


        //identityservice.get().done(function (data) {

            $('span.username').html("RockStar");
            $('#appmenu').menu({}).on('menucomplete', function () {
                $('div.hamburgerplaceholder').hamburgermenu({ headerTitle: 'Welcome ' + data, data: JSON.parse(localStorage.getItem("menudata")) });
            });

            Router.startRouting();
        //});
    });

