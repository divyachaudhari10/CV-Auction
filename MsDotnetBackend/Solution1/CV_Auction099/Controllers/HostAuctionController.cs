using CV_Auction099.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CV_Auction099.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HostAuctionController : ControllerBase
    {
        private readonly cvAuction01Context _context;

        public HostAuctionController(cvAuction01Context context)
        {
            _context = context;
        }

        // GET: api/HostAuction
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HostAuction>>> GetAllHostAuctions()
        {
            return await _context.HostAuctions.ToListAsync();
        }

        // GET: api/HostAuction/5
        [HttpGet("{id}")]
        public async Task<ActionResult<HostAuction>> GetHostAuctionById(int id)
        {
            var hostAuction = await _context.HostAuctions.FindAsync(id);
            if (hostAuction == null)
            {
                return NotFound($"Host Auction with ID {id} not found.");
            }
            return hostAuction;
        }

        // POST: api/HostAuction
        [HttpPost]
        public async Task<ActionResult<HostAuction>> CreateHostAuction(HostAuction hostAuction)
        {
            try
            {
                _context.HostAuctions.Add(hostAuction);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetHostAuctionById), new { id = hostAuction.Auctionid }, hostAuction);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        // PUT: api/HostAuction/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateHostAuction(int id, HostAuction hostAuction)
        {
            if (id != hostAuction.Auctionid)
            {
                return BadRequest("Auction ID mismatch.");
            }

            var existingHostAuction = await _context.HostAuctions.FindAsync(id);
            if (existingHostAuction == null)
            {
                return NotFound($"Host Auction with ID {id} not found.");
            }

            // Update properties
            existingHostAuction.Vehicleid = hostAuction.Vehicleid;
            existingHostAuction.BasePrice = hostAuction.BasePrice;
            existingHostAuction.AuctionStart = hostAuction.AuctionStart;
            existingHostAuction.AuctionEnd = hostAuction.AuctionEnd;
            existingHostAuction.RemoveSchedule = hostAuction.RemoveSchedule;
            existingHostAuction.StartAuction = hostAuction.StartAuction;

            _context.Entry(existingHostAuction).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HostAuctionExists(id))
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

        // DELETE: api/HostAuction/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHostAuction(int id)
        {
            var hostAuction = await _context.HostAuctions.FindAsync(id);
            if (hostAuction == null)
            {
                return NotFound($"Host Auction with ID {id} not found.");
            }

            _context.HostAuctions.Remove(hostAuction);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool HostAuctionExists(int id)
        {
            return _context.HostAuctions.Any(e => e.Auctionid == id);
        }
    }
}
