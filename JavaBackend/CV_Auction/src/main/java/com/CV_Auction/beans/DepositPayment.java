package com.CV_Auction.beans;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "depositpayment")
public class DepositPayment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int paymentno;

    @Column(nullable = false)
    private Integer uid;

    @Column(nullable = false)
    private LocalDateTime transactiontime;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amt;

    @Column(nullable = false, unique = true, length = 100)
    private String paymentid;

    @Column(nullable = false, unique = true, length = 100)
    private String orderid;

    @Column(nullable = false, length = 50)
    private String plantype;

    public DepositPayment() {}

    public DepositPayment(int paymentno, Integer uid, LocalDateTime transactiontime, BigDecimal amt, String paymentid, String orderid, String plantype) {
        this.paymentno = paymentno;
        this.uid = uid;
        this.transactiontime = transactiontime;
        this.amt = amt;
        this.paymentid = paymentid;
        this.orderid = orderid;
        this.plantype = plantype;
    }

    public int getPaymentno() {
        return paymentno;
    }

    public void setPaymentno(int paymentno) {
        this.paymentno = paymentno;
    }

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public LocalDateTime getTransactiontime() {
        return transactiontime;
    }

    public void setTransactiontime(LocalDateTime transactiontime) {
        this.transactiontime = transactiontime;
    }

    public BigDecimal getAmt() {
        return amt;
    }

    public void setAmt(BigDecimal amt) {
        this.amt = amt;
    }

    public String getPaymentid() {
        return paymentid;
    }

    public void setPaymentid(String paymentid) {
        this.paymentid = paymentid;
    }

    public String getOrderid() {
        return orderid;
    }

    public void setOrderid(String orderid) {
        this.orderid = orderid;
    }

    public String getPlantype() {
        return plantype;
    }

    public void setPlantype(String plantype) {
        this.plantype = plantype;
    }
}
