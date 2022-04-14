using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace backend.Models
{
    
    public class Notification
    {
        [Key]
        public string Title { get; set; }
        [Required]
        public string Message { get; set; }
        [Required]
        public int SenderId { get; set; }
        public virtual User User { get; set; }
        [Required]
        public int ReceiverId { get; set; }
        public virtual User UserName { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}