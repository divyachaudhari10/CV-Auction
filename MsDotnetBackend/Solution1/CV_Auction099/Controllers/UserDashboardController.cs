using CV_Auction099.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks; 

namespace CV_Auction099.Controllers
{
    [Route("api")]
    [ApiController]
    public class UserDashboardController : ControllerBase
    {
        private readonly cvAuction01Context _context;

        public UserDashboardController(cvAuction01Context context)
        {
            _context = context;
        }

        [HttpGet("userdashboard/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var securityAmount = await _context.DepositPayments.Where(a => a.Uid == id).SumAsync(b => b.Amt);
                var limit = await _context.AllowedUsers.Where(a => a.Uid == id).Select(a => a.AuctionAccessLeft).FirstOrDefaultAsync();

                var pendingAuctions = await _context.WinnerTables
                    .Where(a => a.AllowedUserUid == id).Select(a => a.AuctionId).ToListAsync();

                int pendingAmounts = 0;

                foreach (var auctionId in pendingAuctions)
                {
                    var prices = await _context.AuctionStatusTracks
                        .Where(a => a.Auctionid == auctionId)
                        .Select(a => a.PriceOffered)
                        .ToListAsync();

                    int maxPriceOffered = (int) (prices.Any() ? prices.Max() : 0);
                    pendingAmounts += maxPriceOffered;
                }


                var person = await _context.AllowedUsers.FindAsync(id);
                var packActive = person != null;
                var planStart = await _context.DepositPayments
                    .Where(a => a.Uid == id)
                    .OrderBy(d => d.TransactionTime)
                    .Select(d => d.TransactionTime)
                   .FirstOrDefaultAsync();

                var response = new Response
                {
                    SecurityAmount = (int)securityAmount,
                    Limit = limit,
                    Pending = pendingAmounts,
                    PackActive = packActive,
                    PlanStart = planStart.HasValue ? planStart.Value.ToString("yyyy-MM-ddTHH:mm:ss") : "N/A"
                };


                return Ok(response); // Return HTTP 200 OK with the response object
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpGet("myWins/{id}")]
        public async Task<IActionResult> GetWinInfo(int id)
        {
            var wintList = await _context.WinnerTables
                .Where(a => a.AllowedUserUid == id)
                .ToListAsync();

            var responseList = new List<WinResponse>();

            if (wintList.Any())
            {
                foreach (var wint in wintList)
                {
                    var vehicle = await _context.AllVehiclesDetails
                        .FirstOrDefaultAsync(a => a.Vehicleid == wint.VehicleId);

                    string model = vehicle.ModelName;
                    string brand = vehicle.ManufacName;
                    string regNo = vehicle.RegNo;

                    var maxPrice = await _context.AuctionStatusTracks
                        .Where(a => a.Auctionid == wint.AuctionId)
                        .MaxAsync(a => a.PriceOffered);

                    responseList.Add(new WinResponse
                    {
                        ModelName = model,
                        BrandName = brand,
                        RegisterNo = regNo,
                        BidAmount = (int) maxPrice,
                        AuctionId = wint.AuctionId
                    });
                }
            }

            return Ok(responseList);
        }




    }

    public class Response
    {
        public int SecurityAmount { get; set; }
        public int Limit { get; set; }
        public int Pending { get; set; }
        public bool PackActive { get; set; }
        public string PlanStart { get; set; }
    }

    public class WinResponse
    {
        public string ModelName { get; set; }
        public string BrandName { get; set; }
        public string RegisterNo { get; set; }
        public int AuctionId { get; set; }
        public int BidAmount { get; set; }
    }
}
