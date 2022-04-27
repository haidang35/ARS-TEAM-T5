namespace backend.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdateUserTable : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Users", "Birthday", c => c.DateTime(nullable: false));
            AddColumn("dbo.Users", "Status", c => c.Int(nullable: false));
            AddColumn("dbo.Roles", "RoleCode", c => c.Int(nullable: false));
            AlterColumn("dbo.Roles", "RoleName", c => c.String(nullable: false));
            DropColumn("dbo.Roles", "Description");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Roles", "Description", c => c.String(nullable: false));
            AlterColumn("dbo.Roles", "RoleName", c => c.Int(nullable: false));
            DropColumn("dbo.Roles", "RoleCode");
            DropColumn("dbo.Users", "Status");
            DropColumn("dbo.Users", "Birthday");
        }
    }
}
