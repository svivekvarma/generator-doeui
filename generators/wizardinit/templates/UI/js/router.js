define(['jquery', 'jqueryuiwidget', 'modernizer'], function ($, jqueryuiwidget) {
    var routes = [{ hash: '#list', controller: 'ListController' },
    { hash: '#add', controller: 'AddController' }];
    var defaultRoute = 'home';
    var currentHash = '';
    var started = false;
    var renderContainer = '.routeroutlet';
    var oldHash = '';
    var validBrowser = false;

    function checkBrowserVersion() {
        if (Modernizr.webgl) {
            validBrowser = true;
            if(location.hash === "#browserupgrade"){
                location.hash = '#home';
            }
        } else {
            defaultRoute = 'browserupgrade';
            location.hash = '#browserupgrade';
            validBrowser = false;
        }
    }

    function startRouting() {
        window.location.hash = window.location.hash || defaultRoute;
        checkBrowserVersion();
        navigate(defaultRoute, {});
    }

    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
            vars[key] = value;
        });
        return vars;
    }

    function parseParamsFromHash() {
        if (window.location.hash.split('?').length > 1) {

            var params = window.location.hash.split('?')[1].split('&').map(function (item) {
                return item.split('=');
            });
            var namedparams = {};

            for (i = -1; param = params[++i];) {
                namedparams[param[0]] = param[1];
            }
            return namedparams;
        } else {
            return {};
        }
    }

    function getHash() {
        var hash = "";
        if (window.location.hash.indexOf('?') > -1) {
            hash = window.location.hash.split('#')[1].split('?')[0];
        } else {
            hash = window.location.hash.split('#')[1];
        }
        if (hash === null || hash === "") {
            hash = defaultRoute;
        }
        return hash;
    }

    function navigate(name, state) {
        if (!started) {
            // start responding to hash change
            $(window).on('hashchange', function () {
                oldHash = currentHash;
                currentHash = getHash();
                loadComponent(currentHash, parseParamsFromHash());
            });
            $(window).trigger('hashchange');
            started = true;
        } else {
            loadComponent(name, state);
        }
    }

    function loadComponent(componentName, params) {

        try {
            $(renderContainer)[oldHash]('destroy');
        } catch (e) {

        }

        setTimeout(function () {
            require(['js/pagewidgets/' + componentName], function (component) {
                $(renderContainer)[componentName]({ params: params, oldHash: oldHash });

            }, function (err) {
                console.log(err);
            });
        }, 300);
    }

    return {
        startRouting: startRouting,
        navigateTo: navigate
    };
});