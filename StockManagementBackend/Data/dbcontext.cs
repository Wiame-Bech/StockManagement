using Microsoft.EntityFrameworkCore;
using StockManagement.Models;

namespace StockManagement.Data
{
    public class dbcontext : DbContext
    {

        public dbcontext(DbContextOptions<dbcontext> options)
        : base(options)
        { }

        public DbSet<Device> Devices { get; set; }
        public DbSet<Reservation> Reservations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Device>()
                .HasOne(d => d.Reservation)           
                .WithMany(r => r.Devices)             
                .HasForeignKey(d => d.ReservationID)
                .OnDelete(DeleteBehavior.SetNull);
        }

    }

}
