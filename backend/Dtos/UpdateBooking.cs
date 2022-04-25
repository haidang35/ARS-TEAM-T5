using backend.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace backend.Dtos
{
    public class UpdateBooking
    {
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
    }
}