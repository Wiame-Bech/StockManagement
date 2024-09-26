using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StockManagement.Data;
using StockManagement.Migrations;
using StockManagement.Models;
using StockManagement.DTO;


namespace StockManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        public readonly dbcontext db;
        public ReservationController(dbcontext db)
        {
            this.db = db;
        }

        [HttpGet("viewreservation")]
        public async Task<IActionResult> ViewReservation()
        {
            var reservations = await db.Reservations.Include(r => r.Devices).Select(r => new{
                    r.ReservationID,
                    r.PersonName,
                    r.Qte,
                    Devices = r.Devices.Select(d => new{
                        d.ID,
                        d.Name,
                        d.NumeroSerie
                    }).ToList()
                })
                .ToListAsync();

            return Ok(reservations);
        }

        

        [HttpPost("add")]
        public async Task<IActionResult> CreateReservation([FromBody] ReservationDTO request)
        {
            if (ModelState.IsValid)
            {
                var devices = await db.Devices.Where(d => request.DeviceIds.Contains(d.ID)).ToListAsync();

                var reservation = new StockManagement.Models.Reservation
                {
                    PersonName = request.PersonName,
                    Qte = request.Qte,
                    Devices = devices
                };

                db.Reservations.Add(reservation);
                await db.SaveChangesAsync();

            }
            return Ok(new { message = "Reservation added successfully" });

        }

        [HttpPut("EditReservation/{reservationID}")]
        public async Task<IActionResult> EditReservation(Guid ReservationID, [FromBody] ReservationDTO model)
        {
            if (ModelState.IsValid)
            {
                var reservation = await db.Reservations
                    .Include(r => r.Devices)
                    .FirstOrDefaultAsync(r => r.ReservationID == ReservationID);

                if (reservation == null)
                {
                    return NotFound(new { message = "reservation not found" });
                }
                reservation.ReservationID = model.ReservationID;
                reservation.PersonName = model.PersonName;
                reservation.Qte = model.Qte;

                reservation.Devices.Clear();

                foreach (var DeviceDTO in model.Devices)
                {
                    var device = await db.Devices.FindAsync(DeviceDTO.ID);
                    if (device != null)
                    {
                        device.Name = DeviceDTO.Name;
                        device.NumeroSerie = DeviceDTO.NumeroSerie;
                        reservation.Devices.Add(device);
                    }
                }

                await db.SaveChangesAsync();

                return Ok(new { message = "Device edited successfully" , reservation });
            }

            return BadRequest("Invalid data.");
        }

        [HttpGet("getedit")]
        public async Task<IActionResult> getSingleId(Guid ReservationID)
        {
            if (ReservationID == Guid.Empty)
                return BadRequest("Invalid ID");

            var reservation = await db.Reservations
                .Include(r => r.Devices)
                .FirstOrDefaultAsync(r => r.ReservationID == ReservationID);

            if (reservation == null)
            {
                return NotFound("Reservation not found.");
            }

            var result = new
            {
                reservation.ReservationID,
                reservation.PersonName,
                reservation.Qte,
                Devices = reservation.Devices.Select(d => new
                {
                    d.ID,
                    d.Name,
                    d.NumeroSerie
                }).ToList()
            };
            return Ok(result);
        }



        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteReservation(Guid ReservationID)
        {
            var reservation = await db.Reservations.Include(r => r.Devices)
                                                .FirstOrDefaultAsync(r => r.ReservationID == ReservationID);

            if (reservation == null)
            {
                return NotFound("Reservation not found.");
            }

            db.Reservations.Remove(reservation);
            await db.SaveChangesAsync();

            return Ok(new { message = "Reservation deleted successfully" });
        }



    }
}
