using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using backend.Data;
using backend.Dtos;
using backend.Helpers;
using backend.Models;

namespace backend.Controllers
{
 
    public class UsersController : ApiController
    {
        private MyDbContext db = new MyDbContext();

        [AllowAnonymous]
        [Route ("~/api/user/register")]
        [HttpPost]
        public IHttpActionResult Register(UserRegisterDto userRegister)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = db.Users.Where(u => u.Email == userRegister.Email).FirstOrDefault();
            if(user != null)
            {
                return BadRequest("Email already exist !!");
            }
            var newUser = new User()
            {
                Name = userRegister.Name,
                Email = userRegister.Email,
                PhoneNumber = userRegister.PhoneNumber,
                Birthday = userRegister.Birthday,
                Status = UserStatus.Active,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                Address = userRegister.Address,
                Vocative = userRegister.Vocative,
                Password = Hash.Make(userRegister.Password)

            };
            db.Users.Add(newUser);
            try
            {
                db.SaveChanges();
            }catch(Exception e)
            {
                return BadRequest();
            }
            return Ok(newUser);
        }

        [Route("~/api/auth-user/roles")]
        [HttpGet]
        [Authorize]
        [ResponseType(typeof(ICollection<UserRole>))]
        public IHttpActionResult GetUserRolesAuth()
        {
            var identity = HttpContext.Current.User.Identity as ClaimsIdentity;
            var currentUserId = Int32.Parse(identity.FindFirst("currentUserId").Value);
            var userRoles = db.UserRoles.Where(u => u.UserId == currentUserId).ToList();
            return Ok(userRoles);
        }

        [Route("~/api/auth-user")]
        [HttpGet]
        [Authorize]
        [ResponseType(typeof(User))]
        public IHttpActionResult GetAuthUser()
        {
            var identity = HttpContext.Current.User.Identity as ClaimsIdentity;
            var currentUserId = Int32.Parse(identity.FindFirst("currentUserId").Value);
            var user = db.Users.Find(currentUserId); ;
            if(user == null)
            {
                return BadRequest("User not exists");
            }
            return Ok(user);
        }

        // GET: api/Users
        [Route ("~/api/users")]
        [HttpGet]
        [ResponseType(typeof(ICollection<User>))]
        public IHttpActionResult GetUsers()
        {
            return Ok(db.Users.ToList());
        }

        // GET: api/Users/5
        [Route("~/api/users/{id:int}")]
        [HttpGet]
        [ResponseType(typeof(User))]
        public IHttpActionResult GetUser(int id)
        {
            User user = db.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // PUT: api/Users/5
        [Route("~/api/users/{id:int}")]
        [HttpPut]
        [ResponseType(typeof(User))]
        public IHttpActionResult PutUser(int id, UpdateUser updateUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = db.Users.Find(id);
            if(user == null)
            {
                return BadRequest();
            }
            user.Name = updateUser.Name;
            user.Vocative = updateUser.Vocative;
            user.PhoneNumber = updateUser.PhoneNumber;
            user.Email = updateUser.Email;
            user.Password = updateUser.Password;
            user.Address = updateUser.Address;
            user.UpdatedAt = DateTime.Now;

            db.Entry(user).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(user);
        }

        // POST: api/Users
        [Route("~/api/users")]
        [HttpPost]
        [ResponseType(typeof(User))]
        public IHttpActionResult PostUser(UserCreate userCreate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = db.Users.Where(u => u.Email == userCreate.Email).FirstOrDefault();
            if(user != null)
            {
                return BadRequest("Email already exists");
            }
            var newUser = new User()
            {
                Name = userCreate.Name,
                Birthday = userCreate.Birthday,
                Vocative = userCreate.Vocative,
                PhoneNumber = userCreate.PhoneNumber,
                Email = userCreate.Email,
                Password = Hash.Make(userCreate.Password),
                Address = userCreate.Address,
                Status = userCreate.Status,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,


        };
            db.Users.Add(newUser);
            foreach (var roleId in userCreate.RoleIds.Distinct())
            {
                var userRole = new UserRole
                {
                    RoleId = roleId,
                    UserId = newUser.Id,
                    CreatedAt = DateTime.Now,
                    UpdateAt = DateTime.Now
                };
                db.UserRoles.Add(userRole);
            }

            try
            {
                db.SaveChanges();
            }catch(Exception e)
            {
                return BadRequest("Save to database failed");
            }

            return Ok();
        }

        // DELETE: api/Users/5
        [Route("~/api/users/{id:int}")]
        [HttpDelete]
        [ResponseType(typeof(User))]
        public IHttpActionResult DeleteUser(int id)
        {
            User user = db.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            db.Users.Remove(user);
            db.SaveChanges();

            return Ok(user);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserExists(int id)
        {
            return db.Users.Count(e => e.Id == id) > 0;
        }
    }
}