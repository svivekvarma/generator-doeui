define(['jquery',
    'jqueryuiwidget',
    'handlebars',
    'moment',
    'underscore',
    'js/vendor/text!js/pagewidgets/pagesubwidgets/wizardtracker.html'],
    function ($, ui, Handlebars, moment,_, tmpl) {
      "use strict";
      
        $.widget("doe.wizardtracker", {
            // Options to be used as defaults
            options: {
                params: {},
                data: {}
            },
            _create: function () {
               
                this.evaluateModelData(); 
                this._bindEvents();
            },
            _compileTemplate: function () {
                
                var compiled = Handlebars.compile(tmpl);
                this.element.html(compiled({totalSteps: this.options.data.WizardSteps.length, 
                    currentStepNumber: this.options.currentStepNumber, 
                    currentStep: this.options.currentStep}));    
            },
            _bindEvents: function () {
                this._on(this.element, {
                    "click div.trackernavtoggle": function (event, element) {
                        event.stopImmediatePropagation();
                        this._trigger( "navtoggle", null, {} );
                    }
                });
            },
            _destroy: function () {
               
                this.element.html('');
            },
            evaluateModelData : function(){
                 this.options.currentStep  = _.find(this.options.data.WizardSteps, function(item){ return item.status.isCurrent === true; });
                 this.options.currentStepNumber  = _.findIndex(this.options.data.WizardSteps, function(item){ return item.status.isCurrent === true; }) + 1;
                 this._compileTemplate();
            },
            _setOption: function (key, value) {
                this._super(key, value);
                if(key === "data"){
                   this.evaluateModelData();
                }
            },
            _setOptions: function (options) {
                this._super(options);
                this.evaluateModelData();
            }
        });
    });


