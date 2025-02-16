package com.CV_Auction.beans;

import jakarta.persistence.*;

@Entity
@Table(name = "auctionstatustrack")
@IdClass(AuctionStatusId.class)
public class AuctionStatusTrack {

    @Id
    private int alloweduseruid;
    @Id
    private int vehicleid;
    @Id
    private int auctionid;

    private int userbidleft;
    private long priceoffered;
    private int highestbidder;

    @Column(name = "auctionend")
    private boolean auctionend;

    public AuctionStatusTrack() {}

    public AuctionStatusTrack(int alloweduseruid, int vehicleid, int auctionid, int userbidleft, long priceoffered, int highestbidder, boolean auctionend) {
        this.alloweduseruid = alloweduseruid;
        this.vehicleid = vehicleid;
        this.auctionid = auctionid;
        this.userbidleft = userbidleft;
        this.priceoffered = priceoffered;
        this.highestbidder = highestbidder;
        this.auctionend = auctionend;
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

    public int getUserbidleft() {
        return userbidleft;
    }

    public void setUserbidleft(int userbidleft) {
        this.userbidleft = userbidleft;
    }

    public long getPriceoffered() {
        return priceoffered;
    }

    public void setPriceoffered(long priceoffered) {
        this.priceoffered = priceoffered;
    }

    public int getHighestbidder() {
        return highestbidder;
    }

    public void setHighestbidder(int highestbidder) {
        this.highestbidder = highestbidder;
    }

    public boolean isAuctionend() {
        return auctionend;
    }

    public void setAuctionend(boolean auctionend) {
        this.auctionend = auctionend;
    }
}
