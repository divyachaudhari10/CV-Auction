package com.CV_Auction.beans;

public class LoginRequest {
    private String uemail;
    private String upwd;
    public LoginRequest() {}
    public LoginRequest(String uemail, String upwd) {
        this.uemail = uemail;
        this.upwd = upwd;
    }

    public String getUemail() {
        return uemail;
    }

    public void setUemail(String uemail) {
        this.uemail = uemail;
    }

    public String getUpwd() {
        return upwd;
    }

    public void setUpwd(String upwd) {
        this.upwd = upwd;
    }
}
