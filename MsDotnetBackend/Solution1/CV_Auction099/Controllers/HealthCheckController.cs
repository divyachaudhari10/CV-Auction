using System.Security.Cryptography;
using CV_Auction099.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CV_Auction099.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HealthCheckController : ControllerBase
    {

        [HttpGet]
        public async Task<ActionResult<string>> GetBids(int id)
        {
            return Ok("API Working ...");
        }
    }
}
