using System;
using System.Collections.Generic;

namespace CV_Auction099.Models
{
    public partial class Admin
    {
        public int Aid { get; set; }
        public string Aname { get; set; } = null!;
        public string Apwd { get; set; } = null!;
        public string Aemail { get; set; } = null!;
        public string Role { get; set; }
    }
}
