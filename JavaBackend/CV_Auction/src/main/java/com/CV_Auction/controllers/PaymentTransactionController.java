package com.CV_Auction.controllers;

import com.CV_Auction.beans.PaymentTransaction;
import com.CV_Auction.services.PaymentTransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/payments")
public class PaymentTransactionController {
    @Autowired
    PaymentTransactionService paymentTransactionService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        List<PaymentTransaction> list = paymentTransactionService.getAll();
        if(list == null)
        {
            return new ResponseEntity<>("No transaction found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(list,HttpStatus.OK);
    }


}
