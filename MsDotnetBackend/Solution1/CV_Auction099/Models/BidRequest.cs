namespace CV_Auction099.Models
{
    public class BidRequest
    {
        public int BidAmount { get; set; }  
        public int VehicleId { get; set; }
        public int AuctionId { get; set; }
        public int UserId { get; set; }  
    }
}
