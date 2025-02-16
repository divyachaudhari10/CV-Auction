package com.CV_Auction.controllers;

import com.CV_Auction.beans.Admin;
import com.CV_Auction.services.AdmminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    AdmminService admminService;

    @GetMapping
    public ResponseEntity<?> getAdmins(){
        List<Admin> admins = admminService.getAll();
        if(admins == null){
            return new ResponseEntity<>("No admin found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(admins,HttpStatus.OK);
    }


}
