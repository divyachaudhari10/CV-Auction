using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CV_Auction099.Models;

namespace CV_Auction099.Controllers
{
    [Route("api/vehicles")]
    [ApiController]
    public class VehicleController : ControllerBase
    {
        private readonly cvAuction01Context _context = new cvAuction01Context();

        // GET: api/vehicles/getAll
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AllVehiclesDetail>>> GetAllVehiclesDetails()
        {
            return await _context.AllVehiclesDetails.ToListAsync();
        }

        // GET: api/vehicles/1
        [HttpGet("{id}")]
        public async Task<ActionResult<AllVehiclesDetail>> GetAllVehiclesDetail(int id)
        {
            var allVehiclesDetail = await _context.AllVehiclesDetails.FindAsync(id);

            if (allVehiclesDetail == null)
            {
                return NotFound();
            }

            return allVehiclesDetail;
        }

        [HttpGet("getVehicleByAuction/{id}")]
        public async Task<ActionResult<AllVehiclesDetail>> GetVeh(int id)
        {
            var allVehiclesDetail = await _context.AllVehiclesDetails
                .FirstOrDefaultAsync(a => a.Vehicleid == id);

            if (allVehiclesDetail == null)
            {
                return NotFound();
            }

            return Ok(allVehiclesDetail);
        }


        // PUT: api/vehicles/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAllVehiclesDetail(int id, AllVehiclesDetail allVehiclesDetail)
        {
            if (id != allVehiclesDetail.Vehicleid)
            {
                return BadRequest();
            }

            _context.Entry(allVehiclesDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AllVehiclesDetailExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/vehicles
        [HttpPost]
        public async Task<ActionResult<AllVehiclesDetail>> PostAllVehiclesDetail(AllVehiclesDetail allVehiclesDetail)
        {
            _context.AllVehiclesDetails.Add(allVehiclesDetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAllVehiclesDetail", new { id = allVehiclesDetail.Vehicleid }, allVehiclesDetail);
        }

        // DELETE: api/vehicles/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAllVehiclesDetail(int id)
        {
            var allVehiclesDetail = await _context.AllVehiclesDetails.FindAsync(id);
            if (allVehiclesDetail == null)
            {
                return NotFound();
            }

            _context.AllVehiclesDetails.Remove(allVehiclesDetail);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AllVehiclesDetailExists(int id)
        {
            return _context.AllVehiclesDetails.Any(e => e.Vehicleid == id);
        }
    }
}