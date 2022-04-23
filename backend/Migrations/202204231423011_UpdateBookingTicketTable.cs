namespace backend.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdateBookingTicketTable : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.BookingTickets", "PassengerGender", c => c.Int(nullable: false));
            AddColumn("dbo.BookingTickets", "SeatFlightFee", c => c.Double(nullable: false));
            AlterColumn("dbo.Bookings", "ContactAddress", c => c.String());
            AlterColumn("dbo.Bookings", "Note", c => c.String());
            DropColumn("dbo.Bookings", "TripType");
            DropColumn("dbo.BookingTickets", "SeatFlightFree");
        }
        
        public override void Down()
        {
            AddColumn("dbo.BookingTickets", "SeatFlightFree", c => c.String(nullable: false));
            AddColumn("dbo.Bookings", "TripType", c => c.String(nullable: false));
            AlterColumn("dbo.Bookings", "Note", c => c.String(nullable: false));
            AlterColumn("dbo.Bookings", "ContactAddress", c => c.String(nullable: false));
            DropColumn("dbo.BookingTickets", "SeatFlightFee");
            DropColumn("dbo.BookingTickets", "PassengerGender");
        }
    }
}
