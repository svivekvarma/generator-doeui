'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the DOE Wizard Scaffolder for existing application ' + chalk.red('generator-doeui') + ' !'
    ));

    const prompts = [{
      type: 'input',
      name: 'applicationshortname',
      message: 'Please type in the name of the Project - Exactly as it was created - Ex (CIP, Cohorts, NPS - This will also be your namespace for the solution and projects)'
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });

  }

  writing() {
    
    this.fs.copy(
      this.templatePath('MT/DEMO.Data/Wizard.edmx'),
      this.destinationPath(this.props.applicationshortname + '.Data/'  + 'Wizard.edmx')
    );

    this.fs.copy(
      this.templatePath('MT/DEMO.Data/Wizard.edmx.diagram'),
      this.destinationPath(this.props.applicationshortname + '.Data/'  + 'Wizard.edmx.diagram')
    );

    this.fs.copy(
      this.templatePath('MT/DEMO.Data/Wizard.tt'),
      this.destinationPath(this.props.applicationshortname + '.Data/'  + 'Wizard.tt')
    );

    this.fs.copy(
      this.templatePath('MT/DEMO.Data/Wizard.Context.tt'),
      this.destinationPath(this.props.applicationshortname + '.Data/'  + 'Wizard.Context.tt')
    );

    this.fs.copyTpl(
      this.templatePath('MT/DEMO.Models/WizardModel.cs'),
      this.destinationPath(this.props.applicationshortname + '.Models/'  + 'WizardModel.cs'),
      {
        applicationshortname: this.props.applicationshortname
      }
    );

    this.fs.copyTpl(
      this.templatePath('MT/DEMO.Services/WizardService.cs'),
      this.destinationPath(this.props.applicationshortname + '.Services/'  + 'WizardService.cs'),
      {
        applicationshortname: this.props.applicationshortname
      }
    );

    this.fs.copy(
      this.templatePath('UI/less/wizard.less'),
      this.destinationPath('../../UI/less/' + 'wizard.less')
    );

    this.fs.copy(
      this.templatePath('UI/js/pagewidgets/wizardapplication.js'),
      this.destinationPath('../../UI/js/pagewidgets/' + 'wizardapplication.js')
    );

    this.fs.copy(
      this.templatePath('UI/js/pagewidgets/pagesubwidgets/wizardnav.js'),
      this.destinationPath('../../UI/js/pagewidgets/pagesubwidgets/' + 'wizardnav.js')
    );


    this.fs.copy(
      this.templatePath('UI/js/pagewidgets/pagesubwidgets/wizardnav.html'),
      this.destinationPath('../../UI/js/pagewidgets/pagesubwidgets/' + 'wizardnav.html')
    );

    this.fs.copy(
      this.templatePath('UI/js/pagewidgets/pagesubwidgets/wizardstepbase.js'),
      this.destinationPath('../../UI/js/pagewidgets/pagesubwidgets/' + 'wizardstepbase.js')
    );

    this.fs.copy(
      this.templatePath('UI/js/pagewidgets/pagesubwidgets/wizardstepbase.html'),
      this.destinationPath('../../UI/js/pagewidgets/pagesubwidgets/' + 'wizardstepbase.html')
    );


    this.fs.copy(
      this.templatePath('UI/js/pagewidgets/pagesubwidgets/wizardstepbaseerror.html'),
      this.destinationPath('../../UI/js/pagewidgets/pagesubwidgets/' + 'wizardstepbaseerror.html')
    );


    this.fs.copy(
      this.templatePath('UI/js/pagewidgets/pagesubwidgets/wizardtracker.html'),
      this.destinationPath('../../UI/js/pagewidgets/pagesubwidgets/' + 'wizardtracker.html')
    );


    this.fs.copy(
      this.templatePath('UI/js/pagewidgets/pagesubwidgets/wizardtracker.js'),
      this.destinationPath('../../UI/js/pagewidgets/pagesubwidgets/' + 'wizardtracker.js')
    );

    this.fs.copy(
      this.templatePath('UI/js/pagewidgets/pagesubwidgets/demoquestion.html'),
      this.destinationPath('../../UI/js/pagewidgets/pagesubwidgets/' + 'question.html')
    );


    this.fs.copy(
      this.templatePath('UI/js/pagewidgets/pagesubwidgets/demoquestion.js'),
      this.destinationPath('../../UI/js/pagewidgets/pagesubwidgets/' + 'question.js')
    );

    this.fs.copy(
      this.templatePath('UI/js/services/wizardservice.js'),
      this.destinationPath('../../UI/js/services/wizardservice.js')
    );

  }

  install() {
    this.installDependencies();
  }
};
