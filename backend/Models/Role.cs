using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace backend.Models
{
    public enum RoleStatus
    {
        active = 0,
        deactive = 1
    }
    public class Role
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public RoleStatus RoleName { get; set; }
        [Required]
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

    }
}