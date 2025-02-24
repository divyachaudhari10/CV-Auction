package com.CV_Auction.controllers;

import com.CV_Auction.services.UtilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/utils")
public class UtilityController {

    @Autowired
    UtilityService utilityService;
    @GetMapping("/userbidleft/{id}")
    public ResponseEntity<?> getBidsLeft(@PathVariable int id){
        int bidsLeft = utilityService.getBids(id);
        return new ResponseEntity<>(bidsLeft, HttpStatus.OK);
    }

}
