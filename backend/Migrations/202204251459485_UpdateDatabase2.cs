namespace backend.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdateDatabase2 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Bookings", "PaymentMethod", c => c.Int(nullable: false));
            AddColumn("dbo.BookingTickets", "PassengerBirthday", c => c.DateTime(nullable: false));
            AlterColumn("dbo.BookingTickets", "PassengerPhone", c => c.String());
            AlterColumn("dbo.Payments", "PaymentMethod", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Payments", "PaymentMethod", c => c.String(nullable: false));
            AlterColumn("dbo.BookingTickets", "PassengerPhone", c => c.String(nullable: false));
            DropColumn("dbo.BookingTickets", "PassengerBirthday");
            DropColumn("dbo.Bookings", "PaymentMethod");
        }
    }
}
