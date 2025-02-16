using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CV_Auction099.Models
{
    public partial class cvAuction01Context : DbContext
    {
        public cvAuction01Context()
        {
        }

        public cvAuction01Context(DbContextOptions<cvAuction01Context> options)
            : base(options)
        {
        }

        public  DbSet<Admin> Admins { get; set; } = null!;
        public virtual DbSet<AllVehiclesDetail> AllVehiclesDetails { get; set; } = null!;
        public virtual DbSet<AllowedUser> AllowedUsers { get; set; } = null!;
        public virtual DbSet<Approval> Approvals { get; set; } = null!;
        public virtual DbSet<AuctionStatusTrack> AuctionStatusTracks { get; set; } = null!;
        public virtual DbSet<CurrentAuction> CurrentAuctions { get; set; } = null!;
        public virtual DbSet<DepositPayment> DepositPayments { get; set; } = null!;
        public virtual DbSet<HostAuction> HostAuctions { get; set; } = null!;
        public virtual DbSet<PaymentTransaction> PaymentTransactions { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;
        public virtual DbSet<WinnerTable> WinnerTables { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=(LocalDB)\\MSSQLLocalDB;Initial Catalog=cvAuction01;Integrated Security=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Admin>(entity =>
            {
                entity.HasKey(e => e.Aid)
                    .HasName("PK__Admin__DE508E2E165F187B");

                entity.ToTable("Admin");

                entity.HasIndex(e => e.Aemail, "UQ__Admin__A0B4BEC3653A82B8")
                    .IsUnique();

                entity.Property(e => e.Aid).HasColumnName("aid");

                entity.Property(e => e.Aemail)
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasColumnName("aemail");

                entity.Property(e => e.Aname)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("aname");

                entity.Property(e => e.Apwd)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("apwd");
            });

            modelBuilder.Entity<AllVehiclesDetail>(entity =>
            {
                entity.HasKey(e => e.Vehicleid)
                    .HasName("PK__All_Vehi__5BE2516A0A827472");

                entity.ToTable("All_Vehicles_Details");

                entity.HasIndex(e => e.RegNo, "UQ__All_Vehi__74039E9C9F46B119")
                    .IsUnique();

                entity.Property(e => e.Vehicleid).HasColumnName("vehicleid");

                entity.Property(e => e.FuelType)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("fuel_type");

                entity.Property(e => e.ImgUrls)
                    .HasMaxLength(1500)
                    .IsUnicode(false)
                    .HasColumnName("imgUrls");

                entity.Property(e => e.Insurance)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("insurance");

                entity.Property(e => e.KmDriven).HasColumnName("km_driven");

                entity.Property(e => e.ManufacName)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("manufac_name");

                entity.Property(e => e.ModelName)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("model_name");

                entity.Property(e => e.ParkingLocation)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("parking_location");

                entity.Property(e => e.PdfReportUrl)
                    .HasMaxLength(400)
                    .IsUnicode(false)
                    .HasColumnName("pdfReportUrl");

                entity.Property(e => e.RegNo)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("reg_no");

                entity.Property(e => e.RegYear).HasColumnName("reg_year");

                entity.Property(e => e.RtoPassing)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("RTO_passing");

                entity.Property(e => e.YearOfManufacturing).HasColumnName("year_of_manufacturing");
            });

            modelBuilder.Entity<AllowedUser>(entity =>
            {
                entity.HasKey(e => e.Uid)
                    .HasName("PK__Allowed___DD701264F308089F");

                entity.ToTable("Allowed_User");

                entity.Property(e => e.Uid)
                    .ValueGeneratedNever()
                    .HasColumnName("uid");

                entity.Property(e => e.AuctionAccessLeft).HasColumnName("auction_access_left");

                entity.Property(e => e.PaymentNo).HasColumnName("payment_no");

                //entity.HasOne(d => d.PaymentNoNavigation)
                //    .WithMany(p => p.AllowedUsers)
                //    .HasForeignKey(d => d.PaymentNo)
                //    .OnDelete(DeleteBehavior.Cascade)
                //    .HasConstraintName("FK__Allowed_U__payme__3B75D760");

                //entity.HasOne(d => d.UidNavigation)
                //    .WithOne(p => p.AllowedUser)
                //    .HasForeignKey<AllowedUser>(d => d.Uid)
                //    .OnDelete(DeleteBehavior.ClientSetNull)
                //    .HasConstraintName("FK__Allowed_Use__uid__3C69FB99");
            });

            modelBuilder.Entity<Approval>(entity =>
            {
                entity.HasKey(e => new { e.AllowedUserUid, e.Vehicleid, e.Auctionid })
                    .HasName("PK__Approval__5C8DF1B71CD81D61");

                entity.Property(e => e.AllowedUserUid).HasColumnName("allowed_user_uid");

                entity.Property(e => e.Vehicleid).HasColumnName("vehicleid");

                entity.Property(e => e.Auctionid).HasColumnName("auctionid");

                //entity.Property(e => e.ApprovalDate)
                //    .HasColumnType("datetime")
                //    .HasColumnName("approval_date")
                //    .HasDefaultValueSql("(getdate())");

                //entity.Property(e => e.ApprovalStatus)
                //    .HasMaxLength(20)
                //    .IsUnicode(false)
                //    .HasColumnName("approval_status")
                //    .HasDefaultValueSql("('Pending')");

                entity.Property(e => e.BidAmt)
                    .HasColumnType("decimal(10, 2)")
                    .HasColumnName("bidAmt");

                entity.Property(e => e.VehicleName)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("vehicleName");

                entity.Property(e => e.WinnerId).HasColumnName("winnerId");

                //entity.HasOne(d => d.WinnerTable)
                //    .WithOne(p => p.Approval)
                //    .HasForeignKey<Approval>(d => new { d.AllowedUserUid, d.Vehicleid, d.Auctionid })
                //    .HasConstraintName("FK__Approvals__4E88ABD4");
            });

            modelBuilder.Entity<AuctionStatusTrack>(entity =>
            {
                entity.HasKey(e => new { e.AllowedUserUid, e.Vehicleid, e.Auctionid })
                    .HasName("PK__Auction___5C8DF1B7DBE7404C");

                entity.ToTable("Auction_Status_Track");

                entity.Property(e => e.AllowedUserUid).HasColumnName("allowed_user_uid");

                entity.Property(e => e.Vehicleid).HasColumnName("vehicleid");

                entity.Property(e => e.Auctionid).HasColumnName("auctionid");

                entity.Property(e => e.AuctionEnd)
                    .HasColumnName("auction_end")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.HighestBidder)
                    .HasColumnName("highest_bidder")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.PriceOffered)
                    .HasColumnType("decimal(10, 2)")
                    .HasColumnName("price_offered");

                entity.Property(e => e.UserBidLeft).HasColumnName("user_bid_left");

                //entity.HasOne(d => d.AllowedUserU)
                //    .WithMany(p => p.AuctionStatusTracks)
                //    .HasForeignKey(d => d.AllowedUserUid)
                //    .HasConstraintName("FK__Auction_S__allow__412EB0B6");

                //entity.HasOne(d => d.CurrentAuction)
                //    .WithMany(p => p.AuctionStatusTracks)
                //    .HasForeignKey(d => new { d.Vehicleid, d.Auctionid })
                //    .HasConstraintName("FK__Auction_Status_T__4222D4EF");
            });

            modelBuilder.Entity<CurrentAuction>(entity =>
            {
                entity.HasKey(e => new { e.Vehicleid, e.Auctionid })
                    .HasName("PK__Current___2DA959EA6F0BD164");

                entity.ToTable("Current_Auction");

                entity.Property(e => e.Vehicleid).HasColumnName("vehicleid");

                entity.Property(e => e.Auctionid).HasColumnName("auctionid");

                entity.Property(e => e.AuctionEnd)
                    .HasColumnType("datetime")
                    .HasColumnName("auction_end");

                entity.Property(e => e.AuctionStart)
                    .HasColumnType("datetime")
                    .HasColumnName("auction_start");

                entity.Property(e => e.BasePrice)
                    .HasColumnType("decimal(10, 2)")
                    .HasColumnName("base_price");

                entity.Property(e => e.HighestBid)
                    .HasColumnType("decimal(10, 2)")
                    .HasColumnName("highest_bid");

                //entity.HasOne(d => d.Auction)
                //    .WithMany(p => p.CurrentAuctions)
                //    .HasForeignKey(d => d.Auctionid)
                //    .OnDelete(DeleteBehavior.ClientSetNull)
                //    .HasConstraintName("FK__Current_A__aucti__34C8D9D1");

                //entity.HasOne(d => d.Vehicle)
                //    .WithMany(p => p.CurrentAuctions)
                //    .HasForeignKey(d => d.Vehicleid)
                //    .OnDelete(DeleteBehavior.ClientSetNull)
                //    .HasConstraintName("FK__Current_A__vehic__33D4B598");
            });

            modelBuilder.Entity<DepositPayment>(entity =>
            {
                entity.HasKey(e => e.PaymentNo)
                    .HasName("PK__Deposit___ED1FE1093FE14D11");

                entity.ToTable("Deposit_Payment");

                entity.Property(e => e.PaymentNo).HasColumnName("payment_no");

                entity.Property(e => e.Amt)
                    .HasColumnType("decimal(10, 2)")
                    .HasColumnName("amt");

                entity.Property(e => e.OrderId)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("orderId");

                entity.Property(e => e.PaymentId)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("paymentId");

                entity.Property(e => e.PlanType)
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("planType");

                entity.Property(e => e.TransactionTime)
                    .HasColumnType("datetime")
                    .HasColumnName("transactionTime");

                entity.Property(e => e.Uid).HasColumnName("uid");

                //entity.HasOne(d => d.UidNavigation)
                //    .WithMany(p => p.DepositPayments)
                //    .HasForeignKey(d => d.Uid)
                //    .OnDelete(DeleteBehavior.Cascade)
                //    .HasConstraintName("FK__Deposit_Pay__uid__38996AB5");
            });

            modelBuilder.Entity<HostAuction>(entity =>
            {
                entity.HasKey(e => e.Auctionid)
                    .HasName("PK__Host_Auc__64B08806978C27F6");

                entity.ToTable("Host_Auction");

                entity.Property(e => e.Auctionid).HasColumnName("auctionid");

                entity.Property(e => e.AuctionEnd)
                    .HasColumnType("datetime")
                    .HasColumnName("auction_end");

                entity.Property(e => e.AuctionStart)
                    .HasColumnType("datetime")
                    .HasColumnName("auction_start");

                entity.Property(e => e.BasePrice)
                    .HasColumnType("decimal(10, 2)")
                    .HasColumnName("base_price");

                entity.Property(e => e.RemoveSchedule).HasColumnName("removeSchedule");

                entity.Property(e => e.StartAuction).HasColumnName("startAuction");

                entity.Property(e => e.Vehicleid).HasColumnName("vehicleid");

                //entity.HasOne(d => d.Vehicle)
                //    .WithMany(p => p.HostAuctions)
                //    .HasForeignKey(d => d.Vehicleid)
                //    .HasConstraintName("FK__Host_Auct__vehic__30F848ED");
            });

            modelBuilder.Entity<PaymentTransaction>(entity =>
            {
                entity.HasKey(e => e.TransactionId)
                    .HasName("PK__Payment___85C600AF749737CD");

                entity.ToTable("Payment_Transaction");

                entity.HasIndex(e => e.UtrNo, "UQ__Payment___66060903A5240098")
                    .IsUnique();

                entity.Property(e => e.TransactionId).HasColumnName("transaction_id");

                entity.Property(e => e.Amt)
                    .HasColumnType("decimal(10, 2)")
                    .HasColumnName("amt");

                entity.Property(e => e.TransactionDate)
                    .HasColumnType("date")
                    .HasColumnName("transaction_date");

                entity.Property(e => e.Uid).HasColumnName("uid");

                entity.Property(e => e.UtrNo)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("utr_no");

                //entity.HasOne(d => d.UidNavigation)
                //    .WithMany(p => p.PaymentTransactions)
                //    .HasForeignKey(d => d.Uid)
                //    .OnDelete(DeleteBehavior.Cascade)
                //    .HasConstraintName("FK__Payment_Tra__uid__48CFD27E");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Uid)
                    .HasName("PK__Users__DD7012641AEC90EB");

                entity.HasIndex(e => e.Uemail, "UQ__Users__D92E5BC030030981")
                    .IsUnique();

                entity.Property(e => e.Uid).HasColumnName("uid");

                entity.Property(e => e.AccessStatus)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("access_status")
                    .HasDefaultValueSql("('Active')");

                entity.Property(e => e.AccountHolderName)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("account_holder_name");

                entity.Property(e => e.Address)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("address");

                entity.Property(e => e.BankAccNo)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("bank_acc_no");

                entity.Property(e => e.BankBranch)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("bank_branch");

                entity.Property(e => e.Bankname)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("bankname");

                entity.Property(e => e.IfscCode)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("ifsc_code");

                entity.Property(e => e.MobNo)
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .HasColumnName("mob_no");

                entity.Property(e => e.PanCard)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("pan_card")
                    .IsFixedLength();

                entity.Property(e => e.Role)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("role");

                entity.Property(e => e.Uemail)
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasColumnName("uemail");

                entity.Property(e => e.UfirstName)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("ufirstName");

                entity.Property(e => e.UlastName)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("ulastName");

                entity.Property(e => e.Uname)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("uname");

                entity.Property(e => e.Upwd)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("upwd");
            });

            modelBuilder.Entity<WinnerTable>(entity =>
            {
                entity.HasKey(e => new { e.AllowedUserUid, e.VehicleId, e.AuctionId })
                    .HasName("PK__WinnerTa__A48A05F2856DED07");

                entity.ToTable("WinnerTable");

                entity.Property(e => e.AllowedUserUid)
                    .HasColumnName("allowed_user_uid")
                    .HasColumnType("int");

                entity.Property(e => e.VehicleId)
                    .HasColumnName("vehicleId")
                    .HasColumnType("int");

                entity.Property(e => e.AuctionId)
                    .HasColumnName("auctionId")
                    .HasColumnType("int");

                entity.Property(e => e.AuctionEndDate)
                    .HasColumnName("auctionEndDate")
                    .HasColumnType("datetime");
            });

            OnModelCreatingPartial(modelBuilder);

        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
