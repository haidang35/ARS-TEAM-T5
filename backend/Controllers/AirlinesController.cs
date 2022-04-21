using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using backend.Data;
using backend.Dtos;
using backend.Models;

namespace backend.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class AirlinesController : ApiController
    {
        private MyDbContext db = new MyDbContext();

        // GET: api/Airlines
        [Route("~/api/airlines")]
        [HttpGet]
        [ResponseType(typeof(ICollection <Airline>))]
        public IHttpActionResult GetAirlines()
        {
            return Ok(db.Airlines.ToList());
        }

        // GET: api/Airlines/5
        [Route("~/api/airlines/{id:int}")]
        [HttpGet]
        [ResponseType(typeof(Airline))]
        public IHttpActionResult GetAirline(int id)
        {
            Airline airline = db.Airlines.Find(id);
            if (airline == null)
            {
                return NotFound();
            }

            return Ok(airline);
        }

        // PUT: api/Airlines/5
        [Route("~/api/airlines/{id:int}")]
        [HttpPut]
        [ResponseType(typeof(Airline))]
        public IHttpActionResult PutAirline(int id, UpdateAirline updateAirline)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var airline = db.Airlines.Find(id);
            if(airline == null)
            {
                return BadRequest();
            }
            airline.UpdatedAt = DateTime.Now;
            db.Entry(airline).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AirlineExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(airline);
        }

        // POST: api/Airlines
        [Route("~/api/airlines")]
        [HttpPost]
        [ResponseType(typeof(Airline))]
        public IHttpActionResult PostAirline(Airline airline)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            airline.CreatedAt = DateTime.Now;
            airline.UpdatedAt = DateTime.Now;
            db.Airlines.Add(airline);
            db.SaveChanges();

            return Ok(airline);
        }

        // DELETE: api/Airlines/5
        [Route("~/api/airlines/{id:int}")]
        [HttpDelete]
        [ResponseType(typeof(Airline))]
       
        public IHttpActionResult DeleteAirline(int id)
        {
            Airline airline = db.Airlines.Find(id);
            if (airline == null)
            {
                return NotFound();
            }

            db.Airlines.Remove(airline);
            db.SaveChanges();

            return Ok(airline);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AirlineExists(int id)
        {
            return db.Airlines.Count(e => e.Id == id) > 0;
        }
    }
}