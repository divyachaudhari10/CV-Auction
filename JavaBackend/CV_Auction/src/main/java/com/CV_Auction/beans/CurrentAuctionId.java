package com.CV_Auction.beans;

import java.io.Serializable;
import java.util.Objects;

class CurrentAuctionId implements Serializable {
    private int vehicleid;
    private int auctionid;

    public CurrentAuctionId() {}

    public CurrentAuctionId(int vehicleid, int auctionid) {
        this.vehicleid = vehicleid;
        this.auctionid = auctionid;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CurrentAuctionId that = (CurrentAuctionId) o;
        return vehicleid == that.vehicleid && auctionid == that.auctionid;
    }

    @Override
    public int hashCode() {
        return Objects.hash(vehicleid, auctionid);
    }
}
