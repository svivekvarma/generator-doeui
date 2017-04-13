using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.DirectoryServices.AccountManagement;

namespace <%=applicationshortname%>.API.Utility
{
    [DirectoryRdnPrefix("CN")]
    [DirectoryObjectClass("user")]
    public class UserPrincipalExtended : UserPrincipal
    {
        public UserPrincipalExtended(PrincipalContext context)
            : base(context)
        {
        }

        public UserPrincipalExtended(PrincipalContext context, string samAccountName, string password, bool enabled)
            : base(context, samAccountName, password, enabled)
        {
        }

        [DirectoryProperty("ddoeUserRecID")]
        public string UserRecID
        {
            get
            {
                if (ExtensionGet("ddoeUserRecID").Length != 1)
                    return null;

                return (string)ExtensionGet("ddoeUserRecID")[0];
            }

            set
            {
                ExtensionSet("ddoeUserRecID", value);
            }
        }

        public static new UserPrincipalExtended FindByIdentity(PrincipalContext context, string identityValue)
        {
            return (UserPrincipalExtended)FindByIdentityWithType(context, typeof(UserPrincipalExtended), identityValue);
        }

        public static new UserPrincipalExtended FindByIdentity(PrincipalContext context, IdentityType identityType, string identityValue)
        {
            return (UserPrincipalExtended)FindByIdentityWithType(context, typeof(UserPrincipalExtended), identityType, identityValue);
        }
    }
}