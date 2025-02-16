package com.CV_Auction.controllers;

import com.CV_Auction.beans.Vehicle;
import com.CV_Auction.services.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/vehicle")
public class VehicleController {

    @Autowired
    VehicleService vehicleService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        List<Vehicle> ans = vehicleService.getAll();
        if(ans == null){
            return new ResponseEntity<>("No vehicle found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(ans,HttpStatus.OK);
    }

}
