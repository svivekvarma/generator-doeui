define(['jquery'],
    function ($) {
        var controllerName = null;

        function setControllerName(name){
            this.controllerName = name;
        }

        function getControllerName(name){
            return this.controllerName;
        }

        function getWizardSteps(id) {

            var p = $.ajax({
                url: './DemoApi/api/DemoWizard/Get/' + id,
                type: 'GET',
                contentType: 'application/json;charset=utf-8'
            });
            return p;
        }

        function setCurrentStep(step, id) {

            var p = $.ajax({
                url: './DemoAPI/api/Demo/Step',
                type: 'POST',
                data: JSON.stringify({ "ID": id, "WizardStepID": step.WizardStepID }),
                contentType: 'application/json;charset=utf-8'
            });
            return p;
        }

        function getStepData(id, methodname) {

            var p = $.ajax({
                url: './DemoAPI/api/'+ this.controllerName + '/' + methodname + '?ID=' + id,
                type: 'GET',
                contentType: 'application/json;charset=utf-8'
            });
            return p;
        }

        function writeStepData(request, methodname) {

            var p = $.ajax({
                url: './DemoAPI/api/'+ this.controllerName + '/' + methodname,
                type: 'POST',
                data: JSON.stringify(request),
                contentType: 'application/json;charset=utf-8'
            });
            return p;
        }

        return {
            getWizardSteps: getWizardSteps,
            setCurrentStep: setCurrentStep,
            getStepData: getStepData,
            writeStepData: writeStepData,
            setControllerName: setControllerName,
            getControllerName: getControllerName
        };
    });