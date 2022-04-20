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
    public class LocationsController : ApiController
    {
        private MyDbContext db = new MyDbContext();

        // GET: api/Locations
        [Route("~/api/locations")]
        [HttpGet]
        [ResponseType(typeof(ICollection<Location>))]
        public IHttpActionResult GetLocations()
        {
            return Ok(db.Locations.ToList());
        }

        // GET: api/Locations/5
        [Route("~/api/locations/{id:int}")]
        [HttpGet]
        [ResponseType(typeof(Location))]
        public IHttpActionResult GetLocation(int id)
        {
            Location location = db.Locations.Find(id);
            if (location == null)
            {
                return NotFound();
            }

            return Ok(location);
        }

        // PUT: api/Locations/5
        [Route("~/api/locations/{id:int}")]
        [HttpPut]
        [ResponseType(typeof(Location))]
        public IHttpActionResult PutLocation(int id, Location location)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != location.Id)
            {
                return BadRequest();
            }

            db.Entry(location).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LocationExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok (location);
        }

        // POST: api/Locations
        [Route("~/api/locations")]
        [HttpPost]
        [ResponseType(typeof(Location))]
        public IHttpActionResult PostLocation(Location location)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            location.CreatedAt = DateTime.Now;
            location.UpdatedAt = DateTime.Now;
            db.Locations.Add(location);
            db.SaveChanges();

            return Ok(location);
        }

        // DELETE: api/Locations/5
        [Route("~/api/locations/{id:int}")]
        [HttpDelete]
        [ResponseType(typeof(Location))]
        public IHttpActionResult DeleteLocation(int id)
        {
            Location location = db.Locations.Find(id);
            if (location == null)
            {
                return NotFound();
            }

            db.Locations.Remove(location);
            db.SaveChanges();

            return Ok(location);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool LocationExists(int id)
        {
            return db.Locations.Count(e => e.Id == id) > 0;
        }
    }
}