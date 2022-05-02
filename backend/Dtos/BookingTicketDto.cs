using backend.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace backend.Dtos
{
    public class BookingTicketDto
    {
        [Required]
        public string SeatFlightCode { get; set; }
        [Required]
        public double SeatFlightFee { get; set; }
        [Required]
        public string PassengerName { get; set; }
        [Required]
        public DateTime PassengerBirthday { get; set; }
        [Required]
        public PassengerGender PassengerGender { get; set; }
        public string PassengerPhone { get; set; }
        [Required]
        public string PassengerIdentityNumber { get; set; }
        [Required]
        public string PassengerType { get; set; }
    }
}