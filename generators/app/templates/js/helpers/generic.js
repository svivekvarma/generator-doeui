define(['jquery', 'moment'],
    function ($, moment) {

        function registerAjaxGlobal() {
            // Setting up the global ajax handler 
            //var appurl = $.cookie('appurl');
            var appurl = "";

            $.ajaxSetup({
                beforeSend: function (jqXHR, settings) {
                    settings.url = appurl + settings.url;
                },
                global: true,
                cache: false,
                statusCode: {
                    401: function () {
                          location.href = 'https://login.doe.k12.de.us';
                    },
                    403: function () {
                        //  location.href = 'https://login.doe.k12.de.us';
                    }
                }
            });

            $(document).ajaxError(function (event, jqxhr, settings, thrownError) {
                console.log('Error executing - ' + settings.url);
                console.log('Error is - ' + thrownError);
            });

            $(document).ajaxSuccess(function (event, xhr, settings, data) {
                //  if (!data.result.isSuccess) {
                //      console.log('Error executing - ' + settings.url);
                //      console.log('Error is - ' + data.result.message);
                //  } else if (settings.doeoptions.showMessage) {
                //      console.log('Successfully executed - ' + settings.url);
                //      console.log('Message is - ' + data.result.message);
                //  }
            });
            // End Global ajax setup
        }
        return {
            registerAjaxGlobal: registerAjaxGlobal
        };
    });