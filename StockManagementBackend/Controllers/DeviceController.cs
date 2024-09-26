using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StockManagement.Data;
using StockManagement.Models;

namespace StockManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeviceController : ControllerBase
    {

        public readonly dbcontext db;
        public DeviceController(dbcontext db)
        {
            this.db = db;
        }

        [HttpGet("view")]
        public async Task<IActionResult> ViewDevice()
        {
            var Devices = await db.Devices.ToListAsync();
            return Ok(Devices);
        }

        [HttpPost("add")]
        public async Task<IActionResult> Add(AddDevice model)
        {
          
            var Device = new Device
            {
                ID = Guid.NewGuid(),
                Name = model.Name,
                NumeroSerie = model.NumeroSerie,
            };

            await db.Devices.AddAsync(Device);
            await db.SaveChangesAsync();

            return Ok(new { message = "Device added successfully" });
        }

        [HttpGet("get-edit")]
        public async Task<IActionResult> EditDevice(Guid? ID)
        {
            if (ID == null) return BadRequest("Invalid ID");

            var device = await db.Devices.FindAsync(ID);
            if (device == null)
            {
                return NotFound();
            }
            return Ok(device);
        }


        [HttpPut("edit/{id}")]
        public async Task<IActionResult> Edit(EditDeviceModel model)
        {
            var device = await db.Devices.FindAsync(model.ID);
            if (device != null)
            {
                device.Name = model.Name;
                device.NumeroSerie = model.NumeroSerie;
                await db.SaveChangesAsync();
                return Ok(new { message = "Device edited successfully", device });
            }
            return NotFound(new { message = "Device not found" });
        }


        [HttpDelete("deletedevice")]
        public async Task<IActionResult> Delete(Guid ID)
        {
            var Devices = await db.Devices.FindAsync(ID);

            if (Devices is not null)
            {
                db.Devices.Remove(Devices);

                await db.SaveChangesAsync();
                return Ok(new { message = "Device deleted successfully" });
            }
            return NotFound(new { message = "Device not found" });

        }

    }
}
