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
    
    public partial class DefinitionStep
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public DefinitionStep()
        {
            this.Questions = new HashSet<Question>();
        }
    
        public int DefinitionStepID { get; set; }
        public int DefinitionID { get; set; }
        public int Ordinal { get; set; }
        public string Section { get; set; }
        public string Widget { get; set; }
        public string ReadMethod { get; set; }
        public string WriteMethod { get; set; }
        public string StepName { get; set; }
        public string StepDescription { get; set; }
        public string WizardStepCode { get; set; }
        public Nullable<System.DateTime> UpdateDate { get; set; }
        public string UpdateUser { get; set; }
    
        public virtual Definition Definition { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Question> Questions { get; set; }
    }
}
