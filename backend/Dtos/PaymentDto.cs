using backend.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace backend.Dtos
{
    public class PaymentDto
    {
        [Required]
        public PaymentMethod PaymentMethod { get; set; }
        [Required]
        public int BookingId { get; set; }
        [Required]
        public double Amount { get; set; }
    }
}