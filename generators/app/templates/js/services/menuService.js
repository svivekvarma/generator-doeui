define(['jquery'],
    function ($) {

        function get() {
            var p = $.ajax({
                url: './<%=applicationshortname%>API/api/menu',
                type: 'GET',
                contentType: 'application/json;charset=utf-8'
            });
            return p;
        }

        return {
            get: get
        };
    });