using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace backend.Models
{
    public class City
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string CityCode { get; set; }
        [Required]
        public int ProvinceId { get; set; }
        public virtual Province Province { get; set; }
    }
}