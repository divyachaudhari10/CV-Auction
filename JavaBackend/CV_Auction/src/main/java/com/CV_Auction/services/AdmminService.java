package com.CV_Auction.services;

import com.CV_Auction.beans.Admin;
import com.CV_Auction.daos.AdminRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdmminService {
    @Autowired
    AdminRepo adminRepo;

    public List<Admin> getAll(){
        List<Admin> admin = adminRepo.findAll();
        if(admin.isEmpty()){
            return null;
        }
        return admin;
    }

}
