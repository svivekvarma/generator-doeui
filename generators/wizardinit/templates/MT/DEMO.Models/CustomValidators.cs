using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DEMO.Models
{

    public class WordCountValidatorAttribute : ValidationAttribute
    {
        public WordCountValidatorAttribute(string LengthFieldName, string FieldName, params string[] propertyNames)
        {
            this.PropertyNames = propertyNames;
            this.LengthFieldName = LengthFieldName;
            this.FieldName = FieldName;
        }

        public string[] PropertyNames { get; private set; }
        public string LengthFieldName { get; private set; }
        public string FieldName { get; private set; }


        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var maxLenprop = validationContext.ObjectType.GetProperty(LengthFieldName);
            var maxLenVar = maxLenprop.GetValue(validationContext.ObjectInstance, null);
            int maxLen = (int)maxLenVar;

            var validationprop = validationContext.ObjectType.GetProperty(FieldName);
            var validationValVar = validationprop.GetValue(validationContext.ObjectInstance, null);
            string validationVal = (string)validationValVar;

            int count = validationVal.Split(new char[] { ' ', '.', ':' }, StringSplitOptions.RemoveEmptyEntries).Count();

            if (count > maxLen)
            {
                return new ValidationResult(this.FormatErrorMessage(validationContext.DisplayName));
            }
            return null;
        }
    }

}

