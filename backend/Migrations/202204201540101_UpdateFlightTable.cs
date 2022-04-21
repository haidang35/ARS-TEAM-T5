namespace backend.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdateFlightTable : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Flights", "Capacity", c => c.Int(nullable: false));
            AlterColumn("dbo.Flights", "BusinessSeats", c => c.Int(nullable: false));
            AlterColumn("dbo.Flights", "DeluxeSeats", c => c.Int(nullable: false));
            AlterColumn("dbo.Flights", "EconomySeats", c => c.Int(nullable: false));
            AlterColumn("dbo.Flights", "ExitSeats", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Flights", "ExitSeats", c => c.String(nullable: false));
            AlterColumn("dbo.Flights", "EconomySeats", c => c.String(nullable: false));
            AlterColumn("dbo.Flights", "DeluxeSeats", c => c.String(nullable: false));
            AlterColumn("dbo.Flights", "BusinessSeats", c => c.String(nullable: false));
            AlterColumn("dbo.Flights", "Capacity", c => c.String());
        }
    }
}
