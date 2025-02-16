package com.CV_Auction.beans;

import jakarta.persistence.*;

@Entity
@Table(name = "alloweduser")
public class AllowedUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int uid;
    private int paymentno;
    private int  auctionaccessleft;

    public AllowedUser() {}
    public AllowedUser(int uid, int paymentno, int auctionaccessleft) {
        this.uid = uid;
        this.paymentno = paymentno;
        this.auctionaccessleft = auctionaccessleft;
    }

    public int getUid() {
        return uid;
    }

    public void setUid(int uid) {
        this.uid = uid;
    }

    public int getPaymentno() {
        return paymentno;
    }

    public void setPaymentno(int paymentno) {
        this.paymentno = paymentno;
    }

    public int getAuctionaccessleft() {
        return auctionaccessleft;
    }

    public void setAuctionaccessleft(int auctionaccessleft) {
        this.auctionaccessleft = auctionaccessleft;
    }
}
