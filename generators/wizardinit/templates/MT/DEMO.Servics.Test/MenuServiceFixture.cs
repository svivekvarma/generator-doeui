using System;
using DEMO.Services;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace DEMOS.Services.Test
{
    [TestClass]
    public class MenuServiceFixture
    {
        [TestMethod]
        public void Is_Menu_Get_Correct()
        {
            var service = new MenuService("StateAdmin");  //Assuming is admin
            var menu = service.Get();
            Assert.AreEqual(3, menu[1].ItemMenus.Count);


        }
    }
}
