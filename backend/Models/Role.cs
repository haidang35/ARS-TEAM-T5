using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace backend.Models
{
    public enum RoleCode
    {
        SuperAdmin = 1,
        Admin = 2,
        User = 3,
        Editor = 4,
    }
    public class Role
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public RoleCode RoleCode { get; set; }
        [Required]
        public string RoleName { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }


    }
}