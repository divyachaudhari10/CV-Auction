package com.CV_Auction.daos;

import com.CV_Auction.beans.CurrentAuction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CurrentAuctionRepo extends JpaRepository<CurrentAuction,Integer> {
}
