using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DEMO.Models.DemoWizard
{
    public class QuestionModel
    {
        public int DemoID { get; set; }
        public int WizardQuestionID { get; set; }
        public int Ordinal { get; set; }
        public string Question { get; set; }
        public string Answer { get; set; }
        public int Length { get; set; }

    }



}
