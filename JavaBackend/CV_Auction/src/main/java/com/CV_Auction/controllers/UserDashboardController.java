package com.CV_Auction.controllers;

import com.CV_Auction.beans.User;
import com.CV_Auction.beans.UserDashboardResponse;
import com.CV_Auction.services.UserDashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/userdashboard")
public class UserDashboardController {

    @Autowired
    UserDashboardService userDashboardService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getDashboard(@PathVariable int id){
        UserDashboardResponse ud = userDashboardService.getUserInfo(id);
        if(ud == null){
            return new ResponseEntity<>("No user with this id ", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(ud,HttpStatus.OK);
    }

}
