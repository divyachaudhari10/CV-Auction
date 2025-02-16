using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace CV_Auction099.Models
{
    public partial class WinnerTable
    {
        public int AllowedUserUid { get; set; }
        public int VehicleId { get; set; }
        public int AuctionId { get; set; }
        public int AmountPending { get; set; }
        public DateTime? AuctionEndDate { get; set; }

    }
}
