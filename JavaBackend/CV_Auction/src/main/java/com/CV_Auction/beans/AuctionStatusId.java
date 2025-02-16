package com.CV_Auction.beans;

import java.io.Serializable;
import java.util.Objects;

public class AuctionStatusId implements Serializable {
    private int alloweduseruid;
    private int vehicleid;
    private int auctionid;

    public AuctionStatusId() {}

    public AuctionStatusId(int alloweduseruid, int vehicleid, int auctionid) {
        this.alloweduseruid = alloweduseruid;
        this.vehicleid = vehicleid;
        this.auctionid = auctionid;
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AuctionStatusId that = (AuctionStatusId) o;
        return alloweduseruid == that.alloweduseruid &&
                vehicleid == that.vehicleid &&
                auctionid == that.auctionid;
    }

    @Override
    public int hashCode() {
        return Objects.hash(alloweduseruid, vehicleid, auctionid);
    }
}
