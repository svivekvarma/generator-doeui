using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace DEMO.Models.DemoWizard
{
    public class SchoolModel
    {
        public int DemoID { get; set; }
        public int SchoolYear { get; set; }
        public int DistrictCode { get; set; }
        //[MaxLength(255, ErrorMessage = "DistrictName cannot be longer than 255 characters.")]
        public string DistrictName { get; set; }
        public int SchoolCode { get; set; }
        public string SchoolName { get; set; }
    }
}
