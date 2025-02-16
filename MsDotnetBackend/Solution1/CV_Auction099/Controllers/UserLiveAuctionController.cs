using CV_Auction099.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CV_Auction099.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserLiveAuctionController : ControllerBase
    {
        private readonly cvAuction01Context _context;

        public UserLiveAuctionController(cvAuction01Context context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<LiveForUser>>> GetAllLive(int id)
        {
            var allCurrentLive = await _context.CurrentAuctions.ToListAsync();

            var auctionsUserInvolvedIn = await _context.AuctionStatusTracks
                .Where(a => a.AllowedUserUid == id)
                .Select(a => a.Auctionid)
                .ToListAsync();

            var liveAuctionsForUser = allCurrentLive
                .Where(a => !auctionsUserInvolvedIn.Contains(a.Auctionid))
                .ToList();

            var ans = new List<LiveForUser>();

            foreach (var foundLive in liveAuctionsForUser)
            {
                var vehicleDetail = await _context.AllVehiclesDetails
                    .FirstOrDefaultAsync(a => a.Vehicleid == foundLive.Vehicleid);

                int highest = (int) _context.AuctionStatusTracks
                    .Where(a => a.Auctionid == foundLive.Auctionid).AsEnumerable() 
                    .Select(a => a.PriceOffered)
                    .DefaultIfEmpty(0)
                    .Max();

                if (vehicleDetail != null)
                {
                    ans.Add(new LiveForUser
                    {
                        BrandName = vehicleDetail.ManufacName,
                        ModelName = vehicleDetail.ModelName,
                        BasePrice = (int) foundLive.BasePrice,
                        HighestBid = highest,
                        AuctionStart = foundLive.AuctionStart.ToString(),
                        AuctionEnd = foundLive.AuctionEnd.ToString(),
                        AuctionId = foundLive.Auctionid
                    });
                }
            }

            return Ok(ans);
        }
    }

    public class LiveForUser
    {
        public string BrandName { get; set; }
        public string ModelName { get; set; }
        public int BasePrice { get; set; }
        public int HighestBid { get; set; }
        public string AuctionEnd { get; set; }
        public string AuctionStart { get; set; }
        public int AuctionId { get; set; }
    }
}
