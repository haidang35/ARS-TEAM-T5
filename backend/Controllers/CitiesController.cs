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
    public class CitiesController : ApiController
    {
        private MyDbContext db = new MyDbContext();

        // GET: api/Cities
        [Route("~/api/cities")]
        [HttpGet]
        [ResponseType(typeof(ICollection<City>))]
        public IHttpActionResult GetCities(int? provinceId)
        {
            var cities = db.Cities.ToList();
            if(provinceId != null)
            {
                cities = db.Cities.Where(c => c.ProvinceId == provinceId).ToList();
            }
            return Ok(cities);
        }
       

        [Route("~/api/provinces/{id:int}/cities")]
        [HttpGet]
        [ResponseType(typeof(ICollection<City>))]
        public IHttpActionResult GetCitiesByProvince(int id)
        {
            var cities = db.Cities.Where( c => c.ProvinceId == id).ToList();
            return Ok(cities);
        }

        // GET: api/Cities/5
        [Route("~/api/cities/{id:int}")]
        [HttpGet]
        [ResponseType(typeof(City))]
        public IHttpActionResult GetCity(int id)
        {
            City city = db.Cities.Find(id);
            if (city == null)
            {
                return NotFound();
            }

            return Ok(city);
        }

        // PUT: api/Cities/5
        [Route("~/api/cities/{id:int}")]
        [HttpPut]
        [ResponseType(typeof(City))]
        public IHttpActionResult PutCity(int id, City city)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != city.Id)
            {
                return BadRequest();
            }

            db.Entry(city).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CityExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(city);
        }

        // POST: api/Cities
        [Route("~/api/cities")]
        [HttpPost]
        [ResponseType(typeof(City))]
        public IHttpActionResult PostCity(City city)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Cities.Add(city);
            db.SaveChanges();

            return Ok(city);
        }

        // DELETE: api/Cities/5
        [Route("~/api/cities/{id:int}")]
        [HttpDelete]
        [ResponseType(typeof(City))]
        public IHttpActionResult DeleteCity(int id)
        {
            City city = db.Cities.Find(id);
            if (city == null)
            {
                return NotFound();
            }

            db.Cities.Remove(city);
            db.SaveChanges();

            return Ok(city);
        }

        private bool CityExists(int id)
        {
            return db.Cities.Count(e => e.Id == id) > 0;
        }

    }
}