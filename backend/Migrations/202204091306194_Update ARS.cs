namespace backend.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdateARS : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Airlines",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                        Code = c.String(nullable: false),
                        Country = c.String(nullable: false),
                        Logo = c.String(nullable: false),
                        CreatedAt = c.DateTime(nullable: false),
                        UpdatedAt = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Bookings",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.Int(nullable: false),
                        Status = c.Int(nullable: false),
                        BookingCode = c.String(nullable: false),
                        TripType = c.String(nullable: false),
                        ContactName = c.String(nullable: false),
                        ContactPhone = c.String(nullable: false),
                        ContactEmail = c.String(nullable: false),
                        ContactAddress = c.String(nullable: false),
                        Note = c.String(nullable: false),
                        CreatedAt = c.DateTime(nullable: false),
                        UpdatedAt = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.BookingTickets",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        TicketId = c.Int(nullable: false),
                        BookingId = c.Int(nullable: false),
                        SeatFlightCode = c.String(nullable: false),
                        PassengerName = c.String(nullable: false),
                        SeatFlightFree = c.String(nullable: false),
                        PassengerPhone = c.String(nullable: false),
                        PassengerIdentityNumber = c.String(nullable: false),
                        CreatedAt = c.DateTime(nullable: false),
                        UpdatedAt = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Bookings", t => t.BookingId, cascadeDelete: true)
                .ForeignKey("dbo.Tickets", t => t.TicketId, cascadeDelete: true)
                .Index(t => t.TicketId)
                .Index(t => t.BookingId);
            
            CreateTable(
                "dbo.Tickets",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FlightId = c.Int(nullable: false),
                        TicketType = c.Int(nullable: false),
                        ArrivalTime = c.DateTime(nullable: false),
                        AvailableClass = c.Int(nullable: false),
                        CarbinBag = c.Int(nullable: false),
                        CheckinBag = c.Int(nullable: false),
                        Status = c.Int(nullable: false),
                        Price = c.Double(nullable: false),
                        Tax = c.Double(nullable: false),
                        BusinessSeatFee = c.Double(nullable: false),
                        EconomySeatFee = c.Double(nullable: false),
                        DeluxeSeatFee = c.Double(nullable: false),
                        ExitSeatFee = c.Double(nullable: false),
                        CreatedAt = c.DateTime(nullable: false),
                        UpdatedAt = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Flights",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FlightCode = c.String(nullable: false),
                        DepartureTime = c.DateTime(nullable: false),
                        ArrivalTime = c.DateTime(nullable: false),
                        DepartureId = c.Int(nullable: false),
                        DestinationId = c.Int(nullable: false),
                        Capacity = c.String(),
                        BusinessSeats = c.String(nullable: false),
                        DeluxeSeats = c.String(nullable: false),
                        EconomySeats = c.String(nullable: false),
                        ExitSeats = c.String(nullable: false),
                        Aircraft = c.String(nullable: false),
                        SeatsReseved = c.Int(nullable: false),
                        SeatsAvaliable = c.Int(nullable: false),
                        AirlineId = c.Int(nullable: false),
                        TicketId = c.Int(nullable: false),
                        Status = c.Int(nullable: false),
                        CreatedAt = c.DateTime(nullable: false),
                        UpdatedAt = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Locations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        City = c.String(nullable: false),
                        Province = c.String(nullable: false),
                        CityCode = c.String(nullable: false),
                        AirPortName = c.String(nullable: false),
                        Country = c.String(nullable: false),
                        CreatedAt = c.DateTime(nullable: false),
                        UpdatedAt = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Notifications",
                c => new
                    {
                        Type = c.Int(nullable: false, identity: true),
                        Message = c.String(nullable: false),
                        SenderId = c.Int(nullable: false),
                        ReceiverId = c.Int(nullable: false),
                        CreatedAt = c.DateTime(nullable: false),
                        UpdatedAt = c.DateTime(nullable: false),
                        User_Id = c.Int(),
                        UserName_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Type)
                .ForeignKey("dbo.Users", t => t.User_Id)
                .ForeignKey("dbo.Users", t => t.UserName_Id)
                .Index(t => t.User_Id)
                .Index(t => t.UserName_Id);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                        Vocative = c.String(nullable: false),
                        PhoneNumber = c.String(nullable: false),
                        Email = c.String(nullable: false),
                        Password = c.String(nullable: false),
                        Address = c.String(nullable: false),
                        CreatedAt = c.DateTime(nullable: false),
                        UpdatedAt = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Payments",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        PaymentMethod = c.String(nullable: false),
                        BookingId = c.Int(nullable: false),
                        Amount = c.Double(nullable: false),
                        Status = c.Int(nullable: false),
                        CreatedAt = c.DateTime(nullable: false),
                        UpdatedAt = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Bookings", t => t.BookingId, cascadeDelete: true)
                .Index(t => t.BookingId);
            
            CreateTable(
                "dbo.Roles",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        RoleName = c.Int(nullable: false),
                        Description = c.String(nullable: false),
                        CreatedAt = c.DateTime(nullable: false),
                        UpdatedAt = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.UserRoles",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        RoleId = c.Int(nullable: false),
                        UserId = c.Int(nullable: false),
                        CreatedAt = c.DateTime(nullable: false),
                        UpdateAt = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Roles", t => t.RoleId, cascadeDelete: true)
                .ForeignKey("dbo.Users", t => t.UserId, cascadeDelete: true)
                .Index(t => t.RoleId)
                .Index(t => t.UserId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.UserRoles", "UserId", "dbo.Users");
            DropForeignKey("dbo.UserRoles", "RoleId", "dbo.Roles");
            DropForeignKey("dbo.Payments", "BookingId", "dbo.Bookings");
            DropForeignKey("dbo.Notifications", "UserName_Id", "dbo.Users");
            DropForeignKey("dbo.Notifications", "User_Id", "dbo.Users");
            DropForeignKey("dbo.BookingTickets", "TicketId", "dbo.Tickets");
            DropForeignKey("dbo.BookingTickets", "BookingId", "dbo.Bookings");
            DropIndex("dbo.UserRoles", new[] { "UserId" });
            DropIndex("dbo.UserRoles", new[] { "RoleId" });
            DropIndex("dbo.Payments", new[] { "BookingId" });
            DropIndex("dbo.Notifications", new[] { "UserName_Id" });
            DropIndex("dbo.Notifications", new[] { "User_Id" });
            DropIndex("dbo.BookingTickets", new[] { "BookingId" });
            DropIndex("dbo.BookingTickets", new[] { "TicketId" });
            DropTable("dbo.UserRoles");
            DropTable("dbo.Roles");
            DropTable("dbo.Payments");
            DropTable("dbo.Users");
            DropTable("dbo.Notifications");
            DropTable("dbo.Locations");
            DropTable("dbo.Flights");
            DropTable("dbo.Tickets");
            DropTable("dbo.BookingTickets");
            DropTable("dbo.Bookings");
            DropTable("dbo.Airlines");
        }
    }
}
