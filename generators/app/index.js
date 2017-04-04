'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the super awesome DOE-UI ' + chalk.red('generator-doeui') + ' generator! Brought to you by Vivek Siruvuri'
    ));

    const prompts = [{
      type: 'input',
      name: 'applicationname',
      message: 'Tell me what is the name of the application (This could be a long name with whitespaces ex: "Cohorts Management System", "Non Public School System")'
    },{
      type: 'input',
      name: 'applicationshortname',
      message: 'Tell me what is the short name of the application (This is the shortname to be used in naming the application folders and project name ex: "Cohorts", "NPS")'
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
  }

  install() {
    this.installDependencies();
  }
};
