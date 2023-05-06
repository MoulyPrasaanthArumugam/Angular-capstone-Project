using FC_Service.Models;
using Microsoft.EntityFrameworkCore;

namespace FC_Service.Data
{
    public class FCDbContext : DbContext
    {
        public FCDbContext(DbContextOptions options) : base(options) 
        { }
        public DbSet<Menu>Menu_Master { get; set; }
        public DbSet<User>USER_MASTER { get; set; }
    }
}
