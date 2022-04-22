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
    public class ProvincesController : ApiController
    {
        private MyDbContext db = new MyDbContext();

        // GET: api/Provinces
        [Route("~/api/provinces")]
        [HttpGet]
        [ResponseType(typeof(Province))]
        public IHttpActionResult GetProvinces()
        {
            return Ok(db.Provinces.ToList());
        }


        // GET: api/Provinces/5
        [Route("~/api/provinces/{id:int}")]
        [HttpGet]
        [ResponseType(typeof(Province))]
        public IHttpActionResult GetProvince(int id)
        {
            Province province = db.Provinces.Find(id);
            if (province == null)
            {
                return NotFound();
            }

            return Ok(province);
        }


        // PUT: api/Provinces/5
        [Route("~/api/provinces/{id:int}")]
        [HttpPut]
        [ResponseType(typeof(Province))]
        public IHttpActionResult PutProvince(int id, Province province)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != province.Id)
            {
                return BadRequest();
            }

            db.Entry(province).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProvinceExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(province);
        }

        // POST: api/Provinces
        [Route("~/api/provinces")]
        [HttpPost]
        [ResponseType(typeof(Province))]
        public IHttpActionResult PostProvince(Province province)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Provinces.Add(province);
            db.SaveChanges();

            return Ok(province);
        }

        // DELETE: api/Provinces/5
        [Route("~/api/provinces/{id:int}")]
        [HttpDelete]
        [ResponseType(typeof(Province))]
        public IHttpActionResult DeleteProvince(int id)
        {
            Province province = db.Provinces.Find(id);
            if (province == null)
            {
                return NotFound();
            }

            db.Provinces.Remove(province);
            db.SaveChanges();

            return Ok(province);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProvinceExists(int id)
        {
            return db.Provinces.Count(e => e.Id == id) > 0;
        }
    }
}