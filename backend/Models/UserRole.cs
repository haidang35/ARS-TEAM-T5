    using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace backend.Models
{
    public class UserRole
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int RoleId { get; set; }
        public virtual Role Role { get; set; }
        [Required]
        public int UserId { get; set; }
        public virtual User User { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdateAt { get; set; }
    }
}