using CV_Auction099.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CV_Auction099.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly cvAuction01Context _context;

        public TransactionController(cvAuction01Context context)
        {
            _context = context;
        }

        // GET: api/<TransactionController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PaymentTransaction>>> Get()
        {
            return await _context.PaymentTransactions.ToListAsync();
        }

        // GET api/<TransactionController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PaymentTransaction>> GetTransaction(int id)
        {
            try
            {
                var pt = await _context.PaymentTransactions.FindAsync(id);
                if (pt == null)
                {
                    return NotFound($"Transaction with ID {id} not found.");
                }
                return Ok(pt);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        // POST api/<TransactionController>
        [HttpPost]
        public async Task<ActionResult<PaymentTransaction>> Post([FromBody] PaymentTransaction pt)
        {
            try
            {
                if (pt == null)
                {
                    return BadRequest("Transaction data is null.");
                }

                _context.PaymentTransactions.Add(pt);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetTransaction), new { id = pt.TransactionId }, pt);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        // PUT api/<TransactionController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] PaymentTransaction pt)
        {
            try
            {
                if (id != pt.TransactionId)
                {
                    return BadRequest("Transaction ID mismatch.");
                }

                var transaction = await _context.PaymentTransactions.FindAsync(id);
                if (transaction == null)
                {
                    return NotFound($"Transaction with ID {id} not found.");
                }

                transaction.Uid = pt.Uid;
                transaction.Amt = pt.Amt;

                _context.Entry(transaction).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        // DELETE api/<TransactionController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var transaction = await _context.PaymentTransactions.FindAsync(id);
                if (transaction == null)
                {
                    return NotFound($"Transaction with ID {id} not found.");
                }

                _context.PaymentTransactions.Remove(transaction);
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
