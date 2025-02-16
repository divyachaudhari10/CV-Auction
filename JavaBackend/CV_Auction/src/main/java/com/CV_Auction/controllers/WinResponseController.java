package com.CV_Auction.controllers;

import com.CV_Auction.beans.WinResponse;
import com.CV_Auction.services.WinsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/winsbyuser")
public class WinResponseController {
    @Autowired
    WinsService winsService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getAll(@PathVariable int id){
        List<WinResponse> list = winsService.getWins(id);
        if(list == null){
            return new ResponseEntity<>("No wins yet", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(list,HttpStatus.OK);
    }

}