using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using AutoMapper;
using <%=applicationshortname%>.Models;
using <%=applicationshortname%>.Services;
using <%=applicationshortname%>.Data;
using <%=applicationshortname%>.Models.DemoWizard;


namespace DEMO.Services
{
    public class DEMOService : WizardService
    {

        //globals


        CodelibraryEntities cle;
        private DemoWizardTemplateEntities context;
        private iRoleService roleService;

        //Extend Wizard Service
        public override string WizardCode { get { return "DM"; } }

        public DEMOService(DemoWizardTemplateEntities _context, string _user) : base(_context, _user)
        {
            cle = new CodelibraryEntities();
            roleService = Injector.Instance.Resolve<iRoleService>();
            context=new DemoWizardTemplateEntities();
        }

        override public WizardModel GetWizardModel(string WizardCode, int ID)
        {
            Data.Demo data = (from n in context.Demoes where n.DemoID == ID select n).First();

            //if (!roleService.hasDistrictRole(user, data.DistrictCode.Value, "Admin") && !UserhasNominationPermissionByID(ID))
            //{
            //    throw new Exception(String.Format("Demo get model returned security error for user {0} for lea {1}.", user, data.DistrictCode));
            //}


            WizardModel result = base.GetWizardModel(WizardCode, ID);


            foreach (WizardStepModel step in result.WizardSteps)
            {

                //step.status = GetStatus(ID, step.WizardStepID);
                step.status.isCurrent = (step.WizardStepID == data.CurrentApplicationStepID.Value);

                step.status.isComplete = GetIsComplete(step.WizardStepCode, data);

            }

            var WizardCompleteCount = (from n in result.WizardSteps where !n.status.isComplete select n).ToList();
            if (WizardCompleteCount.Count > 0)
            {
                result.isWizardComplete = false;
            }
            else
            {
                result.isWizardComplete = true;
            }
            return result;
        }

        override public bool SetCurrentWizardStep(WizardStepRequest model)
        {

            try
            {
                Data.Demo data = (from n in context.Demoes where n.DemoID == model.ID select n).First();

                if (data != null)
                {
                    data.CurrentApplicationStepID = model.WizardStepID;

                    context.SaveChanges();
                }

                return true;
            }
            catch (Exception e)
            {
                return false;
            }

        }

        public bool GetIsComplete(string WizardStepCode, Data.Demo data)
        {
            bool status = false;
            string value = WizardStepCode;

            switch (WizardStepCode.Trim())
            {
                case "demoschool":
                    if (!string.IsNullOrEmpty(data.DistrictName) && !string.IsNullOrEmpty(data.SchoolName))
                    {
                        status = true;
                    }
                    break;
                case "demoname":
                    if (!string.IsNullOrEmpty(data.FirstName) && !string.IsNullOrEmpty(data.LastName))
                    {
                        status = true;
                    }
                    break;
                case "demotruth":
                    status = GetQuestionStatus("demotruth", data.DemoID);
                    break;

                case "demoexist":
                    status = GetQuestionStatus("demoexist", data.DemoID);
                    break;

            }
            return status;
        }

        //Service Methods
        public int AddDemo(int SchoolYear, int DistrictCode)
        {
            //if (!roleService.hasDistrictRole(user, DistrictCode, "Admin"))
            //{
            //    throw new Exception(String.Format("Demo add returned security error for user {0} for lea {1}.", user,
            //        DistrictCode));

            //}
      
            //Get First Wizard Step
            var firststep = (from step in context.WizardDefinitionSteps
                             join wiz in context.WizardDefinitions on step.WizardDefinitionID equals wiz.WizardDefinitionID
                             where wiz.WizardCode == WizardCode
                             orderby step.Ordinal
                             select step.WizardDefinitionStepID).First();


            Data.Demo data= new Data.Demo();
            data.DistrictCode = DistrictCode;
            data.SchoolYear = SchoolYear;
            data.UpdateUser = user;
            data.UpdateDate = DateTime.Now;

            try
            {
                    var result = context.Demoes.Add(data);
                    context.SaveChanges();
                    return result.DemoID;
                
            }
            catch (Exception e)
            {
                throw new Exception(String.Format("Demo add returned error"));
            }

        }

        public bool Write(SchoolModel model)
        {
            var updatedate = DateTime.Now;
            try
            {
                bool retval = false;
                var data = (from p in context.Demoes where p.DemoID == model.DemoID select p).FirstOrDefault();
                if (data != null)
                {
                    //check security

                    data.SchoolCode = model.SchoolCode;
                    data.SchoolName = model.SchoolName;
                    data.DistrictCode = model.DistrictCode;
                    data.DistrictName = model.DistrictName;
                    data.SchoolYear = model.SchoolYear;
                    context.SaveChanges();
                    retval = true;
                }
                return retval;
            }
            catch (Exception)
            {
                throw new Exception(String.Format("Demo Write Schoolreturned error"));
            }
         }

        public SchoolModel GetSchool(int ID)
        {
            var data = (from p in context.Demoes where p.DemoID == ID select p).FirstOrDefault();

            SchoolModel result=new SchoolModel();

            var config = new MapperConfiguration(cfg => cfg.CreateMap<Data.Demo, SchoolModel>());

            IMapper mapper = config.CreateMapper();

            result = mapper.Map<Data.Demo, SchoolModel>(data);

            return result;
        }

