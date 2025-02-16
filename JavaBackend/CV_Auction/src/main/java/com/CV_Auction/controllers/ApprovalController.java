package com.CV_Auction.controllers;

import com.CV_Auction.beans.Approvals;
import com.CV_Auction.services.ApprovalsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/approvals")
public class ApprovalController {
    @Autowired
    ApprovalsService approvalsService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        List<Approvals> list = approvalsService.getAll();
        if(list == null){
            return  new ResponseEntity<>("No approvals found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

}
