using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using DEMO.Models;
using Microsoft.Win32;

namespace DEMO.Services
{
    public class MenuService
    {

        private string user;
        private List<IMSRoleModel> roles;


        public MenuService(string _user)
        {
            //context = _context;
            user = _user;
            iRoleService roleservice = Injector.Instance.Resolve<iRoleService>();
            roles = roleservice.get(_user);
        }

        public List<MenuModel> Get()
        {

            List<MenuModel> results = new List<MenuModel>();
            results.Add(new MenuModel
            {
                ItemName = "Home",
                ItemUrl = "#home",
                ItemIconClass = "glyphicon glyphicon-home"
            });

            results.Add(new MenuModel
            {
                ItemName = "App",
                ItemUrl = "#App",
                ItemIconClass = "glyphicon glyphicon-star",
                ItemMenus = GetSubMenu()
            });
            return results;
        }

        private List<MenuModel> GetSubMenu()
        {
            List<MenuModel> result = new List<MenuModel>();

            //Always have instructions
            result.Add(new MenuModel
            {
                ItemName = "Instructions",
                ItemUrl =
                    "https://www.doe.k12.de.us/cms/lib/DE01922744/Centricity/Domain/96/AAR_StateTOY_Instructions.pdf",
                ItemIconClass = "glyphicon glyphicon-question-sign",
                OpenNewTab = true
            });



            //Admins can Initiate a Wizard
            if (roles.Where(p => p.Role.Equals("Admin")).Count() > 0)
            {
                result.Add(new MenuModel
                {
                    ItemName = "Add Nominee",
                    ItemUrl = "#toyaddnominee",
                    ItemIconClass = "glyphicon glyphicon-plus"
                });
            }


            //Anyone can fill out the wizare
            result.Add(new MenuModel
            {
                ItemName = "Nominee Application",
                ItemUrl = "#toynomineeapplicationDOE",
                ItemIconClass = "glyphicon glyphicon-list-alt"
            });

            return result;


        }
    }
}