using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using backend.Data;
using backend.Dtos;
using backend.Models;

namespace backend.Controllers
{
    public class UsersController : ApiController
    {
        private MyDbContext db = new MyDbContext();

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
        public IHttpActionResult PostUser(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            user.CreatedAt = DateTime.Now;
            user.UpdatedAt = DateTime.Now;
            db.Users.Add(user);
            db.SaveChanges();

            return Ok(user);
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