package com.CV_Auction.services;

import com.CV_Auction.daos.AllowedUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UtilityService {

    @Autowired
    AllowedUserRepo allowedUserRepo;

    public int getBids(int id){
        Integer bids = allowedUserRepo.bidsLimit(id);
        return bids == null ? 0 : bids;
    }
}
