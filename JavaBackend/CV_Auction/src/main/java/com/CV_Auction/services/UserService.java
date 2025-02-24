package com.CV_Auction.services;

import com.CV_Auction.beans.*;
import com.CV_Auction.daos.AuctionStatusTrackRepo;
import com.CV_Auction.daos.CurrentAuctionRepo;
import com.CV_Auction.daos.UserRepo;
import com.CV_Auction.daos.VehicleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    UserRepo repo;
    @Autowired
    CurrentAuctionRepo currentAuctionRepo;
    @Autowired
    VehicleRepo vehicleRepo;
    @Autowired
    AuctionStatusTrackRepo auctionStatusTrackRepo;

    public List<User> getAllUsers(){
        List<User> ans = repo.findAll();
        return ans.isEmpty() ? null : ans;
    }

    public List<LiveForUser> getLiveForUser(int id){
        List<CurrentAuction> list = currentAuctionRepo.findAll();
        List<Integer> participatedIn = auctionStatusTrackRepo.findUserParticipation(id);

        List<CurrentAuction> forUsers = list.stream().filter(a -> !participatedIn.contains(a.getAuctionid())).collect(Collectors.toList());

        List<LiveForUser> finalAns = new ArrayList<>();
        for (CurrentAuction auction : forUsers){
            Vehicle vehicle = vehicleRepo.getByVehicleId(auction.getVehicleid());
            Long highestBid = auctionStatusTrackRepo.findMaxBid(auction.getAuctionid());

            if(vehicle != null){
                finalAns.add(
                        new LiveForUser(vehicle.getManufacname(),vehicle.getModelname(),auction.getBaseprice(),highestBid,
                                auction.getAuctionstart().toString(),auction.getAuctionend().toString(),auction.getAuctionid())
                );
            }

        }
        return finalAns;
    }

    public User getUserByRequest(LoginRequest request){
        User user = repo.getByEmail(request.getUemail());
        if(user == null){
            return null;
        }
        if(verifyed(user.getUpwd(),request.getUpwd())){
            return user;
        }
        return null;
    }
    private boolean verifyed(String pass,String requestPass){
        return pass.equals(requestPass);
    }
}