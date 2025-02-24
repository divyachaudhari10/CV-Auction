package com.CV_Auction.beans;

public class LiveForUser {
    private String brandname;
    private String modelname;
    private long baseprice;
    private long highestbid;
    private String auctionend;
    private String auctionstart;
    private int auctionid;

    public LiveForUser() {}
    public LiveForUser(String brandname, String modelname, long baseprice, long highestbid, String auctionend, String auctionstart, int auctionid) {
        this.brandname = brandname;
        this.modelname = modelname;
        this.baseprice = baseprice;
        this.highestbid = highestbid;
        this.auctionend = auctionend;
        this.auctionstart = auctionstart;
        this.auctionid = auctionid;
    }

    public String getBrandname() {
        return brandname;
    }

    public void setBrandname(String brandname) {
        this.brandname = brandname;
    }

    public String getModelname() {
        return modelname;
    }

    public void setModelname(String modelname) {
        this.modelname = modelname;
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

    public String getAuctionend() {
        return auctionend;
    }

    public void setAuctionend(String auctionend) {
        this.auctionend = auctionend;
    }

    public String getAuctionstart() {
        return auctionstart;
    }

    public void setAuctionstart(String auctionstart) {
        this.auctionstart = auctionstart;
    }

    public int getAuctionid() {
        return auctionid;
    }

    public void setAuctionid(int auctionid) {
        this.auctionid = auctionid;
    }
}
