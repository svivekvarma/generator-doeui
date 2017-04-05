'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the pagewidget  ' + chalk.red('generator-doeui') + ' generator!'
    ));

    const prompts = [{
      type: 'input',
      name: 'widgetname',
      message: 'Tell me what is the name of the pagewidget ( ex: "home", "studentdetail")'
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('home.html'),
      this.destinationPath('js/pagewidgets/' + this.props.widgetname + '.html'),
      {pagewidgetname: this.props.widgetname}
    );


    this.fs.copyTpl(
      this.templatePath('home.js'),
      this.destinationPath('js/pagewidgets/' + this.props.widgetname + '.js'),
      {pagewidgetname: this.props.widgetname}
    );
  }

  install() {
    this.installDependencies();
  }
};
