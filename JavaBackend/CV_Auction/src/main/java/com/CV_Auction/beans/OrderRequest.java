package com.CV_Auction.beans;

public class OrderRequest {
    private int amount;
    private String currency;

    public OrderRequest(int amount, String currency) {
        this.amount = amount;
        this.currency = currency;
    }

    public OrderRequest() {}

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }
}
