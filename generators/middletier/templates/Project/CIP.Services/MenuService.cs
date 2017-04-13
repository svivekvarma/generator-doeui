using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using <%=applicationshortname%>.Models;
using <%=applicationshortname%>.Data;

namespace <%=applicationshortname%>.Services
{
    public class MenuService
    {

        //private CodelibraryEntities context { get; set; }
        private string user;
        public MenuService(string _user)
        {
            //context = _context;
            user = _user;
        }

        //Top level get TODO
        public List<MenuModel> get()
        {
          
           

            List<MenuModel> results = new List<MenuModel>();
     
            results.Add(new MenuModel
            {
                ItemName = "Menu 1",
                ItemUrl = "#menu1",
                ItemIconClass = "glyphicon glyphicon-asterisk"
             
            });

            results.Add(new MenuModel
            {
                ItemName = "Menu 2",
                ItemUrl = "#menu2",
                ItemIconClass = "glyphicon glyphicon-list-alt"

            });   
            return results;
        }
    }
}
