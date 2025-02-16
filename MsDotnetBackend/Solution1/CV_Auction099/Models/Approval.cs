using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace CV_Auction099.Models
{
    public partial class Approval
    {
        public int AllowedUserUid { get; set; }
        public int Vehicleid { get; set; }
        public int Auctionid { get; set; }
        public string VehicleName { get; set; } = null!;
        public decimal BidAmt { get; set; }
        public int? WinnerId { get; set; }

        //[JsonIgnore]
        //public string? ApprovalStatus { get; set; }
        
        //[JsonIgnore]
        //public DateTime? ApprovalDate { get; set; }

        //[JsonIgnore]
        //public virtual WinnerTable WinnerTable { get; set; } = null!;
    }
}
