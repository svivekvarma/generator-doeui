using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using DEMO.API.Helpers;
using DEMO.Data;
using DEMO.Models;
using DEMO.Services;

namespace DEMO.API.Controllers
{
    //This class is for middle tier methods not used for wizard steps
    public class DemoWizardController : ApiController
    {


        //[CustomAuthorizeAttribute("Admin")]
        public WizardModel Get(int ID)
        {
        //    try
            {
                DEMOService service = new DEMOService(new DemoWizardTemplateEntities(), System.Web.HttpContext.Current.User.Identity.Name);
                return service.GetWizardModel(service.WizardCode, ID);
            }
            //catch (Exception e)
            //{
            //    //log here
            //    throw new HttpResponseException(HttpStatusCode.InternalServerError);
            //}

        }





        //[CustomAuthorizeAttribute("Admin")]
        public HttpResponseMessage Post(int SchoolYear, int DistrictCode)
        {
            if (ModelState.IsValid)
            {
                DEMOService service = new DEMOService(new DemoWizardTemplateEntities(), System.Web.HttpContext.Current.User.Identity.Name);
                var result = service.AddDemo(SchoolYear, DistrictCode);
                if (result>0)
                {
                    return this.Request.CreateResponse(HttpStatusCode.OK);
                }
                else
                {
                    //log here
                    return this.Request.CreateResponse(HttpStatusCode.InternalServerError);
                }
            }
            return this.Request.CreateResponse(HttpStatusCode.BadRequest);


        }


    }
}
