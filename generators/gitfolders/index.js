'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

var mkdirp = require('mkdirp');


module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the awesome ' + chalk.red('generator-doeui') + ' generator!'
    ));

    const prompts = [{
      type: 'input',
      name: 'applicationshortname',
      message: 'Tell us the application short name (Ex : Cohorts Management System - its short name is Cohorts - This helps in setting up your gitignores)',
      default: true
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {

    mkdirp('Application');

    mkdirp('Application/Middletier');

    mkdirp('Application/UI');

    mkdirp('Reports');

    mkdirp('Database');

    this.fs.copyTpl(
      this.templatePath('_.gitignore'),
      this.destinationPath('.gitignore'),
      { applicationshortname: this.props.applicationshortname }
    );
  }

  install() {
    //this.installDependencies();
  }
};
