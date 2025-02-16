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

    public WinnerTable(int winnerid, int alloweduseruid, int vehicleid, int auctionid, LocalDate auctionenddate) {
        this.winnerid = winnerid;
        this.alloweduseruid = alloweduseruid;
        this.vehicleid = vehicleid;
        this.auctionid = auctionid;
        this.auctionenddate = auctionenddate;
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
