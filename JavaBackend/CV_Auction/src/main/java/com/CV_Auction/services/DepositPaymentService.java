package com.CV_Auction.services;

import com.CV_Auction.beans.AllowedUser;
import com.CV_Auction.beans.DepositPayment;
import com.CV_Auction.daos.AllowedUserRepo;
import com.CV_Auction.daos.DepositRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class DepositPaymentService {

    @Autowired
    DepositRepo depositRepo;
    @Autowired
    AllowedUserRepo allowedUserRepo;

    public List<DepositPayment> getAll(){
        List<DepositPayment> ans = depositRepo.findAll();
        if(ans.isEmpty()){
            return null;
        }
        return ans;
    }
    public DepositPayment save(DepositPayment depositPayment) {
        Optional<AllowedUser> optional = allowedUserRepo.findById(depositPayment.getUid());
        if(optional.isPresent()){
            System.out.println("same in");
            AllowedUser allowedUser = optional.get();
            int bids = allowedUser.getAuctionaccessleft();
            if (depositPayment.getAmt().compareTo(BigDecimal.valueOf(10000)) == 0) {
                bids += 10;
                allowedUser.setAuctionaccessleft(bids);
            } else if (depositPayment.getAmt().compareTo(BigDecimal.valueOf(20000)) == 0) {
                bids += 20;
                allowedUser.setAuctionaccessleft(bids);
            }
            allowedUserRepo.save(allowedUser);
        }
        DepositPayment saved = depositRepo.save(depositPayment);
        return saved;
    }
}
