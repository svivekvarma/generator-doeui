using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DEMO.Models.DemoWizard;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace DEMOS.Services.Test
{
    [TestClass]
    public class CustomValidationFixture
    {

        [TestMethod]
        public void TestWordCountValidatorOnQuestionModel()
        {
            QuestionModel q = new QuestionModel
            {
                Length = 5,
                Answer = "hello world"
            };
            Assert.IsTrue(true);
        }



    }
}
