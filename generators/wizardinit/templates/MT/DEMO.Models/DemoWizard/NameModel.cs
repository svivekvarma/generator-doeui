﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DEMO.Models.DemoWizard
{
    public class NameModel
    {
        public int DemoID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
