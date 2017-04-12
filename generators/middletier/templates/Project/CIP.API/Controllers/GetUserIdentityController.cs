using <%=applicationshortname%>.API.helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace <%=applicationshortname%>.API.Controllers
{
    public class GetUserIdentityController : ApiController
    {

        [CustomAuthorize]
        public string get()
        {
            return User.Identity.Name;

        }
    }
}