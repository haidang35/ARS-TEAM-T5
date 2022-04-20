using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace backend.Models
{
    public class Location
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int CityId { get; set; }
        public virtual  City City { get; set; }
        [Required]
        public string AirPortName { get; set; }
        [Required]
        public string AirPortCode { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}