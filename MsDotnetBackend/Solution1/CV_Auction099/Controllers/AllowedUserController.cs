using CV_Auction099.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CV_Auction099.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AllowedUserController : ControllerBase
    {
        private readonly cvAuction01Context _context;

        public AllowedUserController(cvAuction01Context context)
        {
            _context = context;
        }

        // GET: api/AllowedUser
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AllowedUser>>> Get()
        {
            try
            {
                var allowedUsers = await _context.AllowedUsers.ToListAsync();
                return Ok(allowedUsers);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        // GET api/AllowedUser/{uid}
        [HttpGet("{uid}")]
        public async Task<ActionResult<AllowedUser>> Get(int uid)
        {
            try
            {
                var allowedUser = await _context.AllowedUsers.FindAsync(uid);
                if (allowedUser == null)
                {
                    return NotFound("Allowed user entry not found.");
                }
                return Ok(allowedUser);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        // POST: api/AllowedUser
        [HttpPost]
        public async Task<ActionResult<AllowedUser>> Post([FromBody] AllowedUser allowedUser)
        {
            try
            {
                if (allowedUser == null)
                {
                    return BadRequest("Allowed user data is null.");
                }

                // Check if foreign keys are valid (optional, depending on your needs)
                var payment = await _context.DepositPayments.FindAsync(allowedUser.PaymentNo);
                if (payment == null)
                {
                    return BadRequest("Invalid payment number.");
                }

                var user = await _context.Users.FindAsync(allowedUser.Uid);
                if (user == null)
                {
                    return BadRequest("Invalid user.");
                }

                _context.AllowedUsers.Add(allowedUser);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(Get), new { uid = allowedUser.Uid }, allowedUser);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        // PUT api/AllowedUser/{uid}
        [HttpPut("{uid}")]
        public async Task<IActionResult> Put(int uid, [FromBody] AllowedUser allowedUser)
        {
            try
            {
                if (uid != allowedUser.Uid)
                {
                    return BadRequest("Allowed user ID mismatch.");
                }

                var existingAllowedUser = await _context.AllowedUsers.FindAsync(uid);
                if (existingAllowedUser == null)
                {
                    return NotFound("Allowed user entry not found.");
                }

                // Update fields
                existingAllowedUser.PaymentNo = allowedUser.PaymentNo;
                existingAllowedUser.AuctionAccessLeft = allowedUser.AuctionAccessLeft;

                _context.Entry(existingAllowedUser).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        // DELETE api/AllowedUser/{uid}
        [HttpDelete("{uid}")]
        public async Task<IActionResult> Delete(int uid)
        {
            try
            {
                var allowedUser = await _context.AllowedUsers.FindAsync(uid);
                if (allowedUser == null)
                {
                    return NotFound("Allowed user entry not found.");
                }

                _context.AllowedUsers.Remove(allowedUser);
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
