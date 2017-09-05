using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Web;
using DEMO.Data;
using DEMO.Services;

namespace AAR.API.helpers
{
    public class DirectoryFileHelper
    {
        
               
        public bool CreateDirectoryStructureIfNotExistsTOY(string districtcode, int schoolyear) {

            string root = ConfigurationManager.AppSettings["UploadFolder"];

            //TOYNomineeService service = new TOYNomineeService(new AwardsRecognitionEntities(), System.Web.HttpContext.Current.User.Identity.Name);
            //return service.CreateDirectoryStructureIfNotExistsTOY(districtcode,schoolyear,root) ;
            return true;

        } 

        public bool checkFileSize(long filesize){

            if (filesize > long.Parse(ConfigurationManager.AppSettings["MaxFileUploadSize"]))
            {
                return false;
            }
            else {
                return true;
            }
            
        }

    }
}