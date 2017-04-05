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
    }, {
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

    //this.directory('images', 'images');
    //this.directory('less', 'less');
    //this.directory('css', 'css');
    //this.directory('sass', 'sass');

    this.fs.copy(
      this.templatePath('configs'),
      this.destinationPath('configs')
    );

    this.fs.copy(
      this.templatePath('.vscode'),
      this.destinationPath('.vscode')
    );

    this.fs.copy(
      this.templatePath('images'),
      this.destinationPath('images')
    );

    this.fs.copy(
      this.templatePath('less'),
      this.destinationPath('less')
    );

    this.fs.copy(
      this.templatePath('css'),
      this.destinationPath('css')
    );

    this.fs.copy(
      this.templatePath('sass'),
      this.destinationPath('sass')
    );

    this.fs.copy(
      this.templatePath('js'),
      this.destinationPath('js')
    );


    this.fs.copy(
      this.templatePath('require.js'),
      this.destinationPath('require.js')
    );

    this.fs.copy(
      this.templatePath('main.js'),
      this.destinationPath('main.js')
    );


    this.fs.copy(
      this.templatePath('gruntfile.js'),
      this.destinationPath('gruntfile.js')
    );


    this.fs.copy(
      this.templatePath('build.js'),
      this.destinationPath('build.js')
    );

    this.fs.copy(
      this.templatePath('bs-config.js'),
      this.destinationPath('bs-config.js')
    );

    this.fs.copy(
      this.templatePath('browserupgrade.html'),
      this.destinationPath('browserupgrade.html')
    );


    this.fs.copy(
      this.templatePath('app.js'),
      this.destinationPath('app.js')
    );

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      { applicationname: this.props.applicationname, applicationshortname: this.props.applicationshortname }
    );


    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('index.html'),
      { applicationname: this.props.applicationname, applicationshortname: this.props.applicationshortname }
    );


    this.fs.copyTpl(
      this.templatePath('bower.json'),
      this.destinationPath('bower.json'),
      { applicationname: this.props.applicationname, applicationshortname: this.props.applicationshortname }
    );
  }

  install() {
    this.installDependencies();
  }
};
