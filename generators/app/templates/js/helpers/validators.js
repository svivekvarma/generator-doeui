define(['jquery', 'moment'],
    function ($, moment) {

        function registerValidators() {

            $.validator.addMethod("selectoption", function (value, element) {
                var $element = $(element);
                if ($element.val() === '-1') {
                    return false;
                }
                return "Please choose an option";
            }, $.validator.messages.required);


            $.validator.addMethod(
                "dateUS",
                function (value, element) {
                    if (value.indexOf('-') > 2) {
                        return (moment(value, "YYYY-MM-DD")).isValid();
                    }
                    else {
                        if ((value.indexOf('/') !== 2) && (value.indexOf('/') !== 5)) {
                            return false;
                        } else {
                            return (moment(value, "MM/DD/YYYY")).isValid();
                        }
                    }
                },
                "Please enter a valid date in the format mm/dd/yyyy"
            );

            $.validator.addMethod(
                "decimalCheck",
                function (value, element) {
                    var indexValue = value.indexOf('.');
                    var beforeDecimal = (value.toString().split(".")[0]).length;
                    var afterDecimalLength = 0;
                    var afterDecimal = (value.toString().split(".")[1]);
                    if (afterDecimal != undefined) {
                        var afterDecimalLength = (value.toString().split(".")[1]).length;
                    }

                    if (indexValue === -1 || beforeDecimal > 2 || beforeDecimal === 0 || afterDecimalLength > 8 || afterDecimalLength === 0) {
                        return false;
                    }

                    return true;
                
                },
                "Please enter decimal value only (eg. 0.00), Max of 2 numbers before and 8 numbers after the decimal point."
            );

            $.validator.addMethod(
                "dateUSorEmpty",
                function (value, element) {
                    if ($(element).val() === "" && $(element)[0].validity.valid) {
                        return true;
                    }

                    if (value.indexOf('-') > 2) {
                        return (moment(value, "YYYY-MM-DD")).isValid();
                    }
                    else {
                        if ((value.indexOf('/') !== 2) && (value.indexOf('/') !== 5)) {
                            return false;
                        } else {
                            return (moment(value, "MM/DD/YYYY")).isValid();
                        }
                    }
                },
                "Please enter a valid date in the format mm/dd/yyyy"
            );

        };

        return {
            registerValidators: registerValidators
        };
    });