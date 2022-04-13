using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace backend.Models
{
    public enum TicketStatus
    {
        active = 0,
        deactive = 1
    }
    public class Ticket
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int FlightId { get; set; }
        public virtual  Flight Flight { get; set; }
        [Required]
        public TicketStatus TicketType { get; set; }
        public DateTime ArrivalTime { get; set; }
        [Required]
        public int AvailableClass { get; set; }
        [Required]
        public int CarbinBag { get; set; }
        [Required]
        public int CheckinBag { get; set; }
        [Required]
        public TicketStatus Status { get; set; }
        [Required]
        public double Price { get; set; }
        [Required]
        public double Tax { get; set; }
        [Required]
        public double BusinessSeatFee { get; set; }
        [Required]
        public double EconomySeatFee { get; set; }
        [Required]
        public double DeluxeSeatFee { get; set; }
        [Required]
        public double ExitSeatFee { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}