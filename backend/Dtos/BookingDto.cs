using backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace backend.Dtos
{
    public class BookingDto
    {
        public User User { get; set; }
        public BookingStatus Status { get; set; }
        public string BookingCode { get; set; }
        public string ContactName { get; set; }
        public string ContactPhone { get; set; }
        public string ContactEmail { get; set; }
        public string ContactAddress { get; set; }
        public string Note { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public ICollection<BookingTicket> BookingTickets {get; set;}
        public double TotalMoney { get; set; }
        public double TotalSeatFee { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
    }
}