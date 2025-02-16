using CV_Auction099.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CV_Auction099.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly cvAuction01Context _context;

        public AdminController(cvAuction01Context context)
        {
            _context = context;
        }

        // api/Admin/
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Admin>>> Get()
        {
            try
            {
                var admins = await _context.Admins.ToListAsync();
                return Ok(admins);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }


        // GET: api/Admin/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Admin>> Get(int id)
        {
            try
            {
                var admin = await _context.Admins.FindAsync(id);
                if (admin == null)
                {
                    return NotFound($"Admin with ID {id} not found."); // Returns 404 if admin not found
                }
                return Ok(admin); // Returns a 200 OK response with the found admin
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        // POST: api/Admin
        [HttpPost]
        public async Task<ActionResult<Admin>> Post([FromBody] Admin admin)
        {
            try
            {
                if (admin == null)
                {
                    return BadRequest("Admin data is null."); 
                }

                _context.Admins.Add(admin);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(Get), new { id = admin.Aid }, admin); 
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        // PUT: api/Admin/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Admin admin)
        {
            try
            {
                if (id != admin.Aid)
                {
                    return BadRequest("Admin ID mismatch."); // Returns 400 if IDs don't match
                }

                var existingAdmin = await _context.Admins.FindAsync(id);
                if (existingAdmin == null)
                {
                    return NotFound($"Admin with ID {id} not found."); // Returns 404 if admin does not exist
                }

                existingAdmin.Aname = admin.Aname; // Update other properties as needed
                existingAdmin.Aemail = admin.Aemail;
                // Add any additional fields to update

                _context.Entry(existingAdmin).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return NoContent(); // Returns 204 No Content for successful update
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        // DELETE: api/Admin/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var admin = await _context.Admins.FindAsync(id);
                if (admin == null)
                {
                    return NotFound($"Admin with ID {id} not found."); 
                }

                _context.Admins.Remove(admin);
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
