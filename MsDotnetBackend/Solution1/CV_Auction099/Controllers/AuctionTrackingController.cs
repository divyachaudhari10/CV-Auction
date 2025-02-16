using CV_Auction099.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CV_Auction099.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuctionStatusTrackController : ControllerBase
    {
        private readonly cvAuction01Context _context;

        public AuctionStatusTrackController(cvAuction01Context context)
        {
            _context = context;
        }

        // GET: api/AuctionStatusTrack
        [HttpGet("{Uid}")]
        public async Task<ActionResult<IEnumerable<AuctionStatusTrack>>> GetAuctionStatusTracks(int Uid)
        {
            var leads = await _context.AuctionStatusTracks
                .Where(a => a.AllowedUserUid == Uid && a.AuctionEnd != true)
                .AsNoTracking() 
                .ToListAsync();

            if (leads.Any())
            {
                return Ok(leads);
            }

            return NotFound();
        }


        // POST: api/AuctionStatusTrack
        [HttpPut]
        public async Task<ActionResult<AuctionStatusTrack>> PostAuctionStatusTrack([FromBody] AuctionStatusTrack newBid)
        {
            var placeBid = await _context.AuctionStatusTracks
                .FirstOrDefaultAsync(a => a.Auctionid == newBid.Auctionid);

            if (placeBid == null)
            {
                return NotFound("Bid not found.");
            }

            if (placeBid.UserBidLeft > 0)
            {
                placeBid.UserBidLeft -= 1;
            }
            else
            {
                return BadRequest("User has no bids left.");
            }

            placeBid.PriceOffered = newBid.PriceOffered;

            // Update related bids for the same auction
            var relatedBids = await _context.AuctionStatusTracks
                .Where(a => a.Auctionid == newBid.Auctionid)
                .ToListAsync();

            foreach (var bid in relatedBids)
            {
                bid.HighestBidder = newBid.AllowedUserUid;
            }

            _context.Update(placeBid);
            _context.SaveChanges();

            // Return the updated bid from the database
            var updatedBid = await _context.AuctionStatusTracks
                .AsNoTracking() // Prevents EF from tracking this query result
                .FirstOrDefaultAsync(a => a.Auctionid == newBid.Auctionid);

            return Ok(updatedBid);
        }



        [HttpDelete("{adminId}/{auctionId}")]
        public async Task<IActionResult> DeleteAuctionStatusTrack(int adminId, int auctionId)
        {
            bool isValidAdmin = _context.Admins.Where(a => a.Aid == adminId).Any();
            if (!isValidAdmin)
            {
                return BadRequest();
            }

            var auctionStatusTrack = await _context.AuctionStatusTracks.FindAsync(auctionId);
            if (auctionStatusTrack == null)
            {
                return NotFound($"AuctionStatusTrack for User Auction {auctionId} not found.");
            }

            _context.AuctionStatusTracks.Remove(auctionStatusTrack);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
