using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace CV_Auction099.Models
{
    public partial class User
    {
        //public User()
        //{
        //    DepositPayments = new HashSet<DepositPayment>();
        //    PaymentTransactions = new HashSet<PaymentTransaction>();
        //}

        public int Uid { get; set; }
        public string UfirstName { get; set; } = null!;
        public string UlastName { get; set; } = null!;
        public string Uname { get; set; } = null!;
        public string Role { get; set; } = null!;
        public string Upwd { get; set; } = null!;
        public string Uemail { get; set; } = null!;
        public string MobNo { get; set; } = null!;
        public string PanCard { get; set; } = null!;
        public string? Address { get; set; }
        public string? BankAccNo { get; set; }
        public string? Bankname { get; set; }
        public string? BankBranch { get; set; }
        public string? AccountHolderName { get; set; }
        public string? IfscCode { get; set; }
        public string? AccessStatus { get; set; }

        //[JsonIgnore]
        //public virtual AllowedUser? AllowedUser { get; set; }
        
        //[JsonIgnore]
        //public virtual ICollection<DepositPayment> DepositPayments { get; set; }

        //[JsonIgnore]
        //public virtual ICollection<PaymentTransaction> PaymentTransactions { get; set; }
    }
}
