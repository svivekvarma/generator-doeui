using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DEMO.Services;
using DEMO.Models;

namespace DEMO.API.Helpers
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
                //string[] roles = System.Web.Security.Roles.Provider.GetRolesForUser(httpContext.User.Identity.Name);

                var user = System.Web.HttpContext.Current.User.Identity.Name;
                iRoleService service = Injector.Instance.Resolve<iRoleService>();
                List<IMSRoleModel> RoleResults = service.get(user);

                if (RoleResults.Count() > 0)
                {
                    if (allowedroles.Contains("Any"))
                    {
                        authorize = true;

                    }
                    else
                    {
                        //check allowed roles
                        foreach (var role in allowedroles)
                        {
                            foreach (var item in RoleResults)
                            {
                                if (role == item.Role)
                                {
                                    authorize = true;
                                    break;
                                }
                            }
                        }
                    }

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