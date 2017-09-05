
define(['jquery',
    'jqueryuiwidget',
    'handlebars',
    'moment',
    'js/vendor/text!js/pagewidgets/wizardapplication.html',
    'js/services/wizardservice',
    'js/pagewidgets/pagesubwidgets/wizardtracker',
    'js/pagewidgets/pagesubwidgets/wizardnav'],
    function ($, ui, Handlebars, moment, tmpl, wizardservice, wizardtracker, wizardnav) {
        "use strict";

        $.widget("doe.wizardapplication", $.doe.base, {
            // Options to be used as defaults
            options: {
                params: {},
                data: {}
            },
            _create: function () {
                this._super();
                this._fetchAndRender();
            },
            _fetchAndRender: function () {
                this._super();

                var p = wizardservice.getWizardSteps(this.options.params.id);

                p.done($.proxy(function (data) {
                    this.options.data = data;
                    this._compileTemplate();
                }, this));

                p.fail(function () {
                    $.voverlay.show({
                        style: "width:680px;max-width:1000px",
                        opacity: "0.24",
                        closeOverride: false,
                        modalMode: true,
                        showClose: false,
                        modalButtonsToShow: ["yes"],
                        modalYesButtonTemplate: function () { return '<input value="Okay" class="btn btn-primary" type="button" />'; },
                        html: "Error occurred while fetching application information.The process window may have been closed or you don't have access to the application.",
                        onModalYes: function ($this, modalData) {
                            location.hash = "#home";
                            return true;
                        }
                    });
                });
            },
            _compileTemplate: function () {
                this._super();
                var compiled = Handlebars.compile(tmpl);
                this.element.html(compiled(this.options.data));
                this.element.find('div.trackerdetails').wizardtracker({
                    data: this.options.data,
                    params: this.options.params
                });
                this.element.find('div.trackerlist').wizardnav({
                    data: this.options.data,
                    params: this.options.params
                });

                this._loadWizardDetailWidget();

                this._bindEvents();
            },
            _bindEvents: function () {
                this._super();

                this._on(this.element, {
                    "wizardtrackernavtoggle div.trackerdetails": function (event) {
                        this.element.find('div.trackerlist').wizardnav('instance').toggle();
                        this.element.find('div.stepdetails').toggleClass('fullwidth');
                        event.preventDefault();
                    },
                    "wizardnavnavchange div.trackerlist": function (event, data) {
                        event.preventDefault();
                        //console.log(this.element.find('div.stepdetails').data('doe-' + this.options.currentStep.Widget));
                        var p = this.element.find('div.stepdetails').data('doe-' + this.options.currentStep.Widget).saveData();
                        p.done($.proxy(function(){
                            this._setCurrentStep(data);
                        }, this));
                        
                    }
                });
            },
            _setCurrentStep: function (step) {
                step.ID = this.options.params.id;
                var p = wizardservice.setCurrentStep(step, this.options.params.id);
                p.done($.proxy(function () {
                    this._refresh();
                }, this));

                p.fail($.proxy(function () {
                    this._refresh();
                }, this));
            },
            _moveNextStep: function (step) {

                var stepindex = _.findIndex(this.options.data.WizardSteps, function (item) { return item.WizardStepID === step.WizardStepID; });
                this.options.data.WizardSteps[stepindex].status.isCurrent = false;
                this.options.data.WizardSteps[stepindex + 1].status.isCurrent = true;
                this._setCurrentStep(this.options.data.WizardSteps[stepindex + 1]);
            },
            _moveBackStep: function (step) {
                var stepindex = _.findIndex(this.options.data.WizardSteps, function (item) { return item.WizardStepID === step.WizardStepID; });
                this.options.data.WizardSteps[stepindex].status.isCurrent = false;
                this.options.data.WizardSteps[stepindex - 1].status.isCurrent = true;
                this._setCurrentStep(this.options.data.WizardSteps[stepindex - 1]);
            },
            _refresh: function () {
                var refreshdeferred = $.Deferred();
                var p;

                p = wizardservice.getWizardSteps(this.options.params.id);

                p.done($.proxy(function (data) {
                    this.options.data = data;
                    this.element.find('div.trackerdetails').wizardtracker({
                        data: this.options.data
                    });
                    this.element.find('div.trackerlist').wizardnav({
                        data: this.options.data
                    });

                    var loaderpromise = this._loadWizardDetailWidget();

                    loaderpromise.done($.proxy(function (data) { refreshdeferred.resolve(); }, this));

                }, this));

                return refreshdeferred.promise();
            },
            _loadWizardDetailWidget: function () {

                //this.options.currentStep = _.find(this.options.data.WizardSteps, function (item) { return item.status.isCurrent === true; });
                var loaderdeferred = $.Deferred();
                if (this.options.currentStep) {
                    try {
                        this.element.find('div.stepdetails')[this.options.currentStep.Widget]('destroy');
                    } catch (e) {
                        console.log(e);
                    }
                }
                this.options.currentStep = _.find(this.options.data.WizardSteps, function (item) { return item.status.isCurrent === true; });
                if (!this.options.currentStep) {
                    this.options.currentStep = this.options.data.WizardSteps[0];
                }

                var that = this;
                require(['js/pagewidgets/pagesubwidgets/' + this.options.currentStep.Widget], $.proxy(function (component) {
                    this.element.find('div.stepdetails')[this.options.currentStep.Widget]({
                        controller: this.options.data.ServiceController,
                        data: this.options.currentStep,
                        totalSteps: this.options.data.WizardSteps.length,
                        isLastStep: this.options.currentStep.Ordinal === this.options.data.WizardSteps.length,
                        isFirstStep: this.options.currentStep.Ordinal === 1,
                        params: this.options.params,
                        next: function (event, data) {
                            that._moveNextStep(data);
                        },
                        back: function (event, data) {
                            that._moveBackStep(data);
                        },
                        save: function (event, data) {
                            var refreshpromise = that._refresh();

                            refreshpromise.done(function () {
                                that._showSaveMessage();
                            });
                        }
                    }).bind();

                    loaderdeferred.resolve();

                }, this), function (err) {
                    this.element.find('div.stepdetails').html(this.element.find('.messagewhenstepdetailloadfails').html());
                    console.log(err);
                });

                return loaderdeferred.promise();
            },
            _showSaveMessage: function () {

                $.voverlay.show({
                    style: "width:680px;max-width:1000px",
                    opacity: "0.24",
                    closeOverride: false,
                    modalMode: true,
                    showClose: false,
                    modalButtonsToShow: ["yes"],
                    modalYesButtonTemplate: function () { return '<input value="Okay" class="btn btn-primary" type="button" />'; },
                    html: "Your application has been saved. Modifications can be made until the closing date."
                });
            },
            _bindWizardDetailEvents: function () {

            },
            _unbindWizardDetailEvents: function () {

            },
            _destroy: function () {
                this._super();
                this.element.find('div.trackerdetails').wizardtracker('destroy');
                this.element.find('div.trackerlist').wizardnav('destroy');
                this.element.html('');
            },
            _setOption: function (key, value) {
                this._super(key, value);
            },
            _setOptions: function (options) {
                this._super(options);
            }
        });
    });


