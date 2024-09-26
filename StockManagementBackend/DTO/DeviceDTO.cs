namespace StockManagement.DTO
{
    public class DeviceDTO
    {
        public Guid ID { get; set; }
        public required string Name { get; set; }
        public required int NumeroSerie { get; set; }
    }
}
