define(['jquery'],
    function ($) {
        var controllerName = null;

        function setControllerName(name) {
            this.controllerName = name;
        }

        function getControllerName(name) {
            return this.controllerName;
        }

        function writeData(request) {

            var p = $.ajax({
                url: './AARAPI/api/' + this.controllerName + '/EducationOrganization',
                type: 'POST',
                data: JSON.stringify(request),
                contentType: 'application/json;charset=utf-8'
            });
            return p;
        }

        function getStepData(id) {

            var p = $.ajax({
                url: './AARAPI/api/' + this.controllerName + '/EducationOrganization' + '?ID=' + id,
                type: 'GET',
                contentType: 'application/json;charset=utf-8'
            });
            return p;
        }

        function deleteData(request) {

            var p = $.ajax({
                url: './AARAPI/api/' + this.controllerName + '/EducationOrganization',
                type: 'DELETE',
                data: JSON.stringify(request),
                contentType: 'application/json;charset=utf-8'
            });
            return p;
        }

        return {
            getStepData: getStepData,
            setControllerName: setControllerName,
            writeData: writeData,
            deleteData: deleteData
        };
    });