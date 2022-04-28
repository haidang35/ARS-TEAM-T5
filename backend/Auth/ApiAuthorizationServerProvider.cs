using backend.Data;
using backend.Helpers;
using backend.Models;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace backend.Auth
{
    public class ApiAuthorizationServerProvider: OAuthAuthorizationServerProvider
    {
        private MyDbContext db = new MyDbContext();
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated(); //   
        }
        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            var identity = new ClaimsIdentity(context.Options.AuthenticationType);
            var user = db.Users.Where(u => u.Email == context.UserName).FirstOrDefault();
            if (user == null)
            {
                context.SetError("invalid_grant", "Provided username not exist");
                return;
            }
            if (String.Compare(user.Password, Hash.Make(context.Password)) == 0)
            {
                var userRoles = db.UserRoles.Where(r => r.UserId == user.Id).ToList();
                foreach (var userRole in userRoles)
                {
                    string roleName = Enum.GetName(typeof(RoleCode), userRole.Role.RoleCode);
                    identity.AddClaim(new Claim(ClaimTypes.Role, roleName));
                }
                identity.AddClaim(new Claim("username", user.Email));
                identity.AddClaim(new Claim(ClaimTypes.Name, $"Hi {user.Name}"));
                identity.AddClaim(new Claim("currentUserId", user.Id.ToString()));
                context.Validated(identity);
            }
            else
            {
                context.SetError("invalid_grant", "Provided username and password is incorrect");
                return;
            }
        }
    }
}
