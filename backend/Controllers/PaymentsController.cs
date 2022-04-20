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
    public class PaymentsController : ApiController
    {
        private MyDbContext db = new MyDbContext();

        // GET: api/Payments
        [Route("~/api/payments")]
        [HttpGet]
        [ResponseType(typeof(Payment))]
        public IHttpActionResult GetPayments()
        {
            return Ok(db.Payments.ToList());
        }

        // GET: api/Payments/5
        [Route("~/api/payments/{id:int}")]
        [HttpGet]
        [ResponseType(typeof(Payment))]
        public IHttpActionResult GetPayment(int id)
        {
            Payment payment = db.Payments.Find(id);
            if (payment == null)
            {
                return NotFound();
            }

            return Ok(payment);
        }

        // PUT: api/Payments/5
        [Route("~/api/payments/{id:int}")]
        [HttpPut]
        [ResponseType(typeof(Payment))]
        public IHttpActionResult PutPayment(int id, Payment payment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != payment.Id)
            {
                return BadRequest();
            }

            db.Entry(payment).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PaymentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(payment);
        }

        // POST: api/Payments
        [Route("~/api/payments")]
        [HttpPost]
        [ResponseType(typeof(Payment))]
        public IHttpActionResult PostPayment(Payment payment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            payment.CreatedAt = DateTime.Now;
            payment.UpdatedAt = DateTime.Now;
            db.Payments.Add(payment);
            db.SaveChanges();

            return Ok(payment);
        }

        // DELETE: api/Payments/5
        [Route("~/api/payments/{id:int}")]
        [HttpDelete]
        [ResponseType(typeof(Payment))]
        public IHttpActionResult DeletePayment(int id)
        {
            Payment payment = db.Payments.Find(id);
            if (payment == null)
            {
                return NotFound();
            }

            db.Payments.Remove(payment);
            db.SaveChanges();

            return Ok(payment);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PaymentExists(int id)
        {
            return db.Payments.Count(e => e.Id == id) > 0;
        }
    }
}