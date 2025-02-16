using CV_Auction099.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CV_Auction099.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CurrentAuctionController : ControllerBase
    {
        private readonly cvAuction01Context _context;

        public CurrentAuctionController(cvAuction01Context context)
        {
            _context = context;
        }


        [HttpGet("/aid/{auctionId}")]
        public async Task<ActionResult<CurrentAuction>> Get(int auctionId)
        {
            var auction = await _context.CurrentAuctions.FirstOrDefaultAsync(a => a.Auctionid == auctionId);

            if (auction == null)
            {
                return NotFound($"Auction with ID {auctionId} not found.");
            }

            return Ok(auction);
        }


        // GET: api/<CurrentAuctionController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CurrentAuction>>> Get()
        {
            return await _context.CurrentAuctions.ToListAsync();
        }

        // GET api/<CurrentAuctionController>/5
        [HttpGet("{vehicleId}/{auctionId}")]
        public async Task<ActionResult<CurrentAuction>> GetCurrentAuction(int vehicleId, int auctionId)
        {
            try
            {
                var auction = await _context.CurrentAuctions
                    .FirstOrDefaultAsync(ca => ca.Vehicleid == vehicleId && ca.Auctionid == auctionId);
                if (auction == null)
                {
                    return NotFound($"Auction with Vehicle ID {vehicleId} and Auction ID {auctionId} not found.");
                }
                return Ok(auction);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        // POST api/<CurrentAuctionController>
        [HttpPost]
        public async Task<ActionResult<CurrentAuction>> Post([FromBody] CurrentAuction auction)
        {
            try
            {
                if (auction == null)
                {
                    return BadRequest("Auction data is null.");
                }
                _context.CurrentAuctions.Add(auction);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetCurrentAuction), new { vehicleId = auction.Vehicleid, auctionId = auction }, auction);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        // PUT api/<CurrentAuctionController>/5
        [HttpPut("{vehicleId}/{auctionId}")]
        public async Task<IActionResult> Put(int vehicleId, int auctionId, [FromBody] CurrentAuction auction)
        {
            try
            {
                if (vehicleId != auction.Vehicleid || auctionId != auction.Auctionid)
                {
                    return BadRequest("Auction ID or Vehicle ID mismatch.");
                }

                var existingAuction = await _context.CurrentAuctions
                    .FirstOrDefaultAsync(ca => ca.Vehicleid == vehicleId && ca.Auctionid == auctionId);

                if (existingAuction == null)
                {
                    return NotFound($"Auction with Vehicle ID {vehicleId} and Auction ID {auctionId} not found.");
                }

                // Update auction properties
                existingAuction.BasePrice = auction.BasePrice;
                existingAuction.HighestBid = auction.HighestBid;
                existingAuction.AuctionStart = auction.AuctionStart;
                existingAuction.AuctionEnd = auction.AuctionEnd;

                _context.Entry(existingAuction).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        // DELETE api/<CurrentAuctionController>/5
        [HttpDelete("{vehicleId}/{auctionId}")]
        public async Task<IActionResult> Delete(int vehicleId, int auctionId)
        {
            try
            {
                var auction = await _context.CurrentAuctions
                    .FirstOrDefaultAsync(ca => ca.Vehicleid == vehicleId && ca.Auctionid == auctionId);

                if (auction == null)
                {
                    return NotFound($"Auction with Vehicle ID {vehicleId} and Auction ID {auctionId} not found.");
                }

                _context.CurrentAuctions.Remove(auction);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }
    }
}
