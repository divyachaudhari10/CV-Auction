using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace CV_Auction099.Models
{
    public partial class HostAuction
    {
        //public HostAuction()
        //{
        //    CurrentAuctions = new HashSet<CurrentAuction>();
        //}

        public int Auctionid { get; set; }
        public int? Vehicleid { get; set; }
        public decimal BasePrice { get; set; }
        public DateTime AuctionStart { get; set; }
        public DateTime AuctionEnd { get; set; }
        public bool? RemoveSchedule { get; set; }
        public bool? StartAuction { get; set; }

        //[JsonIgnore]
        //public virtual AllVehiclesDetail? Vehicle { get; set; }

        //[JsonIgnore]
        //public virtual ICollection<CurrentAuction> CurrentAuctions { get; set; }
    }
}
