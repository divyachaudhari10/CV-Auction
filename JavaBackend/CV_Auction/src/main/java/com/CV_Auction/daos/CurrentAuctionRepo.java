package com.CV_Auction.daos;

import com.CV_Auction.beans.CurrentAuction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CurrentAuctionRepo extends JpaRepository<CurrentAuction,Integer> {
    @Query("SELECT u FROM CurrentAuction u WHERE u.auctionid = :auctionid")
    Optional<CurrentAuction> findByAuctionId(@Param("auctionid") int auctionid);

}
