using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DEMO.API.Helpers;
using DEMO.Data;
using DEMO.Models.DemoWizard;
using DEMO.Services;

namespace DEMO.API.Controllers.demowizard
{
        [Route("api/Demo/School")]
    public class SchoolController : ApiController
    {


        //[CustomAuthorizeAttribute("Admin")]
        public SchoolModel Get(int ID)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    DEMOService service = new DEMOService(new DemoWizardTemplateEntities(), System.Web.HttpContext.Current.User.Identity.Name);
                    return service.GetSchool(ID);
                }
                catch (Exception)
                {
                    //log here
                    throw new HttpResponseException(HttpStatusCode.InternalServerError);
                }
            }
            throw new HttpResponseException(HttpStatusCode.BadRequest);

        }

        //[CustomAuthorizeAttribute("Admin")]
        public HttpResponseMessage Post(SchoolModel model)
        {
            if (ModelState.IsValid)
            {
                DEMOService service = new DEMOService(new DemoWizardTemplateEntities(), System.Web.HttpContext.Current.User.Identity.Name);
                var result = service.Write(model);
                if (result)
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
