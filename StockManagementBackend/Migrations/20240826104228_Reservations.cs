using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StockManagement.Migrations
{
    /// <inheritdoc />
    public partial class Reservations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_Devices_DeviceID",
                table: "Reservations");

            migrationBuilder.DropIndex(
                name: "IX_Reservations_DeviceID",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "DeviceID",
                table: "Reservations");

            migrationBuilder.CreateIndex(
                name: "IX_Devices_ReservationID",
                table: "Devices",
                column: "ReservationID");

            migrationBuilder.AddForeignKey(
                name: "FK_Devices_Reservations_ReservationID",
                table: "Devices",
                column: "ReservationID",
                principalTable: "Reservations",
                principalColumn: "ReservationID",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Devices_Reservations_ReservationID",
                table: "Devices");

            migrationBuilder.DropIndex(
                name: "IX_Devices_ReservationID",
                table: "Devices");

            migrationBuilder.AddColumn<Guid>(
                name: "DeviceID",
                table: "Reservations",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_DeviceID",
                table: "Reservations",
                column: "DeviceID",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_Devices_DeviceID",
                table: "Reservations",
                column: "DeviceID",
                principalTable: "Devices",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
