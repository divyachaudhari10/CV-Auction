package com.CV_Auction.controllers;

import com.CV_Auction.beans.AuctionStatusTrack;
import com.CV_Auction.services.AuctionStatusTrackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
    @RequestMapping("/auctionstatus")
public class AuctionStatusTrackController {

    @Autowired
    AuctionStatusTrackService auctionStatusTrackService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        List<AuctionStatusTrack> list = auctionStatusTrackService.getAll();
        if(list == null){
            return new ResponseEntity<>("No update found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(list,HttpStatus.OK);
    }

}
