using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CV_Auction099.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;

namespace CV_Auction099.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginServiceController : ControllerBase
    {
        private readonly cvAuction01Context _context;
        private readonly IConfiguration _configuration;
        private readonly ILogger<LoginServiceController> _logger;

        public LoginServiceController(cvAuction01Context context, IConfiguration configuration, ILogger<LoginServiceController> logger)
        {
            _context = context;
            _configuration = configuration;
            _logger = logger;
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginUser([FromBody] LoginRequest data)
        {
            if (data == null || string.IsNullOrEmpty(data.Uemail) || string.IsNullOrEmpty(data.Upwd))
            {
                return BadRequest("Email or password cannot be null or empty.");
            }

            if (_context.Users == null && _context.Admins == null)
            {
                return NotFound("Database context is not initialized properly.");
            }

            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Uemail == data.Uemail);
                if (user != null && VerifyPassword(data.Upwd, user.Upwd))
                {
                    return Ok(user);
                }

                var admin = await _context.Admins.FirstOrDefaultAsync(a => a.Aemail == data.Uemail);
                if (admin != null && VerifyPassword(data.Upwd, admin.Apwd))
                {
                    // Removed JWT Token generation
                    return Ok(admin);
                }

                return Unauthorized("Invalid email or password.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred during the login process.");
                return StatusCode(500, "Internal server error.");
            }
        }

        private bool VerifyPassword(string inputPassword, string storedPassword)
        {
            // Implement secure password comparison (e.g., hash the inputPassword and compare it with storedPassword)
            return inputPassword == storedPassword;
        }
    }

    public class LoginRequest
    {
        public string Uemail { get; set; }
        public string Upwd { get; set; }
    }
}
