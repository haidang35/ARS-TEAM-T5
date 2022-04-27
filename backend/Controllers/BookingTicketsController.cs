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
    public class BookingTicketsController : ApiController
    {
        private MyDbContext db = new MyDbContext();

        // GET: api/BookingTickets
        [Route("~/api/bookingtickets")]
        [HttpGet]
        [ResponseType(typeof(ICollection<BookingTicket>))]
        public IHttpActionResult GetBookingTickets(int bookingid)
        {
            var bookingTicket = db.BookingTickets.Where(c => c.BookingId == bookingid).ToList();
            return Ok(bookingTicket);
        }

        // GET: api/BookingTickets/5
        [Route("~/api/bookingtickets/{id:int}")]
        [HttpGet]
        [ResponseType(typeof(BookingTicket))]
        public IHttpActionResult GetBookingTicket(int id)
        {
            BookingTicket bookingTicket = db.BookingTickets.Find(id);
            if (bookingTicket == null)
            {
                return NotFound();
            }

            return Ok(bookingTicket);
        }

        // PUT: api/BookingTickets/5
        [Route("~/api/bookingtickets/{id:int}")]
        [HttpPut]
        [ResponseType(typeof(BookingTicket))]
        public IHttpActionResult PutBookingTicket(int id, BookingTicket bookingTicket)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != bookingTicket.Id)
            {
                return BadRequest();
            }

            db.Entry(bookingTicket).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookingTicketExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(bookingTicket);
        }

        // POST: api/BookingTickets
        [Route("~/api/bookingtickets")]
        [HttpPost]
        [ResponseType(typeof(BookingTicket))]
        public IHttpActionResult PostBookingTicket(BookingTicket bookingTicket)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            bookingTicket.CreatedAt = DateTime.Now;
            bookingTicket.UpdatedAt = DateTime.Now;
            db.BookingTickets.Add(bookingTicket);
                db.SaveChanges();

            return Ok(bookingTicket);
        }

        // DELETE: api/BookingTickets/5
        [Route("~/api/bookingtickets/{id:int}")]
        [HttpDelete]
        [ResponseType(typeof(BookingTicket))]
        public IHttpActionResult DeleteBookingTicket(int id)
        {
            BookingTicket bookingTicket = db.BookingTickets.Find(id);
            if (bookingTicket == null)
            {
                return NotFound();
            }

            db.BookingTickets.Remove(bookingTicket);
            db.SaveChanges();

            return Ok(bookingTicket);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BookingTicketExists(int id)
        {
            return db.BookingTickets.Count(e => e.Id == id) > 0;
        }
    }
}