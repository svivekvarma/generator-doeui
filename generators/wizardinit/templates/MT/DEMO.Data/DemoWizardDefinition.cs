//------------------------------------------------------------------------------
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
    using System.Collections.Generic;
    
    public partial class DemoWizardDefinition
    {
        public int DemoWizardID { get; set; }
        public int DemoID { get; set; }
        public int WizardDefinitionID { get; set; }
    
        public virtual Demo Demo { get; set; }
        public virtual WizardDefinition WizardDefinition { get; set; }
    }
}
