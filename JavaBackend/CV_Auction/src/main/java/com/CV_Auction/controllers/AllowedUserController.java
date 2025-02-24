package com.CV_Auction.controllers;

import com.CV_Auction.beans.AllowedUser;
import com.CV_Auction.services.AllowedUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/allowedUsers")
public class AllowedUserController {

    @Autowired
    AllowedUserService allowedUserService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        List<AllowedUser> list = allowedUserService.getAll();
        if(list == null){
            return new ResponseEntity<>("No alloweduser found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(list,HttpStatus.OK);
    }
}
