using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;

namespace DEMO.API.helpers
{
    public class DOEStreamProvider : MultipartFormDataStreamProvider
    {

        public DOEStreamProvider(string uploadPath)
            : base(uploadPath)
        {

        }

        public override string GetLocalFileName(HttpContentHeaders headers)
        {
            string fileNamefromclient = headers.ContentDisposition.FileName;
            return fileNamefromclient.Replace("\"", string.Empty);
        }
    }
}