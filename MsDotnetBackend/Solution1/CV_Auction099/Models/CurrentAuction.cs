using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace CV_Auction099.Models
{
    public partial class CurrentAuction
    {
        //public CurrentAuction()
        //{
        //    AuctionStatusTracks = new HashSet<AuctionStatusTrack>();
        //}

        public int Vehicleid { get; set; }
        public int Auctionid { get; set; }
        public decimal BasePrice { get; set; }
        public decimal? HighestBid { get; set; }
        public DateTime AuctionStart { get; set; }
        public DateTime AuctionEnd { get; set; }


        //[JsonIgnore]
        //public virtual HostAuction Auction { get; set; } = null!;
        //[JsonIgnore]
        //public virtual AllVehiclesDetail Vehicle { get; set; } = null!;
        //[JsonIgnore]
        //public virtual ICollection<AuctionStatusTrack> AuctionStatusTracks { get; set; }
    }
}
