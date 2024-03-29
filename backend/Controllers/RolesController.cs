﻿using System;
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
    public class RolesController : ApiController
    {
        private MyDbContext db = new MyDbContext();

        // GET: api/Roles
        [Route("~/api/roles")]
        [HttpGet]
        [ResponseType(typeof(ICollection<Role>))]
        public IHttpActionResult GetRoles()
        {
            return Ok(db.Roles.ToList());
        }

        // GET: api/Roles/5
        [Route("~/api/roles/{id:int}")]
        [HttpGet]
        [ResponseType(typeof(Role))]
        public IHttpActionResult GetRole(int id)
        {
            Role role = db.Roles.Find(id);
            if (role == null)
            {
                return NotFound();
            }

            return Ok(role);
        }

        // PUT: api/Roles/5
        [Route("~/api/roles/{id:int}")]
        [HttpPut]
        [ResponseType(typeof(Role))]
        public IHttpActionResult PutRole(int id, Role role)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != role.Id)
            {
                return BadRequest();
            }

            db.Entry(role).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoleExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(role);
        }

        // POST: api/Roles
        [Route("~/api/roles")]
        [HttpPost]
        [ResponseType(typeof(Role))]
        public IHttpActionResult PostRole(Role role)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            role.CreatedAt = DateTime.Now;
            role.UpdatedAt = DateTime.Now;
            db.Roles.Add(role);
            db.SaveChanges();

            return Ok(role);
        }

        // DELETE: api/Roles/5
        [Route("~/api/roles/{id:int}")]
        [HttpDelete]
        [ResponseType(typeof(Role))]
        public IHttpActionResult DeleteRole(int id)
        {
            Role role = db.Roles.Find(id);
            if (role == null)
            {
                return NotFound();
            }

            db.Roles.Remove(role);
            db.SaveChanges();

            return Ok(role);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RoleExists(int id)
        {
            return db.Roles.Count(e => e.Id == id) > 0;
        }
    }
}