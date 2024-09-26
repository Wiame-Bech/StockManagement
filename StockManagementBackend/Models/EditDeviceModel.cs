namespace StockManagement.Models
{
    public class EditDeviceModel
    {
        public Guid ID { get; set; }

        public required string Name { get; set; }

        public required int NumeroSerie { get; set; }
    }
}
