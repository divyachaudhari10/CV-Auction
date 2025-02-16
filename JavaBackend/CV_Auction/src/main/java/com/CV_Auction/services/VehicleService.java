package com.CV_Auction.services;

import com.CV_Auction.beans.Vehicle;
import com.CV_Auction.daos.VehicleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleService {

    @Autowired
    VehicleRepo vehicleRepo;

    public List<Vehicle> getAll(){
        List<Vehicle> ans = vehicleRepo.findAll();
        if(ans.isEmpty()){
            return null;
        }
        return ans;
    }
}
