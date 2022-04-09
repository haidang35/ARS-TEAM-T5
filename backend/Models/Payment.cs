using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace backend.Models
{
    public enum Status
    {
        Active = 1,
        Deactive = 0
    }
    public class Payment
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string PaymentMethod { get; set; }
        [Required]
        public int BookingId { get; set; }
        public virtual Booking Booking { get; set; }
        [Required]
        public double Amount { get; set; }
        [Required]
        public Status Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}