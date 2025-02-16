package com.CV_Auction.beans;
import jakarta.persistence.*;

@Entity
@Table(name = "admin")
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int aid;

    @Column(nullable = false, length = 100)
    private String aname;

    @Column(nullable = false, length = 255)
    private String apwd;

    @Column(nullable = false, unique = true, length = 150)
    private String aemail;

    public Admin() {}

    public Admin(int id, String name, String password, String email) {
        this.aid = id;
        this.aname = name;
        this.apwd = password;
        this.aemail = email;
    }

    public int getId() {
        return aid;
    }

    public void setId(int id) {
        this.aid = id;
    }

    public String getName() {
        return aname;
    }

    public void setName(String name) {
        this.aname = name;
    }

    public String getPassword() {
        return apwd;
    }

    public void setPassword(String password) {
        this.apwd = password;
    }

    public String getEmail() {
        return aemail;
    }

    public void setEmail(String email) {
        this.aemail = email;
    }
}
