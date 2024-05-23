using Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace Database
{
    public class RedDBContext : DbContext
    {
        public RedDBContext(DbContextOptions<RedDBContext> options) : base(options) { }
        public virtual DbSet<Order> Order { get; set; }
        public virtual DbSet<User> User { get; set; }
    }
}
