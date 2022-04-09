using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace backend.Models
{
    public class Notification
    {
        public int Type { get; set; }
        public string Message { get; set; }
        public int SenderId { get; set; }
        public virtual User User { get; set; }
        public int ReceiverId { get; set; }
        public virtual User UserName { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}