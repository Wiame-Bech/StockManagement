namespace StockManagement.Models
{
    public class Reservation
    {
        public Guid ReservationID { get; set; } 

        public required string PersonName { get; set; } 

        public required int Qte { get; set; }

        public ICollection<Device> Devices { get; set; } = new List<Device>();


    }
}
