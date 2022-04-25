using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using backend.Dtos;

namespace backend.Dtos
{
    public class UpdateUser
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Vocative { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Address { get; set; }
    }
}