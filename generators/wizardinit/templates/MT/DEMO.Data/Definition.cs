//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace <%=applicationshortname%>.Data
{
    using System;
    using System.Collections.Generic;
    
    public partial class Definition
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Definition()
        {
            this.DefinitionSteps = new HashSet<DefinitionStep>();
        }
    
        public int DefinitionID { get; set; }
        public string WizardName { get; set; }
        public string WizardDescription { get; set; }
        public string WizardCode { get; set; }
        public string ServiceController { get; set; }
        public string AddNewMethod { get; set; }
        public Nullable<System.DateTime> UpdateDate { get; set; }
        public string UpdateUser { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DefinitionStep> DefinitionSteps { get; set; }
    }
}
