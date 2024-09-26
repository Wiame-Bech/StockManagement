namespace StockManagement.Models
{
    public class AddReservation
    {
        public required string PersonName { get; set; }

        public required int Qte { get; set; }

        public ICollection<Device> Devices { get; set; } = new List<Device>();
    }
}
