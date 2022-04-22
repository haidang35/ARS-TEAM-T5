using backend.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace backend.Dtos
{
    public class UpdateFlight
    {
        [Required]
        public string FlightCode { get; set; }
        [Required]
        public DateTime DepartureTime { get; set; }
        [Required]
        public DateTime ArrivalTime { get; set; }
        [Required]
        public int DepartureId { get; set; }
        [ForeignKey("DepartureId")]
        public virtual Location Departure { get; set; }
        [Required]
        public int DestinationId { get; set; }
        [ForeignKey("DestinationId")]
        public virtual Location Destination { get; set; }
        public int Capacity { get; set; }
        [Required]
        public int BusinessSeats { get; set; }
        [Required]
        public int DeluxeSeats { get; set; }
        [Required]
        public int EconomySeats { get; set; }
        [Required]
        public int ExitSeats { get; set; }
        [Required]
        public string Aircraft { get; set; }
        [Required]
        public int SeatsReseved { get; set; }
        [Required]
        public int SeatsAvaliable { get; set; }
        [Required]
        public int AirlineId { get; set; }
        public virtual Airline Airline { get; set; }
        [Required]
        public FlightStatus Status { get; set; }
    }
}