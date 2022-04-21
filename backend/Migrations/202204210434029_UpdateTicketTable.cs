namespace backend.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdateTicketTable : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Tickets", "TicketType", c => c.String(nullable: false));
            AlterColumn("dbo.Tickets", "AvailableClass", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Tickets", "AvailableClass", c => c.Int(nullable: false));
            AlterColumn("dbo.Tickets", "TicketType", c => c.Int(nullable: false));
        }
    }
}
