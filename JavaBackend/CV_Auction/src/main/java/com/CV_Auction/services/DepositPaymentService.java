package com.CV_Auction.services;

import com.CV_Auction.beans.DepositPayment;
import com.CV_Auction.daos.DepositRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepositPaymentService {

    @Autowired
    DepositRepo depositRepo;

    public List<DepositPayment> getAll(){
        List<DepositPayment> ans = depositRepo.findAll();
        if(ans.isEmpty()){
            return null;
        }
        return ans;
    }

}
