using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace backend.Dtos
{
    public class UpdateAirline
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Code { get; set; }
        [Required]
        public string Country { get; set; }
        [Required]
        public string Logo { get; set; }
    }
}