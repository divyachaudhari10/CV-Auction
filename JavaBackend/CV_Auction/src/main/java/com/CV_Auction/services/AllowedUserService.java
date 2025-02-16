package com.CV_Auction.services;

import com.CV_Auction.beans.AllowedUser;
import com.CV_Auction.daos.AllowedUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AllowedUserService {

    @Autowired
    AllowedUserRepo allowedUserRepo;

    public List<AllowedUser> getAll(){
        List<AllowedUser> ans = allowedUserRepo.findAll();
        if(ans.isEmpty()){
            return null;
        }
        return ans;
    }

}
