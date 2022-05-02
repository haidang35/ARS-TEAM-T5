using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace backend.Dtos
{
    public class PassengerMail
    {
        public string passengerType { get; set; }
        public int quantity { get; set; }
        public string currency { get; set; }
        public string total { get; set; }
    }
}