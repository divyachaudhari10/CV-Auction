using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace CV_Auction099.Models
{
    public partial class AllVehiclesDetail
    {
        //public AllVehiclesDetail()
        //{
        //    CurrentAuctions = new HashSet<CurrentAuction>();
        //    HostAuctions = new HashSet<HostAuction>();
        //}

        public int Vehicleid { get; set; }
        public string RegNo { get; set; } = null!;
        public int RegYear { get; set; }
        public string ManufacName { get; set; } = null!;
        public string ModelName { get; set; } = null!;
        public string? FuelType { get; set; }
        public string? Insurance { get; set; }
        public int? KmDriven { get; set; }
        public string? RtoPassing { get; set; }
        public int YearOfManufacturing { get; set; }
        public string? ParkingLocation { get; set; }
        public string? ImgUrls { get; set; }
        public string? PdfReportUrl { get; set; }

        //[JsonIgnore]
        //public virtual ICollection<CurrentAuction> CurrentAuctions { get; set; }
        //[JsonIgnore]
        //public virtual ICollection<HostAuction> HostAuctions { get; set; }
    }
}
