package com.CV_Auction.services;

import com.CV_Auction.beans.HostAuction;
import com.CV_Auction.daos.HostAuctionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HostAuctionService {

    @Autowired
    HostAuctionRepo hostAuctionRepo;

    public List<HostAuction> getAll(){
        List<HostAuction> list = hostAuctionRepo.findAll();
        if(list.isEmpty()){
            return null;
        }
        return list;
    }
}
