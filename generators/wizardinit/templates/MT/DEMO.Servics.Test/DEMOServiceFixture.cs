using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using DEMO.Data;
using DEMO.Models.DemoWizard;
using DEMO.Services;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace DEMO.Servics.Test
{
    public class TestModelHelper
    {
        public static IList<ValidationResult> Validate(object model)
        {
            var results = new List<ValidationResult>();
            var validationContext = new ValidationContext(model, null, null);
            Validator.TryValidateObject(model, validationContext, results, true);
            if (model is IValidatableObject) (model as IValidatableObject).Validate(validationContext);
            return results;
        }

    }

    [TestClass]
    public class DEMOServiceFixture
    {
        //setup
        static DemoWizardTemplateEntities context = new DemoWizardTemplateEntities();
        static DEMOService service = new DEMOService(context, "StateAdmin");

        const int testDistrict = 64;
        const int testYear = 2018;
        const int testSchool = 776;

        private static int demoID;

        [ClassInitialize]
        public static void IntitTest(TestContext test)
        {
            demoID = AddDemo(testDistrict, testYear, testSchool);
        }

        [ClassCleanup]
        public static void CleanAfterwards()
        {
            clearDEMO(testDistrict, testYear);
        }

        [TestMethod]
        public void Test_School()
        {
            SchoolModel model = new SchoolModel
            {
                DemoID = demoID,
                DistrictCode = testDistrict,
                DistrictName = "test district",
                SchoolCode = testSchool,
                SchoolName = "Fred",
                SchoolYear = testYear
            };

            Assert.IsTrue(service.Write(model));

            SchoolModel result = service.GetSchool(demoID);

            Assert.AreEqual("test district", result.DistrictName);
            Assert.AreEqual("Fred", result.SchoolName);
        }

        [TestMethod]
        public void TestQuestionModelValidation()
        {
            QuestionModel test = new QuestionModel
            {
                Length = 3,
                Answer = "this is"
            };

            var results = TestModelHelper.Validate(test);

            Assert.AreEqual(0, results.Count);

            test.Answer = "this is a longer answer";

            var results2 = TestModelHelper.Validate(test);

            Assert.AreEqual(1, results2.Count);

        }

        //[TestMethod]
        //public void Test_baseget
        //{
        //    service.GetWizardModel()
        //}

        [TestMethod]
        public void Test_Name()
        {
            NameModel model = new NameModel
            {
                DemoID = demoID,
                FirstName = "Mary",
                LastName = "Opers"
            };

            Assert.IsTrue(service.Write(model));

            NameModel result = service.GetName(demoID);

            Assert.AreEqual("Mary", result.FirstName);
            Assert.AreEqual("Opers", result.LastName);
        }

        [TestMethod]
        public void Test_GetQuestion()
        {
            QuestionModel model = service.GetQuestion(demoID, 2);
            Assert.AreEqual(500,model.Length);

        }

        [TestMethod]
        public void privateGetQuestionLength()
        {
            PrivateObject prvService = new PrivateObject(service);
            var result = prvService.Invoke("getQuestionLength", new object[1] { 1 });

            Assert.AreEqual(result, 750);
        }

        [TestMethod]
        public void Test_UpdateQuestion()
        {
            QuestionModel request = new QuestionModel()
            {
                Answer = "Oh My!",
                DemoID=demoID,
                WizardQuestionID = 1,
                Length = 10
            };

            service.UpdateQuestion(request);

            QuestionModel result = service.GetQuestion(demoID, 1);

            Assert.AreEqual("Oh My!",result.Answer);

            request.Answer = "try 2";

            service.UpdateQuestion(request);  //update

            QuestionModel result2 = service.GetQuestion(demoID, 1);

            Assert.AreEqual("try 2", result2.Answer);

        }

        //helpers
        private static int AddDemo(int districtCode, int schoolYear, int schoolcode)
        {
            int retval = service.AddDemo(testYear, testDistrict);

            Assert.AreNotEqual(0, retval);

            return retval;

        }
        
        private static void clearDEMO(int districtCode, int schoolYear)
        {


            Demo row = (from n in context.Demoes
                        where n.DistrictCode == districtCode && n.SchoolYear == schoolYear
                        select n).FirstOrDefault();

            if (row != null)
            {
                context.Demoes.Remove(row);

            }
            context.SaveChanges();

        }

    }
}
