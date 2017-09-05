define(['jquery',
    'jqueryuiwidget',
    'handlebars',
    'moment',
    'js/services/wizardservice',
    'js/vendor/text!js/pagewidgets/pagesubwidgets/wizardnav.html'],
    function ($, ui, Handlebars, moment, wizardservice, tmpl) {
        "use strict";
        $.widget("doe.wizardnav", {
            // Options to be used as defaults
            options: {
                params: {},
                data: {},
                currentStep: {}
            },
            toggle: function () {
                this.element.toggleClass('trackerlisthidden');
                console.log('toggle mode');
            },
            _create: function () {
                this._compileTemplate();
            },
            _compileTemplate: function () {
                var compiled = Handlebars.compile(tmpl);
                this.element.html(compiled({ model: this.options.data }));
                this._generateCollapsible();
            },
            _generateCollapsible: function () {
                var i;
                for (i = 0; i < this.options.data.WizardSteps.length; i++) {
                    if(this.options.data.WizardSteps[i].status.isCurrent){
                        this.options.currentStep = this.options.data.WizardSteps[i];
                        
                    }
                    this._createPanelArea(this.options.data.WizardSteps[i].WizardStepSection.replace(/\s/g, ''), this.options.data.WizardSteps[i].WizardStepSection);
                    this._addItemToPanelArea(this.options.data.WizardSteps[i]);
                }
                this._bindEvents();
            },
            _createPanelArea: function (panelname, paneltitle) {
                if (this.element.find('.subjectareacontent > .collapsibles > .' + panelname + '').length < 1) {
                    var arrHTML = [];
                    arrHTML.push('    <p class="panel ' + panelname + '">');
                    arrHTML.push('        <span class="icon plusicon"></span>');
                    arrHTML.push('            <a class="paneltitle">' + paneltitle + '</a>');
                    //arrHTML.push('             <div class="count">1</div>');
                    arrHTML.push('    </p>');
                    arrHTML.push('    <div class="panelcontent clearfix">');
                    arrHTML.push('      <div class="' + panelname + 'info itemcontainer clearfix">');
                    arrHTML.push('      </div>');
                    arrHTML.push('    </div>');

                    this.element.find('.subjectareacontent > .collapsibles').append(arrHTML.join(''));
                    return;
                } else {
                    //  console.log('Panel already exists');
                    return;
                }
            },
            _addItemToPanelArea: function (resource) {
                //console.log(resource);
                var arrHTML = []; 
                arrHTML.push('   <div class="listitem"  data-id="'+ resource.WizardStepID +'">');
                arrHTML.push('                <div class="listtitle">');
                arrHTML.push('                <a href="javascript:void(0)" data-stepid="' + resource.WizardStepID + '" >');
                arrHTML.push(resource.Name);
                arrHTML.push('                </a>');
                if(resource.status.isComplete){
                    arrHTML.push('<i class="fa fa-check-circle fa-2x pull-right text-success" aria-hidden="true" data-id="'+ resource.WizardStepID +'"></i>');
                }else{
                    arrHTML.push('<i class="fa fa-check-circle fa-2x pull-right text-success hide" aria-hidden="true" data-id="'+ resource.WizardStepID +'"></i>');
                }
                arrHTML.push('                </div>');
                arrHTML.push('                <div class="clearfix">');
                arrHTML.push('                </div>');
                arrHTML.push('   </div>');
                arrHTML.push('   <div class="clearfix">');
                arrHTML.push('   </div>');

                //console.log($('.subjectareacontent > .collapsibles > #' + resource.subjectAreaValue + ' > .count').text());
                // Update the number of reports in the panel
                var intCount = parseInt(this.element.find('.subjectareacontent > .collapsibles > #' + resource.subjectAreaValue + ' > .count').text());
                intCount = intCount + 1;
                //$('.subjectareacontent > .collapsibles > #' + resource.subjectAreaValue + ' > .count').text(intCount);
                this.element.find('.subjectareacontent > .collapsibles > .panelcontent > .' + resource.WizardStepSection.replace(/\s/g, '') + 'info').append(arrHTML.join(''));
            },
            _refreshAccordion: function(){
                   this.options.currentStep = _.find(this.options.data.WizardSteps, function (item) { return item.status.isCurrent === true; });
                   this.element.find('div.listitem').removeClass('active');
                   this.element.find('div.listitem[data-id='+ this.options.currentStep.WizardStepID +']').addClass('active');
                   if(this.element.find('p.panel.' + this.options.currentStep.WizardStepSection.replace(/\s/g, '') +' span.minusicon').length > 0){
                          this.element.find('p.panel.active:not(.'+ this.options.currentStep.WizardStepSection.replace(/\s/g, '') +')').trigger('click');     
                   }else{
                        this.element.find('p.panel span.minusicon').trigger('click');     
                        this.element.find('p.panel.' + this.options.currentStep.WizardStepSection.replace(/\s/g, '') +'').trigger('click');     
                   }
                   var completedSteps = $.grep(this.options.data.WizardSteps, function (item, i) { return item.status.isComplete === true; });
                   var that = this;
                   var id = null;
                   var stepobject = null;
                   
                   this.element.find('i').each(function(){
                      id = parseInt($(this).attr('data-id'));
                     
                      stepobject =  _.find(completedSteps, function (item) { return item.WizardStepID === id; });

                      if (stepobject){
                            $(this).removeClass('hide');
                      }else{
                           $(this).addClass('hide');
                      }
                      stepobject = null;
                   });
            },
            _bindEvents: function () {
                this.element.find(".panelcontent").hide();

                this._on(this.element, {
                    "click div.listitem": function (event, element) {
                        event.stopImmediatePropagation();
                        var ID = parseInt($(event.currentTarget).attr('data-id'));
                        var step = _.find(this.options.data.WizardSteps, function (item) { return item.WizardStepID === ID; });
                        this.element.find('div.listitem.active').removeClass('active');
                        $(event.currentTarget).addClass('active');
                        //var p = wizardservice.setCurrentStep(step, this.options.params["id"]);
                        //p.done($.proxy(function () {
                            this._trigger("navchange", null, step);
                        //}, this));
                    },
                    "click .collapsibles .panel": function (event, element) {
                        if ($(event.currentTarget).children('span.icon').hasClass('minusicon')) {
                            $(event.currentTarget).children('span.icon').removeClass('minusicon').addClass('plusicon');
                        } else {
                            $(event.currentTarget).children('span.icon').removeClass('plusicon').addClass('minusicon');
                            $(event.currentTarget).addClass('.active');
                        }
                        $(event.currentTarget).next(".panelcontent").slideToggle(500);
                    }
                });

                this.element.find('div.listitem[data-id='+ this.options.currentStep.WizardStepID +']').addClass('active');

                this.element.find('p.panel.' + this.options.currentStep.WizardStepSection.replace(/\s/g, '') +'').trigger('click');
            },
            _destroy: function () {
                this.element.html('');
            },
            _setOption: function (key, value) {
                this._super(key, value);
                if (key === "data") {
                    this._refreshAccordion();
                }
            },
            _setOptions: function (options) {
                this._super(options);
                //this._compileTemplate();
            }
        });
    });