        public bool Write(NameModel model)
        {
            var updatedate = DateTime.Now;
            try
            {
                bool retval = false;
                var data = (from p in context.Demoes where p.DemoID == model.DemoID select p).FirstOrDefault();
                if (data != null)
                {
                    //check security

                    data.FirstName = model.FirstName;
                    data.LastName = model.LastName;
                    context.SaveChanges();
                    retval = true;
                }
                return retval;
            }
            catch (Exception)
            {
                throw new Exception(String.Format("Demo Write name returned error"));
            }
        }

        public NameModel GetName(int ID)
        {
            var data = (from p in context.Demoes where p.DemoID == ID select p).FirstOrDefault();

            NameModel result = new NameModel();

            var config = new MapperConfiguration(cfg => cfg.CreateMap<Data.Demo, NameModel>());

            IMapper mapper = config.CreateMapper();

            result = mapper.Map<Data.Demo, NameModel>(data);

            return result;
        }

        public bool UpdateQuestion(QuestionModel request)
        {
            QuestionModel result = new QuestionModel();

            Demo data = (from n in context.Demoes where n.DemoID == request.DemoID select n).First();

            if (data != null)
            {

                request.Length = getQuestionLength(request.WizardQuestionID);   //We don't want to depend on the length brought back from the client to validate

                if (!Validator.TryValidateObject(request,
                        new System.ComponentModel.DataAnnotations.ValidationContext(request, null, null), null, true))
                {
                    throw new Exception(String.Format("question invalid model."));
                }

                DemoQuestion ques = (from q in context.DemoQuestions
                                              where q.DemoID == request.DemoID && q.WizardQuestionID == request.WizardQuestionID
                                              select q).FirstOrDefault();

                if (ques == null)
                {
                    var updatedate = DateTime.Now;
                    ques = new DemoQuestion
                    {
                        DemoID = request.DemoID,
                        Answer = request.Answer,
                        UpdateDate = updatedate,
                        UpdateUser = user,
                        WizardQuestionID = request.WizardQuestionID
                    };
                    context.DemoQuestions.Add(ques);
                }
                else
                {
                    ques.Answer = request.Answer;
                    ques.UpdateUser = user;
                    ques.WizardQuestionID = request.WizardQuestionID;
                }
                context.SaveChanges();

                return true;

            }

            return false;

        }

        public QuestionModel GetQuestion(int ID, int Ordinal)
        {

            QuestionModel result = new QuestionModel();

            Demo data = (from n in context.Demoes where n.DemoID == ID select n).First();

            if (data != null)
            {

                QuestionModel step = (from wStep in context.WizardDefinitionSteps
                                      join wDef in context.WizardDefinitions on wStep.WizardDefinitionID equals wDef.WizardDefinitionID
                                      join wQues in context.WizardQuestions on wStep.WizardDefinitionStepID equals wQues.WizardDefinitionStepID
                                      where wDef.WizardCode == WizardCode && wQues.Ordinal == Ordinal
                                      select new QuestionModel
                                      {
                                          DemoID = ID,
                                          WizardQuestionID = wQues.WizardQuestionID,
                                          Ordinal = Ordinal,
                                          Question = wQues.WizardQuestion1,
                                          Length = wQues.WizardValidationLength.Value,
                                          Answer = (from q in context.DemoQuestions
                                                    where q.DemoID== ID && q.WizardQuestionID == wQues.WizardQuestionID
                                                    select q.Answer).FirstOrDefault()
                                      }).First();

                if (step == null)
                {
                    throw new Exception(
                        String.Format("TOYNomination question get failed for Question Ordinal {0).", Ordinal));
                }

                result = step;

            }

            return result;
        }
        


        //Helper methods

        private int getQuestionLength(int WizardQuestionID)
        {
            var len = (from p in context.WizardQuestions
                       where p.WizardQuestionID == WizardQuestionID
                       select p.WizardValidationLength).FirstOrDefault();
            return len.Value;
        }
        
        public bool UserhasNominationPermission(int district, int School, int SchoolYear)
        {

            return true; // (roleService.hasDistrictRole(user, district, "Admin") || roleService.hasSchoolRole(user, district, School, "TOYNominee"));

        }

        public bool UserhasNominationPermissionByID(int ID)
        {
            //implement security
            return true;
        }

        private bool GetQuestionStatus(string WizardStepCode, int NominationID)
        {
            bool status = false;
            int WizardDefinitionStepID = (from p in context.WizardDefinitionSteps where p.WizardStepCode == WizardStepCode select p.WizardDefinitionStepID).FirstOrDefault();
            var Answer = (from p in context.WizardDefinitionSteps
                          join q in context.WizardQuestions on p.WizardDefinitionStepID equals q.WizardDefinitionStepID
                          join r in context.DemoQuestions on q.WizardQuestionID equals r.WizardQuestionID
                          where q.WizardDefinitionStepID == WizardDefinitionStepID && r.DemoID== NominationID
                          select r.Answer).FirstOrDefault();

            if (!string.IsNullOrEmpty(Answer))
            {
                status = true;
            }
            return status;
        }

    }
}
