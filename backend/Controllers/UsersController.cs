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
        [Route("~/api/auth-user/bookings")]
        [HttpGet]
        [Authorize]
        [ResponseType(typeof(ICollection<BookingDto>))]
        public IHttpActionResult GetBookingAuthUser()
        {
            var identity = HttpContext.Current.User.Identity as ClaimsIdentity;
            var currentUserId = Int32.Parse(identity.FindFirst("currentUserId").Value);
            var bookings = db.Bookings.Where(b => b.UserId == currentUserId).ToList();
            var bookingListDto = new List<BookingDto>();
            foreach (var booking in bookings)
            {
                var bookingTicketList = db.BookingTickets.Where(bt => bt.BookingId == booking.Id).ToList();
                var bookingDto = new BookingDto()
                {
                    Id = booking.Id,
                    User = booking.User,
                    Status = booking.Status,
                    ContactName = booking.ContactName,
                    ContactPhone = booking.ContactPhone,
                    ContactEmail = booking.ContactEmail,
                    ContactAddress = booking.ContactAddress,
                    BookingCode = booking.BookingCode,
                    Note = booking.Note,
                    CreatedAt = booking.CreatedAt,
                    UpdatedAt = booking.UpdatedAt,
                    BookingTickets = bookingTicketList,
                    PaymentMethod = booking.PaymentMethod,
                };
                bookingListDto.Add(bookingDto);
            }
            return Ok(bookingListDto);
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
        [ResponseType(typeof(UserDto))]
        public IHttpActionResult GetUser(int id)
        {
            User user = db.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }
            var userRoles = db.UserRoles.Where(ur => ur.UserId == id).ToList();
            var userDto = new UserDto()
            {
                Name = user.Name,
                Birthday = user.Birthday,
                Vocative = user.Vocative,
                PhoneNumber = user.PhoneNumber,
                Email = user.Email,
                Address = user.Address,
                Status = user.Status,
                UserRoles = userRoles,
            };

            return Ok(userDto);
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
            user.Birthday = updateUser.Birthday;
            user.Vocative = updateUser.Vocative;
            user.PhoneNumber = updateUser.PhoneNumber;
            user.Email = updateUser.Email;
            user.Password = Hash.Make(updateUser.Password);
            user.Address = updateUser.Address;
            user.Status = updateUser.Status;
            user.UpdatedAt = DateTime.Now;

            db.Entry(user).State = EntityState.Modified;
            var userRoles = db.UserRoles.Where(ur => ur.UserId == user.Id).ToList();
            foreach (var roleId in updateUser.RoleIds.Distinct())
            {
                bool isAddNew = true;
                foreach (var userRoleCurrent in userRoles)
                {
                    if (userRoleCurrent.RoleId == roleId)
                    {
                        isAddNew = false;
                    }
                }

                if(isAddNew)
                {
                    var userRole = new UserRole
                    {
                        RoleId = roleId,
                        UserId = user.Id,
                        CreatedAt = DateTime.Now,
                        UpdateAt = DateTime.Now
                    };
                    db.UserRoles.Add(userRole);
                }
               
            }

            foreach (var userRoleCurrent in userRoles)
            {
                bool isDelete = true;
                foreach (var roleId in updateUser.RoleIds.Distinct())
                {
                    if (userRoleCurrent.RoleId == roleId)
                    {
                        isDelete = false;
                    }
                }
                if(isDelete)
                {
                    db.UserRoles.Remove(userRoleCurrent);
                }

            }

            

            try
            {
                db.SaveChanges();
            }
            catch (Exception e)
            {
                return BadRequest("Save to database failed");
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