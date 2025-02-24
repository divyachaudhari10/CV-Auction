package com.CV_Auction.services;

import com.CV_Auction.beans.Approvals;
import com.CV_Auction.daos.ApprovalsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ApprovalsService {
    @Autowired
    ApprovalsRepo approvalsRepo;

    public List<Approvals> getAll(){
        List<Approvals> list = approvalsRepo.findAll();
        if(list.isEmpty()) {
            return null;
        }
        return list;
    }

    public boolean reject(int id) {
        Optional<Approvals> optional = approvalsRepo.findById(id);
        if(optional.isPresent()){
            Approvals approvals = optional.get();
            approvalsRepo.delete(approvals);
            return true;
        }
        return false;
    }
}
