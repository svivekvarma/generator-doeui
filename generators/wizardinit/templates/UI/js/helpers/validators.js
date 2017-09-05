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

            $.validator.addMethod("greaterthanzero", function (value, element) {
                var $element = $(element);
                if ( parseInt($element.val()) < 0) {
                    return false;
                }
                return "Please enter a value greater than zero";
            },"Please enter a value greater than zero");

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
                "wordCount",
                function (value, element) {
                    var words = $.trim(element.value).length ? element.value.match(/\S+/g).length : 0;
                    var maxCount = element.dataset.maxWords;
                    if (words <= maxCount) {
                        return true;
                    }
                },
                "You have exceeded the maximum word count"
            );

            // $.validator.addMethod(
            //     "wordCountBio",
            //     function (value, element) {
            //         var words = $.trim(element.value).length ? element.value.match(/\S+/g).length : 0;
            //         var maxCount = 250;
            //         if (words <= maxCount) {
            //             return true;
            //         }
            //     },
            //     "You have exceeded the maximum word count"
            // );

            $.validator.addMethod(
                "decimalCheck",
                function (value, element) {
                    var indexValue = value.indexOf('.');
                    var beforeDecimal = (value.toString().split(".")[0]).length;
                    var afterDecimalLength = 0;
                    var afterDecimal = (value.toString().split(".")[1]);
                    if (afterDecimal !== undefined) {
                        afterDecimalLength = (value.toString().split(".")[1]).length;
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

            $.validator.addMethod("uniqueclassof", function (value, element) {
                var $element = $(element);
                var processwindowdata = JSON.parse(localStorage.getItem("ProcessWindow"));
                var elementclassof = parseInt($element.val());
                var filtereddata = $.grep(processwindowdata, function (n, i) {
                    return n.SchoolYear === elementclassof;
                });
                if (filtereddata.length > 0) {
                    return false;
                }
                return "Please choose an option";
            }, "School Year entered already exists, please use edit to update.");


            $.validator.addMethod("TOYAppEndDateValidate", function (value, element) {
                var $element = $(element);
                var $toyappbegindate = $element.parents('form').find('input[name=TOYAppBeginDate]');
                if (moment($element.val()).isBefore($toyappbegindate.val())) {
                    return false;
                }
                return "Please choose an option";
            }, "TOY Nomiation Begin Date cannot be greater than TOY Nomination End Date");

            $.validator.addMethod("TOYDinnerEndDateValidate", function (value, element) {
                var $element = $(element);
                var $toyDinnerbegindate = $element.parents('form').find('input[name=TOYDinnerBeginDate]');
                if (moment($element.val()).isBefore($toyDinnerbegindate.val())) {
                    return false;
                }
                return "Please choose an option";
            }, "TOY Dinner Registration Begin Date cannot be greater than TOY Dinner Registration End Date");

            $.validator.addMethod("SCHAppEndDateValidate", function (value, element) {
                var $element = $(element);
                var $SCHappbegindate = $element.parents('form').find('input[name=SCHAppBeginDate]');
                if (moment($element.val()).isBefore($SCHappbegindate.val())) {
                    return false;
                }
                return "Please choose an option";
            }, "Scholars Nomiation Begin Date cannot be greater than Scholars Nomination End Date");


            $.validator.addMethod("SCHDinnerEndDateValidate", function (value, element) {
                var $element = $(element);
                var $SCHDinnerbegindate = $element.parents('form').find('input[name=SCHDinnerBeginDate]');
                if (moment($element.val()).isBefore($SCHDinnerbegindate.val())) {
                    return false;
                }
                return "Please choose an option";
            }, "Scholars Dinner Registration Begin Date cannot be greater than Scholars Dinner Registration End Date");

        }

        return {
            registerValidators: registerValidators
        };
    });