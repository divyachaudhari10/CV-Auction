package com.CV_Auction.services;

import com.CV_Auction.beans.User;
import com.CV_Auction.daos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    UserRepo repo;

    public List<User> getAllUsers(){
        List<User> ans = repo.findAll();
        return ans.isEmpty() ? null : ans;
    }

}
