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
    public class BookingsController : ApiController
    {
        private MyDbContext db = new MyDbContext();

        // GET: api/Bookings
        [Route("~/api/bookings")]
        [HttpGet]
        [ResponseType(typeof(ICollection<Booking>))]
        public IHttpActionResult GetBookings()
        {
            return Ok(db.Bookings.ToList());
        }

        // GET: api/Bookings/5
        [Route("~/api/bookings/{id:int}")]
        [HttpGet]
        [ResponseType(typeof(Booking))]
        public IHttpActionResult GetBooking(int id)
        {
            Booking booking = db.Bookings.Find(id);
            if (booking == null)
            {
                return NotFound();
            }

            return Ok(booking);
        }

        // PUT: api/Bookings/5
        [Route("~/api/bookings/{id:int}")]
        [HttpPut]
        [ResponseType(typeof(Booking))]
        public IHttpActionResult PutBooking(int id, UpdateBooking updatebooking)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var booking = db.Bookings.Find(id);
            if(booking == null)
            {
                return BadRequest();
            }
            booking.BookingCode = updatebooking.BookingCode;
            booking.ContactName = updatebooking.ContactName;
            booking.ContactPhone = updatebooking.ContactPhone;
            booking.ContactEmail = updatebooking.ContactEmail;
            booking.ContactAddress = updatebooking.ContactAddress;
            booking.Status = updatebooking.Status;
            booking.Note = updatebooking.Note;
            booking.UpdatedAt = DateTime.Now;
            db.Entry(booking).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookingExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;  
                }
            }

            return Ok(booking);
        }

        // POST: api/Bookings
        [Route("~/api/bookings")]
        [HttpPost]
        [ResponseType(typeof(Booking))]
        public IHttpActionResult PostBooking(Booking booking)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            booking.CreatedAt = DateTime.Now;
            booking.UpdatedAt = DateTime.Now;
            db.Bookings.Add(booking);
            db.SaveChanges();

            return Ok(booking);
        }

        // DELETE: api/Bookings/5
        [Route("~/api/bookings/{id:int}")]
        [HttpDelete]
        [ResponseType(typeof(Booking))]
        public IHttpActionResult DeleteBooking(int id)
        {
            Booking booking = db.Bookings.Find(id);
            if (booking == null)
            {
                return NotFound();
            }

            db.Bookings.Remove(booking);
            db.SaveChanges();

            return Ok(booking);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BookingExists(int id)
        {
            return db.Bookings.Count(e => e.Id == id) > 0;
        }

        [Route("~/api/public/booking")]
        [HttpPost]
        [ResponseType(typeof(Booking))]
        public IHttpActionResult UserBooking(UserBooking userBooking)
        {
            if(! ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var ticket = db.Tickets.Find(userBooking.TicketId);
            if(ticket == null)
            {
                return BadRequest("Ticket not found");
            }
            Random rdm = new Random();
            var booking = new Booking()
            {
                Status = BookingStatus.Pending,
                BookingCode = $"{ticket.Flight.FlightCode}_BOOKING{rdm.Next()}",
                ContactName = userBooking.ContactName,
                ContactPhone = userBooking.ContactPhone,
                ContactEmail = userBooking.ContactEmail,
                ContactAddress = userBooking.ContactAddress,
                Note = userBooking.Note,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
            };
            if(userBooking.UserId != null)
            {
                booking.UserId = userBooking.UserId;
            }
            db.Bookings.Add(booking);
            foreach(var bookingTicket in userBooking.BookingTickets)
            {
                var bookTicket = new BookingTicket()
                {
                    TicketId = userBooking.TicketId,
                    BookingId = booking.Id,
                    SeatFlightCode = bookingTicket.SeatFlightCode,
                    PassengerName = bookingTicket.PassengerName,
                    PassengerGender = bookingTicket.PassengerGender,
                    PassengerIdentityNumber = bookingTicket.PassengerIdentityNumber,
                    PassengerPhone = bookingTicket.PassengerPhone,
                    SeatFlightFee = bookingTicket.SeatFlightFee,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now
                };
                db.BookingTickets.Add(bookTicket);
            }
            try
            {
                db.SaveChanges();
            }
            catch (Exception e)
            {
                return BadRequest("Save to database failed");
            }
            return Ok(booking);

        }
    }
}