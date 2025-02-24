package com.CV_Auction.controllers;

import com.CV_Auction.beans.DepositPayment;
import com.CV_Auction.services.DepositPaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/deposit")
public class DepositPaymentController {

    @Autowired
    DepositPaymentService depositPaymentService;

    @GetMapping
    public ResponseEntity<?> getDeposits(){
        List<DepositPayment> list = depositPaymentService.getAll();
        if(list == null){
            return new ResponseEntity<>("Not added in deposit table", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(list,HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> saveDeposit(@RequestBody DepositPayment depositPayment){
        DepositPayment depositPayment1 = depositPaymentService.save(depositPayment);
        if(depositPayment == null){
            return new ResponseEntity<>("Unable to save patment",HttpStatus.NOT_ACCEPTABLE);
        }
        return new ResponseEntity<>(depositPayment,HttpStatus.OK);
    }

}
