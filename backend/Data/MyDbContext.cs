using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace backend.Data
{
    public class MyDbContext : DbContext
    {
        public MyDbContext() : base("ConnectionString")
        {
             
    }
      public DbSet<Airline> MyProperty { get; set; }
    }
}