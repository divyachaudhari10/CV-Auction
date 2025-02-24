package com.CV_Auction.beans;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name = "admin")
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int aid;
    private String aname;
    private String apwd;
    private String aemail;
    public Admin() {}

    public Admin(int id, String name, String password, String email) {
        this.aid = id;
        this.aname = name;
        this.apwd = password;
        this.aemail = email;
    }

    public int getAid() {
        return aid;
    }

    public void setAid(int aid) {
        this.aid = aid;
    }

    public String getEmail() { return aemail; }
    @JsonProperty("aemail")
    public void setEmail(String email) { this.aemail = email; }

    public String getPassword() { return apwd; }

    @JsonProperty("apwd")
    public void setPassword(String password) { this.apwd = password; }

    public String getName() { return aname; }

    @JsonProperty("aname")
    public void setName(String name) { this.aname = name; }

}
