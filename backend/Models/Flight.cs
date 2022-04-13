using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace backend.Models
{
    public enum FlightStatus
    {
        Active = 0,
        Deactive = 1
    }
    public class Flight
    {
        [Key]
        public int Id { get; set; }
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
        public string Capacity { get; set; }
        [Required]
        public string BusinessSeats { get; set; }
        [Required]
        public string DeluxeSeats { get; set; }
        [Required]
        public string EconomySeats { get; set; }
        [Required]
        public string ExitSeats { get; set; }
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
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}