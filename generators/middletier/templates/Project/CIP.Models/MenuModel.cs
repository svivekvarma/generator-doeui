using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace <%=applicationshortname%>.Models
{
    public class MenuModel
    {

        public string ItemName { get; set; }
        public string ItemUrl { get; set; }
        public string ItemIconClass { get; set; }
        public bool OpenNewTab { get; set; }
        public List<MenuModel> ItemMenus { get; set; }

    }   
}
