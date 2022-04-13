namespace backend.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdateFlightTable : DbMigration
    {
        public override void Up()
        {
            DropPrimaryKey("dbo.Notifications");
            CreateTable(
                "dbo.Cities",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                        CityCode = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Provinces",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                        Country = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.Locations", "CityId", c => c.Int(nullable: false));
            AddColumn("dbo.Locations", "ProvinceId", c => c.Int(nullable: false));
            AddColumn("dbo.Locations", "AirPortCode", c => c.String(nullable: false));
            AddColumn("dbo.Notifications", "Title", c => c.String(nullable: false, maxLength: 128));
            AddPrimaryKey("dbo.Notifications", "Title");
            CreateIndex("dbo.Locations", "CityId");
            CreateIndex("dbo.Locations", "ProvinceId");
            AddForeignKey("dbo.Locations", "CityId", "dbo.Cities", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Locations", "ProvinceId", "dbo.Provinces", "Id", cascadeDelete: true);
            DropColumn("dbo.Locations", "City");
            DropColumn("dbo.Locations", "Province");
            DropColumn("dbo.Locations", "CityCode");
            DropColumn("dbo.Locations", "Country");
            DropColumn("dbo.Notifications", "Type");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Notifications", "Type", c => c.Int(nullable: false, identity: true));
            AddColumn("dbo.Locations", "Country", c => c.String(nullable: false));
            AddColumn("dbo.Locations", "CityCode", c => c.String(nullable: false));
            AddColumn("dbo.Locations", "Province", c => c.String(nullable: false));
            AddColumn("dbo.Locations", "City", c => c.String(nullable: false));
            DropForeignKey("dbo.Locations", "ProvinceId", "dbo.Provinces");
            DropForeignKey("dbo.Locations", "CityId", "dbo.Cities");
            DropIndex("dbo.Locations", new[] { "ProvinceId" });
            DropIndex("dbo.Locations", new[] { "CityId" });
            DropPrimaryKey("dbo.Notifications");
            DropColumn("dbo.Notifications", "Title");
            DropColumn("dbo.Locations", "AirPortCode");
            DropColumn("dbo.Locations", "ProvinceId");
            DropColumn("dbo.Locations", "CityId");
            DropTable("dbo.Provinces");
            DropTable("dbo.Cities");
            AddPrimaryKey("dbo.Notifications", "Type");
        }
    }
}
