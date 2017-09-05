using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DEMO.Models
{
    //public enum appRoles
    //{
    //    SchoolLevelReviewer,
    //    SchoolLevelVerifier,
    //    StateLevelApprover
    //}

    public class IMSRoleModel
    {
        public string Role { get; set; }
        public int DistrictCode { get; set; }
        public int SchoolCode { get; set; }


    }
}
