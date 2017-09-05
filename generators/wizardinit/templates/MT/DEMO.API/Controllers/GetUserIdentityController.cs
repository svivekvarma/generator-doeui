using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DEMO.API.Helpers;
using DEMO.Services;
using DEMO.Models;

namespace DEMO.API.Controllers
{
  
    public class GetUserIdentityController : ApiController
    {

        [ActionName("GetUserID"), HttpGet]
        [CustomAuthorize("Any")]
        public string GetUserID()
        {
            return User.Identity.Name;

        }

        [ActionName("GetUserRoles"), HttpGet]
        [CustomAuthorize("Any")]
        public IMSRoleModel GetUserRoles()
        {

            AARADRoleService ad = new AARADRoleService();
            var UserName = User.Identity.Name;
            var roles = ad.get(UserName);
            var Role = roles.ElementAt(0);
            return Role;
        }
    }
}
