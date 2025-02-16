using System;
using System.Collections.Generic;

namespace CV_Auction099.Models
{
    public partial class PaymentTransaction
    {
        public int TransactionId { get; set; }
        public int? Uid { get; set; }
        public DateTime TransactionDate { get; set; }
        public decimal Amt { get; set; }
        public string UtrNo { get; set; } = null!;
        //public virtual User? UidNavigation { get; set; }
    }
}
