/*This data population builds a 4 step wizard, the first 2 which enter different data into Demo, 
The second two which enter data into 2 DemoQuestion rows.*/

SET IDENTITY_INSERT [dbo].[WizardDefinition] ON 
GO
INSERT [dbo].[WizardDefinition] ([WizardDefinitionID], [WizardName], [WizardDescription], [WizardCode], [ServiceController], [AddNewMethod], [UpdateDate], [UpdateUser]) 
VALUES (1, N'Demo Application', N'Demo Nomination', N'DM', N'Demo', N'AddDemo', NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[WizardDefinition] OFF
GO

SET IDENTITY_INSERT [dbo].[WizardDefinitionStep] ON 	

GO
INSERT [dbo].[WizardDefinitionStep] ([WizardDefinitionStepID], [WizardDefinitionID], [Ordinal], [Section], [Widget], [ReadMethod], [WriteMethod], [StepName], [StepDescription], [WizardStepCode], [UpdateDate], [UpdateUser]) 
VALUES (1, 1, 4, N'School', N'demoschool', N'school', N'school', N'demo school', NULL, N'demoschool', NULL, NULL)
GO
INSERT [dbo].[WizardDefinitionStep] ([WizardDefinitionStepID], [WizardDefinitionID], [Ordinal], [Section], [Widget], [ReadMethod], [WriteMethod], [StepName], [StepDescription], [WizardStepCode], [UpdateDate], [UpdateUser]) 
VALUES (2, 1, 5, N'Name Information', N'demoname', N'name', N'name', N'Name', NULL, N'demoname  ', NULL, NULL)
GO
INSERT [dbo].[WizardDefinitionStep] ([WizardDefinitionStepID], [WizardDefinitionID], [Ordinal], [Section], [Widget], [ReadMethod], [WriteMethod], [StepName], [StepDescription], [WizardStepCode], [UpdateDate], [UpdateUser]) 
VALUES (3, 1, 11, N'Response Questions', N'demoquestion', N'question1', N'question1', N'Define Truth', NULL, N'demotruth', NULL, NULL)
GO
INSERT [dbo].[WizardDefinitionStep] ([WizardDefinitionStepID], [WizardDefinitionID], [Ordinal], [Section], [Widget], [ReadMethod], [WriteMethod], [StepName], [StepDescription], [WizardStepCode], [UpdateDate], [UpdateUser]) 
VALUES (4, 1, 12, N'Response Questions', N'demoquestion', N'question2', N'question2', N'Define Existance', NULL, N'demoexist', NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[WizardDefinitionStep] OFF
GO

SET IDENTITY_INSERT [dbo].[WizardQuestion] ON
GO
INSERT [dbo].[WizardQuestion] ([WizardQuestionID], [WizardDefinitionStepID], [Ordinal], [WizardQuestion], [WizardValidationLength], [UpdateDate], [UpdateUser]) 
VALUES (1, 3, 1, N'What constitutes Truth? (maximum 750 words)', 750, NULL, NULL)
GO
INSERT [dbo].[WizardQuestion] ([WizardQuestionID], [WizardDefinitionStepID], [Ordinal], [WizardQuestion], [WizardValidationLength], [UpdateDate], [UpdateUser]) 
VALUES (2, 4, 2, N'What constitutes existance? (maximum 500 words)', 500, NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[WizardQuestion] OFF
GO