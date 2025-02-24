package com.CV_Auction.services;

import com.CV_Auction.beans.Admin;
import com.CV_Auction.daos.AdminRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public Admin saveAddmin(Admin request) {
        Admin admin = adminRepo.save(request);
        return admin != null ? admin : null;
    }

    public Admin updateAdmin(int aid, Admin request) {
        Admin admin = adminRepo.getById(aid);
        if(admin == null){
            return null;
        }
        admin.setName(request.getName());
        admin.setEmail(request.getEmail());
        admin.setPassword(request.getPassword());
        Admin response = adminRepo.save(admin);
        return response;
    }

    public boolean delete(int id) {
        Optional<Admin> optional = adminRepo.findById(id);
        if(optional.isPresent()){
            Admin admin = optional.get();
            adminRepo.delete(admin);
            return true;
        }
        return false;
    }
}
