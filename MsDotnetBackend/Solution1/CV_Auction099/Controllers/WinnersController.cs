using Microsoft.AspNetCore.Mvc;
using CV_Auction099.Models;
using System.Collections.Generic;
using System.Linq;

namespace CV_Auction099.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WinnersController : ControllerBase
    {
        private readonly cvAuction01Context _context;

        public WinnersController( cvAuction01Context context)
        {
            _context = context;
        }

        // GET: api/Winners
        [HttpGet]
        public ActionResult<IEnumerable<WinnerTable>> GetWinners()
        {
            return _context.WinnerTables.ToList();
        }

        // GET api/Winners/5
        [HttpGet("{uid}/{vehicleId}/{auctionId}")]
        public ActionResult<WinnerTable> GetWinner(int uid, int vehicleId, int auctionId)
        {
            var winner = _context.WinnerTables
                                 .FirstOrDefault(w => w.AllowedUserUid == uid && w.VehicleId == vehicleId && w.AuctionId == auctionId);

            if (winner == null)
            {
                return NotFound();
            }

            return winner;
        }

        // POST api/Winners
        [HttpPost]
        public ActionResult<WinnerTable> PostWinner([FromBody] WinnerTable winner)
        {
            if (winner == null)
            {
                return BadRequest();
            }

            _context.WinnerTables.Add(winner);
            _context.SaveChanges();

            return CreatedAtAction("GetWinner", new { uid = winner.AllowedUserUid, vehicleId = winner.VehicleId, auctionId = winner.AuctionId }, winner);
        }

        // PUT api/Winners/5
        [HttpPut("{uid}/{vehicleId}/{auctionId}")]
        public IActionResult PutWinner(int uid, int vehicleId, int auctionId, [FromBody] WinnerTable winner)
        {
            if (winner == null || winner.AllowedUserUid != uid || winner.VehicleId != vehicleId || winner.AuctionId != auctionId)
            {
                return BadRequest();
            }

            var existingWinner = _context.WinnerTables
                                        .FirstOrDefault(w => w.AllowedUserUid == uid && w.VehicleId == vehicleId && w.AuctionId == auctionId);

            if (existingWinner == null)
            {
                return NotFound();
            }

            existingWinner.AmountPending = winner.AmountPending;
            _context.SaveChanges();

            return NoContent();
        }

        // DELETE api/Winners/5
        [HttpDelete("{uid}/{vehicleId}/{auctionId}")]
        public IActionResult DeleteWinner(int uid, int vehicleId, int auctionId)
        {
            var winner = _context.WinnerTables
                                 .FirstOrDefault(w => w.AllowedUserUid == uid && w.VehicleId == vehicleId && w.AuctionId == auctionId);

            if (winner == null)
            {
                return NotFound();
            }

            _context.WinnerTables.Remove(winner);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
