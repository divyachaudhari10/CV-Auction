package com.CV_Auction.beans;

public class WinResponse {
    private String modelName;
    private String brandName;
    private String registerNo;
    private int auctionId;
    private long bidAmount;

    public WinResponse() {}
    public WinResponse(String modelName, String brandName, String registerNo, int auctionId, long bidAmount) {
        this.modelName = modelName;
        this.brandName = brandName;
        this.registerNo = registerNo;
        this.auctionId = auctionId;
        this.bidAmount = bidAmount;
    }
    public String getModelName() {
        return modelName;
    }

    public void setModelName(String modelName) {
        this.modelName = modelName;
    }

    public String getBrandName() {
        return brandName;
    }

    public void setBrandName(String brandName) {
        this.brandName = brandName;
    }

    public String getRegisterNo() {
        return registerNo;
    }

    public void setRegisterNo(String registerNo) {
        this.registerNo = registerNo;
    }

    public int getAuctionId() {
        return auctionId;
    }

    public void setAuctionId(int auctionId) {
        this.auctionId = auctionId;
    }

    public long getBidAmount() {
        return bidAmount;
    }

    public void setBidAmount(int bidAmount) {
        this.bidAmount = bidAmount;
    }
}

