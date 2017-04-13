'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
var mkdirp = require('mkdirp');

var generateGuid = function () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    /*jslint bitwise: true */
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    /*jslint bitwise: false */
    return v.toString(16);
  });
};

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the DOE MiddleTier Scaffolder ' + chalk.red('generator-doeui') + ' !'
    ));

    const prompts = [{
      type: 'input',
      name: 'applicationshortname',
      message: 'Please type in the name of the Project - Ex (CIP, Cohorts, NPS - This will also be your namespace for the solution and projects)'
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {


    this.props.SolutionGuid = generateGuid();
    this.props.APIGUID = generateGuid();
    this.props.DataGUID = generateGuid();
    this.props.ModelsGUID = generateGuid();
    this.props.ServicesGUID = generateGuid();
    this.props.ServicesTestGUID = generateGuid();

    mkdirp(this.props.applicationshortname);

    this.fs.copy(
      this.templatePath('Project/packages'),
      this.destinationPath(this.props.applicationshortname + '/packages')
    );

    this.fs.copy(
      this.templatePath('Project/.nuget'),
      this.destinationPath(this.props.applicationshortname + '/.nuget')
    );

    this.fs.copyTpl(
      this.templatePath('Project/ProjectName.sln'),
      this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.sln'),
      {
        applicationshortname: this.props.applicationshortname,
        SolutionGuid: this.props.SolutionGuid,
        APIGUID: this.props.APIGUID,
        DataGUID: this.props.DataGUID,
        ModelsGUID: this.props.ModelsGUID,
        ServicesGUID: this.props.ServicesGUID,
        ServicesTestGUID: this.props.ServicesTestGUID
      }
    );

    /*Start creating Models Project*/

    mkdirp(this.props.applicationshortname + '/' + this.props.applicationshortname + '.Models');

    this.fs.copyTpl(
      this.templatePath('Project/CIP.Models/CIP.Models.csproj'),
      this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.Models' + '/' + this.props.applicationshortname + '.Models.csproj'),
      {
        applicationshortname: this.props.applicationshortname,
        ModelsGUID: this.props.ModelsGUID,
        DataGUID: this.props.DataGUID
      }
    );

    this.fs.copy(
      this.templatePath('Project/CIP.Models/packages.config'),
      this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.Models' + '/packages.config')
    );


    this.fs.copy(
      this.templatePath('Project/CIP.Models/App.config'),
      this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.Models' + '/App.config')
    );

    this.fs.copyTpl(
      this.templatePath('Project/CIP.Models/MenuModel.cs'),
      this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.Models' + '/MenuModel.cs'),
      {
        applicationshortname: this.props.applicationshortname
      }
    );


    this.fs.copyTpl(
      this.templatePath('Project/CIP.Models/LookupModel.cs'),
      this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.Models' + '/LookupModel.cs'),
      {
        applicationshortname: this.props.applicationshortname
      }
    );

    this.fs.copyTpl(
      this.templatePath('Project/CIP.Models/Properties/AssemblyInfo.cs'),
      this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.Models' + '/Properties/AssemblyInfo.cs'),
      {
        applicationshortname: this.props.applicationshortname,
        ModelsGUID: this.props.ModelsGUID
      }
    );

    /*Start creating Data Project*/

    mkdirp(this.props.applicationshortname + '/' + this.props.applicationshortname + '.Data');

    this.fs.copyTpl(
      this.templatePath('Project/CIP.Data/CIP.Data.csproj'),
      this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.Data' + '/' + this.props.applicationshortname + '.Data.csproj'),
      {
        applicationshortname: this.props.applicationshortname,
        ModelsGUID: this.props.ModelsGUID,
        DataGUID: this.props.DataGUID
      }
    );

    this.fs.copy(
      this.templatePath('Project/CIP.Data/packages.config'),
      this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.Data' + '/packages.config')
    );


    this.fs.copy(
      this.templatePath('Project/CIP.Data/App.config'),
      this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.Data' + '/App.config')
    );

    this.fs.copyTpl(
      this.templatePath('Project/CIP.Data/Properties/AssemblyInfo.cs'),
      this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.Data' + '/Properties/AssemblyInfo.cs'),
      {
        applicationshortname: this.props.applicationshortname,
        DataGUID: this.props.DataGUID
      }
    );


    this.fs.copyTpl(
      this.templatePath('Project/CIP.Data/Class1.cs'),
      this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.Data' + '/Class1.cs'),
      {
        applicationshortname: this.props.applicationshortname,
        DataGUID: this.props.DataGUID
      }
    );

    /*Start creating Services Project*/

    mkdirp(this.props.applicationshortname + '/' + this.props.applicationshortname + '.Services');

    this.fs.copyTpl(
      this.templatePath('Project/CIP.Services/CIP.Services.csproj'),
      this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.Services' + '/' + this.props.applicationshortname + '.Services.csproj'),
      {
        applicationshortname: this.props.applicationshortname,
        SolutionGuid: this.props.SolutionGuid,
        APIGUID: this.props.APIGUID,
        DataGUID: this.props.DataGUID,
        ModelsGUID: this.props.ModelsGUID,
        ServicesGUID: this.props.ServicesGUID,
        ServicesTestGUID: this.props.ServicesTestGUID
      }
    );

    this.fs.copy(
      this.templatePath('Project/CIP.Services/packages.config'),
      this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.Services' + '/packages.config')
    );


    this.fs.copy(
      this.templatePath('Project/CIP.Services/App.config'),
      this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.Services' + '/App.config')
    );

    this.fs.copyTpl(
      this.templatePath('Project/CIP.Services/Properties/AssemblyInfo.cs'),
      this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.Services' + '/Properties/AssemblyInfo.cs'),
      {
        applicationshortname: this.props.applicationshortname,
        ServicesGUID: this.props.ServicesGUID,
      }
    );


    this.fs.copyTpl(
      this.templatePath('Project/CIP.Services/MenuService.cs'),
      this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.Services' + '/MenuService.cs'),
      {
        applicationshortname: this.props.applicationshortname,
        ServicesGUID: this.props.ServicesGUID,
      }
    );

    /*Start creating Services.Test Project*/

    mkdirp(this.props.applicationshortname + '/' + this.props.applicationshortname + '.Services.Test');

    this.fs.copyTpl(
      this.templatePath('Project/CIP.Services.Test/CIP.Services.Test.csproj'),
      this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.Services.Test' + '/' + this.props.applicationshortname + '.Services.Test.csproj'),
      {
        applicationshortname: this.props.applicationshortname,
        SolutionGuid: this.props.SolutionGuid,
        APIGUID: this.props.APIGUID,
        DataGUID: this.props.DataGUID,
        ModelsGUID: this.props.ModelsGUID,
        ServicesGUID: this.props.ServicesGUID,
        ServicesTestGUID: this.props.ServicesTestGUID
      }
    );

    this.fs.copy(
      this.templatePath('Project/CIP.Services.Test/packages.config'),
      this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.Services.Test' + '/packages.config')
    );


    this.fs.copy(
      this.templatePath('Project/CIP.Services.Test/App.config'),
      this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.Services.Test' + '/App.config')
    );

    this.fs.copyTpl(
      this.templatePath('Project/CIP.Services.Test/Properties/AssemblyInfo.cs'),
      this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.Services.Test' + '/Properties/AssemblyInfo.cs'),
      {
        applicationshortname: this.props.applicationshortname,
        SolutionGuid: this.props.SolutionGuid,
        APIGUID: this.props.APIGUID,
        DataGUID: this.props.DataGUID,
        ModelsGUID: this.props.ModelsGUID,
        ServicesGUID: this.props.ServicesGUID,
        ServicesTestGUID: this.props.ServicesTestGUID
      }
    );

    /*Start creating API Project*/

    mkdirp(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API');

    mkdirp(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API/ErrorLog');

    mkdirp(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API/Models');

    this.fs.copyTpl(
      this.templatePath('Project/CIP.API/CIP.API.csproj'),
      this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/' + this.props.applicationshortname + '.API.csproj'),
      {
        applicationshortname: this.props.applicationshortname,
        SolutionGuid: this.props.SolutionGuid,
        APIGUID: this.props.APIGUID,
        DataGUID: this.props.DataGUID,
        ModelsGUID: this.props.ModelsGUID,
        ServicesGUID: this.props.ServicesGUID,
        ServicesTestGUID: this.props.ServicesTestGUID
      }
    );

    this.fs.copy(
      this.templatePath('Project/CIP.API/App_Data'),
      this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API/App_Data')
    );

    this.fs.copy(
      this.templatePath('Project/CIP.API/App_Readme'),
      this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API/App_Readme')
    );

    this.fs.copy(
      this.templatePath('Project/CIP.API/App_Start'),
      this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API/App_Start')
    );

    this.fs.copy(
      this.templatePath('Project/CIP.API/Content'),
      this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API/Content')
    );



    this.fs.copy(
      this.templatePath('Project/CIP.API/Images'),
      this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API/Images')
    );

    this.fs.copy(
      this.templatePath('Project/CIP.API/Scripts'),
      this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API/Scripts')
    );

    this.fs.copy(
      this.templatePath('Project/CIP.API/Views'),
      this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API/Views')
    );

    this.fs.copy(
      this.templatePath('Project/CIP.API/favicon.ico'),
      this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API/favicon.ico')
    );

    this.fs.copy(
      this.templatePath('Project/CIP.API/packages.config'),
      this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API/packages.config')
    );

    this.fs.copy(
      this.templatePath('Project/CIP.API/web.config'),
      this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API/web.config')
    );

    this.fs.copy(
      this.templatePath('Project/CIP.API/Web.Debug.config'),
      this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API/Web.Debug.config')
    );

    this.fs.copy(
      this.templatePath('Project/CIP.API/Web.prod.config'),
      this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API/web.prod.config')
    );

    this.fs.copy(
      this.templatePath('Project/CIP.API/Web.Release.config'),
      this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API/web.Release.config')
    );

    var vals = {
      applicationshortname: this.props.applicationshortname,
      SolutionGuid: this.props.SolutionGuid,
      APIGUID: this.props.APIGUID,
      DataGUID: this.props.DataGUID,
      ModelsGUID: this.props.ModelsGUID,
      ServicesGUID: this.props.ServicesGUID,
      ServicesTestGUID: this.props.ServicesTestGUID,
      asaxentry: '<%@ Application Codebehind'
    };

    this.fs.copyTpl(
      this.templatePath('Project/CIP.API/Global.asax'),
      this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Global.asax'),
      vals
    );


    this.fs.copyTpl(
      this.templatePath('Project/CIP.API/Global.asax.cs'),
      this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Global.asax.cs'),
      vals
    );

    this.fs.copyTpl(
      this.templatePath('Project/CIP.API/Properties/AssemblyInfo.cs'),
      this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Properties/AssemblyInfo.cs'),
      vals
    );


    this.fs.copyTpl(
      this.templatePath('Project/CIP.API/Controllers/GetUserIdentityController.cs'),
      this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Controllers/GetUserIdentityController.cs'),
      vals
    );


    this.fs.copyTpl(
      this.templatePath('Project/CIP.API/Controllers/HomeController.cs'),
      this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Controllers/HomeController.cs'),
      vals
    );

    this.fs.copyTpl(
      this.templatePath('Project/CIP.API/Controllers/MenuController.cs'),
      this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Controllers/MenuController.cs'),
      vals
    );

    this.fs.copyTpl(
      this.templatePath('Project/CIP.API/Controllers/ValuesController.cs'),
      this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Controllers/ValuesController.cs'),
      vals
    );

    this.fs.copyTpl(
      this.templatePath('Project/CIP.API/App_Start/BundleConfig.cs'),
      this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/App_Start/BundleConfig.cs'),
      vals
    );

    this.fs.copyTpl(
      this.templatePath('Project/CIP.API/App_Start/FilterConfig.cs'),
      this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/App_Start/FilterConfig.cs'),
      vals
    );

    this.fs.copyTpl(
      this.templatePath('Project/CIP.API/App_Start/RouteConfig.cs'),
      this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/App_Start/RouteConfig.cs'),
      vals
    );

    this.fs.copyTpl(
      this.templatePath('Project/CIP.API/App_Start/WebApiConfig.cs'),
      this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/App_Start/WebApiConfig.cs'),
      vals
    );

    this.fs.copyTpl(
      this.templatePath('Project/CIP.API/helpers/AuthorizationFilter.cs'),
      this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/helpers/AuthorizationFilter.cs'),
      vals
    );


    this.fs.copyTpl(
      this.templatePath('Project/CIP.API/helpers/UnhandledExceptionFilter.cs'),
      this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/helpers/UnhandledExceptionFilter.cs'),
      vals
    );

    this.fs.copyTpl(
      this.templatePath('Project/CIP.API/helpers/Utility.cs'),
      this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/helpers/Utility.cs'),
      vals
    );

    this.fs.copyTpl(this.templatePath('Project/CIP.API/Areas/HelpPage/ApiDescriptionExtensions.cs'), this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Areas/HelpPage/ApiDescriptionExtensions.cs'), vals);
    this.fs.copyTpl(this.templatePath('Project/CIP.API/Areas/HelpPage/HelpPage.css'), this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Areas/HelpPage/HelpPage.css'), vals);
    this.fs.copyTpl(this.templatePath('Project/CIP.API/Areas/HelpPage/HelpPageAreaRegistration.cs'), this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Areas/HelpPage/HelpPageAreaRegistration.cs'), vals);
    this.fs.copyTpl(this.templatePath('Project/CIP.API/Areas/HelpPage/HelpPageConfigurationExtensions.cs'), this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Areas/HelpPage/HelpPageConfigurationExtensions.cs'), vals);
    this.fs.copyTpl(this.templatePath('Project/CIP.API/Areas/HelpPage/XmlDocumentationProvider.cs'), this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Areas/HelpPage/XmlDocumentationProvider.cs'), vals);
    this.fs.copyTpl(this.templatePath('Project/CIP.API/Areas/HelpPage/App_Start/HelpPageConfig.cs'), this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Areas/HelpPage/App_Start/HelpPageConfig.cs'), vals);
    this.fs.copyTpl(this.templatePath('Project/CIP.API/Areas/HelpPage/Controllers/HelpController.cs'), this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Areas/HelpPage/Controllers/HelpController.cs'), vals);
    this.fs.copyTpl(this.templatePath('Project/CIP.API/Areas/HelpPage/ModelDescriptions/CollectionModelDescription.cs'), this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Areas/HelpPage/ModelDescriptions/CollectionModelDescription.cs'), vals);
    this.fs.copyTpl(this.templatePath('Project/CIP.API/Areas/HelpPage/ModelDescriptions/ComplexTypeModelDescription.cs'), this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Areas/HelpPage/ModelDescriptions/ComplexTypeModelDescription.cs'), vals);
    this.fs.copyTpl(this.templatePath('Project/CIP.API/Areas/HelpPage/ModelDescriptions/DictionaryModelDescription.cs'), this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Areas/HelpPage/ModelDescriptions/DictionaryModelDescription.cs'), vals);
    this.fs.copyTpl(this.templatePath('Project/CIP.API/Areas/HelpPage/ModelDescriptions/EnumTypeModelDescription.cs'), this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Areas/HelpPage/ModelDescriptions/EnumTypeModelDescription.cs'), vals);
    this.fs.copyTpl(this.templatePath('Project/CIP.API/Areas/HelpPage/ModelDescriptions/EnumValueDescription.cs'), this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Areas/HelpPage/ModelDescriptions/EnumValueDescription.cs'), vals);
    this.fs.copyTpl(this.templatePath('Project/CIP.API/Areas/HelpPage/ModelDescriptions/IModelDocumentationProvider.cs'), this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Areas/HelpPage/ModelDescriptions/IModelDocumentationProvider.cs'), vals);
    this.fs.copyTpl(this.templatePath('Project/CIP.API/Areas/HelpPage/ModelDescriptions/KeyValuePairModelDescription.cs'), this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Areas/HelpPage/ModelDescriptions/KeyValuePairModelDescription.cs'), vals);
    this.fs.copyTpl(this.templatePath('Project/CIP.API/Areas/HelpPage/ModelDescriptions/ModelDescription.cs'), this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Areas/HelpPage/ModelDescriptions/ModelDescription.cs'), vals);
    this.fs.copyTpl(this.templatePath('Project/CIP.API/Areas/HelpPage/ModelDescriptions/ModelDescriptionGenerator.cs'), this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Areas/HelpPage/ModelDescriptions/ModelDescriptionGenerator.cs'), vals);
    this.fs.copyTpl(this.templatePath('Project/CIP.API/Areas/HelpPage/ModelDescriptions/ModelNameAttribute.cs'), this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Areas/HelpPage/ModelDescriptions/ModelNameAttribute.cs'), vals);
    this.fs.copyTpl(this.templatePath('Project/CIP.API/Areas/HelpPage/ModelDescriptions/ModelNameHelper.cs'), this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Areas/HelpPage/ModelDescriptions/ModelNameHelper.cs'), vals);
    this.fs.copyTpl(this.templatePath('Project/CIP.API/Areas/HelpPage/ModelDescriptions/ParameterAnnotation.cs'), this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Areas/HelpPage/ModelDescriptions/ParameterAnnotation.cs'), vals);
    this.fs.copyTpl(this.templatePath('Project/CIP.API/Areas/HelpPage/ModelDescriptions/ParameterDescription.cs'), this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Areas/HelpPage/ModelDescriptions/ParameterDescription.cs'), vals);
    this.fs.copyTpl(this.templatePath('Project/CIP.API/Areas/HelpPage/ModelDescriptions/SimpleTypeModelDescription.cs'), this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Areas/HelpPage/ModelDescriptions/SimpleTypeModelDescription.cs'), vals);
    this.fs.copyTpl(this.templatePath('Project/CIP.API/Areas/HelpPage/Models/HelpPageApiModel.cs'), this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Areas/HelpPage/Models/HelpPageApiModel.cs'), vals);
    this.fs.copyTpl(this.templatePath('Project/CIP.API/Areas/HelpPage/SampleGeneration/HelpPageSampleGenerator.cs'), this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Areas/HelpPage/SampleGeneration/HelpPageSampleGenerator.cs'), vals);
    this.fs.copyTpl(this.templatePath('Project/CIP.API/Areas/HelpPage/SampleGeneration/HelpPageSampleKey.cs'), this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Areas/HelpPage/SampleGeneration/HelpPageSampleKey.cs'), vals);
    this.fs.copyTpl(this.templatePath('Project/CIP.API/Areas/HelpPage/SampleGeneration/ImageSample.cs'), this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Areas/HelpPage/SampleGeneration/ImageSample.cs'), vals);
    this.fs.copyTpl(this.templatePath('Project/CIP.API/Areas/HelpPage/SampleGeneration/InvalidSample.cs'), this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Areas/HelpPage/SampleGeneration/InvalidSample.cs'), vals);
    this.fs.copyTpl(this.templatePath('Project/CIP.API/Areas/HelpPage/SampleGeneration/ObjectGenerator.cs'), this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Areas/HelpPage/SampleGeneration/ObjectGenerator.cs'), vals);
    this.fs.copyTpl(this.templatePath('Project/CIP.API/Areas/HelpPage/SampleGeneration/SampleDirection.cs'), this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Areas/HelpPage/SampleGeneration/SampleDirection.cs'), vals);
    this.fs.copyTpl(this.templatePath('Project/CIP.API/Areas/HelpPage/SampleGeneration/TextSample.cs'), this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Areas/HelpPage/SampleGeneration/TextSample.cs'), vals);
    this.fs.copyTpl(this.templatePath('Project/CIP.API/Areas/HelpPage/Views/Web.config'), this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Areas/HelpPage/Views/Web.config'), vals);
    this.fs.copyTpl(this.templatePath('Project/CIP.API/Areas/HelpPage/Views/_ViewStart.cshtml'), this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Areas/HelpPage/Views/_ViewStart.cshtml'), vals);
    this.fs.copyTpl(this.templatePath('Project/CIP.API/Areas/HelpPage/Views/Help/Api.cshtml'), this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Areas/HelpPage/Views/Help/Api.cshtml'), vals);
    this.fs.copyTpl(this.templatePath('Project/CIP.API/Areas/HelpPage/Views/Help/Index.cshtml'), this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Areas/HelpPage/Views/Help/Index.cshtml'), vals);
    this.fs.copyTpl(this.templatePath('Project/CIP.API/Areas/HelpPage/Views/Help/ResourceModel.cshtml'), this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Areas/HelpPage/Views/Help/ResourceModel.cshtml'), vals);
    this.fs.copyTpl(this.templatePath('Project/CIP.API/Areas/HelpPage/Views/Help/DisplayTemplates/ApiGroup.cshtml'), this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Areas/HelpPage/Views/Help/DisplayTemplates/ApiGroup.cshtml'), vals);
    this.fs.copyTpl(this.templatePath('Project/CIP.API/Areas/HelpPage/Views/Help/DisplayTemplates/CollectionModelDescription.cshtml'), this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Areas/HelpPage/Views/Help/DisplayTemplates/CollectionModelDescription.cshtml'), vals);
    this.fs.copyTpl(this.templatePath('Project/CIP.API/Areas/HelpPage/Views/Help/DisplayTemplates/ComplexTypeModelDescription.cshtml'), this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Areas/HelpPage/Views/Help/DisplayTemplates/ComplexTypeModelDescription.cshtml'), vals);
    this.fs.copyTpl(this.templatePath('Project/CIP.API/Areas/HelpPage/Views/Help/DisplayTemplates/DictionaryModelDescription.cshtml'), this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Areas/HelpPage/Views/Help/DisplayTemplates/DictionaryModelDescription.cshtml'), vals);
    this.fs.copyTpl(this.templatePath('Project/CIP.API/Areas/HelpPage/Views/Help/DisplayTemplates/EnumTypeModelDescription.cshtml'), this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Areas/HelpPage/Views/Help/DisplayTemplates/EnumTypeModelDescription.cshtml'), vals);
    this.fs.copyTpl(this.templatePath('Project/CIP.API/Areas/HelpPage/Views/Help/DisplayTemplates/HelpPageApiModel.cshtml'), this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Areas/HelpPage/Views/Help/DisplayTemplates/HelpPageApiModel.cshtml'), vals);
    this.fs.copyTpl(this.templatePath('Project/CIP.API/Areas/HelpPage/Views/Help/DisplayTemplates/ImageSample.cshtml'), this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Areas/HelpPage/Views/Help/DisplayTemplates/ImageSample.cshtml'), vals);
    this.fs.copyTpl(this.templatePath('Project/CIP.API/Areas/HelpPage/Views/Help/DisplayTemplates/InvalidSample.cshtml'), this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Areas/HelpPage/Views/Help/DisplayTemplates/InvalidSample.cshtml'), vals);
    this.fs.copyTpl(this.templatePath('Project/CIP.API/Areas/HelpPage/Views/Help/DisplayTemplates/KeyValuePairModelDescription.cshtml'), this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Areas/HelpPage/Views/Help/DisplayTemplates/KeyValuePairModelDescription.cshtml'), vals);
    this.fs.copyTpl(this.templatePath('Project/CIP.API/Areas/HelpPage/Views/Help/DisplayTemplates/ModelDescriptionLink.cshtml'), this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Areas/HelpPage/Views/Help/DisplayTemplates/ModelDescriptionLink.cshtml'), vals);
    this.fs.copyTpl(this.templatePath('Project/CIP.API/Areas/HelpPage/Views/Help/DisplayTemplates/Parameters.cshtml'), this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Areas/HelpPage/Views/Help/DisplayTemplates/Parameters.cshtml'), vals);
    this.fs.copyTpl(this.templatePath('Project/CIP.API/Areas/HelpPage/Views/Help/DisplayTemplates/Samples.cshtml'), this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Areas/HelpPage/Views/Help/DisplayTemplates/Samples.cshtml'), vals);
    this.fs.copyTpl(this.templatePath('Project/CIP.API/Areas/HelpPage/Views/Help/DisplayTemplates/SimpleTypeModelDescription.cshtml'), this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Areas/HelpPage/Views/Help/DisplayTemplates/SimpleTypeModelDescription.cshtml'), vals);
    this.fs.copyTpl(this.templatePath('Project/CIP.API/Areas/HelpPage/Views/Help/DisplayTemplates/TextSample.cshtml'), this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Areas/HelpPage/Views/Help/DisplayTemplates/TextSample.cshtml'), vals);
    this.fs.copyTpl(this.templatePath('Project/CIP.API/Areas/HelpPage/Views/Shared/_Layout.cshtml'), this.destinationPath(this.props.applicationshortname + '/' + this.props.applicationshortname + '.API' + '/Areas/HelpPage/Views/Shared/_Layout.cshtml'), vals);



  }

  install() {
    //this.installDependencies();
  }
};
