package com.CV_Auction.controllers;

import com.CV_Auction.beans.CurrentAuction;
import com.CV_Auction.services.CurrentAuctionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/current")
public class CurrentAuctionController {
    @Autowired
    CurrentAuctionService currentAuctionService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        List<CurrentAuction> list = currentAuctionService.getAll();
        if(list == null){
            return new ResponseEntity<>("No current auction found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(list,HttpStatus.OK);
    }

}
