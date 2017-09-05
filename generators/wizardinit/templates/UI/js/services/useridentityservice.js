define(['jquery'],
    function ($) {

        function getUserID() {

            var p = $.ajax({
                url: './DemoAPI/api/GetUserIdentity/GetUserID',
                type: 'GET',
                contentType: 'application/json;charset=utf-8'
            });
            return p;
        }

        function getUserRoles() {

            var p = $.ajax({
                url: './DemoAPI/api/GetUserIdentity/GetUserRoles',
                type: 'GET',
                contentType: 'application/json;charset=utf-8'
            });
            return p;
        }
        return {
            getUserRoles: getUserRoles,
            getUserID: getUserID
        };
    });