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
        public IHttpActionResult PutTicket(int id, Ticket ticket)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != ticket.Id)
            {
                return BadRequest();
            }

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
        [HttpGet]
        [ResponseType(typeof(ICollection<Ticket>))]
        public IHttpActionResult SearchFlightTicket(SearchFlightTicket searchData)
        {
            if(! ModelState.IsValid)
            {
                return BadRequest();
            }
            var flights = new List<Flight>();
            if(searchData.DepartureDate == null)
            {
                flights = db.Flights.Where(f => f.DepartureId == searchData.DepartureId
                                       && f.DestinationId == searchData.DestinationId
                                       ).ToList();
            }else
            {
                flights = db.Flights.Where(f => f.DepartureId == searchData.DepartureId
                                       && f.DestinationId == searchData.DestinationId
                                       && DateTime.Compare(f.DepartureTime, searchData.DepartureDate) == 0
                                       ).ToList();
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
    }
}