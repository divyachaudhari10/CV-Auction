package com.CV_Auction.controllers;

import com.CV_Auction.beans.LoginRequest;
import com.CV_Auction.beans.User;
import com.CV_Auction.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    UserService userService;

    @PostMapping
    public ResponseEntity<?> verifyUser(@RequestBody LoginRequest request){
        User user = userService.getUserByRequest(request);
        if(user == null){
            return new ResponseEntity<>("Email or password is wrong", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(user,HttpStatus.OK);
    }

}
