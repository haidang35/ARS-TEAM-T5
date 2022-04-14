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
using backend.Models;

namespace backend.Controllers
{
    public class UserRolesController : ApiController
    {
        private MyDbContext db = new MyDbContext();

        // GET: api/UserRoles
        [Route("~/api/userroles")]
        [HttpGet]
        [ResponseType(typeof(ICollection<UserRole>))]
        public IHttpActionResult GetUserRoles()
        {
            return Ok(db.UserRoles.ToList());
        }

        // GET: api/UserRoles/5
        [Route("~/api/userroles/{id:int}")]
        [HttpGet]
        [ResponseType(typeof(UserRole))]
        public IHttpActionResult GetUserRole(int id)
        {
            UserRole userRole = db.UserRoles.Find(id);
            if (userRole == null)
            {
                return NotFound();
            }

            return Ok(userRole);
        }

        // PUT: api/UserRoles/5
        [Route("~/api/userroles/{id:int}")]
        [HttpPut]
        [ResponseType(typeof(UserRole))]
        public IHttpActionResult PutUserRole(int id, UserRole userRole)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != userRole.Id)
            {
                return BadRequest();
            }

            db.Entry(userRole).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserRoleExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(userRole);
        }

        // POST: api/UserRoles
        [Route("~/api/userroles")]
        [HttpPost]
        [ResponseType(typeof(UserRole))]
        public IHttpActionResult PostUserRole(UserRole userRole)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.UserRoles.Add(userRole);
            db.SaveChanges();

            return Ok(userRole);
        }

        // DELETE: api/UserRoles/5
        [Route("~/api/userroles/{id:int}")]
        [HttpDelete]
        [ResponseType(typeof(UserRole))]
        public IHttpActionResult DeleteUserRole(int id)
        {
            UserRole userRole = db.UserRoles.Find(id);
            if (userRole == null)
            {
                return NotFound();
            }

            db.UserRoles.Remove(userRole);
            db.SaveChanges();

            return Ok(userRole);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserRoleExists(int id)
        {
            return db.UserRoles.Count(e => e.Id == id) > 0;
        }
    }
}