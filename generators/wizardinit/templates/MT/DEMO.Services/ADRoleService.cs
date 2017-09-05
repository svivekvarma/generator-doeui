using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.DirectoryServices;
using System.Configuration;
using Castle.Windsor.Installer;
using DEMO.Models;

namespace DEMO.Services
{
    public interface iRoleService
    {
        List<IMSRoleModel> get(string UserName);
        bool hasSchoolRole(string UserName, int DistrictCode, int SchoolCode, string Role);
        bool hasStateRole(string UserName, string RoleName);
        bool hasDistrictRole(string UserName, int DistrictCode, string Role);
    }

    public class AARADRoleService : ADRoleService
    {

        public AARADRoleService()
        {
            AppRecID = ConfigurationManager.AppSettings["AppID"]; ;
            RoleList = new Dictionary<string, string>();
            RoleList.Add("Admin", "Admin");
            RoleList.Add("TOYNominee", "TOYNominee");
        }

    }

    

    //General class to return IMS roles a username is associated with for a particular app
    //depends on dictionary of roles and apprec id sent in in constructor
    //the role list key is the value we want returned to the app.
    //the role list value is the AD group DisplayName to look for
    //The Get takes a username and returns a list of IMSRoleModels

    public abstract class ADRoleService : iRoleService
    {
        public Dictionary<string, string> RoleList { get; set; }
        public string AppRecID { get; set; }


        #region "public"

        public Boolean hasStateRole(string UserName, string RoleName)
        {
            List<Models.IMSRoleModel> roles = get(UserName);
            return (roles.Where(p => p.Role.Equals(RoleName) && p.DistrictCode.Equals(0)).Count() > 0);
        }

        public List<IMSRoleModel> get(string UserName)
        {

            List<IMSRoleModel> results = new List<IMSRoleModel>();

            SearchResult searchResult;
            var dirEntry = GetUserSearchResult(UserName, out searchResult);

            var Groups = searchResult.Properties["memberof"];

            foreach (var GroupCode in Groups)
            {
                if (GroupCode.ToString().Contains("SSO-" + AppRecID))
                {
                    string GroupCN = GroupNameHelper.GetCN(GroupCode.ToString());
                    results.Add(new IMSRoleModel
                    {
                        Role = getRole(GroupCode.ToString()),
                        DistrictCode = getDistrictCode(GroupCN),
                        SchoolCode = getSchoolCode(GroupCN)
                    });
                }
            }

            return results;

        }

        public bool hasSchoolRole(string UserName, int DistrictCode, int SchoolCode, string Role)
        {

            List<IMSRoleModel> UserRoles = get(UserName);

            bool hasSchool = ((from u in UserRoles where (u.SchoolCode == SchoolCode && u.Role == Role) select u).Count() > 0);
            bool hasAllDistrictSchool = ((from u in UserRoles where (u.DistrictCode == DistrictCode && u.Role == Role && u.SchoolCode == 0) select u).Count() > 0);
            bool hasAllStateSchool = ((from u in UserRoles where (u.DistrictCode == 0 && u.Role == Role && u.SchoolCode == 0) select u).Count() > 0);
            bool result = hasSchool || hasAllDistrictSchool || hasAllStateSchool;

            return result;
        }


        public bool hasDistrictRole(string UserName, int DistrictCode, string Role)
        {

            List<IMSRoleModel> UserRoles = get(UserName);

             bool hasAllDistrictSchool = ((from u in UserRoles where (u.DistrictCode == DistrictCode && u.Role == Role && u.SchoolCode == 0) select u).Count() > 0);
            bool hasAllStateSchool = ((from u in UserRoles where (u.DistrictCode == 0 && u.Role == Role && u.SchoolCode == 0) select u).Count() > 0);
            bool result =  hasAllDistrictSchool || hasAllStateSchool;

            return result;
        }

        #endregion

        #region private


        private string getRole(string IMSRoleText)
        {
            string result = "";

            string UserRole = GetGroupName(IMSRoleText);

            foreach (var role in RoleList)
            {
                if (role.Value == UserRole)
                {
                    result = role.Key;
                    break;
                }
            }


            return result;
        }

