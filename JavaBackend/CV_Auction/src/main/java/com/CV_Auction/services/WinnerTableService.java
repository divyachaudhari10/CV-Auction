package com.CV_Auction.services;

import com.CV_Auction.beans.WinnerTable;
import com.CV_Auction.daos.WinnerTableRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WinnerTableService {
    @Autowired
    WinnerTableRepo winnerTableRepo;

    public List<WinnerTable> getAll(){
        List<WinnerTable> list = winnerTableRepo.findAll();
        if(list.isEmpty())return null;
        return list;
    }
}
