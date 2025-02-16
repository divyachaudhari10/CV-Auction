using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace CV_Auction099.Models
{
    public partial class DepositPayment
    {
        //public DepositPayment()
        //{
        //    AllowedUsers = new HashSet<AllowedUser>();
        //}

        public int PaymentNo { get; set; }
        public int? Uid { get; set; }
        public DateTime? TransactionTime { get; set; }
        public decimal Amt { get; set; }
        public string? PaymentId { get; set; }
        public string? OrderId { get; set; }
        public string? PlanType { get; set; }

        //[JsonIgnore]
        //public virtual User? UidNavigation { get; set; }
        
        //[JsonIgnore]
        //public virtual ICollection<AllowedUser> AllowedUsers { get; set;  
    }
}
