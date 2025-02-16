package com.CV_Auction.controllers;

import com.CV_Auction.beans.Vehicle;
import com.CV_Auction.beans.WinnerTable;
import com.CV_Auction.services.WinnerTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/winners")
public class WinnerTableController {
    @Autowired
    WinnerTableService winnerTableService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        List<WinnerTable> ans = winnerTableService.getAll();
        if(ans == null){
            return new ResponseEntity<>("No winner found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(ans,HttpStatus.OK);
    }
}
