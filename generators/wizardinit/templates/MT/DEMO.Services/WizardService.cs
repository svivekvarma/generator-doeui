using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Security.Cryptography.X509Certificates;
using <%=applicationshortname%>.Models;
using <%=applicationshortname%>.Data;

namespace <%=applicationshortname%>.Services
{

    public abstract class WizardService
    {


        public string user;
        public WizardEntities context;  

        public WizardService(WizardEntities _context, string _user)
        {
            user = _user;
            context = _context;
        }

        public virtual string WizardCode { get { return ""; } }   //override with Wizard Code from table

        public virtual WizardModel GetWizardModel(string WizardCode, int ID)
        {
            WizardDefinition wd = (from w in context.WizardDefinitions where w.WizardCode == WizardCode select w).FirstOrDefault();
            if (wd == null)
            {
                throw new Exception("Invalid Wizard Code");
            }

            WizardModel result = new WizardModel
            {
                Name = wd.WizardName,
                Code = wd.WizardCode,
                Description = wd.WizardDescription,
                ServiceController = wd.ServiceController
            };

            List<WizardStepModel> stepDefintions = (from ws in context.WizardDefinitionSteps
                                                    where wd.WizardDefinitionID == ws.WizardDefinitionID
                                                    orderby ws.Ordinal
                                                    select new WizardStepModel
                                                    {
                                                        WizardStepID = ws.WizardDefinitionStepID,
                                                        Widget = ws.Widget,
                                                        Ordinal = ws.Ordinal,
                                                        Name = ws.StepName,
                                                        WizardStepSection = ws.Section,
                                                        Description = ws.StepDescription,
                                                        ReadMethod = ws.ReadMethod,
                                                        WriteMethod = ws.WriteMethod,
                                                        WizardStepCode = ws.WizardStepCode,
                                                        status = new WizardStepStatusModel()
                                                    }).ToList();

            result.WizardSteps = stepDefintions;

            return result;
        }

        public virtual bool SetCurrentWizardStep(WizardStepRequest model)
        {
            return true;
        }

        protected int GetStepOrdinal(int StepID)
        {
            return (from ws in context.WizardDefinitionSteps
                    where ws.WizardDefinitionStepID == StepID
                    orderby ws.Ordinal
                    select ws.Ordinal).FirstOrDefault();

        }


    }
}



