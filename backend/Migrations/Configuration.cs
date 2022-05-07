namespace backend.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<backend.Data.MyDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(backend.Data.MyDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method
            //  to avoid creating duplicate seed data.

           /* context.Provinces.Add(new Models.Province() {
                Id = 1,
                Name  = "Hà Nội",
                Country = "Việt Nam"
            });
            context.Cities.Add(new Models.City()
            {
                Id = 1,
                Name = "Ha Noi",
                CityCode = "HN",
                ProvinceId = 1,
            });
            context.Locations.Add(new Models.Location()
            {
                Id = 1,
                CityId =1,
                AirPortName = "Noi Bai",
                AirPortCode = "HAN",
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
            });
            context.Airlines.Add(new Models.Airline()
            {
                Id = 1,
                Name = "Vietnam Airline",
                Code = "VN",
                Country = "VietNam",
                Logo = "vietnam airline.png ",
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
            });
            context.Airlines.Add(new Models.Airline()
            {
                Id = 1,
                Name = "Vietnam Airline",
                Code = "VN",
                Country = "VietNam",
                Logo = "vietnam airline.png ",
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
            });
            context.Flights.Add(new Models.Flight()
            {
                Id = 1,
                FlightCode = "VN11234",
                DepartureTime = DateTime.Now,
                ArrivalTime = DateTime.Now,
                DepartureId = 1,
                DestinationId = 1,
                Capacity = 180,
                BusinessSeats = 10,
                DeluxeSeats = 10,
                EconomySeats = 150,
                ExitSeats = 10,
                Aircraft = "Viet Nam Airline",
                SeatsReseved = 0,
                SeatsAvaliable = 180,
                AirlineId = 1,
                Status = Models.FlightStatus.Active,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
            });
            context.Tickets.Add(new Models.Ticket()
            {
                Id = 1,
                FlightId =1,
                TicketType = "S",
                AvailableClass = "Business",
                CarbinBag = 7,
                CheckinBag = 20,
                Status = Models.TicketStatus.active,
                Price = 1690000,
                Tax = 790000,
                BusinessSeatFee = 50000,
                DeluxeSeatFee = 40000,
                EconomySeatFee = 20000,
                ExitSeatFee = 35000,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,

            });
            context.Bookings.Add(new Models.Booking()
            {
                Id = 1,
                UserId =1,
                Status = Models.BookingStatus.Cancelled,
                BookingCode = "VN112423546",
                ContactName = "Nguyen Van A",
                ContactPhone = "01234456678",
                ContactAddress = "Ha Noi",
                ContactEmail = "nguyenvana@gmail.com",
                Note = "",
                PaymentMethod = Models.PaymentMethod.BankingTransfer,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,

            });
            context.BookingTickets.Add(new Models.BookingTicket()
            {
                Id = 1,
                TicketId =1,
                BookingId =1,
                SeatFlightCode = "VN2209",
                PassengerName = "Nguyen Van A",
                PassengerBirthday = DateTime.Now,
                PassengerPhone = "0123435454",
                PassengerGender = Models.PassengerGender.Female,
                PassengerIdentityNumber = "043322423432",
                SeatFlightFee = 709000,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,

            });
            context.Users.Add(new Models.User()
            {
                Id = 1,
                Name = "Nguyen Van A",
                Birthday = DateTime.Now,
                Vocative = "Anh",
                PhoneNumber = "01234567",
                Email = "nguyenvana@gmail.com",
                Password = "nguyenvana",
                Address = "Ha Noi",
                Status = Models.UserStatus.Active,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,

            });
            context.Roles.Add(new Models.Role()
            {
                Id = 1,
                RoleCode = Models.RoleCode.Admin,
                RoleName = "Admin",
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,

            });
            context.UserRoles.Add(new Models.UserRole()
            {
                Id = 1,
                RoleId = 1,
                UserId =1,
                CreatedAt = DateTime.Now,
                UpdateAt = DateTime.Now,

            });
            context.Payments.Add(new Models.Payment()
            {
                Id = 1,
                PaymentMethod = Models.PaymentMethod.BankingTransfer,
                BookingId = 1,
                Amount = 1090000,
                Status = Models.Status.Active,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,

            });*/
        }
    }
}
