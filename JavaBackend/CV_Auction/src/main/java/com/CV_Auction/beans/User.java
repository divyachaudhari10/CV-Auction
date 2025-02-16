package com.CV_Auction.beans;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int uid;

    private String ufirstname;
    private String ulastname;
    private String uname;
    private String role;
    private String upwd;
    private String uemail;

    @Column(name = "mobno", nullable = false)
    private String mobNo;

    @Column(name = "pancard", length = 10, nullable = false)
    private String pancard;

    @Column(name = "address")
    private String address;

    @Column(name = "bankaccno", unique = true)
    private String bankaccno;

    @Column(name = "bankname")
    private String bankname;

    @Column(name = "bankbranch")
    private String bankBranch;

    @Column(name = "accountholdername")
    private String accountHolderName;

    @Column(name = "ifsccode")
    private String ifscCode;

    @Column(name = "accessstatus", columnDefinition = "VARCHAR(10) DEFAULT 'active'")
    private String accessStatus;

    public User() {}

    public User(int uid, String ufirstName, String ulastName, String uname, String role, String upwd, String uemail, String mobNo, String panCard, String address, String bankAccNo, String bankname, String bankBranch, String accountHolderName, String ifscCode, String accessStatus) {
        this.uid = uid;
        this.ufirstname = ufirstName;
        this.ulastname = ulastName;
        this.uname = uname;
        this.role = role;
        this.upwd = upwd;
        this.uemail = uemail;
        this.mobNo = mobNo;
        this.pancard = panCard;
        this.address = address;
        this.bankaccno = bankAccNo;
        this.bankname = bankname;
        this.bankBranch = bankBranch;
        this.accountHolderName = accountHolderName;
        this.ifscCode = ifscCode;
        this.accessStatus = accessStatus;
    }

    public int getUid() {
        return uid;
    }

    public void setUid(int uid) {
        this.uid = uid;
    }

    public String getUfirstName() {
        return ufirstname;
    }

    public void setUfirstName(String ufirstName) {
        this.ufirstname = ufirstName;
    }

    public String getUlastName() {
        return ulastname;
    }

    public void setUlastName(String ulastName) {
        this.ulastname = ulastName;
    }

    public String getUname() {
        return uname;
    }

    public void setUname(String uname) {
        this.uname = uname;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getUpwd() {
        return upwd;
    }

    public void setUpwd(String upwd) {
        this.upwd = upwd;
    }

    public String getUemail() {
        return uemail;
    }

    public void setUemail(String uemail) {
        this.uemail = uemail;
    }

    public String getMobNo() {
        return mobNo;
    }

    public void setMobNo(String mobNo) {
        this.mobNo = mobNo;
    }

    public String getPan_card() {
        return pancard;
    }

    public void setPan_card(String pan_card) {
        this.pancard = pan_card;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getBankAccNo() {
        return bankaccno;
    }

    public void setBankAccNo(String bankAccNo) {
        this.bankaccno = bankAccNo;
    }

    public String getBankname() {
        return bankname;
    }

    public void setBankname(String bankname) {
        this.bankname = bankname;
    }

    public String getBankBranch() {
        return bankBranch;
    }

    public void setBankBranch(String bankBranch) {
        this.bankBranch = bankBranch;
    }

    public String getAccountHolderName() {
        return accountHolderName;
    }

    public void setAccountHolderName(String accountHolderName) {
        this.accountHolderName = accountHolderName;
    }

    public String getIfscCode() {
        return ifscCode;
    }

    public void setIfscCode(String ifscCode) {
        this.ifscCode = ifscCode;
    }

    public String getAccessStatus() {
        return accessStatus;
    }

    public void setAccessStatus(String accessStatus) {
        this.accessStatus = accessStatus;
    }
}
