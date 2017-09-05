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
    'js/sharedwidgets/progressbroker',
    'vwidgetgrid',
    'bootstrap-datepicker',
    'js/sharedwidgets/progresscircle.js',
    'js/sharedwidgets/progresscirclepulse.js',
    'menu',
    'jquery.validate',
    'jquery-validate.additionalmethods',
    'jquery-serializeJSON',
    'vOverlay',
    'collapsible',
    'bootstrap',
    'js/vendor/text',
    'jqueryformparams',
    'hammerjs',
    'js/pagewidgets/base',
    'js/pagewidgets/pagesubwidgets/wizardstepbase'], function (Router,
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
        genericHelper,
        progressbroker) {

        progressbroker = $('body').progressbroker({ text: 'Loading page, please be patient' }).data("doe-progressbroker");
        progressbroker.showProgressBar();

        localStorage.clear();

        // Attach Fastclick to drop the 300 ms
        FastClick.attach(document.body);

        genericHelper.registerAjaxGlobal();

        doevalidators.registerValidators();

        //identityservice.getUserID().done(function (data) {

        //    $('span.username').html('Vivek Siruvuri');
        //    $('#appmenu').menu({}).on('menucomplete', function () {
        //        $('div.hamburgerplaceholder').hamburgermenu({ headerTitle: 'Welcome ' + data, data: JSON.parse(localStorage.getItem("menudata")) });
        //    });
            progressbroker.hideProgressBar();
            Router.startRouting();
        //});

        //identityservice.getUserRoles().done(function (data) {

        //    localStorage.setItem("UserRole", JSON.stringify(data));
        //});

    });

