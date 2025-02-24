package com.CV_Auction.beans;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "winnertable")
public class WinnerTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int winnerid;

    private int alloweduseruid;
    private int vehicleid;
    private int auctionid;
    private LocalDate auctionenddate;
    @Version
    private Long version;

    public WinnerTable(int alloweduseruid, int vehicleid, int auctionid, LocalDate auctionenddate) {
        this.alloweduseruid = alloweduseruid;
        this.vehicleid = vehicleid;
        this.auctionid = auctionid;
        this.auctionenddate = auctionenddate;
    }


    public Long getVersion() {
        return version;
    }

    public void setVersion(Long version) {
        this.version = version;
    }

    public WinnerTable() {}

    public int getWinnerid() {
        return winnerid;
    }

    public void setWinnerid(int winnerid) {
        this.winnerid = winnerid;
    }

    public int getAlloweduseruid() {
        return alloweduseruid;
    }

    public void setAlloweduseruid(int alloweduseruid) {
        this.alloweduseruid = alloweduseruid;
    }

    public int getVehicleid() {
        return vehicleid;
    }

    public void setVehicleid(int vehicleid) {
        this.vehicleid = vehicleid;
    }

    public int getAuctionid() {
        return auctionid;
    }

    public void setAuctionid(int auctionid) {
        this.auctionid = auctionid;
    }

    public LocalDate getAuctionenddate() {
        return auctionenddate;
    }

    public void setAuctionenddate(LocalDate auctionenddate) {
        this.auctionenddate = auctionenddate;
    }
}
