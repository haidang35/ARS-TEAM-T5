using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace backend.Models
{
    public enum BookingStatus
    {
        active = 0,
        deactive = 1
    }
    public class Booking
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int UserId { get; set; }
        public virtual User User { get; set; }
        [Required]
        public BookingStatus Status { get; set; }
        [Required]
        public string BookingCode { get; set; }
        [Required]
        public string TripType { get; set; }
        [Required]
        public string ContactName { get; set; }
        [Required]
        public string ContactPhone { get; set; }
        [Required]
        public string ContactEmail { get; set; }
        [Required]
        public string ContactAddress { get; set; }
        [Required]
        public string Note { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}