/* The first two tables, which are commented out, are application specific, so you will need to modify these to support your structure.   
The demo tables can be used to look at the project and indeed run it, but you will need to costumize them to suppor the field you need 
For each wizard you design, you will have a different suppporting table or tables instead of dbo.Demo, but this allows you to */


/* Demo is the table containing the application information entered by the wizard*/

-- create table dbo.demo (
-- demoid [int] identity(1,1) not null,
-- districtcode int,
-- schoolcode int,
-- [schoolyear] [int] null,
-- districtname varchar(255) null,
-- schoolname varchar(255) null,
-- firstname varchar(255),
-- lastname varchar(255),
-- question1 varchar(max),
-- question2 varchar(max),
-- currentapplicationstepid int,
-- [updatedate] [datetime] null,
-- [updateuser] [varchar](255) null,
 -- constraint [pk_demo] primary key clustered 
-- (
	-- demoid asc
-- )with (pad_index = off, statistics_norecompute = off, ignore_dup_key = off, allow_row_locks = on, allow_page_locks = on) on [primary]
-- ) on [primary]
-- go




/*One useful construct in the wizard functionality the ability to reuse components
The below table supports having a question defined in the data, then reusing front end widgets
and middle tier classes.  This child structure of Demo holds the answers.*/

-- create table DemoQuestion (
-- DemoQuestionID int identity(1,1) not null,
-- DemoID int not null,
-- WizardQuestionID int not null,
-- Answer varchar(max),
-- [UpdateDate] datetime NULL,
-- [UpdateUser] varchar(255) NULL,
-- CONSTRAINT PK_TOYNominationQuestion PRIMARY KEY CLUSTERED 
-- (
	-- DemoQuestionID ASC
 -- )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
 -- ) ON [PRIMARY]
 -- go
-- ALTER TABLE [dbo].DemoQuestion  WITH CHECK ADD  CONSTRAINT [FK_DemoQuestion_Demo] FOREIGN KEY(DemoID)
 -- REFERENCES [dbo].Demo (DemoID)
 -- ON DELETE CASCADE
 -- GO
-- create unique index [AK_DemoQuestion] on dbo.DemoQuestion (DemoID,WizardQuestionID)
 -- go










/*The below tables support the standard wizard functionality*/
create table dbo.WizardDefinition (
WizardDefinitionID int identity(1,1) not null,
WizardName varchar(50),
WizardDescription varchar(max),
WizardCode char(2),
ServiceController varchar(50),
AddNewMethod varchar(50),
[UpdateDate] [datetime] NULL,
[UpdateUser] [varchar](255) NULL,
 CONSTRAINT [PK_WizardDefinition] PRIMARY KEY CLUSTERED 
(
	WizardDefinitionID ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] 
go
create unique index ak_WizardDefinition on dbo.WizardDefinition (WizardCode)
go

create table dbo.WizardDefinitionStep (
WizardDefinitionStepID int identity(1,1) not null,
WizardDefinitionID int not null,
Ordinal int not null,
Section varchar(50),
Widget varchar(50),
ReadMethod varchar(50),
WriteMethod varchar(50),
StepName varchar(25),
StepDescription varchar(max),
WizardStepCode char(10),
[UpdateDate] [datetime] NULL,
[UpdateUser] [varchar](255) NULL,
 CONSTRAINT [PK_WizardStep] PRIMARY KEY CLUSTERED 
(
	WizardDefinitionStepID ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] 
go
ALTER TABLE [dbo].WizardDefinitionStep  WITH CHECK ADD  CONSTRAINT [FK_WizardDefintionStep_WizardDefinition] FOREIGN KEY(WizardDefinitionID)
REFERENCES [dbo].WizardDefinition (WizardDefinitionID)
GO
create unique index ak_WizardDefinitionStep on dbo.WizardDefinitionStep (WizardDefinitionID,Ordinal)
go
create unique index ak_WizardDefinitionCode on dbo.WizardDefinitionStep (WizardDefinitionID,WizardStepCode)
go


/* This structure holds the questions for the DemoQuestion widgets */
create table dbo.WizardQuestion (
WizardQuestionID int identity(1,1) not null,
WizardDefinitionStepID int,
Ordinal int,
WizardQuestion varchar(max),
WizardValidationLength int,
[UpdateDate] [datetime] NULL,
[UpdateUser] [varchar](255) NULL,
 CONSTRAINT [PK_WizardQuestion] PRIMARY KEY CLUSTERED 
(
	WizardQuestionID ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] 
go
ALTER TABLE [dbo].WizardQuestion  WITH CHECK ADD  CONSTRAINT [FK_WizardQuestion_WizardDefinitionStep] FOREIGN KEY(WizardDefinitionStepID)
REFERENCES [dbo].WizardDefinitionStep (WizardDefinitionStepID)
GO




