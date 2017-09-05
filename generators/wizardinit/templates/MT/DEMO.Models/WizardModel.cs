using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace <%=applicationshortname%>.Models
{

    public class WizardModel
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public bool isWizardComplete { get; set; }
        public string ServiceController { get; set; }
        public List<WizardStepModel> WizardSteps { get; set; }
    }
    public class WizardStepModel
    {
        public int WizardStepID { get; set; }
        public string Widget { get; set; }
        public int Ordinal { get; set; }
        public string Name { get; set; }
        public string WizardStepSection { get; set; }
        public string Description { get; set; }
        public string ReadMethod { get; set; }
        public string WriteMethod { get; set; }
        public string WizardStepCode { get; set; }
        public WizardStepStatusModel status { get; set; }
    }

    public class WizardStepRequest
    {
        public int ID { get; set; }
        public int WizardStepID { get; set; }
    }

    public class WizardStepStatusModel
    {
        public bool isCurrent { get; set; }
        public bool isComplete { get; set; }
    }

}
