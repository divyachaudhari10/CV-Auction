package com.CV_Auction.controllers;

import com.CV_Auction.beans.LiveForUser;
import com.CV_Auction.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/userslive")
public class UsersLiveAuctions {

    @Autowired
    UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getAllLive(@PathVariable int id){
        List<LiveForUser> list = userService.getLiveForUser(id);
        if(list.isEmpty()){
            return new ResponseEntity<>("No Live available check in buy leads", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(list,HttpStatus.OK);
    }

}
