namespace backend.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdateTicket : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Tickets", "ArrivalTime");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Tickets", "ArrivalTime", c => c.DateTime(nullable: false));
        }
    }
}
