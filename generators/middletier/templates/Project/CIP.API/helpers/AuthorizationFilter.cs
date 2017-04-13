using System.Web.Mvc;
using System.Web.Security;
using System.DirectoryServices.AccountManagement;
using <%=applicationshortname%>.Data;
using <%=applicationshortname%>.Services;
using System.Linq;
using System.Web.Http.Filters;
using System.Security;
using System.Web;
using <%=applicationshortname%>.API.Utility;
using System.Configuration;

namespace <%=applicationshortname%>.API.helpers
{
    //In WebAPI the inheritance must be from system.web.http - regular authorizeAttribute is an MVC inherit (this will not work)
    public class CustomAuthorizeAttribute : System.Web.Http.AuthorizeAttribute
    {
        public string[] allowedroles;
        public CustomAuthorizeAttribute(params string[] roles)
        {
            this.allowedroles = roles;
        }

        protected override bool IsAuthorized(System.Web.Http.Controllers.HttpActionContext actionContext)
        {
            bool authorize = false;
            
            string[] roles = System.Web.Security.Roles.Provider.GetRolesForUser(HttpContext.Current.User.Identity.Name);

            UserPrincipalExtended user = UserPrincipalExtended.FindByIdentity(
              new PrincipalContext(ContextType.Domain), HttpContext.Current.User.Identity.Name);



            var data = from r in roles
                       where r.StartsWith("DOESIS\\SSO-" +  ConfigurationManager.AppSettings["AppID"])
                       select r;
            if (data.Count() > 0)
            {
                authorize = true;
            }
            else
            {
                authorize = false;
            }

            return authorize;
        }


        protected override void HandleUnauthorizedRequest(System.Web.Http.Controllers.HttpActionContext actionContext)
        {
            actionContext.Response = new System.Net.Http.HttpResponseMessage(System.Net.HttpStatusCode.Unauthorized);
        }

    }
}