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
    
    public partial class Demo
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Demo()
        {
            this.DemoQuestions = new HashSet<DemoQuestion>();
            this.DemoWizardDefinitions = new HashSet<DemoWizardDefinition>();
        }
    
        public int DemoID { get; set; }
        public Nullable<int> SchoolYear { get; set; }
        public string DistrictName { get; set; }
        public string SchoolName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Nullable<int> DistrictCode { get; set; }
        public Nullable<int> SchoolCode { get; set; }
        public Nullable<int> CurrentApplicationStepID { get; set; }
        public Nullable<System.DateTime> UpdateDate { get; set; }
        public string UpdateUser { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DemoQuestion> DemoQuestions { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DemoWizardDefinition> DemoWizardDefinitions { get; set; }
    }
}
