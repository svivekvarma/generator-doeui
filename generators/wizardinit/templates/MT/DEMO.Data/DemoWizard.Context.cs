﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DEMO.Data
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class DemoWizardTemplateEntities : DbContext
    {
        public DemoWizardTemplateEntities()
            : base("name=DemoWizardTemplateEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Demo> Demoes { get; set; }
        public virtual DbSet<DemoQuestion> DemoQuestions { get; set; }
        public virtual DbSet<DemoWizardDefinition> DemoWizardDefinitions { get; set; }
        public virtual DbSet<WizardDefinition> WizardDefinitions { get; set; }
        public virtual DbSet<WizardDefinitionStep> WizardDefinitionSteps { get; set; }
        public virtual DbSet<WizardQuestion> WizardQuestions { get; set; }
    }
}
