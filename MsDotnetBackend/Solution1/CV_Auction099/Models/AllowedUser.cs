using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace CV_Auction099.Models
{
    public partial class AllowedUser
    {
        //public AllowedUser()
        //{
        //    AuctionStatusTracks = new HashSet<AuctionStatusTrack>();
        //}

        public int Uid { get; set; }
        public int? PaymentNo { get; set; }
        public int AuctionAccessLeft { get; set; }

        //[JsonIgnore]

        //public virtual DepositPayment? PaymentNoNavigation { get; set; }
        //[JsonIgnore]

        //public virtual User UidNavigation { get; set; } = null!;
        //[JsonIgnore]

        //public virtual ICollection<AuctionStatusTrack> AuctionStatusTracks { get; set; }
    }
}
