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
using MessageBird;

namespace backend.Controllers
{
    [Authorize(Roles = "Admin, SuperAdmin")]
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
                PaymentMethod = userBooking.PaymentMethod,
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
                    PassengerBirthday = bookingTicket.PassengerBirthday,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now
                };
                db.BookingTickets.Add(bookTicket);
            }
            try
            {
                db.SaveChanges();
                const string YourAccessKey = "gSNODCZFBinoK6wH17XXAvC0Y"; // your access key here
                Client client = Client.CreateDefault(YourAccessKey);
                const long Msisdn = 357446532; // your phone number here

                MessageBird.Objects.Message message =
                client.SendMessage("Dang Jinner", "Test", new[] { Msisdn });
            }
            catch (Exception e)
            {
                return BadRequest("Save to database failed");
            }
            return Ok(booking);

        }

        [Route("~/api/bookings/{code}")]
        [HttpGet]
        [ResponseType(typeof(BookingDto))]
        public IHttpActionResult getBookingDetails(string code)
        {
            var booking = db.Bookings.Where(b => b.BookingCode == code).FirstOrDefault();
            if(booking == null)
            {
                return BadRequest("Booking not found");
            }
            var bookingTickets = db.BookingTickets.Where(bt => bt.BookingId == booking.Id).ToList();
            double totalMoney = 0;
            double totalSeatFee = 0;
            foreach(var bookingTicket in bookingTickets)
            {
                totalSeatFee += bookingTicket.SeatFlightFee;
                totalMoney += bookingTicket.Ticket.Price + bookingTicket.Ticket.Tax + bookingTicket.SeatFlightFee;
            }
            var bookingDto = new BookingDto()
            {
                BookingCode = booking.BookingCode,
                ContactName = booking.ContactName,
                ContactPhone = booking.ContactPhone,
                ContactEmail = booking.ContactEmail,
                ContactAddress = booking.ContactAddress,
                Note = booking.Note,
                CreatedAt = booking.CreatedAt,
                UpdatedAt = booking.UpdatedAt,
                BookingTickets = bookingTickets,
                User = booking.User,
                TotalMoney = totalMoney,
                TotalSeatFee = totalSeatFee,
                Status = booking.Status,
                PaymentMethod = booking.PaymentMethod,
            };
            return Ok(bookingDto);
        }
    }
}