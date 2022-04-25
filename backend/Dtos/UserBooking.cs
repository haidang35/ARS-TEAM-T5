using backend.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace backend.Dtos
{
    public class UserBooking
    {
        public int? UserId { get; set; }
        [Required]
        public int TicketId { get; set; }
        [Required]
        public string ContactName { get; set; }
        [Required]
        [DataType(DataType.PhoneNumber)]
        public string ContactPhone { get; set; }
        [Required]
        [DataType(DataType.EmailAddress)]
        public string ContactEmail { get; set; }
        public string ContactAddress { get; set; }
        public string Note { get; set; }
        [Required]
        public PaymentMethod PaymentMethod { get; set; }
        [Required]
        public ICollection<BookingTicketDto> BookingTickets { get; set; }

    }
}