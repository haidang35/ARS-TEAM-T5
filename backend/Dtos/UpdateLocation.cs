using backend.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace backend.Dtos
{
    public class UpdateLocation
    {
        [Required]
        public int CityId { get; set; }
        public virtual City City { get; set; }
        [Required]
        public string AirPortName { get; set; }
        [Required]
        public string AirPortCode { get; set; }
    }
}