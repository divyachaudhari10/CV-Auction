package com.CV_Auction.daos;

import com.CV_Auction.beans.HostAuction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HostAuctionRepo extends JpaRepository<HostAuction,Integer> {
}
