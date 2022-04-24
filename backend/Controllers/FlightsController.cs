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
    public class FlightsController : ApiController
    {
        private MyDbContext db = new MyDbContext();

        // GET: api/Flights
        [Route("~/api/flights")]
        [HttpGet]
        [ResponseType(typeof(ICollection<Flight>))]
        public IHttpActionResult GetFlights()
        {
            return Ok(db.Flights.ToList());
        }

        // GET: api/Flights/5
        [Route("~/api/flights/{id:int}")]
        [HttpGet]
        [ResponseType(typeof(Flight))]
        public IHttpActionResult GetFlight(int id)
        {
            Flight flight = db.Flights.Find(id);
            if (flight == null)
            {
                return NotFound();
            }

            return Ok(flight);
        }

        // PUT: api/Flights/5
        [Route("~/api/flights/{id:int}")]
        [HttpPut]
        [ResponseType(typeof(Flight))]
        public IHttpActionResult PutFlight(int id, UpdateFlight updateFlight)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var flight = db.Flights.Find(id);
            if(flight == null){
                return BadRequest();
            }
            flight.FlightCode = updateFlight.FlightCode;
            flight.DepartureTime = updateFlight.DepartureTime;
            flight.ArrivalTime = updateFlight.ArrivalTime;
            flight.Capacity = updateFlight.Capacity;
            flight.BusinessSeats = updateFlight.BusinessSeats;
            flight.EconomySeats = updateFlight.EconomySeats;
            flight.DeluxeSeats = updateFlight.DeluxeSeats;
            flight.ExitSeats = updateFlight.ExitSeats;
            flight.Aircraft = updateFlight.Aircraft;
            flight.SeatsReseved = updateFlight.SeatsReseved;
            flight.SeatsAvaliable = updateFlight.SeatsAvaliable;
            flight.DepartureId = updateFlight.DepartureId;
            flight.DestinationId = updateFlight.DestinationId;
            flight.AirlineId = updateFlight.AirlineId;
            flight.Status = updateFlight.Status;
            flight.UpdatedAt = DateTime.Now;
            db.Entry(flight).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FlightExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(flight);
        }

        // POST: api/Flights
        [Route("~/api/flights")]
        [HttpPost]
        [ResponseType(typeof(Flight))]
        public IHttpActionResult PostFlight(Flight flight)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            flight.CreatedAt = DateTime.Now;
            flight.UpdatedAt = DateTime.Now;
            db.Flights.Add(flight);
            db.SaveChanges();

            return Ok(flight);
        }

        // DELETE: api/Flights/5
        [Route("~/api/flights/{id:int}")]
        [HttpDelete]
        [ResponseType(typeof(Flight))]
        public IHttpActionResult DeleteFlight(int id)
        {
            Flight flight = db.Flights.Find(id);
            if (flight == null)
            {
                return NotFound();
            }

            db.Flights.Remove(flight);
            db.SaveChanges();

            return Ok(flight);
        }

        [Route("~/api/flights/{id:int}/reserved")]
        [HttpGet]
        [ResponseType(typeof(ICollection<BookingTicket>))]
        public IHttpActionResult GetReservedBookingTicket(int id)
        {
            var flight = db.Flights.Find(id);
            if(flight == null)
            {
                return BadRequest("Flight not found");
            }
            var reservedBookingTicket = new List<BookingTicket>();
            var tickets = db.Tickets.Where(t => t.FlightId == flight.Id).ToList();
            foreach(var ticket in tickets)
            {
                var bookingTickets = db.BookingTickets.Where(bt => bt.TicketId == ticket.Id).ToList();
                foreach(var bookingTicket in bookingTickets)
                {
                    reservedBookingTicket.Add(bookingTicket);
                }
            }
            return Ok(reservedBookingTicket);
        }


        private bool FlightExists(int id)
        {
            return db.Flights.Count(e => e.Id == id) > 0;
        }
    }
}