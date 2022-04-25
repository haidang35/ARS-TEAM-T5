namespace backend.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdateUser : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.BookingTickets", "PassengerPhone", c => c.String(nullable: false));
            AlterColumn("dbo.Payments", "PaymentMethod", c => c.String(nullable: false));
            DropColumn("dbo.Bookings", "PaymentMethod");
            DropColumn("dbo.BookingTickets", "PassengerBirthday");
        }
        
        public override void Down()
        {
            AddColumn("dbo.BookingTickets", "PassengerBirthday", c => c.DateTime(nullable: false));
            AddColumn("dbo.Bookings", "PaymentMethod", c => c.Int(nullable: false));
            AlterColumn("dbo.Payments", "PaymentMethod", c => c.Int(nullable: false));
            AlterColumn("dbo.BookingTickets", "PassengerPhone", c => c.String());
        }
    }
}
