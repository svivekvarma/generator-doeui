define(['jquery',
    'jqueryuiwidget',
    'handlebars',
    'moment',
    'js/services/wizardservice',
    'js/vendor/text!js/pagewidgets/pagesubwidgets/wizardstepbase.html',
    'js/vendor/text!js/pagewidgets/pagesubwidgets/wizardstepbaseerror.html'],
    function ($, ui, Handlebars, moment, wizardservice, basetmpl, basetemplerr) {
        "use strict";
        $.widget("doe.wizardstepbase", {
            // Options to be used as defaults
            options: {
                controller: {},
                params: {},
                stepModel: {},
                data: {},
                totalSteps: {},
                isLastStep: {},
                isFirstStep: {}
            },
            _create: function () {

            },
            _fetchAndRender: function () {
                this._trigger("startprocessing", null, this.options.data);
                wizardservice.setControllerName(this.options.controller);
                var p = wizardservice.getStepData(this.options.params["id"], this.options.data["ReadMethod"]);
                p.done($.proxy(function (data) {
                    this.options.stepModel = data;
                    this._trigger("endprocessing", null, this.options.data);
                }, this));

                p.fail($.proxy(function (jqXHR, textStatus, errorThrown) {
                    if (jqXHR.status == 500) {

                    }
                    this._compileAndRenderErrorTemplate();
                }, this));

                return p;
            },
            _compileAndRenderErrorTemplate: function () {
                var compiled = Handlebars.compile(basetemplerr);
                this.element.html(compiled(this.options));
            },
            _compileTemplate: function () {
                var compiled = Handlebars.compile(basetmpl);
                this.element.find('div.buttoncontainer').html(compiled(this.options));
            },
            _bindEvents: function () {
                this._on(this.element, {
                    "click button.next, button.back, button.save": function (event, element) {

                        event.stopImmediatePropagation();

                        var eventtype = '';
                        if ($(event.currentTarget).hasClass('back')) {

                            eventtype = "back";
                        }

                        if ($(event.currentTarget).hasClass('next')) {

                            eventtype = "next";
                        }

                        if ($(event.currentTarget).hasClass('save')) {

                            eventtype = "save";
                        }

                        if (this._isFormValid()) {
                            this._processStep(eventtype);
                        }

                    }, "click button.back": function (event, element) {
                        event.stopImmediatePropagation();
                        //this._trigger("back", null, this.options.data);
                    },
                });
                this._bindForm();
            },
            _processStep: function (eventtype) {
                this._trigger("startprocessing", null, this.options.data);
                var p = this._saveDataInternal();
                p.done($.proxy(function (data) {
                    this._trigger("endprocessing", null, this.options.data);
                    this._trigger(eventtype, null, this.options.data);
                }, this));
            },
            saveData: function () {
                if (this._isFormValid()) {
                    return this._saveDataInternal();
                } else {
                    var d = $.Deferred();
                    

                    $.voverlay.show({
                        title: "Form Unsaved",
                        style: "max-width:1000px",
                        opacity: "0.24",
                        closeOverride: false,
                        modalMode: true,
                        closeButton: "OK",
                        showClose: false,
                        modalButtonsToShow: ["yes", "cancel"],
                        modalYesButtonTemplate: function () { return '<input value="Yes" class="btn btn-primary" type="button" />'; },
                        modalCancelButtonTemplate: function () { return '<input class="btn btn-danger" value="Cancel" type="button" />'; },
                        html: 'You have some data which is not valid, Do you wish to leave the data unsaved ?',
                        onModalYes: function ($this, modalData) {
                            d.resolve();
                            return true;
                        },
                        onModelCancel: function () { 
                            d.reject();
                            return true 
                        }
                    });

                    return d.promise();
                }
            },
            _saveDataInternal: function () {
                var p = null;
                var request = this.element.find('form').serializeJSON();
                wizardservice.setControllerName(this.options.controller);
                if (this.options.data["WriteMethod"] && this.options.data["WriteMethod"] !== '') {
                    p = wizardservice.writeStepData(request, this.options.data["WriteMethod"]);

                    p.fail($.proxy(function (jqXHR, textStatus, errorThrown) {
                        if (jqXHR.status == 500) {
                            // Placeholder for future implementations
                        }
                        this._compileAndRenderErrorTemplate();
                    }, this));
                }
                else {
                    var d = $.Deferred();
                    d.resolve();
                    p = d.promise();
                }
                return p;
            },
            _isFormValid: function () {
                var form = this.element.find('form');
                var validator;
                validator = form.validate();
                if (validator) {
                    return form.valid();
                } else {
                    return true;
                }
            },
            _destroy: function () {
                this._trigger('destroy');
            },
            _bindForm: function () {
                this.element.find('form').formParams(this.options.stepModel);
            }
        });
    });


