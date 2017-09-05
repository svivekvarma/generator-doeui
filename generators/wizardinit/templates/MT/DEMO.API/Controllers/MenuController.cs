using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DEMO.API.Helpers;
using DEMO.Data;
using DEMO.Models;
using DEMO.Services;

namespace DEMO.API.Controllers
{
    public class MenuController : ApiController
    {
        [CustomAuthorize("Any")]
        public List<MenuModel> get()
        {
            //MenuService service = new MenuService(new CodelibraryEntities(), System.Web.HttpContext.Current.User.Identity.Name);
            MenuService service = new MenuService(System.Web.HttpContext.Current.User.Identity.Name);
            return service.Get();

        }
    }
}
