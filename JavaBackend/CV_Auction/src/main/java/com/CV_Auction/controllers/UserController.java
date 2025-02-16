package com.CV_Auction.controllers;

import com.CV_Auction.beans.User;
import com.CV_Auction.services.UserService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping
    public ResponseEntity<?> getUsers(){
        List<User> ans = userService.getAllUsers();
        if(ans == null){
            return  new ResponseEntity<>("No user found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(ans, HttpStatus.OK);
    }


}
