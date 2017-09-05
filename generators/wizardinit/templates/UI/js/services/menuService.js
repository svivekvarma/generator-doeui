define(['jquery'],
    function ($) {

        function get() {
            var p = $.ajax({
                url: './DemoApi/api/menu',
                type: 'GET',
                contentType: 'application/json;charset=utf-8'
            });
            return p;
        }
        return {
            get: get
        };
    });