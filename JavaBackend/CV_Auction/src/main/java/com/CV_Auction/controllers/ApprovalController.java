package com.CV_Auction.controllers;

import com.CV_Auction.beans.Approvals;
import com.CV_Auction.services.ApprovalsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @DeleteMapping("/{approvalid}")
    public ResponseEntity<?> delete(@PathVariable int approvalid){
        boolean res = approvalsService.reject(approvalid);
        if(res){
            return new ResponseEntity<>("Rejected successfully",HttpStatus.OK);
        }
        return new ResponseEntity<>("Operation failed", HttpStatus.NOT_FOUND);
    }

}
