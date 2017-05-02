'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the wizardstepwidget  ' + chalk.red('generator-doeui') + ' generator!'
    ));

    const prompts = [{
      type: 'input',
      name: 'widgetname',
      message: 'Tell me what is the name of the wizardstepwidget ( ex: "toybasicinfo", "toydemoinfo")'
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('template.html'),
      this.destinationPath('js/pagewidgets/pagesubwidgets/' + this.props.widgetname + '.html'),
      {widgetname: this.props.widgetname}
    );


    this.fs.copyTpl(
      this.templatePath('template.js'),
      this.destinationPath('js/pagewidgets/pagesubwidgets/' + this.props.widgetname + '.js'),
      {widgetname: this.props.widgetname}
    );
  }

  install() {
    //this.installDependencies();
  }
};
