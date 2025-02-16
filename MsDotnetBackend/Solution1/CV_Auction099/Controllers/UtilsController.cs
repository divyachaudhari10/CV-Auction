using System.Security.Cryptography;
using CV_Auction099.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CV_Auction099.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UtilsController : ControllerBase
    {
        private readonly cvAuction01Context _context;

        public UtilsController(cvAuction01Context context)
        {
            _context = context;
        }

        [HttpGet("userbidleft/{id}")]
        public async Task<ActionResult<int>> GetBids(int id)
        {
            var userBidLeft = await _context.AllowedUsers
                .Where(a => a.Uid == id)
                .Select(auction => auction.AuctionAccessLeft)
                .FirstOrDefaultAsync();

            if (userBidLeft == null)
            {
                return 0;
            }

            return Ok(userBidLeft);
        }


        [HttpPost]
        [Route("placeBid")]
        public async Task<ActionResult> PlaceBid([FromBody] AuctionStatusTrack request)
        {
            if (request == null || request.PriceOffered <= 0)
            {
                return BadRequest("Invalid bid data.");
            }

            try
            {
                var existingRecord = await _context.AuctionStatusTracks
                    .FirstOrDefaultAsync(a => a.AllowedUserUid == request.AllowedUserUid && a.Auctionid == request.Auctionid);

                if (existingRecord == null)
                {
                    _context.AuctionStatusTracks.Add(request);
                }
                else
                {
                    if (request.PriceOffered > existingRecord.PriceOffered)
                    {
                        existingRecord.PriceOffered = request.PriceOffered;
                        existingRecord.UserBidLeft = request.UserBidLeft;
                        existingRecord.HighestBidder = request.HighestBidder;
                        existingRecord.AuctionEnd = request.AuctionEnd;

                        _context.AuctionStatusTracks.Update(existingRecord);
                    }
                    else
                    {
                        return Conflict("The offered bid is not higher than the current highest bid.");
                    }
                }

                var allowedUser = await _context.AllowedUsers
                       .FirstOrDefaultAsync(a => a.Uid == request.AllowedUserUid);

                if (allowedUser != null)
                {
                    allowedUser.AuctionAccessLeft--;
                    _context.AllowedUsers.Update(allowedUser);
                    await _context.SaveChangesAsync();
                }
                else
                {
                    return NotFound("Allowed user not found.");
                }


                await _context.SaveChangesAsync();
                return Ok(new { success = true, message = "Bid placed successfully!" });
            }
            catch (DbUpdateConcurrencyException)
            {
                return Conflict("The data has been modified. Please refresh and try again.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }



        //[HttpPost]

        //[HttpPost]
        //[Route("placebid")]
        //public async Task<ActionResult> PlaceBid([FromBody] BidRequest request)
        //{
        //    if (request == null) return StatusCode(400,"Bad Request");


        //    var obj = _context.AuctionStatusTracks.AddAsync(request);


        //}

    }
}
