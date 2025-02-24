package com.CV_Auction.beans;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "currentauction")
@IdClass(CurrentAuctionId.class)
public class CurrentAuction {

    @Id
    private int vehicleid;

    @Id
    private int auctionid;

    private long baseprice;
    private long highestbid;
    private LocalDateTime auctionstart;
    private LocalDateTime auctionend;

    private boolean isended;

    public CurrentAuction() {}

    public CurrentAuction(int vehicleid, int auctionid, long baseprice, long highestbid, LocalDateTime auctionstart, LocalDateTime auctionend,boolean isEnded) {
        this.vehicleid = vehicleid;
        this.auctionid = auctionid;
        this.baseprice = baseprice;
        this.highestbid = highestbid;
        this.auctionstart = auctionstart;
        this.auctionend = auctionend;
        this.isended = isEnded;
    }
    public int getVehicleid() {
        return vehicleid;
    }

    public boolean isEnded() {
        return isended;
    }

    public void setEnded(boolean ended) {
        isended = ended;
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

    public long getBaseprice() {
        return baseprice;
    }

    public void setBaseprice(long baseprice) {
        this.baseprice = baseprice;
    }

    public long getHighestbid() {
        return highestbid;
    }

    public void setHighestbid(long highestbid) {
        this.highestbid = highestbid;
    }

    public LocalDateTime getAuctionstart() {
        return auctionstart;
    }

    public void setAuctionstart(LocalDateTime auctionstart) {
        this.auctionstart = auctionstart;
    }

    public LocalDateTime getAuctionend() {
        return auctionend;
    }

    public void setAuctionend(LocalDateTime auctionend) {
        this.auctionend = auctionend;
    }
}

