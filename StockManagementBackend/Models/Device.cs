using System.ComponentModel.DataAnnotations.Schema;

namespace StockManagement.Models
{
    public class Device
    {
        
        public Guid ID { get; set; }

        public required string Name { get; set; }

        public required int NumeroSerie { get; set; }

        public Guid? ReservationID { get; set; }

        [ForeignKey("ReservationID")]
        public Reservation? Reservation { get; set; }

    }
}
