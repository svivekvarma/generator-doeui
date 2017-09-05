using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DEMO.API.Helpers;
using DEMO.Data;
using DEMO.Models;
using DEMO.Models.DemoWizard;
using DEMO.Services;

namespace DEMO.API.Controllers.demowizard
{
        [Route("api/Demo/Step")]
    public class StepController : ApiController
    {


        //[CustomAuthorize("Admin", "TOYNominee")]
        public HttpResponseMessage Post(WizardStepRequest model)
        {
            DEMOService service = new DEMOService(new DemoWizardTemplateEntities(), System.Web.HttpContext.Current.User.Identity.Name);
            service.SetCurrentWizardStep(model);
            return this.Request.CreateResponse(HttpStatusCode.OK);
        }
    }

}
