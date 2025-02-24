package com.CV_Auction.beans;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "hostauction")
public class HostAuction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int auctionid;
    private int vehicleid;

    private int baseprice;
    private LocalDate auctionstart;
    private LocalDate auctionend;
    @Column(name = "removeschedule")
    private boolean removeschedule;

    @Column(name = "startauction")
    private boolean startauction;

    public HostAuction() {}
    public HostAuction(int auctionid, int vehicleid, int baseprice, LocalDate auctionstart, LocalDate auctionend, boolean removeschedule, boolean startauction) {
        this.auctionid = auctionid;
        this.vehicleid = vehicleid;
        this.baseprice = baseprice;
        this.auctionstart = auctionstart;
        this.auctionend = auctionend;
        this.removeschedule = removeschedule;
        this.startauction = startauction;
    }

    public int getAuctionid() {
        return auctionid;
    }

    public void setAuctionid(int auctionid) {
        this.auctionid = auctionid;
    }

    public int getVehicleid() {
        return vehicleid;
    }

    public void setVehicleid(int vehicleid) {
        this.vehicleid = vehicleid;
    }

    public int getBaseprice() {
        return baseprice;
    }

    public void setBaseprice(int baseprice) {
        this.baseprice = baseprice;
    }

    public LocalDate getAuctionstart() {
        return auctionstart;
    }

    public void setAuctionstart(LocalDate auctionstart) {
        this.auctionstart = auctionstart;
    }

    public LocalDate getAuctionend() {
        return auctionend;
    }

    public void setAuctionend(LocalDate auctionend) {
        this.auctionend = auctionend;
    }

    public boolean isRemoveschedule() {
        return removeschedule;
    }

    public void setRemoveschedule(boolean removeschedule) {
        this.removeschedule = removeschedule;
    }

    public boolean isStartauction() {
        return startauction;
    }

    public void setStartauction(boolean startauction) {
        this.startauction = startauction;
    }
}
