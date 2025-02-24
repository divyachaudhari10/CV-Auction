package com.CV_Auction.services;

import com.CV_Auction.beans.Vehicle;
import com.CV_Auction.beans.WinResponse;
import com.CV_Auction.beans.WinnerTable;
import com.CV_Auction.daos.AuctionStatusTrackRepo;
import com.CV_Auction.daos.VehicleRepo;
import com.CV_Auction.daos.WinnerTableRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class WinsService {
    @Autowired
    WinnerTableRepo winnerTableRepo;
    @Autowired
    VehicleRepo vehicleRepo;
    @Autowired
    AuctionStatusTrackRepo auctionStatusTrackRepo;
    public List<WinResponse> getWins(int uid) {
        List<WinnerTable> wins = winnerTableRepo.findByAllowedUserUid(uid);
        List<WinResponse> list = new ArrayList<>();

        for (WinnerTable wTable : wins) {
            Vehicle vehicle = vehicleRepo.getByVehicleId(wTable.getVehicleid());
            Long highestBid = auctionStatusTrackRepo.finalAmount(uid, wTable.getAuctionid());

            if (vehicle != null) {
                list.add(new WinResponse(
                        vehicle.getModelname(),  vehicle.getManufacname(),
                        vehicle.getRegno(),  wTable.getAuctionid(),  highestBid != null ? highestBid : 0L ));
            }
        }
        return !list.isEmpty() ? list : null;
    }


}
