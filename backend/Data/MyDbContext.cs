using backend.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace backend.Data
{
    public class MyDbContext : DbContext
    {
        public MyDbContext() : base("ConnectionString")
        {

        }
        public DbSet<Airline> Airline { get; set; }
        public DbSet<Booking> Booking { get; set; }
        public DbSet<BookingTicket> BookingTicket { get; set; }
        public DbSet<Flight> Flight { get; set; }
        public DbSet<Location> Location { get; set; }
        public DbSet<Notification> Notification { get; set; }
        public DbSet<Payment> Payment { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<Ticket> Ticket { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<UserRole> UserRole { get; set; }
    }
}