        private int getDistrictCode(string IMSRoleText)
        {
            int result = GroupNameHelper.GetDistrictId(IMSRoleText);

            return result;

        }

        private int getSchoolCode(string IMSRoleText)
        {
            int result = GroupNameHelper.GetSchoolId(IMSRoleText);

            return result;
        }


        private DirectoryEntry GetUserSearchResult(string principalName, out SearchResult searchResult)
        {
            var dirEntry = GetDirectoryEntry();
            var princName = principalName;


            var dirSearcher = new DirectorySearcher(dirEntry);

            if (principalName.Substring(0, 7) == "DOESIS\\")
            {
                princName = principalName.Substring(7, principalName.Length - 7);
            }
            dirSearcher.Filter = "(&(objectCategory=Person)(objectClass=user)(SAMAccountName=" + princName + "))";

            searchResult = LoadUserSearchFields(dirSearcher);

            return dirEntry;
        }

        private string GetGroupName(string group)
        {
            //Get Group Directory entry
            var dirEntry = GetDirectoryEntry();

            var dirSearcher = new DirectorySearcher(dirEntry)
            {
                Filter = "(&(objectClass=group)(distinguishedName=" + @group + "))",
                SearchScope = SearchScope.Subtree
            };
            dirSearcher.PropertiesToLoad.Add("DisplayName");
            var searchResult = dirSearcher.FindOne();

            string result = RetrieveSingleProperty(searchResult, "DisplayName").ToString();

            return result;
        }

        private object RetrieveSingleProperty(SearchResult searchResult, string propertyname)
        {
            try
            {
                foreach (var o in searchResult.Properties[propertyname])
                {
                    return o;
                }

                return String.Empty;
            }
            catch (Exception)
            {
                return String.Empty;  //TODO:
            }
        }

        private SearchResult LoadUserSearchFields(DirectorySearcher dirSearcher)
        {
            dirSearcher.SearchScope = SearchScope.Subtree;
            dirSearcher.PropertiesToLoad.Add("CN");
            dirSearcher.PropertiesToLoad.Add("DisplayName");
            dirSearcher.PropertiesToLoad.Add("memberof");
            dirSearcher.PropertiesToLoad.Add("mail");
            dirSearcher.PropertiesToLoad.Add("SAMAccountName");

            return dirSearcher.FindOne();
        }

        private DirectoryEntry GetDirectoryEntry()
        {
            var dirEntry = new DirectoryEntry
            {
                Path = ConfigurationManager.AppSettings["ADFullPath"]

            };
            return dirEntry;
        }
        #endregion

    }

    static class GroupNameHelper
    {

        public static string GetCN(string groupName)
        {

            int pFrom = 3;
            int pTo = groupName.IndexOf(",");

            String result = groupName.Substring(pFrom, pTo - pFrom);

            return result;

        }


        public static int GetSchoolId(String groupName)
        {
            if (groupName.Parse('-', 4) == "0")
            {
                return 0;
            }

            string padZeros;
            switch (groupName.Parse('-', 4).Length)
            {
                case 4:
                    padZeros = "";
                    break;
                case 2:
                    padZeros = "00";
                    break;
                default:
                    padZeros = "0";
                    break;
            }

            //return Convert.ToInt32(groupName.Parse('-', 3) + padZeros + groupName.Parse('-', 4));
            return Convert.ToInt32(groupName.Parse('-', 4));
        }

        public static int GetDistrictId(String groupName)
        {
            return Convert.ToInt32(groupName.Parse('-', 3));
        }

        public static string GetIMSPrefix(String groupName)
        {
            return groupName.Parse('-', 0) + "-" + groupName.Parse('-', 1);
        }

    }

    static class StringExtensions
    {
        public static string Parse(this string source, char delimiter, int index)
        {
            var words = source.Split(delimiter);

            return words.Count() >= index ? words[index] : "";
        }
    }

}
