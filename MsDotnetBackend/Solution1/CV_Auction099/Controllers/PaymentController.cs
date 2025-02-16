using Microsoft.AspNetCore.Mvc;
using Razorpay.Api;


namespace PaymentApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly string _key = "rzp_test_uDTjqNOhY3Rzjo";
        private readonly string _secret = "dcaH3oCOVodJfeChHdOE3OKM";

        [HttpPost("create-order")]
        public IActionResult CreateOrder([FromBody] OrderRequest request)
        {
            try
            {
                RazorpayClient client = new RazorpayClient(_key, _secret);

                Dictionary<string, object> options = new Dictionary<string, object>
        {
            { "amount", request.Amount },
            { "currency", request.Currency },
            { "receipt", $"order_rcptid_{Guid.NewGuid().ToString().Substring(0, 8)}" } 
        };

                Order order = client.Order.Create(options);

                return Ok(new { orderId = order["id"].ToString() });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

    }

    public class OrderRequest
    {
        public int Amount { get; set; }
        public string Currency { get; set; }
    }
}
