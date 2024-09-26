namespace StockManagement.DTO
{
    public class ReservationDTO
    {
        public Guid ReservationID { get; set; }
        public required string PersonName { get; set; }
         public required int Qte { get; set; }

        public required List<DeviceDTO> Devices { get; set; } = new List<DeviceDTO>();

        public required List<Guid> DeviceIds { get; set; }
    }
}
