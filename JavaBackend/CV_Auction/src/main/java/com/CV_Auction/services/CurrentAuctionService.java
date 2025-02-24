package com.CV_Auction.services;

import com.CV_Auction.beans.CurrentAuction;
import com.CV_Auction.beans.WinnerTable;
import com.CV_Auction.daos.AuctionStatusTrackRepo;
import com.CV_Auction.daos.CurrentAuctionRepo;
import com.CV_Auction.daos.HostAuctionRepo;
import com.CV_Auction.daos.WinnerTableRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class CurrentAuctionService {
    @Autowired
    CurrentAuctionRepo currentAuctionRepo;
    @Autowired
    WinnerTableRepo winnerTableRepo;
    @Autowired
    AuctionStatusTrackRepo auctionStatusTrackRepo;

    public List<CurrentAuction> getAll(){
        List<CurrentAuction> list = currentAuctionRepo.findAll();
        if(list.isEmpty()){
            return null;
        }
        return list;
    }

    @Transactional
    public WinnerTable stopauction(int auctionid) {
        Optional<CurrentAuction> optional = currentAuctionRepo.findByAuctionId(auctionid);
        if(optional.isPresent()){
            CurrentAuction currentAuction = optional.get();
            currentAuction.setEnded(true);

            int highestBidderId = auctionStatusTrackRepo.getHighestBidder(currentAuction.getAuctionid());
            WinnerTable winnerTable = new WinnerTable( highestBidderId,
                    currentAuction.getVehicleid(),
                    currentAuction.getAuctionid(),
                    LocalDate.now()
            );

            winnerTableRepo.saveAndFlush(winnerTable);
            currentAuctionRepo.save(currentAuction);
            return winnerTable;
        }
        return null;
    }
}
