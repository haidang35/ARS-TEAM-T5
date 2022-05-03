using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Mail;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using backend.Data;
using backend.Dtos;
using backend.Models;
using MessageBird;
using Newtonsoft.Json;
using RestSharp;
using RestSharp.Authenticators;
using Twilio;
using Twilio.Rest.Api.V2010.Account;

namespace backend.Controllers
{
    [Authorize(Roles = "Admin, SuperAdmin")]
    public class BookingsController : ApiController
    {
        private MyDbContext db = new MyDbContext();
        private string accountSid = ConfigurationManager.AppSettings["twilio_user_id"];
        private string authToken = ConfigurationManager.AppSettings["twilio_auth_token"];

        // GET: api/Bookings
        [Route("~/api/bookings")]
        [HttpGet]
        [ResponseType(typeof(ICollection<BookingDto>))]
        public IHttpActionResult GetBookings()
        {
            var bookingList = db.Bookings.ToList();
            var bookingListDto = new List<BookingDto>();
            foreach (var booking in bookingList)
            {
                var bookingTicketList = db.BookingTickets.Where(bt => bt.BookingId == booking.Id).ToList();
                var bookingDto = new BookingDto()
                {
                    User = booking.User,
                    Status = booking.Status,
                    ContactName = booking.ContactName,
                    ContactPhone = booking.ContactPhone,
                    ContactEmail = booking.ContactEmail,
                    ContactAddress = booking.ContactAddress,
                    Note = booking.Note,
                    CreatedAt = booking.CreatedAt,
                    UpdatedAt = booking.UpdatedAt,
                    BookingTickets = bookingTicketList,
                    PaymentMethod = booking.PaymentMethod,
                    BookingCode = booking.BookingCode,
                    Id = booking.Id,
                };
                bookingListDto.Add(bookingDto);
            }
            return Ok(bookingListDto);
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
            if (booking == null)
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

        [AllowAnonymous]
        [Route("~/api/public/booking")]
        [HttpPost]
        [ResponseType(typeof(Booking))]
        public async Task<IHttpActionResult> UserBooking(UserBooking userBooking)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var ticket = db.Tickets.Find(userBooking.TicketId);
            if (ticket == null)
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

            if (userBooking.UserId != null)
            {
                booking.UserId = userBooking.UserId;
            }

            db.Bookings.Add(booking);
            var passengerMailList = new List<PassengerMail>();
            double totalMoney = 0;
            foreach (var bookingTicket in userBooking.BookingTickets)
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

                bool isExistPsg = false;
                foreach(var psgMail in passengerMailList)
                {
                    if(psgMail.passengerType == bookingTicket.PassengerType)
                    {
                        isExistPsg = true;
                        psgMail.quantity += 1;
                        psgMail.total = ((ticket.Price + ticket.Tax)*psgMail.quantity).ToString("C", CultureInfo.GetCultureInfo("vi-VN"));
                    }
                }
                if(! isExistPsg)
                {
                    passengerMailList.Add(new PassengerMail()
                    {
                        currency = "",
                        passengerType = bookingTicket.PassengerType,
                        total = (ticket.Price + ticket.Tax).ToString("C", CultureInfo.GetCultureInfo("vi-VN")),
                        quantity = 1,
                    });
                }
                totalMoney += ticket.Price + ticket.Tax;
            }



            try
            {
                db.SaveChanges();

            }
            catch (Exception e)
            {
                return BadRequest("Save to database failed");
            }

            try
            {
               

                TwilioClient.Init(accountSid, authToken);

                var message = MessageResource.Create(
                    body: $"Flight T5: Your booking {booking.BookingCode} has been booked successfully !",
                    from: new Twilio.Types.PhoneNumber(ConfigurationManager.AppSettings["twilio_phone"]),
                    to: new Twilio.Types.PhoneNumber(userBooking.ContactPhone)
                );
                string mailSubject = "Congratulations on your successful flight booking at Flight T5";
                string body = $"Congratulations you have successfully booked your ticket. " +
                    $"Your booking code is {booking.BookingCode}, you can access the website link to look up flight and ticket information.";
                /*SendMail(userBooking.ContactEmail, mailSubject, body);*/

                var bookingMail = new BookingMail()
                {
                    bookingNo = booking.BookingCode,
                    bookingDate = booking.CreatedAt.ToString("dddd, dd MMMM yyyy"),
                    bookingLink = "",
                    total = totalMoney.ToString("C", CultureInfo.GetCultureInfo("vi-VN")),
                    message = body,
                    passengers = passengerMailList
                };

                await SendMailWithApi(userBooking.ContactName, userBooking.ContactEmail, mailSubject, JsonConvert.SerializeObject(bookingMail));
            }
            catch (Exception e)
            {

            }

            return Ok(booking);

        }

        [AllowAnonymous]
        [Route("~/api/bookings/{code}")]
        [HttpGet]
        [ResponseType(typeof(BookingDto))]
        public IHttpActionResult getBookingDetails(string code)
        {
            var booking = db.Bookings.Where(b => b.BookingCode == code).FirstOrDefault();
            if (booking == null)
            {
                return BadRequest("Booking not found");
            }
            var bookingTickets = db.BookingTickets.Where(bt => bt.BookingId == booking.Id).ToList();
            double totalMoney = 0;
            double totalSeatFee = 0;
            foreach (var bookingTicket in bookingTickets)
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

        public void SendMail(string email, string subject, string body)
        {
            var fromEmail = new MailAddress(ConfigurationManager.AppSettings["smtp_username"], "Flight T5");
            var passFromEmail = ConfigurationManager.AppSettings["smtp_password"];
            var toEmail = new MailAddress(email);
            var smtp = new SmtpClient
            {
                Host = ConfigurationManager.AppSettings["smtp_host"],
                Port = 587,
                EnableSsl = true,
                DeliveryFormat = (SmtpDeliveryFormat)SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(fromEmail.Address, passFromEmail),
            };
            using (var message = new MailMessage(fromEmail, toEmail)
            {
                Subject = subject,
                Body = body,
                IsBodyHtml = true,
            })
                smtp.Send(message);
        }

        public static async Task<RestResponse> SendMailWithApi(string receiver, string receiveMail, string subject, string bodyJson)
        {
            RestClient client = new RestClient("https://api.mailgun.net/v3");
            client.Authenticator = new HttpBasicAuthenticator("api", ConfigurationManager.AppSettings["mailgun_api"]);
            RestRequest request = new RestRequest();
            request.AddParameter("domain", "neverdev.com", ParameterType.UrlSegment);
            request.Resource = "{domain}/messages";
            request.AddParameter("from", "Flight T5 <postmaster@neverdev.com>");
            request.AddParameter("to", $"{receiver} <{receiveMail}>");
            request.AddParameter("subject", subject);
            request.AddParameter("template", "flight-t5-booking");
            request.AddParameter("h:X-Mailgun-Variables", bodyJson);
            var response = await client.PostAsync(request);
            return response;
        }
    }
}