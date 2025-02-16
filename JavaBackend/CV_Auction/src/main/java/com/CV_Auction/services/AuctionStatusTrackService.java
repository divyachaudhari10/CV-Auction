package com.CV_Auction.services;

import com.CV_Auction.beans.AuctionStatusTrack;
import com.CV_Auction.daos.AuctionStatusTrackRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuctionStatusTrackService {
    @Autowired
    AuctionStatusTrackRepo auctionStatusTrackRepo;

    public List<AuctionStatusTrack> getAll(){
        List<AuctionStatusTrack> list = auctionStatusTrackRepo.findAll();
        if (list.isEmpty()){
            return null;
        }
        return list;
    }


}
