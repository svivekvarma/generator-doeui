using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DEMO.Models;

namespace DEMO.Services
{

    public class AARADTestRoleService : iRoleService
    {
        private int districtCode = 17;
        private int schoolCode = 302;

        public bool hasDistrictRole(string UserName, int DistrictCode, string Role)
        {
            bool result = false;
            switch (UserName)
            {
                case "Nominee":
                    result = DistrictCode == districtCode && Role == "TOYNominee";
                    break;
                case "DistrictAdmin":
                    result = DistrictCode == districtCode && Role == "Admin";
                    break;
                case "StateAdmin":
                    result = true;
                    break;
            }
            return result;
        }

        public List<IMSRoleModel> get(string UserName)
        {


            List<IMSRoleModel> result = new List<IMSRoleModel>();
            switch (UserName)
            {
                case "Nominee":
                    result.Add(new IMSRoleModel { DistrictCode = districtCode, SchoolCode = schoolCode, Role = "TOYNominee" });
                    break;
                case "DistrictAdmin":
                    result.Add(new IMSRoleModel { DistrictCode = districtCode, SchoolCode = 0, Role = "Admin" });
                    break;
                case "StateAdmin":
                    result.Add(new IMSRoleModel { DistrictCode = 0, SchoolCode = 0, Role = "Admin" });
                    break;
            }
            return result;
        }

        public bool hasSchoolRole(string UserName, int DistrictCode, int SchoolCode, string Role)
        {
            bool result = false;
            switch (UserName)
            {
                case "Nominee":
                    result = DistrictCode == districtCode && SchoolCode == schoolCode && Role == "TOYNominee";
                    break;
                case "DistrictAdmin":
                    result = DistrictCode == districtCode && SchoolCode == 0 && Role == "Admin";
                    break;
                case "StateAdmin":
                    result = true;
                    break;
            }
            return result;
        }

        public bool hasStateRole(string UserName, string RoleName)
        {
            return UserName == "StateAdmin";
        }
    }
}
