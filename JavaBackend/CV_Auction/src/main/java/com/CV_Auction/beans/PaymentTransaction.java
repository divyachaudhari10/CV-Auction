package com.CV_Auction.beans;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "paymenttransaction")
public class PaymentTransaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int transactionid;
    private int uid;
    private LocalDate transactiondate;
    private int amt;
    private String utrno;

    public PaymentTransaction() {}

    public PaymentTransaction(int transactionid, int uid, LocalDate transactiondate, int amt, String utrno) {
        this.transactionid = transactionid;
        this.uid = uid;
        this.transactiondate = transactiondate;
        this.amt = amt;
        this.utrno = utrno;
    }

    public int getTransactionid() {
        return transactionid;
    }

    public void setTransactionid(int transactionid) {
        this.transactionid = transactionid;
    }

    public int getUid() {
        return uid;
    }

    public void setUid(int uid) {
        this.uid = uid;
    }

    public LocalDate getTransactiondate() {
        return transactiondate;
    }

    public void setTransactiondate(LocalDate transactiondate) {
        this.transactiondate = transactiondate;
    }

    public int getAmt() {
        return amt;
    }

    public void setAmt(int amt) {
        this.amt = amt;
    }

    public String getUtrno() {
        return utrno;
    }

    public void setUtrno(String utrno) {
        this.utrno = utrno;
    }
}
