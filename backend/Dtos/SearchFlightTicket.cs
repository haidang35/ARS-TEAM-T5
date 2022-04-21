using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace backend.Dtos
{
    public class SearchFlightTicket
    {
        public DateTime DepartureDate { get; set; }
        public DateTime ReturnDate { get; set; }
        [Required]
        public int DepartureId { get; set; }
        [Required]
        public int DestinationId { get; set; }
    }
}