package com.CV_Auction.services;

import com.CV_Auction.beans.PaymentTransaction;
import com.CV_Auction.daos.PaymentTransactionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentTransactionService {
    @Autowired
    PaymentTransactionRepo paymentTransactionRepo;

    public List<PaymentTransaction> getAll(){
        List<PaymentTransaction> list = paymentTransactionRepo.findAll();
        if(list.isEmpty()){
            return null;
        }
        return list;
    }
}
