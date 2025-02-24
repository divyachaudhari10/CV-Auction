package com.CV_Auction.controllers;

import com.CV_Auction.beans.HostAuction;
import com.CV_Auction.services.HostAuctionService;
import jakarta.persistence.GeneratedValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/hostauction")
public class HostAuctionController {

    @Autowired
    HostAuctionService hostAuctionService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        List<HostAuction> list = hostAuctionService.getAll();
        if(list == null){
            return new ResponseEntity<>("No Auction found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(list,HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> addNew(@RequestBody HostAuction hostAuction){
        HostAuction response = hostAuctionService.addNew(hostAuction);
        if(response == null){
            return new ResponseEntity<>("operation failed",HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id){
        boolean deleted = hostAuctionService.deleteById(id);
        if(deleted){
            return new ResponseEntity<>(true,HttpStatus.OK);
        }
        return new ResponseEntity<>("operation failed",HttpStatus.NOT_FOUND);
    }

}
