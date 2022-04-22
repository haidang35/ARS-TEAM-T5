using backend.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace backend.Dtos
{
    public class UpdateTicket
    {
        [Required]
        public int FlightId { get; set; }
        public virtual Flight Flight { get; set; }
        [Required]
        public string TicketType { get; set; }
        [Required]
        public string AvailableClass { get; set; }
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
    }
}