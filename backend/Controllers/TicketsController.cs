using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Data.Entity.Infrastructure;
using System.Diagnostics;
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
    public class TicketsController : ApiController
    {
        private MyDbContext db = new MyDbContext();

        // GET: api/Tickets
        [Route("~/api/tickets")]
        [HttpGet]
        [ResponseType(typeof(ICollection<Ticket>))]
        public IHttpActionResult GetTickets()
        {
            return Ok(db.Tickets.ToList());
        }

        // GET: api/Tickets/5
        [Route("~/api/tickets/{id:int}")]
        [HttpGet]
        [ResponseType(typeof(Ticket))]
        public IHttpActionResult GetTicket(int id)
        {
            Ticket ticket = db.Tickets.Find(id);
            if (ticket == null)
            {
                return NotFound();
            }

            return Ok(ticket);
        }

        // PUT: api/Tickets/5
        [Route("~/api/tickets/{id:int}")]
        [HttpPut]
        [ResponseType(typeof(Ticket))]
        public IHttpActionResult PutTicket(int id, UpdateTicket updateTicket)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var ticket = db.Tickets.Find(id);
            if(ticket == null)
            {
                return BadRequest();
            }
            ticket.FlightId = updateTicket.FlightId;
            ticket.TicketType = updateTicket.TicketType;
            ticket.AvailableClass = updateTicket.AvailableClass;
            ticket.CarbinBag = updateTicket.CarbinBag;
            ticket.CheckinBag = updateTicket.CheckinBag;
            ticket.Status = updateTicket.Status;
            ticket.Price = updateTicket.Price;
            ticket.Tax = updateTicket.Tax;
            ticket.BusinessSeatFee = updateTicket.BusinessSeatFee;
            ticket.DeluxeSeatFee = ticket.DeluxeSeatFee;
            ticket.EconomySeatFee = ticket.EconomySeatFee;
            ticket.ExitSeatFee = ticket.ExitSeatFee;
            ticket.UpdatedAt = DateTime.Now;
            db.Entry(ticket).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TicketExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(ticket);
        }

        // POST: api/Tickets
        [Route("~/api/tickets")]
        [HttpPost]
        [ResponseType(typeof(Ticket))]
        public IHttpActionResult PostTicket(Ticket ticket)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            ticket.CreatedAt = DateTime.Now;
            ticket.UpdatedAt = DateTime.Now;
            db.Tickets.Add(ticket);
            db.SaveChanges();
            return Ok(ticket);
        }

        // DELETE: api/Tickets/5
        [Route("~/api/tickets/{id:int}")]
        [HttpDelete]
        [ResponseType(typeof(Ticket))]
        public IHttpActionResult DeleteTicket(int id)
        {
            Ticket ticket = db.Tickets.Find(id);
            if (ticket == null)
            {
                return NotFound();
            }

            db.Tickets.Remove(ticket);
            db.SaveChanges();

            return Ok(ticket);
        }

        private bool TicketExists(int id)
        {
            return db.Tickets.Count(e => e.Id == id) > 0;
        }
        

        [Route("~/api/tickets/search")]
        [HttpPost]
        [ResponseType(typeof(ICollection<Ticket>))]
        public IHttpActionResult SearchFlightTicket(SearchFlightTicket searchData)
        {
            if(! ModelState.IsValid)
            {
                return BadRequest();
            }
            var flights = new List<Flight>();
            if(searchData.DepartureDate == DateTime.MinValue)
            {
                flights = db.Flights.Where(f => f.DepartureId == searchData.DepartureId
                                       && f.DestinationId == searchData.DestinationId
                                       ).ToList();
            }else
            {
                flights = db.Flights.Where(f => f.DepartureId == searchData.DepartureId
                                       && f.DestinationId == searchData.DestinationId
                                       )
                    .Where(f => EntityFunctions.TruncateTime(f.DepartureTime) == EntityFunctions.TruncateTime(searchData.DepartureDate) )
                    .ToList();
            }
           
            var tickets = new List<Ticket>();
            foreach(var flight in flights)
            {
                var flightTickets = db.Tickets.Where(t => t.FlightId == flight.Id).ToList();
                foreach(var ticket in flightTickets)
                {
                    tickets.Add(ticket);
                }
            }
            return Ok(tickets);
        }

        public bool compareDate(DateTime date1, DateTime date2)
        {
            return date1.Date == date2.Date && date1.Month == date2.Month && date1.Year == date2.Year;
        }
    }
}