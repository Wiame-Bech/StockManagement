using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StockManagement.Migrations
{
    /// <inheritdoc />
    public partial class Devices : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Devices_Reservations_ReservationID",
                table: "Devices");

            migrationBuilder.AddForeignKey(
                name: "FK_Devices_Reservations_ReservationID",
                table: "Devices",
                column: "ReservationID",
                principalTable: "Reservations",
                principalColumn: "ReservationID",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Devices_Reservations_ReservationID",
                table: "Devices");

            migrationBuilder.AddForeignKey(
                name: "FK_Devices_Reservations_ReservationID",
                table: "Devices",
                column: "ReservationID",
                principalTable: "Reservations",
                principalColumn: "ReservationID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
