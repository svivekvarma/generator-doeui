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
    
    public partial class WizardDefinition
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public WizardDefinition()
        {
            this.DemoWizardDefinitions = new HashSet<DemoWizardDefinition>();
            this.WizardDefinitionSteps = new HashSet<WizardDefinitionStep>();
        }
    
        public int WizardDefinitionID { get; set; }
        public string WizardName { get; set; }
        public string WizardDescription { get; set; }
        public string WizardCode { get; set; }
        public string ServiceController { get; set; }
        public string AddNewMethod { get; set; }
        public Nullable<System.DateTime> UpdateDate { get; set; }
        public string UpdateUser { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DemoWizardDefinition> DemoWizardDefinitions { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<WizardDefinitionStep> WizardDefinitionSteps { get; set; }
    }
}