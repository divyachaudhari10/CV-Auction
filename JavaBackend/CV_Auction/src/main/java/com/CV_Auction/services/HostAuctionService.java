package com.CV_Auction.services;

import com.CV_Auction.beans.HostAuction;
import com.CV_Auction.daos.HostAuctionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
    public HostAuction addNew(HostAuction hostAuction) {
        HostAuction response = hostAuctionRepo.save(hostAuction);
        return response;
    }

    public boolean deleteById(int id) {
        Optional<HostAuction> response = hostAuctionRepo.findById(id);
        if(response.isPresent()){
            HostAuction del = response.get();
            hostAuctionRepo.delete(del);
            return true;
        }
        return false;
    }
}
