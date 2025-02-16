package com.CV_Auction.services;

import com.CV_Auction.beans.CurrentAuction;
import com.CV_Auction.daos.CurrentAuctionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CurrentAuctionService {
    @Autowired
    CurrentAuctionRepo currentAuctionRepo;

    public List<CurrentAuction> getAll(){
        List<CurrentAuction> list = currentAuctionRepo.findAll();
        if(list.isEmpty()){
            return null;
        }
        return list;
    }
}
