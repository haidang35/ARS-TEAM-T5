using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace backend.Dtos
{
    public class BookingMail
    {
        public string bookingNo { get; set; }
        public string bookingDate { get; set; }
        public string total { get; set; }
        public ICollection<PassengerMail> passengers { get; set; }
        public string message { get; set; }
        public string bookingLink { get; set; }
    }
}