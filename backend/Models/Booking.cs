using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace backend.Models
{
    public enum BookingStatus
    {
        Active = 1,
        Cancelled = 0,
        Pending = 2,
    }

    public enum TripType
    {
        Oneway = 1,
        RoundTrip = 2
    }
    public class Booking
    {
        [Key]
        public int Id { get; set; }
        public int? UserId { get; set; }
        public virtual User User { get; set; }
        [Required]
        public BookingStatus Status { get; set; }
        [Required]
        public string BookingCode { get; set; }
        [Required]
        public string ContactName { get; set; }
        [Required]
        public string ContactPhone { get; set; }
        [Required]
        public string ContactEmail { get; set; }
        public string ContactAddress { get; set; }
        public string Note { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}