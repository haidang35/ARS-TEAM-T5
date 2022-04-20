namespace backend.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdateCityTable : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Locations", "ProvinceId", "dbo.Provinces");
            DropIndex("dbo.Locations", new[] { "ProvinceId" });
            AddColumn("dbo.Cities", "ProvinceId", c => c.Int(nullable: false));
            CreateIndex("dbo.Cities", "ProvinceId");
            AddForeignKey("dbo.Cities", "ProvinceId", "dbo.Provinces", "Id", cascadeDelete: true);
            DropColumn("dbo.Locations", "ProvinceId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Locations", "ProvinceId", c => c.Int(nullable: false));
            DropForeignKey("dbo.Cities", "ProvinceId", "dbo.Provinces");
            DropIndex("dbo.Cities", new[] { "ProvinceId" });
            DropColumn("dbo.Cities", "ProvinceId");
            CreateIndex("dbo.Locations", "ProvinceId");
            AddForeignKey("dbo.Locations", "ProvinceId", "dbo.Provinces", "Id", cascadeDelete: true);
        }
    }
}
