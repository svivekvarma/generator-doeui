using <%=applicationshortname%>.API.helpers;
using <%=applicationshortname%>.Data;
using <%=applicationshortname%>.Models;
using <%=applicationshortname%>.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace <%=applicationshortname%>.API.Controllers
{
    public class MenuController : ApiController

    {
        [CustomAuthorize]
        public List<MenuModel> get()
        {
            //MenuService service = new MenuService(new CodelibraryEntities(), System.Web.HttpContext.Current.User.Identity.Name);
            MenuService service = new MenuService(System.Web.HttpContext.Current.User.Identity.Name);
            return service.get();

        }
    }
}