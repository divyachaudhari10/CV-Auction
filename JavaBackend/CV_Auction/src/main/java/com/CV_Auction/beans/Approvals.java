package com.CV_Auction.beans;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "approvals")
public class Approvals {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int approvalid;
    private int alloweduseruid;
    private int vehicleid;
    private int auctionid;
    private String vehiclename;
    private long bidamt;
    private int winnerid;
    private String approvalstatus;
    private LocalDate approvaldate;

    public Approvals() {}
    public Approvals(int approvalid, int alloweduseruid, int vehicleid, int auctionid, String vehiclename, long bidamt, int winnerid, String approvalstatus, LocalDate approvaldate) {
        this.approvalid = approvalid;
        this.alloweduseruid = alloweduseruid;
        this.vehicleid = vehicleid;
        this.auctionid = auctionid;
        this.vehiclename = vehiclename;
        this.bidamt = bidamt;
        this.winnerid = winnerid;
        this.approvalstatus = approvalstatus;
        this.approvaldate = approvaldate;
    }

    public int getApprovalid() {
        return approvalid;
    }

    public void setApprovalid(int approvalid) {
        this.approvalid = approvalid;
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

    public String getVehiclename() {
        return vehiclename;
    }

    public void setVehiclename(String vehiclename) {
        this.vehiclename = vehiclename;
    }

    public long getBidamt() {
        return bidamt;
    }

    public void setBidamt(long bidamt) {
        this.bidamt = bidamt;
    }

    public int getWinnerid() {
        return winnerid;
    }

    public void setWinnerid(int winnerid) {
        this.winnerid = winnerid;
    }

    public String getApprovalstatus() {
        return approvalstatus;
    }

    public void setApprovalstatus(String approvalstatus) {
        this.approvalstatus = approvalstatus;
    }

    public LocalDate getApprovaldate() {
        return approvaldate;
    }

    public void setApprovaldate(LocalDate approvaldate) {
        this.approvaldate = approvaldate;
    }
}
