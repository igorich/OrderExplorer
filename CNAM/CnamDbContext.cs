using CNAM.Models;
using Microsoft.EntityFrameworkCore;

namespace CNAM
{
    public class CnamDbContext : DbContext
    {
        public CnamDbContext(DbContextOptions<CnamDbContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetails> OrderDetails { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Product> Products { get; set; }
    }
}
