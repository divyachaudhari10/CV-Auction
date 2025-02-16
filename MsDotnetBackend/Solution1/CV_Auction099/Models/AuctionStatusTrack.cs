using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace CV_Auction099.Models
{
    public partial class AuctionStatusTrack
    {
        [Key]
        [Column(Order = 0)]
        public int AllowedUserUid { get; set; }
        [Key]
        [Column(Order = 1)]
        public int Vehicleid { get; set; }
        public int Auctionid { get; set; }
        [Key]
        [Column(Order = 3)]
        public int UserBidLeft { get; set; }
        public decimal PriceOffered { get; set; }
        public int? HighestBidder { get; set; }
        public bool? AuctionEnd { get; set; }

    }
}
