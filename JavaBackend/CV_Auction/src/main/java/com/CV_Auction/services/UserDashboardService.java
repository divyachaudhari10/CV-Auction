package com.CV_Auction.services;

import com.CV_Auction.beans.UserDashboardResponse;
import com.CV_Auction.daos.AllowedUserRepo;
import com.CV_Auction.daos.AuctionStatusTrackRepo;
import com.CV_Auction.daos.DepositRepo;
import com.CV_Auction.daos.WinnerTableRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserDashboardService {
    @Autowired
    DepositRepo depositRepo;
    @Autowired
    AllowedUserRepo allowedUserRepo;
    @Autowired
    WinnerTableRepo winnerTableRepo;
    @Autowired
    AuctionStatusTrackRepo auctionStatusTrackRepo;

    public UserDashboardResponse getUserInfo(int uid) {
        Long totalAmount = depositRepo.getDepositAmount(uid);
        long securityAmount = (totalAmount != null) ? totalAmount.intValue() : 0;

        Integer limitedBids = allowedUserRepo.bidsLimit(uid);
        int limit = (limitedBids != null) ? limitedBids : 0;

        long amountPending = 0;
        List<Integer> auctionWon = winnerTableRepo.auctionWon(uid);
        if (auctionWon != null) {
            for (int auctionId : auctionWon) {
                Long amount = auctionStatusTrackRepo.finalAmount(uid, auctionId);
                if (amount != null) {
                    amountPending += amount;
                }
            }
        }
        Optional<LocalDateTime> optionalDate = depositRepo.getFirstDate(uid);
        LocalDate planStart = optionalDate.map(LocalDateTime::toLocalDate).orElse(null);

        boolean packActive = securityAmount > 0;

        return new UserDashboardResponse(securityAmount, limit, amountPending, packActive, planStart);
    }


}
