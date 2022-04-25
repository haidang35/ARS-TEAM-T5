using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace backend.Models
{
    public enum PassengerGender{
        Male = 1,
        Female = 2,
        Other = 3
    }

    public class BookingTicket
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int TicketId { get; set; }
        public virtual Ticket Ticket { get; set; }
        [Required]
        public int BookingId { get; set; }
        public virtual Booking Booking { get; set; }
        [Required]
        public string SeatFlightCode { get; set; }
        [Required]
        public string PassengerName { get; set; }
        [Required]
        public DateTime PassengerBirthday { get; set; }
        [Required]
        public PassengerGender PassengerGender { get; set; }
        [Required]
        public double SeatFlightFee { get; set; }
        public string PassengerPhone { get; set; }
        [Required]
        public string PassengerIdentityNumber { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}